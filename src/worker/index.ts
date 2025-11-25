import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import {
  exchangeCodeForSessionToken,
  getOAuthRedirectUrl,
  authMiddleware,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME,
import {
  CreateUserProfileSchema,
  UpdateUserProfileSchema,
  UpdateAffiliateConfigSchema,
  UpdateChannelConnectionsSchema,
  CreateCampaignSchema,
} from "../shared/types";

const app = new Hono<{ Bindings: Env }>();

// OAuth endpoints
app.get("/api/oauth/google/redirect_url", async (c) => {
  const redirectUrl = await getOAuthRedirectUrl("google", {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60,
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get("/api/logout", async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === "string") {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// User profile endpoints
app.get("/api/profile", authMiddleware, async (c) => {
  const user = c.get("user");
  
  const profile = await c.env.DB.prepare(
    "SELECT * FROM user_profiles WHERE user_id = ?"
  )
    .bind(user!.id)
    .first();

  return c.json(profile);
});

app.post("/api/profile", authMiddleware, zValidator("json", CreateUserProfileSchema), async (c) => {
  const user = c.get("user");
  const data = c.req.valid("json");

  await c.env.DB.prepare(
    "INSERT INTO user_profiles (user_id, full_name, niche, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
  )
    .bind(user!.id, data.full_name, data.niche)
    .run();

  const profile = await c.env.DB.prepare(
    "SELECT * FROM user_profiles WHERE user_id = ?"
  )
    .bind(user!.id)
    .first();

  return c.json(profile);
});

app.patch("/api/profile", authMiddleware, zValidator("json", UpdateUserProfileSchema), async (c) => {
  const user = c.get("user");
  const data = c.req.valid("json");

  const sets: string[] = [];
  const binds: any[] = [];

  if (data.full_name !== undefined) {
    sets.push("full_name = ?");
    binds.push(data.full_name);
  }
  if (data.niche !== undefined) {
    sets.push("niche = ?");
    binds.push(data.niche);
  }

  if (sets.length > 0) {
    sets.push("updated_at = CURRENT_TIMESTAMP");
    binds.push(user!.id);

    await c.env.DB.prepare(
      `UPDATE user_profiles SET ${sets.join(", ")} WHERE user_id = ?`
    )
      .bind(...binds)
      .run();
  }

  const profile = await c.env.DB.prepare(
    "SELECT * FROM user_profiles WHERE user_id = ?"
  )
    .bind(user!.id)
    .first();

  return c.json(profile);
});

// Affiliate config endpoints
app.get("/api/affiliate-config", authMiddleware, async (c) => {
  const user = c.get("user");
  
  const config = await c.env.DB.prepare(
    "SELECT * FROM affiliate_configs WHERE user_id = ? ORDER BY created_at DESC LIMIT 1"
  )
    .bind(user!.id)
    .first();

  return c.json(config);
});

app.post("/api/affiliate-config", authMiddleware, zValidator("json", UpdateAffiliateConfigSchema), async (c) => {
  const user = c.get("user");
  const data = c.req.valid("json");

  await c.env.DB.prepare(
    "INSERT INTO affiliate_configs (user_id, affiliate_link, product_description, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)"
  )
    .bind(user!.id, data.affiliate_link || null, data.product_description || null)
    .run();

  const config = await c.env.DB.prepare(
    "SELECT * FROM affiliate_configs WHERE user_id = ? ORDER BY created_at DESC LIMIT 1"
  )
    .bind(user!.id)
    .first();

  return c.json(config);
});

// Channel connections endpoints
app.get("/api/channels", authMiddleware, async (c) => {
  const user = c.get("user");
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM channel_connections WHERE user_id = ?"
  )
    .bind(user!.id)
    .all();

  return c.json(results);
});

app.post("/api/channels", authMiddleware, zValidator("json", UpdateChannelConnectionsSchema), async (c) => {
  const user = c.get("user");
  const data = c.req.valid("json");

  const channels = [
    { type: "facebook", value: data.facebook },
    { type: "instagram", value: data.instagram },
    { type: "email", value: data.email },
    { type: "telegram", value: data.telegram },
    { type: "whatsapp", value: data.whatsapp },
  ];

  for (const channel of channels) {
    if (channel.value) {
      await c.env.DB.prepare(
        "INSERT INTO channel_connections (user_id, channel_type, channel_value, is_connected, updated_at) VALUES (?, ?, ?, 1, CURRENT_TIMESTAMP)"
      )
        .bind(user!.id, channel.type, channel.value)
        .run();
    }
  }

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM channel_connections WHERE user_id = ?"
  )
    .bind(user!.id)
    .all();

  return c.json(results);
});

// Stats endpoint
app.get("/api/stats", authMiddleware, async (c) => {
  const user = c.get("user");
  
  const scheduled = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM content_items WHERE user_id = ? AND status = 'scheduled'"
  )
    .bind(user!.id)
    .first();

  const sent = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM content_items WHERE user_id = ? AND status = 'sent'"
  )
    .bind(user!.id)
    .first();

  const campaigns = await c.env.DB.prepare(
    "SELECT COUNT(*) as count FROM campaigns WHERE user_id = ?"
  )
    .bind(user!.id)
    .first();

  return c.json({
    totalScheduled: (scheduled as any)?.count || 0,
    totalSent: (sent as any)?.count || 0,
    totalCampaigns: (campaigns as any)?.count || 0,
    totalClicks: 0,
  });
});

// Content items endpoints
app.get("/api/content", authMiddleware, async (c) => {
  const user = c.get("user");
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM content_items WHERE user_id = ? ORDER BY created_at DESC"
  )
    .bind(user!.id)
    .all();

  return c.json(results);
});

// Campaigns endpoints
app.get("/api/campaigns", authMiddleware, async (c) => {
  const user = c.get("user");
  
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM campaigns WHERE user_id = ? ORDER BY created_at DESC"
  )
    .bind(user!.id)
    .all();

  return c.json(results);
});

app.post("/api/campaigns", authMiddleware, zValidator("json", CreateCampaignSchema), async (c) => {
  const user = c.get("user");
  const data = c.req.valid("json");

  await c.env.DB.prepare(
    "INSERT INTO campaigns (user_id, name, status, updated_at) VALUES (?, ?, 'active', CURRENT_TIMESTAMP)"
  )
    .bind(user!.id, data.name)
    .run();

  const { results } = await c.env.DB.prepare(
    "SELECT * FROM campaigns WHERE user_id = ? ORDER BY created_at DESC"
  )
    .bind(user!.id)
    .all();

  return c.json(results);
});

export default app;
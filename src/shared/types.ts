import z from "zod";

// User Profile
export const UserProfileSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  full_name: z.string().nullable(),
  niche: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;

export const CreateUserProfileSchema = z.object({
  full_name: z.string(),
  niche: z.string(),
});

export const UpdateUserProfileSchema = z.object({
  full_name: z.string().optional(),
  niche: z.string().optional(),
});

// Affiliate Config
export const AffiliateConfigSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  affiliate_link: z.string().nullable(),
  product_description: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type AffiliateConfig = z.infer<typeof AffiliateConfigSchema>;

export const UpdateAffiliateConfigSchema = z.object({
  affiliate_link: z.string().url().optional(),
  product_description: z.string().optional(),
});

// Channel Connections
export const ChannelConnectionSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  channel_type: z.string(),
  channel_value: z.string().nullable(),
  is_connected: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ChannelConnection = z.infer<typeof ChannelConnectionSchema>;

export const UpdateChannelConnectionsSchema = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  email: z.string().email().optional(),
  telegram: z.string().optional(),
  whatsapp: z.string().optional(),
});

// Content Items
export const ContentItemSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  content_type: z.string().nullable(),
  channel: z.string().nullable(),
  scheduled_date: z.string().nullable(),
  status: z.string().nullable(),
  cta_link: z.string().nullable(),
  content_text: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ContentItem = z.infer<typeof ContentItemSchema>;

// Campaigns
export const CampaignSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  name: z.string(),
  status: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Campaign = z.infer<typeof CampaignSchema>;

export const CreateCampaignSchema = z.object({
  name: z.string(),
});

// Stats
export const StatsSchema = z.object({
  totalScheduled: z.number(),
  totalSent: z.number(),
  totalCampaigns: z.number(),
  totalClicks: z.number(),
});

export type Stats = z.infer<typeof StatsSchema>;

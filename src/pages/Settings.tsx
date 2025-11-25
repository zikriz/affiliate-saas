import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { User, Link as LinkIcon, Key, Bell, AlertTriangle, Save } from "lucide-react";

const niches = [
  "Real Estate",
  "Mortgage",
  "Insurance",
  "Crypto",
  "eCommerce",
  "Local Services",
  "Other",
];

export default function Settings() {
  const { user } = useAuth();
  
  const [fullName, setFullName] = useState("");
  const [niche, setNiche] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        setFullName(data?.full_name || "");
        setNiche(data?.niche || "");
      });

    fetch("/api/affiliate-config")
      .then((res) => res.json())
      .then((data) => {
        setAffiliateLink(data?.affiliate_link || "");
        setProductDescription(data?.product_description || "");
      });
  }, []);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: fullName, niche }),
    });
    setIsSaving(false);
  };

  const handleSaveAffiliate = async () => {
    setIsSaving(true);
    await fetch("/api/affiliate-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        affiliate_link: affiliateLink,
        product_description: productDescription,
      }),
    });
    setIsSaving(false);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
          <p className="text-slate-600">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* User Profile */}
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">User Profile</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email (from Google)
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Select niche...</option>
                  {niches.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>

          {/* Affiliate Preferences */}
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Affiliate Preferences</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Affiliate Link
                </label>
                <input
                  type="url"
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                  placeholder="https://example.com/ref/yourlink"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Product Description
                </label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Describe the product or service you're promoting..."
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleSaveAffiliate}
                disabled={isSaving}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Integrations</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Facebook API Token</p>
                    <p className="text-sm text-slate-600 mt-1">Connect to auto-post to Facebook</p>
                  </div>
                  <button className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-white transition-colors text-sm">
                    Configure
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Instagram API Token</p>
                    <p className="text-sm text-slate-600 mt-1">Connect to auto-post to Instagram</p>
                  </div>
                  <button className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-white transition-colors text-sm">
                    Configure
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Email Service (SendGrid/Mailgun)</p>
                    <p className="text-sm text-slate-600 mt-1">Connect to send email campaigns</p>
                  </div>
                  <button className="px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-white transition-colors text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Notification Settings</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-medium text-slate-900">Email Notifications</p>
                  <p className="text-sm text-slate-600 mt-1">Receive updates via email</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-medium text-slate-900">Content Published</p>
                  <p className="text-sm text-slate-600 mt-1">Notify when content is published</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-medium text-slate-900">Weekly Reports</p>
                  <p className="text-sm text-slate-600 mt-1">Receive weekly performance summaries</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl p-8 border-2 border-red-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Danger Zone</h2>
            </div>

            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">Delete Account</p>
                  <p className="text-sm text-slate-600 mt-1">
                    Permanently delete your account and all data
                  </p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
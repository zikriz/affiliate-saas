import { useEffect, useState } from "react";
import AppLayout from "@/react-app/components/AppLayout";
import { Plus, TrendingUp, Users, MousePointerClick, Eye, Megaphone } from "lucide-react";
import type { Campaign } from "@/shared/types";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState("");

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then(setCampaigns);
  }, []);

  const handleCreateCampaign = async () => {
    if (!newCampaignName.trim()) return;

    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCampaignName }),
    });

    if (res.ok) {
      const updated = await res.json();
      setCampaigns(updated);
      setNewCampaignName("");
      setIsCreating(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Campaigns</h1>
            <p className="text-slate-600">Create and manage your marketing campaigns</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Create Campaign
          </button>
        </div>

        {/* Create Campaign Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Create New Campaign</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={newCampaignName}
                    onChange={(e) => setNewCampaignName(e.target.value)}
                    placeholder="Q4 Product Launch"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsCreating(false)}
                    className="flex-1 px-5 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateCampaign}
                    className="flex-1 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns Grid */}
        {campaigns.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
            <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No campaigns yet</h3>
            <p className="text-slate-600 mb-6">Create your first campaign to get started</p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
            >
              Create Campaign
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{campaign.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-slate-100 text-slate-700"
                  }`}>
                    {campaign.status || "draft"}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Reach
                    </span>
                    <span className="font-semibold text-slate-900">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center gap-2">
                      <MousePointerClick className="w-4 h-4" />
                      Clicks
                    </span>
                    <span className="font-semibold text-slate-900">0</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      CTR
                    </span>
                    <span className="font-semibold text-slate-900">0%</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm">
                    Generate More
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}

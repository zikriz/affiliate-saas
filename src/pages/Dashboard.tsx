import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import { Calendar, TrendingUp, Send, MousePointerClick, Sparkles } from "lucide-react";
import type { Stats } from "../shared/types";

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  const handleGenerate = async (days: number) => {
    alert(`Generating ${days} days of content... (Feature coming soon)`);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Overview of your affiliate marketing performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stats?.totalScheduled || 0}</h3>
            <p className="text-sm text-slate-600 mt-1">Scheduled Posts</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Send className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stats?.totalSent || 0}</h3>
            <p className="text-sm text-slate-600 mt-1">Sent Posts</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stats?.totalCampaigns || 0}</h3>
            <p className="text-sm text-slate-600 mt-1">Email Campaigns</p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MousePointerClick className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900">{stats?.totalClicks || 0}</h3>
            <p className="text-sm text-slate-600 mt-1">Total Clicks</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleGenerate(7)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm"
            >
              <Sparkles className="w-5 h-5" />
              Generate 7 Days of Content
            </button>
            <button
              onClick={() => handleGenerate(30)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-sm"
            >
              <Sparkles className="w-5 h-5" />
              Generate 30 Days of Content
            </button>
          </div>
        </div>

        {/* Calendar Widget */}
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Content Calendar</h2>
          <div className="bg-slate-50 rounded-lg p-8 text-center border border-slate-200">
            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">Calendar view coming soon</p>
            <p className="text-sm text-slate-500 mt-2">Schedule and manage your content across all channels</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
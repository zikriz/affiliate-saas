import { useState } from "react";
import AppLayout from "@/react-app/components/AppLayout";
import { Calendar, Clock, Facebook, Instagram, Mail, MessageCircle, Phone } from "lucide-react";

const channels = [
  { name: "Facebook", icon: Facebook, color: "blue" },
  { name: "Instagram", icon: Instagram, color: "pink" },
  { name: "Email", icon: Mail, color: "purple" },
  { name: "Telegram", icon: MessageCircle, color: "sky" },
  { name: "WhatsApp", icon: Phone, color: "green" },
];

export default function Scheduling() {
  const [view, setView] = useState<"calendar" | "timeline">("calendar");
  const [autoSchedule, setAutoSchedule] = useState<Record<string, boolean>>({
    Facebook: false,
    Instagram: false,
    Email: false,
    Telegram: false,
    WhatsApp: false,
  });

  const toggleAutoSchedule = (channel: string) => {
    setAutoSchedule((prev) => ({ ...prev, [channel]: !prev[channel] }));
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Scheduling</h1>
          <p className="text-slate-600">Plan and schedule your content across channels</p>
        </div>

        {/* View Toggle */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setView("calendar")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  view === "calendar"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Calendar className="w-4 h-4" />
                Calendar View
              </button>
              <button
                onClick={() => setView("timeline")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  view === "timeline"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <Clock className="w-4 h-4" />
                Timeline View
              </button>
            </div>
          </div>
        </div>

        {/* Auto-Schedule Settings */}
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Auto-Schedule Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.name}
                  className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-${channel.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${channel.color}-600`} />
                    </div>
                    <span className="font-medium text-slate-900">{channel.name}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSchedule[channel.name]}
                      onChange={() => toggleAutoSchedule(channel.name)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calendar/Timeline View */}
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            {view === "calendar" ? "Calendar" : "Timeline"}
          </h2>
          
          <div className="bg-slate-50 rounded-lg p-12 text-center border border-slate-200">
            {view === "calendar" ? (
              <>
                <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Calendar View</h3>
                <p className="text-slate-600 mb-4">Drag and drop to reschedule content</p>
              </>
            ) : (
              <>
                <Clock className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Timeline View</h3>
                <p className="text-slate-600 mb-4">See your content scheduled chronologically</p>
              </>
            )}
            <p className="text-sm text-slate-500">Interactive scheduling coming soon</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

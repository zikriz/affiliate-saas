import { useEffect, useState } from "react";
import AppLayout from "@/react-app/components/AppLayout";
import { Search, Filter, Eye, FileText } from "lucide-react";
import type { ContentItem } from "@/shared/types";

export default function ContentLibrary() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then(setContent);
  }, []);

  const filteredContent = content.filter((item) =>
    item.content_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.channel?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Content Library</h1>
          <p className="text-slate-600">Manage all your generated content</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search content..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {filteredContent.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No content yet</h3>
              <p className="text-slate-600 mb-6">Start generating content to see it here</p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm">
                Generate Content
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Content Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Channel
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Scheduled Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      CTA Link
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredContent.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-900">
                        {item.content_type || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.channel || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.scheduled_date ? new Date(item.scheduled_date).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "sent"
                            ? "bg-green-100 text-green-700"
                            : item.status === "scheduled"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {item.status || "draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">
                        {item.cta_link || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

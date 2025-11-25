import { useState } from "react";
import AppLayout from "@/react-app/components/AppLayout";
import { Sparkles, Link as LinkIcon, MessageSquare, Image as ImageIcon } from "lucide-react";

const niches = [
  "Real Estate",
  "Mortgage",
  "Insurance",
  "Crypto",
  "eCommerce",
  "Local Services",
  "Other",
];

const tones = ["Professional", "Casual", "Friendly", "Authoritative", "Playful"];
const contentLengths = ["Short", "Medium", "Long"];
const channels = ["Facebook", "Instagram", "Twitter", "LinkedIn", "Email"];

export default function AIGenerator() {
  const [affiliateLink, setAffiliateLink] = useState("");
  const [niche, setNiche] = useState("");
  const [tone, setTone] = useState("");
  const [contentLength, setContentLength] = useState("");
  const [days, setDays] = useState(7);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const toggleChannel = (channel: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setGeneratedContent({
        socialPosts: [
          "🚀 Transform your business with this amazing product! Click the link to learn more.",
          "💡 Don't miss out on this exclusive opportunity. Limited time offer!",
          "✨ Join thousands of satisfied customers. Start your journey today!",
        ],
        emailScripts: [
          "Subject: Exclusive Offer Inside\n\nHey there,\n\nI wanted to share something special with you...",
          "Subject: You Won't Believe This\n\nHi friend,\n\nI've been using this product for weeks and...",
        ],
        imagePrompts: [
          "Modern minimalist product showcase with blue gradient background",
          "Professional lifestyle image showing product in use",
          "Eye-catching call-to-action graphic with bold typography",
        ],
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Content Generator</h1>
          <p className="text-slate-600">Generate engaging content for your affiliate campaigns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Generator Settings</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Affiliate Link
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="url"
                    value={affiliateLink}
                    onChange={(e) => setAffiliateLink(e.target.value)}
                    placeholder="https://example.com/ref/yourlink"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
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

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Select tone...</option>
                  {tones.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Content Length
                </label>
                <div className="flex gap-2">
                  {contentLengths.map((length) => (
                    <button
                      key={length}
                      type="button"
                      onClick={() => setContentLength(length)}
                      className={`flex-1 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                        contentLength === length
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {length}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Number of Days
                </label>
                <input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 1)}
                  min="1"
                  max="90"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Channel Selection
                </label>
                <div className="space-y-2">
                  {channels.map((channel) => (
                    <label key={channel} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedChannels.includes(channel)}
                        onChange={() => toggleChannel(channel)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-700">{channel}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !affiliateLink || !niche}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <Sparkles className="w-5 h-5" />
                {isGenerating ? "Generating..." : "Generate Content"}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="space-y-6">
            {generatedContent ? (
              <>
                {/* Social Posts */}
                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Social Posts</h3>
                  </div>
                  <div className="space-y-4">
                    {generatedContent.socialPosts.map((post: string, i: number) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm text-slate-700">{post}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Email Scripts */}
                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Email Scripts</h3>
                  </div>
                  <div className="space-y-4">
                    {generatedContent.emailScripts.map((script: string, i: number) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <pre className="text-xs text-slate-700 whitespace-pre-wrap font-mono">
                          {script}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Prompts */}
                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Image Prompts</h3>
                  </div>
                  <div className="space-y-4">
                    {generatedContent.imagePrompts.map((prompt: string, i: number) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-sm text-slate-700">{prompt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
                <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Generate</h3>
                <p className="text-slate-600">Fill out the form and click generate to create AI-powered content</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

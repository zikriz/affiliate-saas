import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, Check, User, Link as LinkIcon, Share2 } from "lucide-react";
import { useAuth } from "@getmocha/users-service/react";

const niches = [
  "Real Estate",
  "Mortgage",
  "Insurance",
  "Crypto",
  "eCommerce",
  "Local Services",
  "Other",
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [niche, setNiche] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [channels, setChannels] = useState({
    facebook: "",
    instagram: "",
    email: "",
    telegram: "",
    whatsapp: "",
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleNext = async () => {
    if (step === 1) {
      if (!fullName || !niche) return;
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, niche }),
      });
      setStep(2);
    } else if (step === 2) {
      if (affiliateLink) {
        await fetch("/api/affiliate-config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            affiliate_link: affiliateLink,
            product_description: productDescription,
          }),
        });
      }
      setStep(3);
    } else if (step === 3) {
      await fetch("/api/channels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(channels),
      });
      navigate("/");
    }
  };

  const canProceed = () => {
    if (step === 1) return fullName && niche;
    if (step === 2) return true;
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to AffiliatePro</h1>
            <p className="text-slate-600">Let's set up your account in 3 simple steps</p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
                    s < step
                      ? "bg-green-100 text-green-700"
                      : s === step
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-20 h-1 mx-2 rounded-full transition-all ${
                      s < step ? "bg-green-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: User Profile */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">User Profile</h2>
                  <p className="text-sm text-slate-600">Tell us about yourself</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={user?.google_user_data?.name || "John Doe"}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Your Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Choose a niche...</option>
                  {niches.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Affiliate Setup */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <LinkIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Affiliate Setup</h2>
                  <p className="text-sm text-slate-600">Configure your affiliate details</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Affiliate Link
                </label>
                <input
                  type="url"
                  value={affiliateLink}
                  onChange={(e) => setAffiliateLink(e.target.value)}
                  placeholder="https://example.com/ref/yourlink"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              {affiliateLink && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                    Preview
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <p className="text-sm text-slate-700 truncate">{affiliateLink}</p>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                      {productDescription || "No description provided"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Connect Channels */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Share2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Connect Channels</h2>
                  <p className="text-sm text-slate-600">Link your social media accounts (optional)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={!!channels.facebook}
                    onChange={(e) => !e.target.checked && setChannels({ ...channels, facebook: "" })}
                    className="mt-3.5 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Facebook Page URL
                    </label>
                    <input
                      type="url"
                      value={channels.facebook}
                      onChange={(e) => setChannels({ ...channels, facebook: e.target.value })}
                      placeholder="https://facebook.com/yourpage"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={!!channels.instagram}
                    onChange={(e) => !e.target.checked && setChannels({ ...channels, instagram: "" })}
                    className="mt-3.5 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Instagram Username
                    </label>
                    <input
                      type="text"
                      value={channels.instagram}
                      onChange={(e) => setChannels({ ...channels, instagram: e.target.value })}
                      placeholder="@yourusername"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={!!channels.email}
                    onChange={(e) => !e.target.checked && setChannels({ ...channels, email: "" })}
                    className="mt-3.5 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Sender Address
                    </label>
                    <input
                      type="email"
                      value={channels.email}
                      onChange={(e) => setChannels({ ...channels, email: e.target.value })}
                      placeholder="sender@yourdomain.com"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={!!channels.telegram}
                    onChange={(e) => !e.target.checked && setChannels({ ...channels, telegram: "" })}
                    className="mt-3.5 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Telegram Username
                    </label>
                    <input
                      type="text"
                      value={channels.telegram}
                      onChange={(e) => setChannels({ ...channels, telegram: e.target.value })}
                      placeholder="@yourusername"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={!!channels.whatsapp}
                    onChange={(e) => !e.target.checked && setChannels({ ...channels, whatsapp: "" })}
                    className="mt-3.5 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={channels.whatsapp}
                      onChange={(e) => setChannels({ ...channels, whatsapp: e.target.value })}
                      placeholder="+1 234 567 8900"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-2.5 text-slate-700 font-medium rounded-lg hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              {step === 3 ? "Finish" : "Next"}
              {step < 3 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

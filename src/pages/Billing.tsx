import AppLayout from "@/react-app/components/AppLayout";
import { Check, Zap, Rocket, Crown } from "lucide-react";

const plans = [
  {
    name: "Free Plan",
    price: "$0",
    period: "forever",
    icon: Zap,
    color: "slate",
    features: [
      "10 AI posts/month",
      "1 channel",
      "Basic analytics",
      "Email support",
    ],
    cta: "Current Plan",
    isCurrent: true,
  },
  {
    name: "Pro Plan",
    price: "$29",
    period: "per month",
    icon: Rocket,
    color: "blue",
    features: [
      "100 posts/month",
      "3 channels",
      "Auto-posting",
      "Advanced analytics",
      "Priority support",
      "Custom scheduling",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Agency Plan",
    price: "$99",
    period: "per month",
    icon: Crown,
    color: "purple",
    features: [
      "Unlimited posts",
      "Unlimited channels",
      "White-label options",
      "Team collaboration",
      "API access",
      "Dedicated support",
      "Custom integrations",
    ],
    cta: "Upgrade to Agency",
  },
];

export default function Billing() {
  const handleCheckout = (planName: string) => {
    alert(`Redirecting to Stripe checkout for ${planName}... (Integration coming soon)`);
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Billing & Subscriptions</h1>
          <p className="text-slate-600">Choose the plan that's right for you</p>
        </div>

        {/* Current Subscription */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-1">Current Subscription</h2>
              <p className="text-slate-600">You are currently on the <span className="font-semibold">Free Plan</span></p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900">$0.00</p>
              <p className="text-sm text-slate-600">per month</p>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-8 border-2 shadow-lg hover:shadow-xl transition-all relative ${
                  plan.popular
                    ? "border-blue-500 ring-4 ring-blue-100"
                    : "border-slate-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 bg-${plan.color}-100 rounded-2xl mb-4`}>
                    <Icon className={`w-7 h-7 text-${plan.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600 ml-2">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-sm text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => !plan.isCurrent && handleCheckout(plan.name)}
                  disabled={plan.isCurrent}
                  className={`w-full px-6 py-3 font-semibold rounded-xl transition-all shadow-sm ${
                    plan.isCurrent
                      ? "bg-slate-100 text-slate-500 cursor-not-allowed"
                      : plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            );
          })}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm mt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Payment Method</h2>
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <p className="text-slate-600">No payment method on file</p>
            <p className="text-sm text-slate-500 mt-2">Upgrade to a paid plan to add a payment method</p>
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm mt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Billing History</h2>
          <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 text-center">
            <p className="text-slate-600">No billing history</p>
            <p className="text-sm text-slate-500 mt-2">Your invoices will appear here</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

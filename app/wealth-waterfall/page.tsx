import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Family Wealth Waterfall | Signature By Tunde O",
  description:
    "Learn how the Family Wealth Waterfall strategy uses insurance and trusts to create generational wealth protection for your family.",
};

export default function WealthWaterfall() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-navy via-navy-light to-navy">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gold rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-6">
            Our Signature Strategy
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-cream leading-tight mb-6">
            The Family Wealth{" "}
            <span className="text-gold-gradient">Waterfall</span>
          </h1>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            A cascading strategy of insurance and trust planning designed to
            protect your wealth and ensure it flows seamlessly from one
            generation to the next.
          </p>
        </div>
      </section>

      {/* What Is It */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-cream mb-6">
                What Is the Family Wealth Waterfall?
              </h2>
              <div className="space-y-4 text-slate leading-relaxed">
                <p>
                  The Family Wealth Waterfall is a comprehensive financial
                  strategy that combines life insurance products with trust
                  structures to create multiple layers of wealth protection. Like
                  a waterfall, your wealth cascades through carefully designed
                  channels, ensuring every family member benefits.
                </p>
                <p>
                  Unlike traditional financial planning that focuses on a single
                  generation, the Wealth Waterfall is designed to protect and
                  grow your assets across multiple generations &mdash; creating
                  true generational wealth.
                </p>
              </div>
            </div>

            {/* Visual Waterfall Diagram */}
            <div className="bg-navy-light border border-gold/20 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-gold mb-6 text-center">
                How It Flows
              </h3>
              <div className="space-y-2">
                {/* Level 1 */}
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center">
                  <div className="text-gold font-semibold text-sm">
                    TIER 1: FOUNDATION
                  </div>
                  <div className="text-cream text-sm mt-1">
                    Life Insurance Policy
                  </div>
                  <div className="text-slate text-xs mt-1">
                    Tax-advantaged growth + death benefit
                  </div>
                </div>
                <div className="flex justify-center">
                  <svg
                    className="w-6 h-8 text-gold/50"
                    fill="currentColor"
                    viewBox="0 0 24 32"
                  >
                    <path d="M12 0v24m0 0l-6-6m6 6l6-6" stroke="currentColor" fill="none" strokeWidth="2" />
                  </svg>
                </div>

                {/* Level 2 */}
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center">
                  <div className="text-gold font-semibold text-sm">
                    TIER 2: PROTECTION
                  </div>
                  <div className="text-cream text-sm mt-1">
                    Irrevocable Life Insurance Trust (ILIT)
                  </div>
                  <div className="text-slate text-xs mt-1">
                    Estate tax exclusion + asset protection
                  </div>
                </div>
                <div className="flex justify-center">
                  <svg
                    className="w-6 h-8 text-gold/50"
                    fill="currentColor"
                    viewBox="0 0 24 32"
                  >
                    <path d="M12 0v24m0 0l-6-6m6 6l6-6" stroke="currentColor" fill="none" strokeWidth="2" />
                  </svg>
                </div>

                {/* Level 3 */}
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center">
                  <div className="text-gold font-semibold text-sm">
                    TIER 3: GROWTH
                  </div>
                  <div className="text-cream text-sm mt-1">
                    Cash Value Accumulation
                  </div>
                  <div className="text-slate text-xs mt-1">
                    Living benefits + policy loans + retirement supplement
                  </div>
                </div>
                <div className="flex justify-center">
                  <svg
                    className="w-6 h-8 text-gold/50"
                    fill="currentColor"
                    viewBox="0 0 24 32"
                  >
                    <path d="M12 0v24m0 0l-6-6m6 6l6-6" stroke="currentColor" fill="none" strokeWidth="2" />
                  </svg>
                </div>

                {/* Level 4 */}
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 text-center">
                  <div className="text-gold font-semibold text-sm">
                    TIER 4: LEGACY
                  </div>
                  <div className="text-cream text-sm mt-1">
                    Generational Wealth Transfer
                  </div>
                  <div className="text-slate text-xs mt-1">
                    Children &amp; grandchildren benefit tax-free
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-cream mb-4">
              Why the Wealth Waterfall Works
            </h2>
            <p className="text-slate max-w-2xl mx-auto">
              This isn&apos;t just another insurance product. It&apos;s a
              complete wealth strategy designed around your family&apos;s unique
              needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Tax-Advantaged Growth",
                description:
                  "Life insurance cash value grows tax-deferred. Policy loans provide tax-free access to your wealth without triggering capital gains.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                ),
              },
              {
                title: "Estate Protection",
                description:
                  "Using an ILIT, your life insurance proceeds pass outside your estate, potentially saving your family hundreds of thousands in estate taxes.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                ),
              },
              {
                title: "Living Benefits",
                description:
                  "Access your wealth while you're alive. Use cash value for retirement income, business opportunities, or emergency funds — on your terms.",
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                ),
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="bg-navy border border-gold/20 rounded-lg p-8"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {benefit.icon}
                  </svg>
                </div>
                <h3 className="text-xl font-heading font-bold text-cream mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-cream mb-8 text-center">
            Is the Wealth Waterfall Right for You?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              "Families wanting to build generational wealth",
              "Parents looking to protect their children's future",
              "Business owners seeking tax-efficient wealth transfer",
              "Individuals planning for retirement with living benefits",
              "Anyone concerned about estate taxes eroding their legacy",
              "Couples wanting financial security for surviving spouses",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-cream text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-cream mb-6">
            Start Building Your{" "}
            <span className="text-gold">Wealth Waterfall</span>
          </h2>
          <p className="text-slate mb-10 max-w-xl mx-auto">
            Every family&apos;s situation is unique. Book a free consultation to
            learn how a customized Wealth Waterfall strategy can protect your
            family&apos;s future.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold text-navy px-10 py-4 rounded font-semibold text-lg hover:bg-gold-light transition-colors"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}

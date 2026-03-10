import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light to-navy" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gold rounded-full blur-[96px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in-up">
            Protecting Your Family&apos;s Financial Legacy
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-cream leading-tight mb-8 animate-fade-in-up">
            Build Wealth That{" "}
            <span className="text-gold-gradient">Lasts Generations</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate max-w-2xl mx-auto mb-12 animate-fade-in-up">
            Strategic insurance planning and trusted notary services designed to
            protect and grow your family&apos;s legacy. Your signature matters
            &mdash; make it count.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
            <Link
              href="/wealth-waterfall"
              className="bg-gold text-navy px-8 py-4 rounded font-semibold text-lg hover:bg-gold-light transition-colors w-full sm:w-auto"
            >
              Explore Wealth Waterfall
            </Link>
            <Link
              href="/contact"
              className="border border-gold/50 text-gold px-8 py-4 rounded font-semibold text-lg hover:bg-gold/10 transition-colors w-full sm:w-auto"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gold/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold tracking-[0.2em] uppercase text-sm mb-4">
              Our Services
            </p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-cream">
              How We Serve You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wealth Waterfall Card */}
            <Link
              href="/wealth-waterfall"
              className="group bg-navy border border-gold/20 rounded-lg p-8 hover:border-gold/50 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <svg
                  className="w-7 h-7 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-bold text-cream mb-4">
                Family Wealth Waterfall
              </h3>
              <p className="text-slate leading-relaxed mb-6">
                A strategic combination of insurance and trust planning that
                creates a cascading flow of wealth protection for your family.
                Designed to ensure your legacy flows seamlessly from one
                generation to the next.
              </p>
              <span className="text-gold text-sm font-semibold group-hover:underline">
                Learn More &rarr;
              </span>
            </Link>

            {/* Notary Card */}
            <Link
              href="/notary"
              className="group bg-navy border border-gold/20 rounded-lg p-8 hover:border-gold/50 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                <svg
                  className="w-7 h-7 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-bold text-cream mb-4">
                Florida Notary Public
              </h3>
              <p className="text-slate leading-relaxed mb-6">
                Licensed and commissioned Florida Notary Public providing
                reliable document notarization services. From real estate
                closings to legal documents, your paperwork is in trusted hands.
              </p>
              <span className="text-gold text-sm font-semibold group-hover:underline">
                View Services &rarr;
              </span>
            </Link>

            {/* FinClear Card */}
            <Link
              href="/finclear"
              className="group bg-navy border border-emerald-500/20 rounded-lg p-8 hover:border-emerald-500/50 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <svg
                  className="w-7 h-7 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-heading font-bold text-cream mb-4">
                FinClear Portal
              </h3>
              <p className="text-slate leading-relaxed mb-6">
                Your personal financial command center. Dashboard with real-time
                KPIs, transaction ledger, document vault, AI-powered reports,
                and direct collaboration with your accountant.
              </p>
              <span className="text-emerald-400 text-sm font-semibold group-hover:underline">
                Sign In &rarr;
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold tracking-[0.2em] uppercase text-sm mb-4">
                About Tunde O
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-cream mb-6">
                Your Partner in{" "}
                <span className="text-gold">Financial Legacy</span>
              </h2>
              <div className="space-y-4 text-slate leading-relaxed">
                <p>
                  Tunde O is a dedicated wealth strategist and licensed Florida
                  Notary Public committed to helping families build and protect
                  generational wealth. With deep expertise in insurance-based
                  wealth strategies, Tunde developed the Family Wealth Waterfall
                  &mdash; a proven approach that combines life insurance, trusts,
                  and strategic planning.
                </p>
                <p>
                  Every family deserves a financial legacy. Tunde works
                  personally with each client to create customized wealth
                  protection plans that ensure your hard work benefits not just
                  you, but your children and grandchildren.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-gold">
                    FL
                  </div>
                  <div className="text-xs text-slate mt-1">
                    Licensed Notary
                  </div>
                </div>
                <div className="w-px h-12 bg-gold/20" />
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-gold">
                    100%
                  </div>
                  <div className="text-xs text-slate mt-1">Client Focused</div>
                </div>
                <div className="w-px h-12 bg-gold/20" />
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-gold">
                    Trust
                  </div>
                  <div className="text-xs text-slate mt-1">Built on Trust</div>
                </div>
              </div>
            </div>

            {/* Visual element */}
            <div className="relative">
              <div className="bg-navy-light border border-gold/20 rounded-lg p-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold/10 rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gold text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-cream font-semibold mb-1">
                        Discovery Call
                      </h4>
                      <p className="text-slate text-sm">
                        We start by understanding your family&apos;s unique
                        financial situation and goals.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold/10 rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gold text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-cream font-semibold mb-1">
                        Custom Strategy
                      </h4>
                      <p className="text-slate text-sm">
                        Tunde builds a personalized Wealth Waterfall plan
                        tailored to your needs.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold/10 rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gold text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-cream font-semibold mb-1">
                        Implementation
                      </h4>
                      <p className="text-slate text-sm">
                        We put the plan into action, setting up the right
                        policies and structures.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gold/10 rounded flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-gold text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="text-cream font-semibold mb-1">
                        Ongoing Support
                      </h4>
                      <p className="text-slate text-sm">
                        Your wealth strategy evolves with your family. We review
                        and adjust as life changes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-cream mb-6">
            Ready to Protect Your Family&apos;s{" "}
            <span className="text-gold">Legacy</span>?
          </h2>
          <p className="text-lg text-slate mb-10 max-w-2xl mx-auto">
            Take the first step toward generational wealth. Book a free
            consultation with Tunde to explore how the Family Wealth Waterfall
            can work for your family.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold text-navy px-10 py-4 rounded font-semibold text-lg hover:bg-gold-light transition-colors"
          >
            Schedule Your Free Consultation
          </Link>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Florida Notary Public Services | Signature By Tunde O",
  description:
    "Licensed Florida Notary Public (Commission #HH389868). Document notarization, real estate closings, legal documents, and mobile notary services.",
};

export default function Notary() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-navy via-navy-light to-navy">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gold rounded-full blur-[128px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-6">
            Florida Notary Public
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-cream leading-tight mb-6">
            Trusted{" "}
            <span className="text-gold-gradient">Notary Services</span>
          </h1>
          <p className="text-lg text-slate max-w-2xl mx-auto mb-8">
            Licensed and commissioned by the State of Florida. Professional,
            reliable, and convenient notarization services when you need them.
          </p>
          <div className="inline-flex items-center gap-2 bg-navy-light border border-gold/30 rounded-lg px-6 py-3">
            <svg
              className="w-5 h-5 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-cream text-sm">
              Commission #HH389868 &middot; Expires May 4, 2027
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-cream mb-4">
              Notary Services Offered
            </h2>
            <p className="text-slate max-w-2xl mx-auto">
              Professional notarization for all your important documents.
              Available for in-person and mobile appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Real Estate Documents",
                items: [
                  "Deeds and titles",
                  "Mortgage documents",
                  "Closing paperwork",
                  "Lease agreements",
                ],
              },
              {
                title: "Legal Documents",
                items: [
                  "Affidavits",
                  "Power of attorney",
                  "Sworn statements",
                  "Court documents",
                ],
              },
              {
                title: "Financial Documents",
                items: [
                  "Loan documents",
                  "Bank forms",
                  "Investment papers",
                  "Insurance forms",
                ],
              },
              {
                title: "Estate & Trust",
                items: [
                  "Wills and trusts",
                  "Living wills",
                  "Healthcare directives",
                  "Beneficiary forms",
                ],
              },
              {
                title: "Business Documents",
                items: [
                  "Contracts and agreements",
                  "Corporate resolutions",
                  "Partnership documents",
                  "Articles of incorporation",
                ],
              },
              {
                title: "Personal Documents",
                items: [
                  "Vehicle title transfers",
                  "Immigration documents",
                  "Travel consent forms",
                  "Certified copies",
                ],
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-navy-light border border-gold/20 rounded-lg p-6"
              >
                <h3 className="text-lg font-heading font-bold text-gold mb-4">
                  {service.title}
                </h3>
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-gold/50 rounded-full flex-shrink-0" />
                      <span className="text-slate">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 bg-navy-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold text-cream mb-12 text-center">
            Why Choose Signature Notary?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Licensed & Bonded",
                description:
                  "Fully commissioned by the State of Florida with all required bonding and insurance.",
              },
              {
                title: "Mobile Service",
                description:
                  "Can't come to us? We'll come to you. Mobile notary service available across Florida.",
              },
              {
                title: "Fast Turnaround",
                description:
                  "Same-day and next-day appointments available. Don't let paperwork slow you down.",
              },
              {
                title: "Trusted Professional",
                description:
                  "Your documents handled with the highest level of care, confidentiality, and professionalism.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold font-heading font-bold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-cream font-semibold mb-2">{item.title}</h3>
                <p className="text-slate text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-cream mb-6">
            Need a Document <span className="text-gold">Notarized</span>?
          </h2>
          <p className="text-slate mb-10 max-w-xl mx-auto">
            Book an appointment today. Available for in-person meetings and
            mobile notary service across Florida.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-gold text-navy px-10 py-4 rounded font-semibold text-lg hover:bg-gold-light transition-colors w-full sm:w-auto"
            >
              Schedule Notary Appointment
            </Link>
            <a
              href="mailto:tunde@signaturebytundeo.com"
              className="border border-gold/50 text-gold px-10 py-4 rounded font-semibold text-lg hover:bg-gold/10 transition-colors w-full sm:w-auto"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

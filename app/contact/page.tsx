import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Book a Consultation | Signature By Tunde O",
  description:
    "Schedule a free consultation to discuss wealth strategy or notary services. Contact Tunde O today.",
};

export default function Contact() {
  const calcomLink = process.env.NEXT_PUBLIC_CALCOM_LINK;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 bg-gradient-to-b from-navy via-navy-light to-navy">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold tracking-[0.3em] uppercase text-sm mb-6">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-cream leading-tight mb-6">
            Book a <span className="text-gold-gradient">Consultation</span>
          </h1>
          <p className="text-lg text-slate max-w-2xl mx-auto">
            Ready to start building your family&apos;s financial legacy? Fill
            out the form below or book directly. Tunde will personally follow up
            within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-navy-light border border-gold/20 rounded-lg p-8">
                <h2 className="text-2xl font-heading font-bold text-cream mb-6">
                  Send a Message
                </h2>
                <ContactForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cal.com Booking */}
              {calcomLink ? (
                <div className="bg-navy-light border border-gold/20 rounded-lg p-8">
                  <h3 className="text-xl font-heading font-bold text-cream mb-4">
                    Book Directly
                  </h3>
                  <p className="text-slate text-sm mb-6">
                    Skip the form and book a time that works for you.
                  </p>
                  <a
                    href={calcomLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gold text-navy text-center px-6 py-3 rounded font-semibold hover:bg-gold-light transition-colors"
                  >
                    Open Booking Calendar
                  </a>
                </div>
              ) : (
                <div className="bg-navy-light border border-gold/20 rounded-lg p-8">
                  <h3 className="text-xl font-heading font-bold text-cream mb-4">
                    Quick Contact
                  </h3>
                  <p className="text-slate text-sm mb-6">
                    Prefer to reach out directly? Use the info below.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="tel:+17865911354"
                      className="flex items-center gap-3 text-cream hover:text-gold transition-colors"
                    >
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
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span className="text-sm">(786) 591-1354</span>
                    </a>
                    <a
                      href="mailto:signhere@signaturebytundeo.com"
                      className="flex items-center gap-3 text-cream hover:text-gold transition-colors"
                    >
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="text-sm">
                        signhere@signaturebytundeo.com
                      </span>
                    </a>
                    <div className="flex items-center gap-3 text-cream">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="text-sm">Florida, United States</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Services Info */}
              <div className="bg-navy-light border border-gold/20 rounded-lg p-8">
                <h3 className="text-xl font-heading font-bold text-cream mb-4">
                  What to Expect
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gold/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-xs font-bold">1</span>
                    </div>
                    <div>
                      <p className="text-cream text-sm font-medium">
                        Submit your inquiry
                      </p>
                      <p className="text-slate text-xs">
                        Fill out the form with your details
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gold/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-xs font-bold">2</span>
                    </div>
                    <div>
                      <p className="text-cream text-sm font-medium">
                        Personal follow-up
                      </p>
                      <p className="text-slate text-xs">
                        Tunde responds within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gold/10 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-gold text-xs font-bold">3</span>
                    </div>
                    <div>
                      <p className="text-cream text-sm font-medium">
                        Free consultation
                      </p>
                      <p className="text-slate text-xs">
                        Discuss your goals with zero obligation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credentials Badges */}
              <div className="space-y-4">
                <div className="bg-navy-light border border-gold/30 rounded-lg p-6 text-center">
                  <div className="text-gold text-2xl mb-2">&#9733;</div>
                  <p className="text-cream text-sm font-semibold">
                    Licensed Insurance Agent
                  </p>
                  <p className="text-slate text-xs mt-1">
                    Life &amp; Variable Contracts
                  </p>
                  <p className="text-slate text-xs">
                    FL License #G307436
                  </p>
                </div>
                <div className="bg-navy-light border border-gold/30 rounded-lg p-6 text-center">
                  <div className="text-gold text-2xl mb-2">&#9733;</div>
                  <p className="text-cream text-sm font-semibold">
                    Florida Notary Public
                  </p>
                  <p className="text-slate text-xs mt-1">
                    Commission #HH389868
                  </p>
                  <p className="text-slate text-xs">Expires May 4, 2027</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

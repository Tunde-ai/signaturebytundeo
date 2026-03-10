import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-light border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-heading font-bold text-gold mb-4">
              Signature By Tunde O
            </h3>
            <p className="text-slate text-sm leading-relaxed">
              Building generational wealth through strategic insurance planning
              and trusted notary services across Florida.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/wealth-waterfall"
                  className="text-slate text-sm hover:text-gold transition-colors"
                >
                  Family Wealth Waterfall
                </Link>
              </li>
              <li>
                <Link
                  href="/notary"
                  className="text-slate text-sm hover:text-gold transition-colors"
                >
                  Notary Public Services
                </Link>
              </li>
              <li>
                <Link
                  href="/finclear"
                  className="text-slate text-sm hover:text-emerald-400 transition-colors"
                >
                  FinClear Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate text-sm hover:text-gold transition-colors"
                >
                  Book a Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-cream uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-slate text-sm">
              <li>Florida, United States</li>
              <li>
                <a
                  href="mailto:signhere@signaturebytundeo.com"
                  className="hover:text-gold transition-colors"
                >
                  signhere@signaturebytundeo.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <span className="inline-block text-xs text-gold/60 border border-gold/30 rounded px-3 py-1">
                FL Notary Commission #HH389868
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/10 text-center">
          <p className="text-slate/60 text-xs">
            &copy; {new Date().getFullYear()} Signature By Tunde O LLC. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

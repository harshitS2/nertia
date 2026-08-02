/**
 * Footer.tsx
 *
 * Site footer for Vnertia.com.
 *
 * Layout (3 columns on desktop, stacked on mobile):
 *   Left  : Logo + brand tagline
 *   Centre: Navigation quick-links
 *   Right : Contact info placeholder + social icons
 *
 * Bottom bar: copyright + "BUILD · SCALE · LEAD" triptych
 *
 * The teal gradient on the top border mirrors the logo arc gradient.
 */

import React from "react";
import Logo from "@/components/ui/Logo";
import { Globe, Send, AtSign, Mail, ArrowUpRight } from "lucide-react";

// Quick-link sections shown in the footer
const FOOTER_LINKS = [
  {
    heading: "Company",
    links: [
      { label: "About",       href: "#about"       },
      { label: "Services",    href: "#services"    },
      { label: "How We Work", href: "#how-we-work" },
      { label: "Contact",     href: "#contact"     },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Growth Strategy",     href: "#services" },
      { label: "Performance Marketing", href: "#services" },
      { label: "Content & Creative",  href: "#services" },
      { label: "Analytics & Insights", href: "#services" },
    ],
  },
];

// Placeholder social links — update URLs when accounts are live
const SOCIAL_LINKS = [
  { icon: Globe,  label: "LinkedIn",  href: "https://linkedin.com"  },
  { icon: AtSign, label: "Twitter/X", href: "https://twitter.com"   },
  { icon: Send,   label: "Instagram", href: "https://instagram.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060f10] text-white/70">

      {/* Top gradient border — mirrors the brand arc gradient */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#25C4CB] to-transparent opacity-60" />

      {/* ================================================================ */}
      {/* Main footer body                                                  */}
      {/* ================================================================ */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ---- Column 1: Brand ---- */}
          <div className="lg:col-span-2">
            <Logo variant="dark" size={160} className="mb-5" />
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              Where effort turns into momentum—and momentum turns into lasting success.
              We are the growth partner that stays.
            </p>

            {/* Contact email placeholder */}
            <a
              href="mailto:hello@vnertia.com"
              className="inline-flex items-center gap-2 mt-5 text-sm text-[#25C4CB] hover:text-[#94D3D8] transition-colors group"
            >
              <Mail size={14} />
              hello@vnertia.com
              <ArrowUpRight
                size={12}
                className="opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200"
              />
            </a>
          </div>

          {/* ---- Columns 2 & 3: Quick links ---- */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.heading}>
              <h3 className="text-white text-xs font-semibold tracking-[0.18em] uppercase mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-[#25C4CB] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* Bottom bar                                                        */}
      {/* ================================================================ */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-xs text-white/30">
            © {currentYear} Vnertia. All rights reserved.
          </p>

          {/* BUILD · SCALE · LEAD triptych — from brand guide */}
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/30">
            BUILD{" "}
            <span className="text-[#25C4CB] mx-1">·</span>
            {" "}SCALE{" "}
            <span className="text-[#25C4CB] mx-1">·</span>
            {" "}LEAD
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-[#25C4CB]/20 hover:text-[#25C4CB] transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

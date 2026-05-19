"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Portfólio", href: "/portfolio" },
  { label: "Tecnologia", href: "/tecnologia" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="TF Ambiental"
            width={1024}
            height={1024}
            className="object-contain h-40 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-[#263238]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[#4CAF50] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Desktop */}
        <a
          href="https://wa.me/5562993420326"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-[#0D2418] hover:bg-[#4CAF50] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
        >
          Fale Conosco
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#0D2418] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-100 px-4 pb-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#263238] hover:text-[#4CAF50] py-1 text-sm font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5562993420326"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 bg-[#0D2418] text-white text-sm font-semibold px-4 py-2 rounded-full text-center"
          >
            Fale Conosco
          </a>
        </div>
      )}
    </header>
  );
}

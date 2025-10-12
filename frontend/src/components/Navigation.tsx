'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: t('home') },
    { href: '/courses', label: t('courses') },
    { href: '/quiz', label: t('quiz') },
    { href: '/assignments', label: t('assignments') },
    { href: '/grades', label: t('grades') },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            🎓 Univ Learning
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-blue-200 transition ${
                  pathname?.includes(item.href) ? 'border-b-2 border-white' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/id" className="hover:text-blue-200">🇮🇩</Link>
            <Link href="/en" className="hover:text-blue-200">🇬🇧</Link>
            <Link href="/profile" className="hover:text-blue-200">
              {t('profile')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 hover:text-blue-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex space-x-4 mt-4">
              <Link href="/id" className="hover:text-blue-200">🇮🇩 ID</Link>
              <Link href="/en" className="hover:text-blue-200">🇬🇧 EN</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

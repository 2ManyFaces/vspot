"use client";

import Link from 'next/link';
import { MapPin, Sun, Moon, Heart, User } from 'lucide-react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = theme === 'dark';

  return (
    <nav className="sticky top-0 z-50 nav-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Vibe<span className="text-brand-500">Spot</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {[
              { href: '/venues', label: 'Venues' },
              { href: '/events', label: 'Events' },
              { href: '/blog', label: 'Blog' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-brand-500"
                style={{ color: 'var(--text-muted)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:text-brand-500"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                }}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}

            <Show when="signed-out">
              <SignInButton>
                <button
                  className="hidden sm:flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-brand-500"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 transition-all duration-200 shadow-[0_0_16px_rgba(124,58,237,0.35)]">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:text-brand-500"
                style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                <Heart className="h-4 w-4" />
              </Link>
              <Link
                href="/profile"
                aria-label="Profile"
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:text-brand-500"
                style={{ backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                <User className="h-4 w-4" />
              </Link>
              <UserButton appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
            </Show>

          </div>
        </div>
      </div>
    </nav>
  );
}

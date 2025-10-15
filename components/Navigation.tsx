'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Home, Rocket, Users, Sparkles, Gift, Bell,
  Wallet, User, Menu, X, TrendingUp, Trophy, MessageCircle
} from 'lucide-react';
import DemoBanner from './DemoBanner';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          setIsLoggedIn(true);
          fetchNotifications();
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications?unreadOnly=true');
      const data = await response.json();
      setNotifications(data.notifications?.length || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const navLinks = isLoggedIn ? [
    { href: '/home', label: 'الرئيسية', icon: Home },
    { href: '/projects', label: 'المشاريع', icon: Rocket },
    { href: '/community', label: 'المجتمع', icon: Users },
    { href: '/ai-evaluation', label: 'تقييم AI', icon: Sparkles },
  ] : [
    { href: '/#features', label: 'المزايا', icon: Sparkles },
    { href: '/#how-it-works', label: 'كيف نعمل', icon: TrendingUp },
    { href: '/projects', label: 'المشاريع', icon: Rocket },
  ];

  return (
    <>
      <DemoBanner />
      <nav className="fixed top-10 w-full bg-white/95 backdrop-blur-md z-40 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/logo.png"
              alt="بذرة"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] bg-clip-text text-transparent">
              بذرة
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {/* Messages */}
                <Link
                  href="/negotiations"
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 text-gray-700" />
                </Link>

                {/* Notifications */}
                <Link
                  href="/notifications"
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {notifications > 9 ? '9+' : notifications}
                    </span>
                  )}
                </Link>

                {/* Wallet */}
                <Link
                  href="/wallet"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors font-medium"
                >
                  <Wallet className="w-4 h-4" />
                  <span>المحفظة</span>
                </Link>

                {/* Profile */}
                <Link
                  href="/profile"
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#8B5CF6] flex items-center justify-center text-white hover:shadow-lg transition-all"
                >
                  <User className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-[#14B8A6] hover:text-[#8B5CF6] font-medium transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105"
                >
                  ابدأ الآن
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                      pathname === link.href
                        ? 'bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              {isLoggedIn && (
                <>
                  <Link
                    href="/wallet"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
                  >
                    <Wallet className="w-5 h-5" />
                    <span>المحفظة</span>
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
                  >
                    <User className="w-5 h-5" />
                    <span>الملف الشخصي</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}


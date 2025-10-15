'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderKanban, Plus, Users, Trophy } from 'lucide-react';
import { useState } from 'react';

export default function BottomNav() {
  const pathname = usePathname();
  const [showCreateMenu, setShowCreateMenu] = useState(false);

  const navItems = [
    { href: '/home', label: 'الرئيسية', icon: Home },
    { href: '/projects', label: 'المشاريع', icon: FolderKanban },
    { href: '#create', label: 'إنشاء', icon: Plus, isSpecial: true },
    { href: '/community', label: 'المجتمع', icon: Users },
    { href: '/leaderboard', label: 'المتصدرين', icon: Trophy },
  ];

  const isActive = (href: string) => pathname === href;

  const handleCreateClick = () => {
    setShowCreateMenu(!showCreateMenu);
  };

  return (
    <>
      {/* Create Menu Overlay */}
      {showCreateMenu && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
          onClick={() => setShowCreateMenu(false)}
        >
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl shadow-2xl p-4 animate-slide-up">
            <Link
              href="/projects/create"
              onClick={() => setShowCreateMenu(false)}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-primary-light transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-semibold text-gray-900">إنشاء مشروع</h3>
                <p className="text-xs text-gray-500">ابدأ مشروعك الجديد</p>
              </div>
            </Link>
            
            <div className="h-px bg-gray-200 my-2" />
            
            <Link
              href="/ai-evaluation"
              onClick={() => setShowCreateMenu(false)}
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-secondary-light transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-secondary to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-semibold text-gray-900">تقييم فكرة</h3>
                <p className="text-xs text-gray-500">قيّم فكرتك بالذكاء الاصطناعي</p>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            if (item.isSpecial) {
              return (
                <button
                  key={item.href}
                  onClick={handleCreateClick}
                  className="relative flex flex-col items-center justify-center -mt-8"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-600 mt-1">
                    {item.label}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all ${
                  active
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 ${active ? 'scale-110' : ''} transition-transform`} />
                <span className={`text-xs mt-1 ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
                {active && (
                  <div className="absolute top-0 w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacer for content */}
      <div className="h-20 md:hidden" />
    </>
  );
}


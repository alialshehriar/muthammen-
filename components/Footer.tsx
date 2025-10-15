'use client';

import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'عن بذرة', href: '/about' },
      { label: 'كيف نعمل', href: '/how-it-works' },
      { label: 'الأسئلة الشائعة', href: '/faq' },
      { label: 'المدونة', href: '/blog' },
    ],
    services: [
      { label: 'تقييم AI', href: '/ai-evaluation' },
      { label: 'المشاريع', href: '/projects' },
      { label: 'المجتمعات', href: '/community' },
      { label: 'الاشتراكات', href: '/subscriptions' },
    ],
    legal: [
      { label: 'الشروط والأحكام', href: '/terms' },
      { label: 'سياسة الخصوصية', href: '/privacy' },
      { label: 'سياسة الاسترجاع', href: '/refund' },
      { label: 'حماية الملكية الفكرية', href: '/ip-protection' },
    ],
    support: [
      { label: 'مركز المساعدة', href: '/help' },
      { label: 'اتصل بنا', href: '/contact' },
      { label: 'الدعم الفني', href: '/support' },
      { label: 'تقديم شكوى', href: '/complaints' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-to-r from-primary to-secondary p-2.5 rounded-xl">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
              </div>
              <span className="text-2xl font-bold">بذرة</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              منصة الوساطة الذكية الأولى في المملكة لربط الأفكار المبدعة بالمستثمرين الأذكياء
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:info@bithrahapp.com" 
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                <span>info@bithrahapp.com</span>
              </a>
              <a 
                href="tel:+966500000000" 
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">+966 50 000 0000</span>
              </a>
              <div className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">المنصة</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">الخدمات</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">قانوني</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">الدعم</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm text-center md:text-right">
            © {currentYear} بذرة. جميع الحقوق محفوظة.
          </p>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>صُنع بـ</span>
            <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
            <span>في المملكة العربية السعودية</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>معاملات آمنة 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>حماية الملكية الفكرية</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>دعم فني 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


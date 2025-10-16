'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp, Wallet, Users, Sparkles, ArrowRight, 
  Briefcase, Shield, Zap, Award, BarChart3, 
  Star, CheckCircle, Gift, Target, Eye, Globe
} from 'lucide-react';

export default function LandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Redirect logged-in users to home
    if (status === 'authenticated') {
      router.push('/home');
    }

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-purple-600">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-purple-600 to-blue-600 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-white'}`} />
              </div>
              <span className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                مُثمّن
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/auth/signin"
                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                  isScrolled
                    ? 'text-gray-700 hover:text-teal-600'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                ابدأ الآن
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Gift className="w-5 h-5" />
              <span className="text-sm font-semibold">مكافآت حصرية للمستخدمين الأوائل 🎁</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              تقييم عقاري ذكي
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                بالذكاء الاصطناعي
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              اكتشف القيمة الحقيقية لعقارك في دقائق باستخدام تقنيات الذكاء الاصطناعي المتقدمة
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl flex items-center gap-2 group"
              >
                <span>ابدأ التقييم مجاناً</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30 flex items-center gap-2"
              >
                <Eye className="w-5 h-5" />
                <span>استكشف المشاريع</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="text-3xl font-bold mb-2">+100</div>
                <div className="text-sm text-white/80">متغير عقاري</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="text-3xl font-bold mb-2">&lt;1</div>
                <div className="text-sm text-white/80">دقيقة للتقييم</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="text-3xl font-bold mb-2">99%</div>
                <div className="text-sm text-white/80">دقة التقييم</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              لماذا مُثمّن؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نوفر لك أدوات متقدمة لتقييم عقارك بدقة وسرعة فائقة
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: 'سرعة فائقة',
                description: 'احصل على تقييم دقيق لعقارك في أقل من دقيقة واحدة',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: 'أمان وخصوصية',
                description: 'بياناتك محمية بأعلى معايير الأمان والتشفير',
                color: 'from-blue-500 to-cyan-500'
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: 'دقة عالية',
                description: 'تحليل أكثر من 100 متغير عقاري للحصول على أدق تقييم',
                color: 'from-purple-500 to-pink-500'
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: 'خريطة تفاعلية',
                description: 'استكشف المشاريع العقارية على خريطة تفاعلية متقدمة',
                color: 'from-green-500 to-teal-500'
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: 'مكافآت التسجيل المبكر',
                description: 'احصل على مكافآت حصرية عند التسجيل قبل الإطلاق الرسمي',
                color: 'from-red-500 to-pink-500'
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: 'نظام الإحالات',
                description: 'اربح مكافآت عند دعوة أصدقائك للانضمام إلى المنصة',
                color: 'from-indigo-500 to-purple-500'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-br from-teal-500 via-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              جاهز للبدء؟
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              انضم إلى آلاف المستخدمين الذين يثقون في مُثمّن لتقييم عقاراتهم
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl flex items-center gap-2"
              >
                <span>إنشاء حساب مجاني</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/projects"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-white/30"
              >
                تصفح بدون تسجيل
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-2xl font-bold">مُثمّن</span>
              </div>
              <p className="text-gray-400">
                منصة تقييم عقاري ذكية بالذكاء الاصطناعي
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/projects" className="hover:text-white transition-colors">المشاريع</Link></li>
                <li><Link href="/auth/register" className="hover:text-white transition-colors">التسجيل</Link></li>
                <li><Link href="/auth/signin" className="hover:text-white transition-colors">تسجيل الدخول</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">المنصة</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/map" className="hover:text-white transition-colors">الخريطة</Link></li>
                <li><Link href="/referrals" className="hover:text-white transition-colors">الإحالات</Link></li>
                <li><Link href="/subscriptions" className="hover:text-white transition-colors">الاشتراكات</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">الدعم</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2025 مُثمّن. جميع الحقوق محفوظة.</p>
            <p className="mt-2 text-sm">🇸🇦 النسخة التجريبية الوطنية للمشاركة في هاكاثون روشن 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


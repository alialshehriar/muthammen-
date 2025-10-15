'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Gift,
  Users,
  DollarSign,
  TrendingUp,
  Copy,
  Check,
  Share2,
  Award,
  Star,
  Crown,
  Sparkles,
  ArrowUpRight,
  Calendar,
  Target,
  Zap,
} from 'lucide-react';

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    thisMonthEarnings: 0,
  });

  const referralCode = 'BITHRAH-USER123';
  const referralLink = `https://bithrahapp.com/register?ref=${referralCode}`;

  useEffect(() => {
    fetchReferralStats();
  }, []);

  const fetchReferralStats = async () => {
    // Simulated data - replace with actual API call
    setStats({
      totalReferrals: 24,
      activeReferrals: 18,
      totalEarnings: 4850,
      pendingEarnings: 320,
      thisMonthEarnings: 890,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { name: 'واتساب', icon: '💬', color: 'from-green-500 to-green-600', url: `https://wa.me/?text=${encodeURIComponent(`انضم لمنصة بذرة واحصل على مزايا حصرية! ${referralLink}`)}` },
    { name: 'تويتر', icon: '🐦', color: 'from-blue-400 to-blue-500', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`انضم لمنصة بذرة واحصل على مزايا حصرية! ${referralLink}`)}` },
    { name: 'لينكدإن', icon: '💼', color: 'from-blue-600 to-blue-700', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}` },
    { name: 'فيسبوك', icon: '📘', color: 'from-blue-500 to-blue-600', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}` },
  ];

  const tiers = [
    {
      name: 'البرونزي',
      icon: Award,
      color: 'from-orange-400 to-orange-600',
      referrals: '1-10',
      commission: '5%',
      bonus: '50 ريال',
    },
    {
      name: 'الفضي',
      icon: Star,
      color: 'from-gray-400 to-gray-600',
      referrals: '11-25',
      commission: '7.5%',
      bonus: '150 ريال',
    },
    {
      name: 'الذهبي',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      referrals: '26-50',
      commission: '10%',
      bonus: '500 ريال',
    },
    {
      name: 'البلاتيني',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      referrals: '+50',
      commission: '15%',
      bonus: '1500 ريال',
    },
  ];

  const recentReferrals = [
    { id: 1, name: 'أحمد محمد', date: '2024-01-15', status: 'active', earnings: 125 },
    { id: 2, name: 'فاطمة علي', date: '2024-01-14', status: 'active', earnings: 200 },
    { id: 3, name: 'خالد سعيد', date: '2024-01-12', status: 'pending', earnings: 0 },
    { id: 4, name: 'نورة عبدالله', date: '2024-01-10', status: 'active', earnings: 175 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="card-hover bg-gradient-to-r from-primary to-secondary text-white p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Gift className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">برنامج الإحالة</h1>
                  <p className="text-white/90">اربح مع كل صديق تدعوه</p>
                </div>
              </div>
            </div>
            <div className="text-left">
              <p className="text-sm text-white/80 mb-1">مستواك الحالي</p>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                <span className="text-xl font-bold">ذهبي</span>
              </div>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm text-white/80 mb-2">رابط الإحالة الخاص بك</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 font-mono text-sm">
                {referralLink}
              </div>
              <button
                onClick={copyToClipboard}
                className="btn bg-white text-primary hover:bg-gray-100 flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    <span>نسخ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-hover p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +12%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.totalReferrals}</h3>
            <p className="text-gray-600">إجمالي الإحالات</p>
          </div>

          <div className="card-hover p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +8%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.activeReferrals}</h3>
            <p className="text-gray-600">إحالات نشطة</p>
          </div>

          <div className="card-hover p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +25%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.totalEarnings.toLocaleString()}</h3>
            <p className="text-gray-600">إجمالي الأرباح (ريال)</p>
          </div>

          <div className="card-hover p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +35%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.thisMonthEarnings.toLocaleString()}</h3>
            <p className="text-gray-600">أرباح هذا الشهر (ريال)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Share Options */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Share2 className="w-6 h-6 text-primary" />
                شارك مع أصدقائك
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {shareOptions.map((option, index) => (
                  <a
                    key={index}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`card-hover p-6 text-center bg-gradient-to-r ${option.color} text-white`}
                  >
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <p className="font-semibold">{option.name}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Recent Referrals */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">الإحالات الأخيرة</h2>
              <div className="space-y-4">
                {recentReferrals.map((referral) => (
                  <div
                    key={referral.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                        {referral.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{referral.name}</h3>
                        <p className="text-sm text-gray-600">{referral.date}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{referral.earnings} ريال</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          referral.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {referral.status === 'active' ? 'نشط' : 'قيد المراجعة'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tiers */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">مستويات الإحالة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tiers.map((tier, index) => {
                  const Icon = tier.icon;
                  return (
                    <div
                      key={index}
                      className={`card-hover p-6 bg-gradient-to-r ${tier.color} text-white`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-8 h-8" />
                        <h3 className="text-xl font-bold">{tier.name}</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center justify-between">
                          <span className="text-white/80">الإحالات:</span>
                          <span className="font-semibold">{tier.referrals}</span>
                        </p>
                        <p className="flex items-center justify-between">
                          <span className="text-white/80">العمولة:</span>
                          <span className="font-semibold">{tier.commission}</span>
                        </p>
                        <p className="flex items-center justify-between">
                          <span className="text-white/80">المكافأة:</span>
                          <span className="font-semibold">{tier.bonus}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How it Works */}
            <div className="card p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">كيف يعمل؟</h2>
              <div className="space-y-6">
                {[
                  {
                    step: 1,
                    icon: Share2,
                    title: 'شارك رابطك',
                    description: 'شارك رابط الإحالة مع أصدقائك',
                  },
                  {
                    step: 2,
                    icon: Users,
                    title: 'ينضمون للمنصة',
                    description: 'يسجل أصدقاؤك باستخدام رابطك',
                  },
                  {
                    step: 3,
                    icon: DollarSign,
                    title: 'تربح أنت',
                    description: 'احصل على عمولة من كل معاملة',
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold">
                          {item.step}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Earnings Summary */}
            <div className="card p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <h2 className="text-lg font-bold mb-4">ملخص الأرباح</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-white/80 mb-1">الأرباح المتاحة</p>
                  <p className="text-3xl font-bold">{stats.totalEarnings.toLocaleString()} ريال</p>
                </div>
                <div>
                  <p className="text-sm text-white/80 mb-1">قيد المراجعة</p>
                  <p className="text-xl font-semibold">{stats.pendingEarnings.toLocaleString()} ريال</p>
                </div>
                <Link href="/wallet" className="btn bg-white text-green-600 hover:bg-gray-100 w-full">
                  <DollarSign className="w-5 h-5" />
                  <span>سحب الأرباح</span>
                </Link>
              </div>
            </div>

            {/* Tips */}
            <div className="card p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-6 h-6" />
                <h2 className="text-lg font-bold">نصائح للنجاح</h2>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>شارك قصص نجاح حقيقية من المنصة</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>استخدم وسائل التواصل الاجتماعي</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>اشرح فوائد المنصة بوضوح</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>تابع مع المحالين الجدد</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Gift, Users, DollarSign, TrendingUp, Copy, Check, Share2,
  Award, Star, Crown, Sparkles, ArrowUpRight, Calendar,
  Target, Zap, ExternalLink, TrendingDown, Clock, CheckCircle,
  XCircle, AlertCircle, ChevronRight, BarChart3, Percent
} from 'lucide-react';

export default function ReferralsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeReferrals: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    thisMonthEarnings: 0,
    currentTier: 'BRONZE',
    nextTierProgress: 0,
  });
  const [referrals, setReferrals] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?redirect=/referrals');
    } else if (status === 'authenticated') {
      fetchReferralData();
    }
  }, [status]);

  const fetchReferralData = async () => {
    try {
      const response = await fetch('/api/referrals');
      const data = await response.json();
      
      if (data.success) {
        setStats(data.stats || stats);
        setReferrals(data.referrals || []);
      }
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const referralCode = session?.user?.referralCode || 'MUTHAMMEN-USER123';
  const referralLink = `https://www.muthammen.com/auth/register?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    { 
      name: 'واتساب', 
      icon: '💬', 
      color: 'from-green-500 to-green-600', 
      url: `https://wa.me/?text=${encodeURIComponent(`انضم لمنصة مُثمّن واحصل على مزايا حصرية! ${referralLink}`)}`
    },
    { 
      name: 'تويتر', 
      icon: '🐦', 
      color: 'from-blue-400 to-blue-500', 
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`انضم لمنصة مُثمّن واحصل على مزايا حصرية! ${referralLink}`)}`
    },
    { 
      name: 'لينكدإن', 
      icon: '💼', 
      color: 'from-blue-600 to-blue-700', 
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`
    },
    { 
      name: 'فيسبوك', 
      icon: '📘', 
      color: 'from-blue-500 to-blue-600', 
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
    },
  ];

  const tiers = [
    {
      name: 'البرونزي',
      key: 'BRONZE',
      icon: Award,
      color: 'from-orange-400 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      referrals: '1-10',
      commission: '5%',
      bonus: '50 ريال',
      perks: ['عمولة 5%', 'مكافأة 50 ريال', 'دعم قياسي']
    },
    {
      name: 'الفضي',
      key: 'SILVER',
      icon: Star,
      color: 'from-gray-400 to-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      referrals: '11-25',
      commission: '7.5%',
      bonus: '150 ريال',
      perks: ['عمولة 7.5%', 'مكافأة 150 ريال', 'دعم أولوية', 'تقارير شهرية']
    },
    {
      name: 'الذهبي',
      key: 'GOLD',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      referrals: '26-50',
      commission: '10%',
      bonus: '500 ريال',
      perks: ['عمولة 10%', 'مكافأة 500 ريال', 'دعم VIP', 'تقارير أسبوعية', 'استشارات مجانية']
    },
    {
      name: 'البلاتيني',
      key: 'PLATINUM',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      referrals: '+50',
      commission: '15%',
      bonus: '1500 ريال',
      perks: ['عمولة 15%', 'مكافأة 1500 ريال', 'مدير حساب خاص', 'تقارير يومية', 'استشارات غير محدودة', 'وصول مبكر للميزات']
    },
  ];

  const currentTierData = tiers.find(t => t.key === stats.currentTier) || tiers[0];
  const currentTierIndex = tiers.findIndex(t => t.key === stats.currentTier);
  const nextTier = tiers[currentTierIndex + 1];

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Gift className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold">برنامج الإحالة</h1>
                    <p className="text-white/90 text-lg">اربح مع كل صديق تدعوه</p>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm text-white/80 mb-2">مستواك الحالي</p>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <currentTierData.icon className="w-6 h-6" />
                  <span className="text-xl font-bold">{currentTierData.name}</span>
                </div>
              </div>
            </div>

            {/* Referral Link */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-sm text-white/80 mb-3">رابط الإحالة الخاص بك</p>
              <div className="flex flex-col md:flex-row items-stretch gap-3">
                <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 font-mono text-sm break-all">
                  {referralLink}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>نسخ الرابط</span>
                    </>
                  )}
                </button>
              </div>

              {/* Share Buttons */}
              <div className="mt-4 flex flex-wrap gap-3">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${option.color} text-white rounded-lg hover:shadow-lg transition-all`}
                  >
                    <span>{option.icon}</span>
                    <span className="text-sm font-semibold">{option.name}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalReferrals}</div>
                <div className="text-xs text-gray-600">إجمالي الإحالات</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.activeReferrals}</div>
                <div className="text-xs text-gray-600">إحالات نشطة</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalEarnings}</div>
                <div className="text-xs text-gray-600">إجمالي الأرباح</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.pendingEarnings}</div>
                <div className="text-xs text-gray-600">أرباح معلقة</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.thisMonthEarnings}</div>
                <div className="text-xs text-gray-600">أرباح هذا الشهر</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl p-6 shadow-lg mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">التقدم نحو المستوى التالي</h3>
                <p className="text-sm text-gray-600">
                  {stats.totalReferrals} من {nextTier.referrals.split('-')[0]} إحالة للوصول إلى {nextTier.name}
                </p>
              </div>
              <nextTier.icon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stats.nextTierProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full bg-gradient-to-r ${nextTier.color}`}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">{stats.nextTierProgress}% مكتمل</p>
          </motion.div>
        )}

        {/* Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Crown className="w-8 h-8 text-purple-600" />
            مستويات الإحالة
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => {
              const TierIcon = tier.icon;
              const isCurrentTier = tier.key === stats.currentTier;
              
              return (
                <div
                  key={tier.key}
                  className={`relative p-6 rounded-xl border-2 transition-all ${
                    isCurrentTier
                      ? `${tier.borderColor} ${tier.bgColor} shadow-lg`
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  {isCurrentTier && (
                    <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mb-4`}>
                    <TierIcon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{tier.referrals} إحالة</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Percent className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">عمولة {tier.commission}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Gift className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">مكافأة {tier.bonus}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    {tier.perks.map((perk, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            الإحالات الأخيرة
          </h2>
          
          {referrals.length > 0 ? (
            <div className="space-y-4">
              {referrals.map((referral: any) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {referral.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{referral.name || 'مستخدم'}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(referral.date).toLocaleDateString('ar-SA')}
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      referral.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : referral.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {referral.status === 'active' && <CheckCircle className="w-3 h-3" />}
                      {referral.status === 'pending' && <Clock className="w-3 h-3" />}
                      {referral.status === 'active' ? 'نشط' : referral.status === 'pending' ? 'معلق' : 'غير نشط'}
                    </div>
                    <div className="text-lg font-bold text-gray-900 mt-1">{referral.earnings} ريال</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">لا توجد إحالات بعد</p>
              <p className="text-sm text-gray-500">ابدأ بدعوة أصدقائك واربح مكافآت رائعة!</p>
            </div>
          )}
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            نصائح لزيادة أرباحك
          </h3>
          <ul className="space-y-3">
            {[
              'شارك رابط الإحالة على وسائل التواصل الاجتماعي',
              'اشرح فوائد المنصة لأصدقائك بشكل واضح',
              'استخدم قصص النجاح لتحفيز الآخرين',
              'كن نشطاً في المجتمعات ذات الصلة',
              'قدم الدعم لمن تدعوهم للانضمام'
            ].map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700">
                <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Gift, Users, DollarSign, TrendingUp, Copy, Check, Share2,
  Award, Star, Crown, Sparkles, ArrowUpRight, Calendar,
  Target, Zap, ExternalLink, Clock, CheckCircle,
  XCircle, AlertCircle, ChevronRight, BarChart3, Percent,
  Trophy, Rocket, MessageCircle, Mail, Send
} from 'lucide-react';

export default function ReferralsProPage() {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState('');
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      // جلب كود الإحالة
      const codeRes = await fetch('/api/referral-system/generate-code');
      const codeData = await codeRes.json();
      
      if (codeData.success) {
        setReferralCode(codeData.data.code);
      }
      
      // جلب إحصائيات الإحالات
      const statsRes = await fetch('/api/referral-system/track');
      const statsData = await statsRes.json();
      
      if (statsData.success) {
        setStats(statsData.data);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching referral data:', error);
      setLoading(false);
    }
  };

  const referralLink = `https://www.muthammen.com/register?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareViaWhatsApp = () => {
    const message = `🏡 اكتشف مُثمّن - منصة التقييم العقاري الذكي!\n\nاحصل على تقييم دقيق لعقارك في دقائق باستخدام الذكاء الاصطناعي 🤖\n\nسجل الآن واحصل على مكافآت حصرية 🎁\n\n${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaTwitter = () => {
    const message = `🏡 اكتشف مُثمّن - منصة التقييم العقاري الذكي! احصل على تقييم دقيق لعقارك في دقائق 🤖`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}`, '_blank');
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'PLATINUM': return 'from-purple-500 to-pink-500';
      case 'GOLD': return 'from-yellow-500 to-orange-500';
      case 'SILVER': return 'from-gray-400 to-gray-600';
      default: return 'from-orange-600 to-red-600';
    }
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case 'PLATINUM': return 'بلاتيني';
      case 'GOLD': return 'ذهبي';
      case 'SILVER': return 'فضي';
      default: return 'برونزي';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full mb-4">
            <Rocket className="w-5 h-5" />
            <span className="text-sm font-semibold">برنامج الإحالات المتقدم</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            اربح مع كل إحالة
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            شارك مُثمّن مع أصدقائك واحصل على عمولات ومكافآت حصرية
          </p>
        </motion.div>

        {/* Current Tier Card */}
        {stats?.tier && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <div className={`bg-gradient-to-r ${getTierColor(stats.tier.current)} rounded-2xl shadow-2xl p-8 text-white`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/80 mb-2">مستواك الحالي</p>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{stats.tier.badge}</span>
                    <div>
                      <h2 className="text-3xl font-bold">{getTierName(stats.tier.current)}</h2>
                      <p className="text-white/90">عمولة {stats.tier.commission}%</p>
                    </div>
                  </div>
                </div>
                <Trophy className="w-16 h-16 text-white/30" />
              </div>
              
              {stats.tier.nextTier && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/80">التقدم نحو {getTierName(stats.tier.nextTier)}</span>
                    <span className="text-sm font-semibold">{Math.round(stats.tier.progress)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.tier.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <p className="text-sm text-white/80 mt-2">
                    {stats.tier.nextTierTarget - stats.stats.successfulReferrals} إحالة متبقية للوصول إلى {getTierName(stats.tier.nextTier)}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">{stats?.stats.totalReferrals || 0}</span>
            </div>
            <p className="text-gray-600 font-semibold">إجمالي الإحالات</p>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              {stats?.stats.successfulReferrals || 0} نشطة
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-green-600" />
              <span className="text-3xl font-bold text-gray-900">{stats?.stats.totalEarnings.toLocaleString('ar-SA') || 0}</span>
            </div>
            <p className="text-gray-600 font-semibold">إجمالي الأرباح</p>
            <p className="text-sm text-gray-500 mt-1">ريال سعودي</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-10 h-10 text-yellow-600" />
              <span className="text-3xl font-bold text-gray-900">{stats?.stats.pendingEarnings.toLocaleString('ar-SA') || 0}</span>
            </div>
            <p className="text-gray-600 font-semibold">أرباح معلقة</p>
            <p className="text-sm text-gray-500 mt-1">قيد المراجعة</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-purple-600" />
              <span className="text-3xl font-bold text-gray-900">{stats?.stats.thisMonthEarnings.toLocaleString('ar-SA') || 0}</span>
            </div>
            <p className="text-gray-600 font-semibold">أرباح هذا الشهر</p>
            <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +{Math.round(((stats?.stats.thisMonthEarnings || 0) / (stats?.stats.lastMonthEarnings || 1)) * 100)}%
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Referral Link Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">رابط الإحالة الخاص بك</h3>
                  <p className="text-gray-600">شارك هذا الرابط مع أصدقائك</p>
                </div>
              </div>

              {/* Referral Code */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">كود الإحالة</p>
                <div className="flex items-center gap-3">
                  <code className="text-3xl font-bold text-purple-600 tracking-wider">{referralCode}</code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(referralCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="p-2 hover:bg-white rounded-lg transition-all"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-gray-600" />}
                  </button>
                </div>
              </div>

              {/* Referral Link */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 bg-transparent text-gray-700 outline-none"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'تم النسخ!' : 'نسخ'}
                  </button>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={shareViaWhatsApp}
                  className="py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  مشاركة عبر واتساب
                </button>
                <button
                  onClick={shareViaTwitter}
                  className="py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  مشاركة عبر تويتر
                </button>
              </div>
            </div>

            {/* Recent Referrals */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">الإحالات الأخيرة</h3>
              <div className="space-y-4">
                {stats?.recentReferrals?.map((referral: any, index: number) => (
                  <motion.div
                    key={referral.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {referral.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{referral.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(referral.joinedAt).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">{referral.earnings.toLocaleString('ar-SA')} ر.س</p>
                      <div className="flex items-center gap-1">
                        {referral.status === 'ACTIVE' ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-green-600">نشط</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 text-yellow-600" />
                            <span className="text-sm text-yellow-600">معلق</span>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Milestones & Tiers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Tier Benefits */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                المستويات والمزايا
              </h3>
              <div className="space-y-4">
                {stats?.milestones?.map((milestone: any, index: number) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 ${
                      milestone.achieved
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900">{getTierName(milestone.tier)}</span>
                      {milestone.achieved && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{milestone.target} إحالة ناجحة</p>
                    <p className="text-sm font-semibold text-purple-600">عمولة {milestone.commission}%</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How it Works */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">كيف يعمل البرنامج؟</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">شارك رابطك</p>
                    <p className="text-sm text-white/80">أرسل رابط الإحالة لأصدقائك</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">يسجلون ويشتركون</p>
                    <p className="text-sm text-white/80">عند اشتراكهم في أي باقة</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">احصل على العمولة</p>
                    <p className="text-sm text-white/80">تحصل على نسبة من قيمة الاشتراك</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


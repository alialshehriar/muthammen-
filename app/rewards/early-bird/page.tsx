'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Gift, Award, Star, TrendingUp, Users, Clock,
  CheckCircle, Sparkles, Crown, Zap, Target, Trophy,
  ArrowRight, Lock, Unlock, Calendar, DollarSign
} from 'lucide-react';

export default function EarlyBirdRewardsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [rewardData, setRewardData] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?redirect=/rewards/early-bird');
    } else if (status === 'authenticated') {
      fetchRewardData();
    }
  }, [status]);

  const fetchRewardData = async () => {
    try {
      const response = await fetch('/api/rewards/early-bird');
      const data = await response.json();
      
      if (data.success) {
        setRewardData(data);
      }
    } catch (error) {
      console.error('Error fetching reward data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimReward = async () => {
    try {
      const response = await fetch('/api/rewards/early-bird', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'claim' })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setRewardData({ ...rewardData, reward: data.reward });
        alert('تم استلام المكافأة بنجاح! 🎉');
      }
    } catch (error) {
      console.error('Error claiming reward:', error);
      alert('حدث خطأ أثناء استلام المكافأة');
    }
  };

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

  if (!rewardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">لا توجد بيانات مكافآت</p>
        </div>
      </div>
    );
  }

  const { reward, tiers, stats } = rewardData;
  const currentTier = tiers[reward.rewardTier];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">برنامج مكافآت التسجيل المبكر</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              مكافآتك الحصرية
            </h1>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              شكراً لانضمامك المبكر! أنت من المستخدمين الأوائل وتستحق مكافآت خاصة
            </p>

            {/* Reward Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-8 border-2 border-white/30"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className={`text-6xl`}>{currentTier.icon}</div>
                <div className="text-right">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${currentTier.color} bg-clip-text text-transparent`}>
                    {currentTier.name}
                  </div>
                  <div className="text-white/80">المستوى {reward.rewardTier}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">{reward.rewardPoints}</div>
                  <div className="text-sm text-white/80">نقطة</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">{reward.rewardValue}</div>
                  <div className="text-sm text-white/80">ريال</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-3xl font-bold mb-1">#{reward.registrationNumber}</div>
                  <div className="text-sm text-white/80">ترتيبك</div>
                </div>
              </div>

              {!reward.claimed ? (
                <button
                  onClick={handleClaimReward}
                  className="w-full px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl flex items-center justify-center gap-2"
                >
                  <Gift className="w-6 h-6" />
                  <span>استلم مكافأتك الآن</span>
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 text-green-300">
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-semibold">تم استلام المكافأة</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">إجمالي المستخدمين</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">#{stats.yourRank}</div>
                <div className="text-sm text-gray-600">ترتيبك</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">Top {stats.percentile}%</div>
                <div className="text-sm text-gray-600">النسبة المئوية</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Award className="w-8 h-8 text-purple-600" />
            شاراتك المكتسبة
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {reward.badges.map((badge: any) => (
              <div
                key={badge.id}
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all"
              >
                <div className="text-4xl">{badge.icon}</div>
                <div>
                  <div className="font-bold text-gray-900">{badge.name}</div>
                  <div className="text-sm text-gray-600">{badge.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            المزايا الحصرية
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {reward.perks.map((perk: any) => (
              <div
                key={perk.id}
                className="flex items-start gap-4 p-4 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  {perk.active ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : (
                    <Lock className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-gray-900 mb-1">{perk.name}</div>
                  <div className="text-sm text-gray-600">{perk.description}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* All Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Crown className="w-8 h-8 text-purple-600" />
            جميع المستويات
          </h2>
          <div className="space-y-6">
            {Object.entries(tiers).map(([key, tier]: [string, any], index) => (
              <div
                key={key}
                className={`p-6 rounded-xl border-2 transition-all ${
                  key === reward.rewardTier
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{tier.icon}</div>
                    <div>
                      <div className={`text-2xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent`}>
                        {tier.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        المستخدمين {tier.range[0].toLocaleString()} - {tier.range[1] === Infinity ? '∞' : tier.range[1].toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{tier.points} نقطة</div>
                    <div className="text-sm text-gray-600">{tier.value} ريال</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {tier.perks.map((perk: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link
            href="/referrals"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
          >
            <span>ادعُ أصدقاءك واربح المزيد</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}


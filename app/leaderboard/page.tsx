'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, TrendingUp, Users, Zap, Crown, Medal, Award, Star,
  Flame, Target, Gift, ChevronRight, ArrowUp, ArrowDown,
  Sparkles, BarChart3, Activity, TrendingDown
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<'all-time' | 'monthly' | 'weekly'>('all-time');
  const [activeTab, setActiveTab] = useState<'creators' | 'investors' | 'points' | 'communities'>('creators');
  const [loading, setLoading] = useState(false);

  // Mock data - في الإنتاج سيتم جلبها من API
  const mockLeaderboard = {
    creators: [
      { id: 1, name: 'أحمد المحمد', avatar: null, projects: 12, funded: 850000, successRate: 92, trend: 'up', change: 15 },
      { id: 2, name: 'فاطمة العلي', avatar: null, projects: 10, funded: 720000, successRate: 88, trend: 'up', change: 12 },
      { id: 3, name: 'محمد السعيد', avatar: null, projects: 9, funded: 650000, successRate: 85, trend: 'up', change: 8 },
      { id: 4, name: 'نورة الخالد', avatar: null, projects: 8, funded: 580000, successRate: 82, trend: 'down', change: -3 },
      { id: 5, name: 'خالد الأحمد', avatar: null, projects: 7, funded: 520000, successRate: 80, trend: 'up', change: 5 },
      { id: 6, name: 'سارة المطيري', avatar: null, projects: 6, funded: 480000, successRate: 78, trend: 'up', change: 7 },
      { id: 7, name: 'عبدالله الشهري', avatar: null, projects: 6, funded: 450000, successRate: 75, trend: 'same', change: 0 },
      { id: 8, name: 'ريم القحطاني', avatar: null, projects: 5, funded: 420000, successRate: 73, trend: 'up', change: 4 },
    ],
    investors: [
      { id: 1, name: 'عبدالرحمن الدوسري', avatar: null, investments: 25, totalInvested: 2500000, returns: 35, trend: 'up', change: 20 },
      { id: 2, name: 'لطيفة الغامدي', avatar: null, investments: 22, totalInvested: 2200000, returns: 32, trend: 'up', change: 18 },
      { id: 3, name: 'فهد العتيبي', avatar: null, investments: 20, totalInvested: 1800000, returns: 28, trend: 'up', change: 15 },
      { id: 4, name: 'منى الحربي', avatar: null, investments: 18, totalInvested: 1600000, returns: 25, trend: 'up', change: 10 },
      { id: 5, name: 'سلطان القحطاني', avatar: null, investments: 16, totalInvested: 1400000, returns: 22, trend: 'down', change: -5 },
      { id: 6, name: 'هند المالكي', avatar: null, investments: 15, totalInvested: 1300000, returns: 20, trend: 'up', change: 8 },
      { id: 7, name: 'ماجد الزهراني', avatar: null, investments: 14, totalInvested: 1200000, returns: 18, trend: 'same', change: 0 },
      { id: 8, name: 'أمل السبيعي', avatar: null, investments: 12, totalInvested: 1100000, returns: 16, trend: 'up', change: 6 },
    ],
    points: [
      { id: 1, name: 'أحمد المحمد', avatar: null, points: 12500, level: 25, activities: 450, trend: 'up', change: 25 },
      { id: 2, name: 'فاطمة العلي', avatar: null, points: 11200, level: 23, activities: 420, trend: 'up', change: 22 },
      { id: 3, name: 'محمد السعيد', avatar: null, points: 10800, level: 22, activities: 390, trend: 'up', change: 18 },
      { id: 4, name: 'نورة الخالد', avatar: null, points: 9500, level: 20, activities: 360, trend: 'up', change: 15 },
      { id: 5, name: 'خالد الأحمد', avatar: null, points: 8900, level: 19, activities: 340, trend: 'down', change: -8 },
      { id: 6, name: 'سارة المطيري', avatar: null, points: 8200, level: 18, activities: 320, trend: 'up', change: 12 },
      { id: 7, name: 'عبدالله الشهري', avatar: null, points: 7800, level: 17, activities: 300, trend: 'same', change: 0 },
      { id: 8, name: 'ريم القحطاني', avatar: null, points: 7200, level: 16, activities: 280, trend: 'up', change: 10 },
    ],
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-8 h-8 text-yellow-500 drop-shadow-lg" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400 drop-shadow-lg" />;
    if (rank === 3) return <Award className="w-8 h-8 text-amber-600 drop-shadow-lg" />;
    return <span className="text-2xl font-black text-gray-600">#{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-2 border-yellow-400 shadow-2xl scale-105';
    if (rank === 2) return 'bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 border-2 border-gray-400 shadow-xl scale-102';
    if (rank === 3) return 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-400 shadow-xl scale-102';
    return 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-[#14B8A6] hover:shadow-lg';
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <TrendingDown className="w-4 h-4 text-gray-400 rotate-90" />;
  };

  const tabs = [
    { id: 'creators', label: 'المبدعون', icon: Sparkles, color: 'from-[#14B8A6] to-[#0D9488]' },
    { id: 'investors', label: 'المستثمرون', icon: TrendingUp, color: 'from-[#8B5CF6] to-[#7C3AED]' },
    { id: 'points', label: 'النقاط', icon: Zap, color: 'from-[#F59E0B] to-[#D97706]' },
    { id: 'communities', label: 'المجتمعات', icon: Users, color: 'from-[#EC4899] to-[#DB2777]' },
  ];

  const periods = [
    { id: 'all-time', label: 'كل الأوقات' },
    { id: 'monthly', label: 'هذا الشهر' },
    { id: 'weekly', label: 'هذا الأسبوع' },
  ];

  const currentData = mockLeaderboard[activeTab as keyof typeof mockLeaderboard] || mockLeaderboard.creators;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <Navigation />
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#14B8A6]/20 to-[#8B5CF6]/20 rounded-full mb-6">
            <Trophy className="w-6 h-6 text-[#14B8A6]" />
            <span className="text-lg font-bold bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] bg-clip-text text-transparent">
              لوحة الصدارة
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
            الأبطال والمتميزون
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            تعرف على أبرز المبدعين والمستثمرين في منصة بذرة
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-8 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl scale-105`
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl"
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Period Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-3 mb-12"
        >
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id as any)}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                period === p.id
                  ? 'bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <AnimatePresence mode="wait">
            {currentData.map((user: any, index: number) => (
              <motion.div
                key={`${activeTab}-${user.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`relative rounded-3xl p-6 transition-all duration-300 ${getRankBg(index + 1)}`}
              >
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                    {getRankIcon(index + 1)}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-black shadow-lg">
                      {user.name.charAt(0)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-black text-gray-900">{user.name}</h3>
                      {index < 3 && (
                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold">
                          متميز
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      {activeTab === 'creators' && (
                        <>
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#14B8A6]" />
                            <span>{user.projects} مشروع</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-[#8B5CF6]" />
                            <span>{user.funded.toLocaleString()} ر.س</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-green-500" />
                            <span>{user.successRate}% نجاح</span>
                          </div>
                        </>
                      )}
                      
                      {activeTab === 'investors' && (
                        <>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#14B8A6]" />
                            <span>{user.investments} استثمار</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-[#8B5CF6]" />
                            <span>{user.totalInvested.toLocaleString()} ر.س</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{user.returns}% عائد</span>
                          </div>
                        </>
                      )}
                      
                      {activeTab === 'points' && (
                        <>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" />
                            <span>{user.points.toLocaleString()} نقطة</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-[#14B8A6]" />
                            <span>المستوى {user.level}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-[#8B5CF6]" />
                            <span>{user.activities} نشاط</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Trend */}
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {getTrendIcon(user.trend, user.change)}
                    <span className={`text-sm font-bold ${
                      user.trend === 'up' ? 'text-green-500' : 
                      user.trend === 'down' ? 'text-red-500' : 
                      'text-gray-400'
                    }`}>
                      {user.change > 0 ? '+' : ''}{user.change}%
                    </span>
                  </div>

                  {/* View Profile */}
                  <Link
                    href={`/profile/${user.id}`}
                    className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white hover:shadow-lg transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}


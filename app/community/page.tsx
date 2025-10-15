'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, TrendingUp, Award, Star, Crown, Shield, Zap,
  MessageSquare, Heart, Eye, ArrowRight, Plus, Search,
  Filter, Sparkles, Trophy, Target, Rocket, Gift,
  BarChart3, Activity, Clock, CheckCircle, Flame
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function CommunityPage() {
  const [communities, setCommunities] = useState<any[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'joined' | 'recommended'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCommunityData();
  }, []);

  const fetchCommunityData = async () => {
    try {
      const [communitiesRes, postsRes, leaderboardRes] = await Promise.all([
        fetch('/api/communities'),
        fetch('/api/communities/posts/trending'),
        fetch('/api/communities/leaderboard'),
      ]);

      const communitiesData = await communitiesRes.json();
      const postsData = await postsRes.json();
      const leaderboardData = await leaderboardRes.json();

      if (communitiesData.success) {
        setCommunities(communitiesData.communities || []);
      }
      if (postsData.success) {
        setTrendingPosts(postsData.posts || []);
      }
      if (leaderboardData.success) {
        setLeaderboard(leaderboardData.users || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const communityCategories = [
    { id: 'all', label: 'الكل', icon: Users, color: 'from-gray-500 to-gray-600' },
    { id: 'creators', label: 'المبدعون', icon: Sparkles, color: 'from-[#14B8A6] to-[#0F9D8F]' },
    { id: 'investors', label: 'المستثمرون', icon: TrendingUp, color: 'from-[#8B5CF6] to-[#7C3AED]' },
    { id: 'marketers', label: 'المسوقون', icon: Target, color: 'from-blue-500 to-blue-600' },
    { id: 'tech', label: 'التقنية', icon: Rocket, color: 'from-purple-500 to-purple-600' },
    { id: 'business', label: 'الأعمال', icon: BarChart3, color: 'from-green-500 to-green-600' },
  ];

  const stats = [
    { label: 'المجتمعات', value: '24', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'الأعضاء', value: '15.2K', icon: Users, color: 'from-green-500 to-green-600' },
    { label: 'المنشورات', value: '8.5K', icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
    { label: 'التفاعلات', value: '125K', icon: Heart, color: 'from-red-500 to-red-600' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#14B8A6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-bold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
      <Navigation />

      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-12"
        >
          <div className="relative h-64 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6] via-[#8B5CF6] to-[#14B8A6] animate-gradient-x" />
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
            
            {/* Animated Particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: Math.random() * 100 + '%',
                    opacity: 0 
                  }}
                  animate={{ 
                    y: [null, '-100%'],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>

            <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6"
              >
                <Users className="w-10 h-10" />
              </motion.div>
              
              <h1 className="text-5xl font-black mb-4">مجتمعات بذرة</h1>
              <p className="text-xl max-w-2xl">
                انضم إلى مجتمع من المبدعين والمستثمرين والمسوقين. ناقش، تعلم، وابنِ علاقات قيّمة
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`} />
              
              <div className="relative bg-white rounded-2xl p-6 border border-gray-200 text-center">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-gray-600">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن مجتمع..."
                className="w-full pr-12 pl-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#14B8A6] focus:outline-none font-bold"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white rounded-xl font-bold hover:shadow-2xl transition-all flex items-center gap-2 justify-center">
              <Plus className="w-5 h-5" />
              إنشاء مجتمع
            </button>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 overflow-x-auto"
        >
          <div className="flex gap-3 pb-2">
            {communityCategories.map((category) => (
              <button
                key={category.id}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all bg-white border-2 border-gray-200 hover:border-[#14B8A6] text-gray-700 hover:text-[#14B8A6]"
              >
                <category.icon className="w-5 h-5" />
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Communities List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 mb-6">المجتمعات النشطة</h2>
            
            {communities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communities.map((community) => (
                  <Link
                    key={community.id}
                    href={`/community/${community.id}`}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                    
                    <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#14B8A6] transition-all shadow-lg hover:shadow-2xl">
                      <div className="relative h-32 bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6]">
                        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
                      </div>
                      
                      <div className="p-6 -mt-12">
                        <div className="w-20 h-20 rounded-xl bg-white border-4 border-white shadow-lg flex items-center justify-center mb-4">
                          <Users className="w-10 h-10 text-[#14B8A6]" />
                        </div>
                        
                        <h3 className="text-xl font-black text-gray-900 mb-2">{community.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{community.description}</p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Users className="w-4 h-4" />
                              <span className="font-bold">{community.members}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <MessageSquare className="w-4 h-4" />
                              <span className="font-bold">{community.posts}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-[#14B8A6] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 font-bold">لا توجد مجتمعات حتى الآن</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-3xl blur-2xl opacity-20" />
              
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-white/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">لوحة الصدارة</h3>
                    <p className="text-sm text-gray-600">الأعضاء الأكثر نشاطاً</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {leaderboard.slice(0, 5).map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-white ${
                        index === 0 ? 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]' :
                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                        index === 2 ? 'bg-gradient-to-br from-[#CD7F32] to-[#B8732D]' :
                        'bg-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#14B8A6] to-[#8B5CF6] flex items-center justify-center text-white font-black flex-shrink-0">
                        {user.name?.[0] || 'A'}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 truncate">{user.name}</div>
                        <div className="text-xs text-gray-600">{user.points} نقطة</div>
                      </div>

                      {index < 3 && (
                        <Crown className={`w-5 h-5 ${
                          index === 0 ? 'text-[#F59E0B]' :
                          index === 1 ? 'text-gray-400' :
                          'text-[#CD7F32]'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Trending Posts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] rounded-3xl blur-2xl opacity-20" />
              
              <div className="relative bg-white rounded-3xl p-6 shadow-2xl border border-white/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#8B5CF6] flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900">المنشورات الرائجة</h3>
                    <p className="text-sm text-gray-600">الأكثر تفاعلاً اليوم</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {trendingPosts.slice(0, 5).map((post) => (
                    <div
                      key={post.id}
                      className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#14B8A6] transition-all cursor-pointer"
                    >
                      <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h4>
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{post.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{post.views}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </div>
  );
}


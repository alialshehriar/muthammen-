'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, Home, DollarSign, TrendingUp,
  Activity, FileText, Settings, Bell, Search, Filter,
  Download, Calendar, MapPin, Building, Award, Star,
  ArrowUpRight, ArrowDownRight, Clock, CheckCircle,
  XCircle, AlertCircle, BarChart3, PieChart, LineChart,
  User, Mail, Phone, CreditCard, Package, Gift, Share2,
  Eye, Edit, Trash2, MoreVertical, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30days');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const data = await response.json();
      
      if (data.success) {
        setDashboardData(data.data);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">جاري تحميل لوحة الإدارة...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: LayoutDashboard },
    { id: 'evaluations', label: 'التقييمات', icon: FileText },
    { id: 'users', label: 'المستخدمين', icon: Users },
    { id: 'referrals', label: 'الإحالات', icon: Share2 },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <LayoutDashboard className="w-7 h-7 text-purple-600" />
                لوحة الإدارة
              </h1>
              <p className="text-sm text-gray-600 mt-1">مرحباً بك في لوحة التحكم الرئيسية</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all relative">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
              >
                <option value="7days">آخر 7 أيام</option>
                <option value="30days">آخر 30 يوم</option>
                <option value="90days">آخر 90 يوم</option>
                <option value="year">السنة الحالية</option>
              </select>
              
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all flex items-center gap-2">
                <Download className="w-5 h-5" />
                تصدير التقرير
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <ArrowUpRight className="w-4 h-4" />
                    +{dashboardData?.overview.growthRate}%
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">إجمالي التقييمات</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData?.overview.totalEvaluations.toLocaleString('ar-SA')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <ArrowUpRight className="w-4 h-4" />
                    +8.2%
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">إجمالي المستخدمين</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData?.overview.totalUsers.toLocaleString('ar-SA')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <ArrowUpRight className="w-4 h-4" />
                    +15.3%
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData?.overview.totalRevenue.toLocaleString('ar-SA')} ر.س
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <ArrowUpRight className="w-4 h-4" />
                    +6.7%
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">الاشتراكات النشطة</p>
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData?.overview.activeSubscriptions.toLocaleString('ar-SA')}
                </p>
              </motion.div>
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <LineChart className="w-6 h-6 text-green-600" />
                    الإيرادات الشهرية
                  </h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="space-y-3">
                  {dashboardData?.revenueChart.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-16">{item.month}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.revenue / 30000) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end px-3"
                        >
                          <span className="text-xs font-semibold text-white">
                            {item.revenue.toLocaleString('ar-SA')}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evaluations Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                    التقييمات الشهرية
                  </h3>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <div className="space-y-3">
                  {dashboardData?.evaluationsChart.map((item: any, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm text-gray-600 w-16">{item.month}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.count / 400) * 100}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-end px-3"
                        >
                          <span className="text-xs font-semibold text-white">
                            {item.count.toLocaleString('ar-SA')}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* City Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-purple-600" />
                  التقييمات حسب المدينة
                </h3>
                <div className="space-y-4">
                  {dashboardData?.cityStats.map((item: any, index: number) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">{item.city}</span>
                        <span className="text-sm text-gray-600">
                          {item.evaluations} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Property Type Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Building className="w-6 h-6 text-orange-600" />
                  التقييمات حسب نوع العقار
                </h3>
                <div className="space-y-4">
                  {dashboardData?.propertyTypeStats.map((item: any, index: number) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">{item.type}</span>
                        <span className="text-sm text-gray-600">
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Evaluations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  أحدث التقييمات
                </h3>
                <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
                  عرض الكل
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">المستخدم</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">المدينة</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">الحي</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">النوع</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">المساحة</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">القيمة المقدرة</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">الوقت</th>
                      <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData?.recentEvaluations.map((evaluation: any) => (
                      <tr key={evaluation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                              {evaluation.userName.charAt(0)}
                            </div>
                            <span className="font-semibold text-gray-900">{evaluation.userName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{evaluation.city}</td>
                        <td className="py-4 px-4 text-gray-700">{evaluation.district}</td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                            {evaluation.propertyType}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700">{evaluation.area} م²</td>
                        <td className="py-4 px-4">
                          <span className="font-bold text-green-600">
                            {evaluation.estimatedValue.toLocaleString('ar-SA')} ر.س
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-500">
                          {new Date(evaluation.createdAt).toLocaleString('ar-SA')}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                              <Eye className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                              <Download className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Users */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-600" />
                  أفضل المستخدمين
                </h3>
                <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1">
                  عرض الكل
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid md:grid-cols-5 gap-4">
                {dashboardData?.topUsers.map((user: any, index: number) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition-all"
                  >
                    <div className="text-center mb-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-2">
                        {user.name.charAt(0)}
                      </div>
                      <h4 className="font-bold text-gray-900">{user.name}</h4>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">التقييمات</span>
                        <span className="font-semibold text-gray-900">{user.evaluations}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">الإنفاق</span>
                        <span className="font-semibold text-green-600">{user.totalSpent} ر.س</span>
                      </div>
                      <div className="pt-2">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          user.subscriptionTier === 'ENTERPRISE' ? 'bg-purple-100 text-purple-700' :
                          user.subscriptionTier === 'PRO' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {user.subscriptionTier}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content would go here */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-xl text-gray-600">محتوى {tabs.find(t => t.id === activeTab)?.label} قيد التطوير...</p>
          </div>
        )}
      </div>
    </div>
  );
}


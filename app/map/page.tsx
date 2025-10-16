'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Map, MapPin, Search, Filter, Layers, Navigation,
  Compass, ZoomIn, ZoomOut, Maximize, Info, Star,
  TrendingUp, Eye, Target, Sparkles, Bell, Lock,
  Calendar, ArrowRight, CheckCircle, Globe, Route, Gift
} from 'lucide-react';

export default function MapPage() {
  const features = [
    {
      icon: MapPin,
      title: 'تحديد المواقع الدقيق',
      description: 'عرض جميع المشاريع العقارية على الخريطة مع تحديد دقيق للموقع',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Search,
      title: 'البحث المتقدم',
      description: 'ابحث عن المشاريع حسب الموقع، السعر، النوع، والمزيد من المعايير',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Filter,
      title: 'فلترة ذكية',
      description: 'فلتر المشاريع حسب الفئة، الحالة، التمويل، والتقييمات',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Layers,
      title: 'طبقات متعددة',
      description: 'عرض طبقات مختلفة: الشوارع، الأقمار الصناعية، التضاريس',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: Navigation,
      title: 'التنقل السهل',
      description: 'احصل على اتجاهات القيادة إلى أي مشروع مباشرة',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Compass,
      title: 'استكشاف المناطق',
      description: 'اكتشف المشاريع في المناطق المحيطة بك أو في أي منطقة تهمك',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: ZoomIn,
      title: 'تكبير وتصغير متقدم',
      description: 'تحكم كامل في مستوى التكبير لرؤية التفاصيل الدقيقة',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Eye,
      title: 'معاينة سريعة',
      description: 'اضغط على أي مشروع لمعاينة سريعة دون مغادرة الخريطة',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Star,
      title: 'المشاريع المميزة',
      description: 'تمييز المشاريع الأكثر شعبية والأعلى تقييماً على الخريطة',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      icon: Target,
      title: 'الموقع الحالي',
      description: 'اعثر على المشاريع القريبة منك باستخدام موقعك الحالي',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Bell,
      title: 'تنبيهات الموقع',
      description: 'احصل على إشعارات عند إضافة مشاريع جديدة في المناطق المفضلة لديك',
      color: 'from-violet-500 to-purple-500'
    },
    {
      icon: Route,
      title: 'المسارات المقترحة',
      description: 'خطط لزيارة عدة مشاريع في نفس اليوم مع أفضل مسار',
      color: 'from-emerald-500 to-green-500'
    }
  ];

  const upcomingFeatures = [
    'عرض ثلاثي الأبعاد للمشاريع',
    'جولات افتراضية للعقارات',
    'مقارنة المشاريع على الخريطة',
    'حفظ المواقع المفضلة',
    'مشاركة المواقع مع الأصدقاء',
    'تحليلات المنطقة والأسعار'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-blue-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Animated Map Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
          >
            <Map className="w-96 h-96 text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Lock Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <Lock className="w-12 h-12" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              الخريطة التفاعلية
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                قريباً
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              نعمل على تطوير خريطة تفاعلية متقدمة لعرض جميع المشاريع العقارية بطريقة مبتكرة وسهلة
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">الإطلاق المتوقع: قريباً</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">12+ ميزة متقدمة</span>
              </div>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-2xl"
            >
              <span>تصفح المشاريع الآن</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ميزات الخريطة القادمة
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تجربة فريدة لاستكشاف المشاريع العقارية بطريقة تفاعلية ومبتكرة
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Upcoming Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 border border-purple-200"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              ميزات إضافية قيد التطوير
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-white rounded-xl"
              >
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
            <Globe className="w-16 h-16 text-teal-600 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              كن أول من يجرب الخريطة
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              سجل الآن واحصل على إشعار فوري عند إطلاق الخريطة التفاعلية مع مزايا حصرية للمستخدمين الأوائل
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/register"
                className="px-8 py-4 bg-gradient-to-r from-teal-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <span>سجل الآن مجاناً</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/rewards/early-bird"
                className="px-8 py-4 bg-gray-100 text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <Gift className="w-5 h-5" />
                <span>اعرف مكافآتك</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-blue-50 rounded-2xl p-6 border border-blue-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                لماذا الخريطة التفاعلية؟
              </h4>
              <p className="text-gray-700 leading-relaxed">
                نؤمن بأن البحث عن العقار المثالي يجب أن يكون تجربة ممتعة وسهلة. الخريطة التفاعلية ستمكنك من استكشاف جميع المشاريع العقارية في منطقتك أو في أي مكان تهتم به، مع إمكانية الفلترة والبحث المتقدم، والحصول على معلومات تفصيلية عن كل مشروع بنقرة واحدة. نعمل بجد لتقديم أفضل تجربة ممكنة لك.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


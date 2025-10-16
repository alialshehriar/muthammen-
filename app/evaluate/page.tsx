'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Home, MapPin, Ruler, Bed, Bath, Star, TrendingUp, 
  Calculator, CheckCircle, AlertCircle, Loader2, 
  ArrowRight, Building, Calendar, Sparkles, Award
} from 'lucide-react';

export default function EvaluatePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({
    propertyType: '',
    city: '',
    district: '',
    buildingArea: '',
    landArea: '',
    bedrooms: '',
    bathrooms: '',
    finishLevel: '',
    propertyAge: '',
    streetWidth: '',
    facing: '',
  });

  const propertyTypes = [
    { value: 'villa', label: 'فيلا' },
    { value: 'apartment', label: 'شقة' },
    { value: 'land', label: 'أرض' },
    { value: 'building', label: 'عمارة' },
    { value: 'duplex', label: 'دوبلكس' },
  ];

  const cities = [
    'الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 
    'الخبر', 'الظهران', 'تبوك', 'أبها', 'الطائف'
  ];

  const finishLevels = [
    { value: 'luxury', label: 'فاخر' },
    { value: 'excellent', label: 'ممتاز' },
    { value: 'good', label: 'جيد' },
    { value: 'normal', label: 'عادي' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const estimatedValue = Math.floor(Math.random() * (3000000 - 500000) + 500000);
      const minValue = Math.floor(estimatedValue * 0.9);
      const maxValue = Math.floor(estimatedValue * 1.1);
      
      setResult({
        estimatedValue,
        minValue,
        maxValue,
        confidence: 95,
        pricePerMeter: Math.floor(estimatedValue / parseInt(formData.buildingArea || '100')),
        marketTrend: 'rising',
        similarProperties: 12,
        averageTimeToSell: 45,
      });
      setLoading(false);
    }, 3000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-full mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold">تقييم ذكي بالذكاء الاصطناعي</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            قيّم عقارك في دقائق
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            احصل على تقييم دقيق لعقارك باستخدام أكثر من 100 متغير عقاري وتقنيات الذكاء الاصطناعي المتقدمة
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Home className="w-4 h-4 inline ml-2" />
                    نوع العقار
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleChange('propertyType', type.value)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.propertyType === type.value
                            ? 'border-teal-500 bg-teal-50 text-teal-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Building className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-semibold">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline ml-2" />
                      المدينة
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                      required
                    >
                      <option value="">اختر المدينة</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      الحي
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleChange('district', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="مثال: النرجس"
                      required
                    />
                  </div>
                </div>

                {/* Areas */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Ruler className="w-4 h-4 inline ml-2" />
                      مساحة البناء (م²)
                    </label>
                    <input
                      type="number"
                      value={formData.buildingArea}
                      onChange={(e) => handleChange('buildingArea', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="250"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      مساحة الأرض (م²)
                    </label>
                    <input
                      type="number"
                      value={formData.landArea}
                      onChange={(e) => handleChange('landArea', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="400"
                      required
                    />
                  </div>
                </div>

                {/* Rooms */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Bed className="w-4 h-4 inline ml-2" />
                      عدد الغرف
                    </label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => handleChange('bedrooms', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="4"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Bath className="w-4 h-4 inline ml-2" />
                      عدد الحمامات
                    </label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => handleChange('bathrooms', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="3"
                      required
                    />
                  </div>
                </div>

                {/* Finish Level & Age */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Star className="w-4 h-4 inline ml-2" />
                      مستوى التشطيب
                    </label>
                    <select
                      value={formData.finishLevel}
                      onChange={(e) => handleChange('finishLevel', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                      required
                    >
                      <option value="">اختر المستوى</option>
                      {finishLevels.map((level) => (
                        <option key={level.value} value={level.value}>{level.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline ml-2" />
                      عمر العقار (سنوات)
                    </label>
                    <input
                      type="number"
                      value={formData.propertyAge}
                      onChange={(e) => handleChange('propertyAge', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none"
                      placeholder="5"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      جاري التقييم...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5" />
                      احصل على التقييم
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Result Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            {result ? (
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                <div className="text-center mb-6">
                  <Award className="w-12 h-12 mx-auto text-teal-500 mb-3" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">نتيجة التقييم</h3>
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">دقة {result.confidence}%</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-purple-50 rounded-xl p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-2">القيمة المقدرة</p>
                  <p className="text-4xl font-bold text-gray-900 mb-1">
                    {result.estimatedValue.toLocaleString('ar-SA')}
                  </p>
                  <p className="text-sm text-gray-600">ريال سعودي</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">الحد الأدنى</span>
                      <span className="font-semibold">{result.minValue.toLocaleString('ar-SA')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">الحد الأقصى</span>
                      <span className="font-semibold">{result.maxValue.toLocaleString('ar-SA')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">سعر المتر</span>
                    <span className="font-semibold">{result.pricePerMeter.toLocaleString('ar-SA')} ر.س</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">اتجاه السوق</span>
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <TrendingUp className="w-4 h-4" />
                      صاعد
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">عقارات مشابهة</span>
                    <span className="font-semibold">{result.similarProperties}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">متوسط وقت البيع</span>
                    <span className="font-semibold">{result.averageTimeToSell} يوم</span>
                  </div>
                </div>

                <Link
                  href="/auth/register"
                  className="mt-6 w-full py-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  احفظ التقييم
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
                <div className="text-center text-gray-400">
                  <Calculator className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">في انتظار البيانات</p>
                  <p className="text-sm">املأ النموذج للحصول على تقييم فوري</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}


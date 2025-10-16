'use client';

import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Search, Filter, TrendingUp, TrendingDown, Minus,
  Star, DollarSign, Home, Layers, X, ChevronDown, Grid3x3,
  List, BarChart3, Info, Sparkles, Target, Award
} from 'lucide-react';
import { riyadhDistricts, getDistrictColor, getPriceLabel, District } from '@/lib/data/riyadh-districts';

// تحميل الخريطة ديناميكياً لتجنب مشاكل SSR
const RiyadhMap = dynamic(() => import('@/components/RiyadhMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-600">جاري تحميل الخريطة...</p>
      </div>
    </div>
  ),
});

export default function MapProPage() {
  const [hoveredDistrict, setHoveredDistrict] = useState<District | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [zoneFilter, setZoneFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  // فلترة الأحياء
  const filteredDistricts = useMemo(() => {
    return riyadhDistricts.filter((district) => {
      const matchesSearch = district.name.includes(searchQuery) || 
                           district.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPrice = priceFilter === 'all' || 
        (priceFilter === 'luxury' && district.avgPrice >= 3500) ||
        (priceFilter === 'high' && district.avgPrice >= 3000 && district.avgPrice < 3500) ||
        (priceFilter === 'medium' && district.avgPrice >= 2500 && district.avgPrice < 3000) ||
        (priceFilter === 'low' && district.avgPrice < 2500);
      
      const matchesZone = zoneFilter === 'all' || district.zone === zoneFilter;
      
      return matchesSearch && matchesPrice && matchesZone;
    });
  }, [searchQuery, priceFilter, zoneFilter]);

  // إحصائيات عامة
  const stats = useMemo(() => {
    const totalProperties = riyadhDistricts.reduce((sum, d) => sum + d.properties, 0);
    const avgPrice = Math.round(
      riyadhDistricts.reduce((sum, d) => sum + d.avgPrice, 0) / riyadhDistricts.length
    );
    const risingDistricts = riyadhDistricts.filter(d => d.trend === 'up').length;
    
    return { totalProperties, avgPrice, risingDistricts };
  }, []);

  const displayDistrict = hoveredDistrict || selectedDistrict;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-6 h-6 text-purple-600" />
                <h1 className="text-2xl font-bold text-gray-900">خريطة الرياض التفاعلية</h1>
              </div>
              <p className="text-sm text-gray-600">اكتشف أسعار العقارات في جميع أحياء الرياض</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all flex items-center gap-2"
              >
                {viewMode === 'map' ? <List className="w-5 h-5" /> : <Grid3x3 className="w-5 h-5" />}
                <span className="text-sm font-semibold">
                  {viewMode === 'map' ? 'عرض القائمة' : 'عرض الخريطة'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن حي..."
                className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              فلترة
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">النطاق السعري</label>
                    <select
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="all">جميع الأسعار</option>
                      <option value="luxury">فاخر جداً (3500+ ر.س/م²)</option>
                      <option value="high">فاخر (3000-3500 ر.س/م²)</option>
                      <option value="medium">متوسط (2500-3000 ر.س/م²)</option>
                      <option value="low">اقتصادي (أقل من 2500 ر.س/م²)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">المنطقة</label>
                    <select
                      value={zoneFilter}
                      onChange={(e) => setZoneFilter(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    >
                      <option value="all">جميع المناطق</option>
                      <option value="north">شمال الرياض</option>
                      <option value="south">جنوب الرياض</option>
                      <option value="east">شرق الرياض</option>
                      <option value="west">غرب الرياض</option>
                      <option value="center">وسط الرياض</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
              <Home className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">إجمالي العقارات</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalProperties.toLocaleString('ar-SA')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <DollarSign className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">متوسط السعر</p>
                <p className="text-xl font-bold text-gray-900">{stats.avgPrice.toLocaleString('ar-SA')} ر.س/م²</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">أحياء صاعدة</p>
                <p className="text-xl font-bold text-gray-900">{stats.risingDistricts} حي</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map/List View */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: '700px' }}>
              {viewMode === 'map' ? (
                <RiyadhMap
                  onDistrictHover={setHoveredDistrict}
                  selectedDistrict={selectedDistrict}
                />
              ) : (
                <div className="h-full overflow-y-auto p-6">
                  <div className="space-y-4">
                    {filteredDistricts.map((district) => (
                      <motion.div
                        key={district.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 cursor-pointer transition-all"
                        onClick={() => {
                          setSelectedDistrict(district);
                          setViewMode('map');
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{district.name}</h3>
                            <p className="text-sm text-gray-500">{district.nameEn}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-semibold">{district.rating}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center p-2 bg-purple-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">السعر/م²</p>
                            <p className="text-sm font-bold text-purple-600">
                              {district.avgPrice.toLocaleString('ar-SA')}
                            </p>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">العقارات</p>
                            <p className="text-sm font-bold text-blue-600">{district.properties}</p>
                          </div>
                          <div className="text-center p-2 bg-green-50 rounded-lg">
                            <p className="text-xs text-gray-600 mb-1">الاتجاه</p>
                            <div className="flex items-center justify-center gap-1">
                              {district.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                              {district.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                              {district.trend === 'stable' && <Minus className="w-4 h-4 text-gray-600" />}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              {displayDistrict ? (
                <motion.div
                  key={displayDistrict.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">{displayDistrict.name}</h2>
                      <p className="text-sm text-gray-500">{displayDistrict.nameEn}</p>
                    </div>
                    {selectedDistrict && (
                      <button
                        onClick={() => setSelectedDistrict(null)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{displayDistrict.rating}</span>
                    </div>
                    <div
                      className="px-3 py-1 rounded-lg text-white text-sm font-semibold"
                      style={{ backgroundColor: getDistrictColor(displayDistrict.avgPrice) }}
                    >
                      {getPriceLabel(displayDistrict.avgPrice)}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <p className="text-sm text-gray-600 mb-1">متوسط سعر المتر</p>
                      <p className="text-3xl font-bold text-purple-600">
                        {displayDistrict.avgPrice.toLocaleString('ar-SA')}
                        <span className="text-lg text-gray-600 mr-2">ر.س</span>
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <p className="text-xs text-gray-600 mb-1">عدد العقارات</p>
                        <p className="text-xl font-bold text-blue-600">{displayDistrict.properties}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-xl">
                        <p className="text-xs text-gray-600 mb-1">اتجاه السوق</p>
                        <div className="flex items-center gap-1">
                          {displayDistrict.trend === 'up' && (
                            <>
                              <TrendingUp className="w-5 h-5 text-green-600" />
                              <span className="text-lg font-bold text-green-600">
                                +{displayDistrict.trendPercentage}%
                              </span>
                            </>
                          )}
                          {displayDistrict.trend === 'down' && (
                            <>
                              <TrendingDown className="w-5 h-5 text-red-600" />
                              <span className="text-lg font-bold text-red-600">
                                -{displayDistrict.trendPercentage}%
                              </span>
                            </>
                          )}
                          {displayDistrict.trend === 'stable' && (
                            <>
                              <Minus className="w-5 h-5 text-gray-600" />
                              <span className="text-lg font-bold text-gray-600">مستقر</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">النطاق السعري</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {displayDistrict.priceRange.min.toLocaleString('ar-SA')} - {displayDistrict.priceRange.max.toLocaleString('ar-SA')} ر.س/م²
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">المرافق المتوفرة</p>
                    <div className="flex flex-wrap gap-2">
                      {displayDistrict.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6">{displayDistrict.description}</p>
                  
                  <button
                    onClick={() => setSelectedDistrict(displayDistrict)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    عرض العقارات المتاحة
                  </button>
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-400 mb-2">مرر الماوس على الخريطة</p>
                  <p className="text-sm text-gray-400">لعرض معلومات الحي</p>
                </div>
              )}
            </div>
            
            {/* Price Legend */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                دليل الألوان
              </h3>
              <div className="space-y-2">
                {[
                  { color: '#8B5CF6', label: 'فاخر جداً', range: '3500+ ر.س/م²' },
                  { color: '#EC4899', label: 'فاخر', range: '3000-3500 ر.س/م²' },
                  { color: '#F59E0B', label: 'متوسط', range: '2500-3000 ر.س/م²' },
                  { color: '#10B981', label: 'اقتصادي', range: '2000-2500 ر.س/م²' },
                  { color: '#6B7280', label: 'رخيص', range: 'أقل من 2000 ر.س/م²' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


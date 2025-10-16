export interface District {
  id: string;
  name: string;
  nameEn: string;
  lat: number;
  lng: number;
  avgPrice: number; // متوسط سعر المتر
  priceRange: {
    min: number;
    max: number;
  };
  properties: number; // عدد العقارات
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  rating: number; // تقييم الحي من 5
  amenities: string[];
  description: string;
  zone: 'north' | 'south' | 'east' | 'west' | 'center';
}

export const riyadhDistricts: District[] = [
  // شمال الرياض - أحياء راقية
  {
    id: 'hittin',
    name: 'حي الحطين',
    nameEn: 'Al Hittin',
    lat: 24.7742,
    lng: 46.6544,
    avgPrice: 3500,
    priceRange: { min: 2800, max: 4500 },
    properties: 245,
    trend: 'up',
    trendPercentage: 8.5,
    rating: 4.8,
    amenities: ['مدارس عالمية', 'مراكز تسوق', 'مستشفيات', 'حدائق'],
    description: 'من أرقى أحياء الرياض، يتميز بموقع استراتيجي وخدمات متكاملة',
    zone: 'north',
  },
  {
    id: 'narjis',
    name: 'حي النرجس',
    nameEn: 'Al Narjis',
    lat: 24.8142,
    lng: 46.6244,
    avgPrice: 3200,
    priceRange: { min: 2500, max: 4200 },
    properties: 312,
    trend: 'up',
    trendPercentage: 7.2,
    rating: 4.7,
    amenities: ['مدارس', 'مساجد', 'مطاعم', 'صيدليات'],
    description: 'حي سكني راقي بتخطيط عصري وخدمات متنوعة',
    zone: 'north',
  },
  {
    id: 'yasmin',
    name: 'حي الياسمين',
    nameEn: 'Al Yasmin',
    lat: 24.8342,
    lng: 46.6144,
    avgPrice: 3100,
    priceRange: { min: 2400, max: 4000 },
    properties: 289,
    trend: 'up',
    trendPercentage: 6.8,
    rating: 4.6,
    amenities: ['مدارس', 'حدائق', 'مراكز صحية', 'ملاعب'],
    description: 'حي هادئ ومناسب للعائلات مع بنية تحتية ممتازة',
    zone: 'north',
  },
  {
    id: 'sahafa',
    name: 'حي الصحافة',
    nameEn: 'Al Sahafa',
    lat: 24.7542,
    lng: 46.6744,
    avgPrice: 2900,
    priceRange: { min: 2200, max: 3800 },
    properties: 267,
    trend: 'stable',
    trendPercentage: 2.1,
    rating: 4.5,
    amenities: ['مستشفيات', 'مدارس', 'مولات', 'مطاعم'],
    description: 'حي حيوي قريب من المرافق الحكومية والتجارية',
    zone: 'north',
  },
  {
    id: 'malqa',
    name: 'حي الملقا',
    nameEn: 'Al Malqa',
    lat: 24.7842,
    lng: 46.6344,
    avgPrice: 2800,
    priceRange: { min: 2100, max: 3700 },
    properties: 298,
    trend: 'up',
    trendPercentage: 5.4,
    rating: 4.4,
    amenities: ['مدارس', 'مساجد', 'أسواق', 'حدائق'],
    description: 'حي متكامل بأسعار مناسبة وموقع متميز',
    zone: 'north',
  },

  // وسط الرياض - أحياء تجارية
  {
    id: 'olaya',
    name: 'حي العليا',
    nameEn: 'Al Olaya',
    lat: 24.6942,
    lng: 46.6844,
    avgPrice: 4200,
    priceRange: { min: 3500, max: 5500 },
    properties: 189,
    trend: 'up',
    trendPercentage: 9.2,
    rating: 4.9,
    amenities: ['أبراج', 'فنادق', 'مطاعم فاخرة', 'مراكز أعمال'],
    description: 'قلب الرياض التجاري والمالي، موقع استثماري مميز',
    zone: 'center',
  },
  {
    id: 'sulaimaniya',
    name: 'حي السليمانية',
    nameEn: 'Al Sulaimaniya',
    lat: 24.7042,
    lng: 46.6944,
    avgPrice: 3800,
    priceRange: { min: 3000, max: 5000 },
    properties: 156,
    trend: 'stable',
    trendPercentage: 3.5,
    rating: 4.7,
    amenities: ['مستشفيات', 'مدارس', 'أسواق', 'مساجد'],
    description: 'حي عريق بموقع مركزي وخدمات متكاملة',
    zone: 'center',
  },
  {
    id: 'malaz',
    name: 'حي الملز',
    nameEn: 'Al Malaz',
    lat: 24.6842,
    lng: 46.7244,
    avgPrice: 2600,
    priceRange: { min: 2000, max: 3500 },
    properties: 234,
    trend: 'stable',
    trendPercentage: 1.8,
    rating: 4.2,
    amenities: ['جامعات', 'مستشفيات', 'مراكز تسوق', 'مطاعم'],
    description: 'حي قريب من الجامعات والمرافق التعليمية',
    zone: 'center',
  },

  // شرق الرياض
  {
    id: 'rawda',
    name: 'حي الروضة',
    nameEn: 'Al Rawda',
    lat: 24.7242,
    lng: 46.7644,
    avgPrice: 2700,
    priceRange: { min: 2100, max: 3600 },
    properties: 276,
    trend: 'up',
    trendPercentage: 4.3,
    rating: 4.3,
    amenities: ['مدارس', 'حدائق', 'مساجد', 'أسواق'],
    description: 'حي سكني هادئ بأسعار مناسبة',
    zone: 'east',
  },
  {
    id: 'nakhil',
    name: 'حي النخيل',
    nameEn: 'Al Nakhil',
    lat: 24.7442,
    lng: 46.7844,
    avgPrice: 2500,
    priceRange: { min: 1900, max: 3400 },
    properties: 312,
    trend: 'stable',
    trendPercentage: 2.5,
    rating: 4.1,
    amenities: ['مدارس', 'مساجد', 'صيدليات', 'بقالات'],
    description: 'حي شعبي بخدمات جيدة وأسعار معقولة',
    zone: 'east',
  },

  // غرب الرياض
  {
    id: 'shifa',
    name: 'حي الشفا',
    nameEn: 'Al Shifa',
    lat: 24.7142,
    lng: 46.6244,
    avgPrice: 2400,
    priceRange: { min: 1800, max: 3300 },
    properties: 298,
    trend: 'up',
    trendPercentage: 3.8,
    rating: 4.0,
    amenities: ['مستشفيات', 'مدارس', 'مساجد', 'حدائق'],
    description: 'حي قريب من المستشفيات والمرافق الصحية',
    zone: 'west',
  },
  {
    id: 'aziziya',
    name: 'حي العزيزية',
    nameEn: 'Al Aziziya',
    lat: 24.6742,
    lng: 46.6444,
    avgPrice: 2200,
    priceRange: { min: 1700, max: 3000 },
    properties: 267,
    trend: 'stable',
    trendPercentage: 1.5,
    rating: 3.9,
    amenities: ['مدارس', 'أسواق', 'مساجد', 'مطاعم'],
    description: 'حي سكني بأسعار اقتصادية',
    zone: 'west',
  },

  // جنوب الرياض
  {
    id: 'uraija',
    name: 'حي العريجاء',
    nameEn: 'Al Uraija',
    lat: 24.6342,
    lng: 46.6944,
    avgPrice: 2300,
    priceRange: { min: 1800, max: 3100 },
    properties: 245,
    trend: 'up',
    trendPercentage: 4.1,
    rating: 4.0,
    amenities: ['مدارس', 'حدائق', 'مساجد', 'مراكز صحية'],
    description: 'حي متطور بسرعة مع فرص استثمارية',
    zone: 'south',
  },
  {
    id: 'nasim',
    name: 'حي النسيم',
    nameEn: 'Al Nasim',
    lat: 24.6142,
    lng: 46.7144,
    avgPrice: 2100,
    priceRange: { min: 1600, max: 2900 },
    properties: 289,
    trend: 'stable',
    trendPercentage: 2.0,
    rating: 3.8,
    amenities: ['مدارس', 'مساجد', 'أسواق', 'ملاعب'],
    description: 'حي شعبي بخدمات أساسية جيدة',
    zone: 'south',
  },
  {
    id: 'yarmuk',
    name: 'حي اليرموك',
    nameEn: 'Al Yarmuk',
    lat: 24.6542,
    lng: 46.7344,
    avgPrice: 2000,
    priceRange: { min: 1500, max: 2800 },
    properties: 312,
    trend: 'stable',
    trendPercentage: 1.2,
    rating: 3.7,
    amenities: ['مدارس', 'مساجد', 'بقالات', 'صيدليات'],
    description: 'حي سكني اقتصادي مناسب للعائلات',
    zone: 'south',
  },
];

// دالة للحصول على لون الحي حسب السعر
export function getDistrictColor(avgPrice: number): string {
  if (avgPrice >= 3500) return '#8B5CF6'; // بنفسجي - غالي جداً
  if (avgPrice >= 3000) return '#EC4899'; // وردي - غالي
  if (avgPrice >= 2500) return '#F59E0B'; // برتقالي - متوسط
  if (avgPrice >= 2000) return '#10B981'; // أخضر - اقتصادي
  return '#6B7280'; // رمادي - رخيص
}

// دالة للحصول على وصف السعر
export function getPriceLabel(avgPrice: number): string {
  if (avgPrice >= 3500) return 'فاخر جداً';
  if (avgPrice >= 3000) return 'فاخر';
  if (avgPrice >= 2500) return 'متوسط - مرتفع';
  if (avgPrice >= 2000) return 'متوسط';
  return 'اقتصادي';
}


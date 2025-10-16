import { pgTable, text, serial, integer, timestamp, boolean, jsonb, decimal, varchar } from "drizzle-orm/pg-core";

// جدول التقييمات العقارية
export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  userId: text("user_id"), // null للمستخدمين غير المسجلين
  
  // البيانات الأساسية
  area: decimal("area", { precision: 10, scale: 2 }).notNull(),
  city: text("city").notNull(),
  district: text("district").notNull(),
  propertyType: text("property_type"),
  propertyAge: text("property_age"),
  
  // تفاصيل العقار
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  livingRooms: integer("living_rooms"),
  kitchens: integer("kitchens"),
  maidRoom: boolean("maid_room").default(false),
  driverRoom: boolean("driver_room").default(false),
  
  // المرافق الإضافية
  hasPool: boolean("has_pool").default(false),
  hasGarden: boolean("has_garden").default(false),
  hasElevator: boolean("has_elevator").default(false),
  hasParking: integer("parking_spaces"),
  hasAC: boolean("has_ac").default(false),
  
  // الموقع والمحيط
  nearMosque: boolean("near_mosque").default(false),
  nearSchool: boolean("near_school").default(false),
  nearHospital: boolean("near_hospital").default(false),
  nearMall: boolean("near_mall").default(false),
  streetWidth: integer("street_width"),
  facing: text("facing"),
  
  // تفاصيل متقدمة
  floorNumber: integer("floor_number"),
  totalFloors: integer("total_floors"),
  finishLevel: text("finish_level"),
  furnished: boolean("furnished").default(false),
  
  // نتائج التقييم
  estimatedValue: decimal("estimated_value", { precision: 12, scale: 2 }),
  minValue: decimal("min_value", { precision: 12, scale: 2 }),
  maxValue: decimal("max_value", { precision: 12, scale: 2 }),
  pricePerMeter: decimal("price_per_meter", { precision: 10, scale: 2 }),
  confidence: integer("confidence"),
  
  // بيانات إضافية
  allData: jsonb("all_data"), // تخزين جميع البيانات كـ JSON
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// جدول أكواد الإحالة
export const referralCodes = pgTable("referral_codes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  code: varchar("code", { length: 20 }).notNull().unique(),
  
  // إحصائيات
  totalReferrals: integer("total_referrals").default(0),
  successfulReferrals: integer("successful_referrals").default(0),
  totalEarnings: decimal("total_earnings", { precision: 10, scale: 2 }).default("0"),
  pendingEarnings: decimal("pending_earnings", { precision: 10, scale: 2 }).default("0"),
  
  // المستوى
  tier: text("tier").default("BRONZE"), // BRONZE, SILVER, GOLD, PLATINUM
  
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// جدول الإحالات
export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: text("referrer_id").notNull(), // المُحيل
  referredId: text("referred_id").notNull(), // المُحال
  referralCode: varchar("referral_code", { length: 20 }).notNull(),
  
  // الحالة
  status: text("status").default("PENDING"), // PENDING, ACTIVE, COMPLETED, CANCELLED
  
  // المكافآت
  rewardAmount: decimal("reward_amount", { precision: 10, scale: 2 }),
  rewardPaid: boolean("reward_paid").default(false),
  rewardPaidAt: timestamp("reward_paid_at"),
  
  // البيانات
  metadata: jsonb("metadata"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// جدول المكافآت
export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  
  // نوع المكافأة
  type: text("type").notNull(), // EARLY_BIRD, REFERRAL, ACHIEVEMENT, BONUS
  
  // القيمة
  amount: decimal("amount", { precision: 10, scale: 2 }),
  points: integer("points"),
  
  // التفاصيل
  title: text("title").notNull(),
  description: text("description"),
  tier: text("tier"), // PLATINUM, GOLD, SILVER, BRONZE, NORMAL
  
  // الحالة
  status: text("status").default("PENDING"), // PENDING, CLAIMED, EXPIRED
  claimedAt: timestamp("claimed_at"),
  expiresAt: timestamp("expires_at"),
  
  metadata: jsonb("metadata"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// جدول عمليات البحث
export const searches = pgTable("searches", {
  id: serial("id").primaryKey(),
  userId: text("user_id"),
  
  // معايير البحث
  query: text("query"),
  filters: jsonb("filters"),
  
  // النتائج
  resultsCount: integer("results_count"),
  results: jsonb("results"),
  
  // البيانات التقنية
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  
  createdAt: timestamp("created_at").defaultNow(),
});

// جدول المستخدمين الموسع (لتخزين بيانات إضافية)
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  
  // البيانات الشخصية
  fullName: text("full_name"),
  phone: text("phone"),
  city: text("city"),
  
  // الإحصائيات
  totalEvaluations: integer("total_evaluations").default(0),
  totalSearches: integer("total_searches").default(0),
  
  // المكافآت
  totalPoints: integer("total_points").default(0),
  totalEarnings: decimal("total_earnings", { precision: 10, scale: 2 }).default("0"),
  
  // الاشتراك
  subscriptionTier: text("subscription_tier").default("FREE"), // FREE, BASIC, PRO, ENTERPRISE
  subscriptionExpiresAt: timestamp("subscription_expires_at"),
  
  // الإعدادات
  preferences: jsonb("preferences"),
  
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// جدول الإشعارات
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  
  type: text("type").notNull(), // REWARD, REFERRAL, SYSTEM, ALERT
  title: text("title").notNull(),
  message: text("message").notNull(),
  
  isRead: boolean("is_read").default(false),
  readAt: timestamp("read_at"),
  
  metadata: jsonb("metadata"),
  
  createdAt: timestamp("created_at").defaultNow(),
});


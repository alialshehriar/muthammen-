import { pgTable, serial, integer, numeric, timestamp, varchar, text, jsonb } from 'drizzle-orm/pg-core';

// ============================================
// EARLY BIRD REWARDS SYSTEM
// ============================================

export const earlyBirdRewards = pgTable('early_bird_rewards', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  
  // Reward details
  rewardTier: varchar('reward_tier', { length: 50 }).notNull(), // platinum, gold, silver, bronze
  rewardPoints: integer('reward_points').default(0).notNull(),
  rewardValue: numeric('reward_value', { precision: 12, scale: 2 }).default('0'), // SAR value
  
  // Badges & perks
  badges: jsonb('badges'), // Array of earned badges
  perks: jsonb('perks'), // Array of unlocked perks
  
  // Status
  claimed: boolean('claimed').default(false),
  claimedAt: timestamp('claimed_at'),
  expiresAt: timestamp('expires_at'),
  
  // Metadata
  registrationDate: timestamp('registration_date').notNull(),
  registrationNumber: integer('registration_number').notNull(), // Sequential number
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Reward tiers configuration
export const EARLY_BIRD_TIERS = {
  PLATINUM: {
    name: 'بلاتيني',
    range: [1, 100],
    points: 1000,
    value: 500, // SAR
    color: 'from-gray-400 to-gray-600',
    icon: '💎',
    perks: [
      'أولوية في الدعم الفني',
      'خصم 50% على جميع الخدمات',
      'وصول مبكر لجميع الميزات الجديدة',
      'شارة بلاتينية حصرية',
      'استشارة مجانية مع الخبراء',
      'عضوية VIP مدى الحياة'
    ]
  },
  GOLD: {
    name: 'ذهبي',
    range: [101, 500],
    points: 500,
    value: 250, // SAR
    color: 'from-yellow-400 to-yellow-600',
    icon: '🥇',
    perks: [
      'خصم 30% على جميع الخدمات',
      'وصول مبكر للميزات الجديدة',
      'شارة ذهبية مميزة',
      'أولوية في قائمة الانتظار',
      'تقارير شهرية مجانية'
    ]
  },
  SILVER: {
    name: 'فضي',
    range: [501, 2000],
    points: 250,
    value: 100, // SAR
    color: 'from-gray-300 to-gray-500',
    icon: '🥈',
    perks: [
      'خصم 20% على جميع الخدمات',
      'شارة فضية',
      'إشعارات مبكرة',
      'محتوى حصري',
      'تقرير ربع سنوي مجاني'
    ]
  },
  BRONZE: {
    name: 'برونزي',
    range: [2001, 10000],
    points: 100,
    value: 50, // SAR
    color: 'from-orange-400 to-orange-600',
    icon: '🥉',
    perks: [
      'خصم 10% على جميع الخدمات',
      'شارة برونزية',
      'وصول للمحتوى الحصري',
      'إشعارات خاصة'
    ]
  },
  STANDARD: {
    name: 'عادي',
    range: [10001, Infinity],
    points: 50,
    value: 25, // SAR
    color: 'from-blue-400 to-blue-600',
    icon: '⭐',
    perks: [
      'خصم 5% على الخدمات',
      'شارة المستخدم المبكر',
      'شكراً لدعمك'
    ]
  }
};

// Helper function to determine tier based on registration number
export function getEarlyBirdTier(registrationNumber: number): keyof typeof EARLY_BIRD_TIERS {
  if (registrationNumber >= 1 && registrationNumber <= 100) return 'PLATINUM';
  if (registrationNumber >= 101 && registrationNumber <= 500) return 'GOLD';
  if (registrationNumber >= 501 && registrationNumber <= 2000) return 'SILVER';
  if (registrationNumber >= 2001 && registrationNumber <= 10000) return 'BRONZE';
  return 'STANDARD';
}

// Helper function to get tier details
export function getTierDetails(tier: keyof typeof EARLY_BIRD_TIERS) {
  return EARLY_BIRD_TIERS[tier];
}


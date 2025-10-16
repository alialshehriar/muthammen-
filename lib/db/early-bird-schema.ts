import { pgTable, serial, integer, varchar, numeric, jsonb, timestamp, boolean } from 'drizzle-orm/pg-core';

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


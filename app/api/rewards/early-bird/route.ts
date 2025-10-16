import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

// Mock data for early bird rewards
// In production, this would come from the database
const mockRewards = {
  userId: 1,
  rewardTier: 'GOLD',
  rewardPoints: 500,
  rewardValue: 250,
  registrationNumber: 342,
  registrationDate: new Date('2025-10-10'),
  badges: [
    { id: 1, name: 'المستخدم المبكر', icon: '🌟', description: 'انضممت قبل الإطلاق الرسمي' },
    { id: 2, name: 'الذهبي', icon: '🥇', description: 'من أول 500 مستخدم' },
    { id: 3, name: 'الداعم', icon: '💪', description: 'دعمت المنصة في بدايتها' }
  ],
  perks: [
    { id: 1, name: 'خصم 30%', description: 'خصم 30% على جميع الخدمات', active: true },
    { id: 2, name: 'وصول مبكر', description: 'وصول مبكر للميزات الجديدة', active: true },
    { id: 3, name: 'شارة ذهبية', description: 'شارة ذهبية مميزة على ملفك الشخصي', active: true },
    { id: 4, name: 'أولوية في الدعم', description: 'أولوية في قائمة الانتظار', active: true },
    { id: 5, name: 'تقارير مجانية', description: 'تقارير شهرية مجانية', active: true }
  ],
  claimed: false,
  expiresAt: new Date('2026-12-31')
};

const EARLY_BIRD_TIERS = {
  PLATINUM: {
    name: 'بلاتيني',
    range: [1, 100],
    points: 1000,
    value: 500,
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
    value: 250,
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
    value: 100,
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
    value: 50,
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
    value: 25,
    color: 'from-blue-400 to-blue-600',
    icon: '⭐',
    perks: [
      'خصم 5% على الخدمات',
      'شارة المستخدم المبكر',
      'شكراً لدعمك'
    ]
  }
};

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // In production, fetch from database
    // For now, return mock data with tier information
    const response = {
      success: true,
      reward: mockRewards,
      tiers: EARLY_BIRD_TIERS,
      stats: {
        totalUsers: 15234,
        yourRank: mockRewards.registrationNumber,
        percentile: Math.round((mockRewards.registrationNumber / 15234) * 100)
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching early bird rewards:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (action === 'claim') {
      // In production, update database to mark reward as claimed
      return NextResponse.json({
        success: true,
        message: 'تم استلام المكافأة بنجاح!',
        reward: {
          ...mockRewards,
          claimed: true,
          claimedAt: new Date()
        }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing early bird reward:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


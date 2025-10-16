import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

// حساب المستوى والعمولة بناءً على عدد الإحالات
function calculateTierAndCommission(successfulReferrals: number) {
  if (successfulReferrals >= 50) {
    return { tier: 'PLATINUM', commission: 15, badge: '💎' };
  } else if (successfulReferrals >= 20) {
    return { tier: 'GOLD', commission: 12, badge: '🥇' };
  } else if (successfulReferrals >= 10) {
    return { tier: 'SILVER', commission: 8, badge: '🥈' };
  } else {
    return { tier: 'BRONZE', commission: 5, badge: '🥉' };
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    
    // TODO: جلب بيانات الإحالات من قاعدة البيانات
    // const referralData = await db.select().from(referralCodes).where(eq(referralCodes.userId, userId));
    // const referrals = await db.select().from(referrals).where(eq(referrals.referrerId, userId));
    
    // بيانات وهمية للعرض
    const mockData = {
      totalReferrals: 15,
      successfulReferrals: 12,
      pendingReferrals: 3,
      totalEarnings: 1250.50,
      pendingEarnings: 350.00,
      thisMonthEarnings: 450.00,
      lastMonthEarnings: 800.50,
    };
    
    const tierInfo = calculateTierAndCommission(mockData.successfulReferrals);
    
    // حساب التقدم نحو المستوى التالي
    let nextTierTarget = 10;
    let nextTierName = 'SILVER';
    
    if (tierInfo.tier === 'BRONZE') {
      nextTierTarget = 10;
      nextTierName = 'SILVER';
    } else if (tierInfo.tier === 'SILVER') {
      nextTierTarget = 20;
      nextTierName = 'GOLD';
    } else if (tierInfo.tier === 'GOLD') {
      nextTierTarget = 50;
      nextTierName = 'PLATINUM';
    }
    
    const progress = tierInfo.tier === 'PLATINUM' ? 100 : 
      Math.min(100, (mockData.successfulReferrals / nextTierTarget) * 100);
    
    // قائمة الإحالات الأخيرة
    const recentReferrals = [
      {
        id: 1,
        name: 'أحمد محمد',
        status: 'ACTIVE',
        joinedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        earnings: 125.00,
      },
      {
        id: 2,
        name: 'فاطمة علي',
        status: 'ACTIVE',
        joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        earnings: 200.50,
      },
      {
        id: 3,
        name: 'خالد سعيد',
        status: 'PENDING',
        joinedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        earnings: 0,
      },
    ];
    
    return NextResponse.json({
      success: true,
      data: {
        stats: mockData,
        tier: {
          current: tierInfo.tier,
          badge: tierInfo.badge,
          commission: tierInfo.commission,
          nextTier: tierInfo.tier === 'PLATINUM' ? null : nextTierName,
          nextTierTarget: tierInfo.tier === 'PLATINUM' ? null : nextTierTarget,
          progress: progress,
        },
        recentReferrals,
        milestones: [
          {
            target: 10,
            tier: 'SILVER',
            commission: 8,
            achieved: mockData.successfulReferrals >= 10,
          },
          {
            target: 20,
            tier: 'GOLD',
            commission: 12,
            achieved: mockData.successfulReferrals >= 20,
          },
          {
            target: 50,
            tier: 'PLATINUM',
            commission: 15,
            achieved: mockData.successfulReferrals >= 50,
          },
        ],
      }
    });
    
  } catch (error) {
    console.error('Error tracking referrals:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء تتبع الإحالات' },
      { status: 500 }
    );
  }
}

// API لتسجيل إحالة جديدة
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { referralCode, newUserId } = body;
    
    if (!referralCode || !newUserId) {
      return NextResponse.json(
        { success: false, error: 'بيانات غير مكتملة' },
        { status: 400 }
      );
    }
    
    // TODO: التحقق من صحة كود الإحالة
    // const codeData = await db.select().from(referralCodes).where(eq(referralCodes.code, referralCode));
    
    // TODO: تسجيل الإحالة في قاعدة البيانات
    // await db.insert(referrals).values({
    //   referrerId: codeData[0].userId,
    //   referredId: newUserId,
    //   referralCode: referralCode,
    //   status: 'PENDING',
    // });
    
    // TODO: تحديث عدد الإحالات
    // await db.update(referralCodes)
    //   .set({ totalReferrals: sql`${referralCodes.totalReferrals} + 1` })
    //   .where(eq(referralCodes.code, referralCode));
    
    return NextResponse.json({
      success: true,
      message: 'تم تسجيل الإحالة بنجاح',
    });
    
  } catch (error) {
    console.error('Error recording referral:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء تسجيل الإحالة' },
      { status: 500 }
    );
  }
}


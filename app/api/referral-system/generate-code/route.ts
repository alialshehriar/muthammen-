import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

// دالة لتوليد كود إحالة فريد
function generateReferralCode(userId: string): string {
  const prefix = 'MTH';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  const userHash = userId.substring(0, 4).toUpperCase();
  
  return `${prefix}-${userHash}${timestamp}${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    
    // TODO: التحقق من وجود كود سابق في قاعدة البيانات
    // const existingCode = await db.select().from(referralCodes).where(eq(referralCodes.userId, userId));
    
    // توليد كود جديد
    const code = generateReferralCode(userId);
    
    // TODO: حفظ الكود في قاعدة البيانات
    // await db.insert(referralCodes).values({
    //   userId,
    //   code,
    //   tier: 'BRONZE',
    //   totalReferrals: 0,
    //   successfulReferrals: 0,
    //   totalEarnings: '0',
    //   pendingEarnings: '0',
    // });
    
    return NextResponse.json({
      success: true,
      data: {
        code,
        referralLink: `${process.env.NEXT_PUBLIC_APP_URL}/register?ref=${code}`,
        tier: 'BRONZE',
        commission: 5, // نسبة العمولة
      }
    });
    
  } catch (error) {
    console.error('Error generating referral code:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء توليد كود الإحالة' },
      { status: 500 }
    );
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
    
    // TODO: جلب الكود من قاعدة البيانات
    // const codeData = await db.select().from(referralCodes).where(eq(referralCodes.userId, userId)).limit(1);
    
    // بيانات وهمية للاختبار
    const mockCode = generateReferralCode(userId);
    
    return NextResponse.json({
      success: true,
      data: {
        code: mockCode,
        referralLink: `${process.env.NEXT_PUBLIC_APP_URL}/register?ref=${mockCode}`,
        tier: 'BRONZE',
        totalReferrals: 0,
        successfulReferrals: 0,
        totalEarnings: 0,
        pendingEarnings: 0,
        commission: 5,
      }
    });
    
  } catch (error) {
    console.error('Error fetching referral code:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب كود الإحالة' },
      { status: 500 }
    );
  }
}


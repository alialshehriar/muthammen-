import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    // TODO: التحقق من صلاحيات الإدارة
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'غير مصرح' },
        { status: 401 }
      );
    }

    // بيانات وهمية للعرض - سيتم استبدالها ببيانات حقيقية من قاعدة البيانات
    const dashboardData = {
      overview: {
        totalEvaluations: 1247,
        totalUsers: 856,
        totalRevenue: 125430.50,
        activeSubscriptions: 234,
        growthRate: 12.5,
      },
      
      recentEvaluations: [
        {
          id: 1,
          userId: 'user_001',
          userName: 'أحمد محمد',
          city: 'الرياض',
          district: 'الحطين',
          propertyType: 'فيلا',
          area: 350,
          estimatedValue: 2450000,
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          userId: 'user_002',
          userName: 'فاطمة علي',
          city: 'جدة',
          district: 'الروضة',
          propertyType: 'شقة',
          area: 180,
          estimatedValue: 850000,
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 3,
          userId: 'user_003',
          userName: 'خالد سعيد',
          city: 'الرياض',
          district: 'النرجس',
          propertyType: 'دوبلكس',
          area: 280,
          estimatedValue: 1680000,
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 4,
          userId: 'user_004',
          userName: 'سارة أحمد',
          city: 'الدمام',
          district: 'الفيصلية',
          propertyType: 'عمارة',
          area: 500,
          estimatedValue: 3500000,
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 5,
          userId: 'user_005',
          userName: 'محمد عبدالله',
          city: 'الرياض',
          district: 'الياسمين',
          propertyType: 'فيلا',
          area: 400,
          estimatedValue: 2800000,
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        },
      ],
      
      topUsers: [
        {
          id: 'user_001',
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          evaluations: 45,
          subscriptionTier: 'PRO',
          totalSpent: 2500,
          joinedAt: '2024-01-15',
        },
        {
          id: 'user_002',
          name: 'فاطمة علي',
          email: 'fatima@example.com',
          evaluations: 38,
          subscriptionTier: 'ENTERPRISE',
          totalSpent: 5000,
          joinedAt: '2024-02-20',
        },
        {
          id: 'user_003',
          name: 'خالد سعيد',
          email: 'khaled@example.com',
          evaluations: 32,
          subscriptionTier: 'PRO',
          totalSpent: 2200,
          joinedAt: '2024-03-10',
        },
        {
          id: 'user_004',
          name: 'سارة أحمد',
          email: 'sarah@example.com',
          evaluations: 28,
          subscriptionTier: 'BASIC',
          totalSpent: 800,
          joinedAt: '2024-04-05',
        },
        {
          id: 'user_005',
          name: 'محمد عبدالله',
          email: 'mohammed@example.com',
          evaluations: 25,
          subscriptionTier: 'PRO',
          totalSpent: 1900,
          joinedAt: '2024-05-12',
        },
      ],
      
      cityStats: [
        { city: 'الرياض', evaluations: 567, percentage: 45.5 },
        { city: 'جدة', evaluations: 312, percentage: 25.0 },
        { city: 'الدمام', evaluations: 189, percentage: 15.2 },
        { city: 'مكة المكرمة', evaluations: 98, percentage: 7.9 },
        { city: 'المدينة المنورة', evaluations: 81, percentage: 6.4 },
      ],
      
      propertyTypeStats: [
        { type: 'فيلا', count: 456, percentage: 36.6 },
        { type: 'شقة', count: 389, percentage: 31.2 },
        { type: 'دوبلكس', count: 178, percentage: 14.3 },
        { type: 'عمارة', count: 134, percentage: 10.7 },
        { type: 'أرض', count: 90, percentage: 7.2 },
      ],
      
      revenueChart: [
        { month: 'يناير', revenue: 8500 },
        { month: 'فبراير', revenue: 12300 },
        { month: 'مارس', revenue: 15600 },
        { month: 'أبريل', revenue: 18900 },
        { month: 'مايو', revenue: 22400 },
        { month: 'يونيو', revenue: 28700 },
      ],
      
      evaluationsChart: [
        { month: 'يناير', count: 145 },
        { month: 'فبراير', count: 189 },
        { month: 'مارس', count: 234 },
        { month: 'أبريل', count: 267 },
        { month: 'مايو', count: 312 },
        { month: 'يونيو', count: 378 },
      ],
      
      referralStats: {
        totalReferrals: 456,
        activeReferrals: 312,
        pendingReferrals: 89,
        totalCommissions: 45600,
        paidCommissions: 32400,
        pendingCommissions: 13200,
      },
      
      topReferrers: [
        {
          id: 'user_001',
          name: 'أحمد محمد',
          referrals: 45,
          earnings: 6750,
          tier: 'PLATINUM',
        },
        {
          id: 'user_002',
          name: 'فاطمة علي',
          referrals: 38,
          earnings: 5320,
          tier: 'GOLD',
        },
        {
          id: 'user_003',
          name: 'خالد سعيد',
          referrals: 32,
          earnings: 4160,
          tier: 'GOLD',
        },
        {
          id: 'user_004',
          name: 'سارة أحمد',
          referrals: 28,
          earnings: 3220,
          tier: 'SILVER',
        },
        {
          id: 'user_005',
          name: 'محمد عبدالله',
          referrals: 25,
          earnings: 2875,
          tier: 'SILVER',
        },
      ],
    };
    
    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء جلب بيانات لوحة الإدارة' },
      { status: 500 }
    );
  }
}


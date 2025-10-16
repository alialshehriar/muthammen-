import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

// Mock data for referrals
// In production, this would come from the database
const mockReferrals = [
  { 
    id: 1, 
    name: 'أحمد محمد', 
    email: 'ahmed@example.com',
    date: '2025-10-10T10:00:00Z', 
    status: 'active', 
    earnings: 125,
    tier: 'GOLD'
  },
  { 
    id: 2, 
    name: 'فاطمة علي', 
    email: 'fatima@example.com',
    date: '2025-10-09T15:30:00Z', 
    status: 'active', 
    earnings: 200,
    tier: 'PLATINUM'
  },
  { 
    id: 3, 
    name: 'خالد سعيد', 
    email: 'khaled@example.com',
    date: '2025-10-08T09:15:00Z', 
    status: 'pending', 
    earnings: 0,
    tier: 'BRONZE'
  },
  { 
    id: 4, 
    name: 'نورة عبدالله', 
    email: 'noura@example.com',
    date: '2025-10-07T14:45:00Z', 
    status: 'active', 
    earnings: 175,
    tier: 'SILVER'
  },
  { 
    id: 5, 
    name: 'محمد الأحمد', 
    email: 'mohammed@example.com',
    date: '2025-10-06T11:20:00Z', 
    status: 'active', 
    earnings: 150,
    tier: 'GOLD'
  },
];

const mockStats = {
  totalReferrals: 24,
  activeReferrals: 18,
  totalEarnings: 4850,
  pendingEarnings: 320,
  thisMonthEarnings: 890,
  currentTier: 'GOLD',
  nextTierProgress: 65, // Progress to next tier in percentage
  referralCode: 'MUTHAMMEN-USER123',
  joinedDate: '2025-09-15',
  rank: 342, // User's rank among all referrers
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status'); // active, pending, inactive

    // Filter referrals based on status
    let filteredReferrals = mockReferrals;
    if (status) {
      filteredReferrals = mockReferrals.filter(r => r.status === status);
    }

    // Paginate
    const paginatedReferrals = filteredReferrals.slice(offset, offset + limit);

    // In production, fetch from database
    const response = {
      success: true,
      stats: mockStats,
      referrals: paginatedReferrals,
      pagination: {
        total: filteredReferrals.length,
        limit,
        offset,
        hasMore: offset + limit < filteredReferrals.length
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching referrals:', error);
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
    const { action, referralId } = body;

    if (action === 'withdraw') {
      // In production, process withdrawal request
      return NextResponse.json({
        success: true,
        message: 'تم إرسال طلب السحب بنجاح!',
        withdrawal: {
          id: Date.now(),
          amount: body.amount,
          status: 'pending',
          requestedAt: new Date().toISOString()
        }
      });
    }

    if (action === 'resend_invitation' && referralId) {
      // In production, resend invitation email
      return NextResponse.json({
        success: true,
        message: 'تم إعادة إرسال الدعوة بنجاح!'
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error processing referral action:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}


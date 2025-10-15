import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { negotiations } from '@/lib/db/schema';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'يجب تسجيل الدخول أولاً' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json(
        { success: false, message: 'معرف المشروع مطلوب' },
        { status: 400 }
      );
    }

    // Check if user has already started negotiation for this project
    const existingNegotiation = await db
      .select()
      .from(negotiations)
      .where(
        (negotiations.projectId === parseInt(projectId)) &&
        (negotiations.investorId === session.user.id) &&
        (negotiations.status === 'active')
      )
      .limit(1);

    if (existingNegotiation.length > 0) {
      return NextResponse.json({
        success: true,
        negotiationId: existingNegotiation[0].id,
        message: 'لديك تفاوض نشط بالفعل لهذا المشروع'
      });
    }

    // Create new negotiation
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 3); // 3 days negotiation period

    const [newNegotiation] = await db
      .insert(negotiations)
      .values({
        projectId: parseInt(projectId),
        investorId: session.user.id,
        status: 'active',
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        amount: 499, // Negotiation fee
        createdAt: new Date().toISOString(),
      })
      .returning();

    return NextResponse.json({
      success: true,
      negotiationId: newNegotiation.id,
      message: 'تم بدء التفاوض بنجاح'
    });

  } catch (error) {
    console.error('Error starting negotiation:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء بدء التفاوض' },
      { status: 500 }
    );
  }
}


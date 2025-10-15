import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { desc, asc, eq, and, like, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'recent';
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = (page - 1) * limit;

    let query = db.select().from(projects);

    // Apply filters
    const conditions = [];
    if (category) {
      conditions.push(eq(projects.category, category));
    }
    if (search) {
      conditions.push(
        or(
          like(projects.title, `%${search}%`),
          like(projects.description, `%${search}%`)
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    // Apply sorting
    switch (sort) {
      case 'popular':
        query = query.orderBy(desc(projects.viewsCount)) as any;
        break;
      case 'funded':
        query = query.orderBy(desc(projects.currentFunding)) as any;
        break;
      case 'ending':
        query = query.orderBy(asc(projects.deadline)) as any;
        break;
      default:
        query = query.orderBy(desc(projects.createdAt)) as any;
    }

    // Apply pagination
    query = query.limit(limit).offset(offset) as any;

    const results = await query;

    return NextResponse.json({
      success: true,
      projects: results,
      page,
      limit,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, category, fundingGoal, duration, packages, images } = body;

    if (!title || !description || !category || !fundingGoal) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate deadline
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + (duration || 30));

    // Create project
    const [newProject] = await db.insert(projects).values({
      creatorId: parseInt(session.user.id as string),
      title,
      description,
      category,
      fundingGoal: fundingGoal.toString(),
      currentFunding: '0',
      deadline,
      packages: packages || null,
      gallery: images || null,
    }).returning();

    return NextResponse.json({
      success: true,
      project: newProject,
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

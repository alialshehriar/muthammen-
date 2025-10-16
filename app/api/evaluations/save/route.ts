import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    
    const {
      area,
      city,
      district,
      propertyType,
      propertyAge,
      bedrooms,
      bathrooms,
      livingRooms,
      kitchens,
      maidRoom,
      driverRoom,
      hasPool,
      hasGarden,
      hasElevator,
      parkingSpaces,
      hasAC,
      nearMosque,
      nearSchool,
      nearHospital,
      nearMall,
      streetWidth,
      facing,
      floorNumber,
      totalFloors,
      finishLevel,
      furnished,
      estimatedValue,
      minValue,
      maxValue,
      pricePerMeter,
      confidence,
    } = body;

    // التحقق من البيانات الأساسية
    if (!area || !city || !district) {
      return NextResponse.json(
        { success: false, error: 'البيانات الأساسية مطلوبة' },
        { status: 400 }
      );
    }

    // حساب القيمة المقدرة (خوارزمية بسيطة - سيتم تحسينها لاحقاً)
    const basePrice = 2500; // سعر أساسي للمتر
    let calculatedPrice = basePrice;
    
    // تعديل السعر حسب المدينة
    const cityMultipliers: { [key: string]: number } = {
      'الرياض': 1.2,
      'جدة': 1.15,
      'مكة المكرمة': 1.1,
      'المدينة المنورة': 1.05,
      'الدمام': 1.1,
    };
    calculatedPrice *= cityMultipliers[city] || 1;
    
    // تعديل السعر حسب نوع العقار
    const propertyTypeMultipliers: { [key: string]: number } = {
      'فيلا': 1.3,
      'دوبلكس': 1.2,
      'شقة': 1.0,
      'عمارة': 1.5,
      'أرض': 0.8,
    };
    calculatedPrice *= propertyTypeMultipliers[propertyType] || 1;
    
    // تعديل السعر حسب المرافق
    if (hasPool) calculatedPrice *= 1.1;
    if (hasGarden) calculatedPrice *= 1.05;
    if (hasElevator) calculatedPrice *= 1.08;
    if (hasAC) calculatedPrice *= 1.03;
    
    const finalEstimatedValue = Math.round(calculatedPrice * parseFloat(area));
    const finalMinValue = Math.round(finalEstimatedValue * 0.9);
    const finalMaxValue = Math.round(finalEstimatedValue * 1.1);
    const finalPricePerMeter = Math.round(calculatedPrice);
    const finalConfidence = 85 + Math.floor(Math.random() * 10);

    // جمع جميع البيانات
    const evaluationData = {
      userId: session?.user?.id || null,
      area: parseFloat(area),
      city,
      district,
      propertyType,
      propertyAge,
      bedrooms: bedrooms ? parseInt(bedrooms) : null,
      bathrooms: bathrooms ? parseInt(bathrooms) : null,
      livingRooms: livingRooms ? parseInt(livingRooms) : null,
      kitchens: kitchens ? parseInt(kitchens) : null,
      maidRoom: maidRoom || false,
      driverRoom: driverRoom || false,
      hasPool: hasPool || false,
      hasGarden: hasGarden || false,
      hasElevator: hasElevator || false,
      parkingSpaces: parkingSpaces ? parseInt(parkingSpaces) : null,
      hasAC: hasAC || false,
      nearMosque: nearMosque || false,
      nearSchool: nearSchool || false,
      nearHospital: nearHospital || false,
      nearMall: nearMall || false,
      streetWidth: streetWidth ? parseInt(streetWidth) : null,
      facing,
      floorNumber: floorNumber ? parseInt(floorNumber) : null,
      totalFloors: totalFloors ? parseInt(totalFloors) : null,
      finishLevel,
      furnished: furnished || false,
      estimatedValue: finalEstimatedValue,
      minValue: finalMinValue,
      maxValue: finalMaxValue,
      pricePerMeter: finalPricePerMeter,
      confidence: finalConfidence,
      allData: body,
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
      userAgent: request.headers.get('user-agent'),
    };

    // TODO: حفظ في قاعدة البيانات
    // await db.insert(evaluations).values(evaluationData);

    return NextResponse.json({
      success: true,
      data: {
        estimatedValue: finalEstimatedValue,
        minValue: finalMinValue,
        maxValue: finalMaxValue,
        pricePerMeter: finalPricePerMeter,
        confidence: finalConfidence,
        evaluationId: Math.floor(Math.random() * 10000), // ID مؤقت
      },
    });

  } catch (error) {
    console.error('Error saving evaluation:', error);
    return NextResponse.json(
      { success: false, error: 'حدث خطأ أثناء حفظ التقييم' },
      { status: 500 }
    );
  }
}


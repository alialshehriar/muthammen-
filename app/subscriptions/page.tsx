'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Check,
  Crown,
  Star,
  Zap,
  Sparkles,
  Bell,
  TrendingUp,
  Users,
  MessageCircle,
  Shield,
  Gift,
  Award,
  ChevronLeft,
} from 'lucide-react';

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'مجاني',
      icon: Gift,
      color: 'from-gray-500 to-gray-600',
      price: { monthly: 0, yearly: 0 },
      description: 'للمستخدمين الجدد والمستكشفين',
      features: [
        'تصفح جميع المشاريع',
        'دعم المشاريع',
        'إنشاء مشروع واحد',
        'الوصول للمجتمعات العامة',
        'دعم فني أساسي',
      ],
      limitations: [
        'لا يوجد إشعارات مبكرة',
        'لا يوجد تحليلات متقدمة',
        'لا يوجد أولوية في التواصل',
      ],
      popular: false,
    },
    {
      id: 'silver',
      name: 'فضي',
      icon: Star,
      color: 'from-gray-400 to-gray-500',
      price: { monthly: 49, yearly: 490 },
      description: 'للداعمين النشطين',
      features: [
        'جميع مزايا الخطة المجانية',
        'إشعارات مبكرة للمشاريع الجديدة',
        'تنبيهات للمشاريع القريبة من الاكتمال',
        'إنشاء 3 مشاريع',
        'خصم 10% على رسوم التفاوض',
        'شارة "داعم فضي"',
      ],
      popular: false,
    },
    {
      id: 'gold',
      name: 'ذهبي',
      icon: Crown,
      color: 'from-yellow-400 to-yellow-600',
      price: { monthly: 99, yearly: 990 },
      description: 'للمستثمرين الجادين',
      features: [
        'جميع مزايا الخطة الفضية',
        'الوصول لمجتمعات ذهبية حصرية',
        'تحليلات AI متقدمة للمشاريع',
        'توصيات مخصصة بناءً على اهتماماتك',
        'إنشاء 10 مشاريع',
        'أولوية في التواصل مع أصحاب المشاريع',
        'خصم 20% على رسوم التفاوض',
        'شارة "مستثمر ذهبي"',
      ],
      popular: true,
    },
    {
      id: 'platinum',
      name: 'بلاتيني',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      price: { monthly: 199, yearly: 1990 },
      description: 'للمستثمرين المحترفين',
      features: [
        'جميع مزايا الخطة الذهبية',
        'وصول مبكر لجميع المشاريع (24 ساعة)',
        'مجتمعات بلاتينية VIP',
        'تقارير AI تفصيلية شهرية',
        'مشاريع غير محدودة',
        'مدير حساب مخصص',
        'أولوية قصوى في الدعم الفني',
        'خصم 30% على رسوم التفاوض',
        'دعوات حصرية لفعاليات المستثمرين',
        'شارة "مستثمر بلاتيني"',
      ],
      popular: false,
    },
  ];

  const benefits = [
    {
      icon: Bell,
      title: 'إشعارات ذكية',
      description: 'احصل على تنبيهات فورية للمشاريع التي تهمك',
    },
    {
      icon: TrendingUp,
      title: 'تحليلات متقدمة',
      description: 'تحليل شامل بالذكاء الاصطناعي لفرص الاستثمار',
    },
    {
      icon: Users,
      title: 'مجتمعات حصرية',
      description: 'انضم لمجتمعات المستثمرين المحترفين',
    },
    {
      icon: Shield,
      title: 'حماية متقدمة',
      description: 'حماية إضافية لاستثماراتك ومعلوماتك',
    },
  ];

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyTotal = plan.price.monthly * 12;
    const yearlySavings = monthlyTotal - plan.price.yearly;
    const savingsPercent = Math.round((yearlySavings / monthlyTotal) * 100);
    return { amount: yearlySavings, percent: savingsPercent };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-semibold">خطط الاشتراك المميزة</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              اختر الخطة المناسبة لك
            </h1>
            <p className="text-xl text-white/90 mb-8">
              احصل على مزايا حصرية وكن من أوائل المستثمرين في أفضل المشاريع
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm p-2 rounded-xl">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-primary shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                شهري
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-primary shadow-lg'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                سنوي
                <span className="mr-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                  وفّر 17%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-20">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
              const savings = getSavings(plan);

              return (
                <div
                  key={plan.id}
                  className={`card-hover relative ${
                    plan.popular ? 'ring-2 ring-primary shadow-2xl scale-105' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                        الأكثر شعبية
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl mb-4`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Plan Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900">{price}</span>
                        <span className="text-gray-600">ريال</span>
                        {price > 0 && (
                          <span className="text-sm text-gray-500">/{billingCycle === 'monthly' ? 'شهر' : 'سنة'}</span>
                        )}
                      </div>
                      {billingCycle === 'yearly' && price > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                          وفّر {savings.amount} ريال ({savings.percent}%)
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/subscriptions/checkout?plan=${plan.id}&cycle=${billingCycle}`}
                      className={`btn w-full mb-6 ${
                        plan.popular ? 'btn-primary' : 'btn-outline'
                      }`}
                    >
                      {plan.id === 'free' ? 'ابدأ مجاناً' : 'اشترك الآن'}
                      <ChevronLeft className="w-5 h-5" />
                    </Link>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section section-alt">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تشترك في <span className="gradient-text">بذرة</span>؟
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              احصل على مزايا حصرية تساعدك على اتخاذ قرارات استثمارية أفضل
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="card-hover p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            الأسئلة الشائعة
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'هل يمكنني إلغاء الاشتراك في أي وقت؟',
                a: 'نعم، يمكنك إلغاء اشتراكك في أي وقت من صفحة الإعدادات. سيستمر اشتراكك حتى نهاية الفترة المدفوعة.',
              },
              {
                q: 'هل يمكنني الترقية أو التخفيض بين الخطط؟',
                a: 'نعم، يمكنك تغيير خطتك في أي وقت. سيتم احتساب الفرق في السعر تلقائياً.',
              },
              {
                q: 'ما هي طرق الدفع المتاحة؟',
                a: 'نقبل جميع بطاقات الائتمان والخصم، بالإضافة إلى Apple Pay و مدى.',
              },
              {
                q: 'هل هناك فترة تجريبية مجانية؟',
                a: 'نعم، جميع الخطط المدفوعة تأتي مع فترة تجريبية مجانية لمدة 7 أيام.',
              },
            ].map((faq, index) => (
              <div key={index} className="card p-6">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            جاهز للبدء؟
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            اختر الخطة المناسبة لك وابدأ رحلتك الاستثمارية اليوم
          </p>
          <Link href="#plans" className="btn bg-white text-primary hover:bg-gray-100">
            <Crown className="w-5 h-5" />
            <span>اختر خطتك</span>
          </Link>
        </div>
      </section>
    </div>
  );
}


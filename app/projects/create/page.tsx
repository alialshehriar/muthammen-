'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Upload,
  X,
  Plus,
  Trash2,
  Image as ImageIcon,
  FileText,
  DollarSign,
  Calendar,
  Package,
  Info,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export default function CreateProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    category: '',
    fundingGoal: '',
    duration: 30,
    packages: [
      { name: '', description: '', price: '', features: [''] }
    ],
    images: [] as string[],
    video: '',
  });

  const categories = [
    { value: 'tech', label: 'تقنية', icon: '💻' },
    { value: 'education', label: 'تعليم', icon: '📚' },
    { value: 'health', label: 'صحة', icon: '🏥' },
    { value: 'food', label: 'طعام', icon: '🍽️' },
    { value: 'fashion', label: 'أزياء', icon: '👗' },
    { value: 'art', label: 'فن', icon: '🎨' },
    { value: 'sports', label: 'رياضة', icon: '⚽' },
    { value: 'other', label: 'أخرى', icon: '📦' },
  ];

  const steps = [
    { id: 1, title: 'المعلومات الأساسية', icon: FileText },
    { id: 2, title: 'التمويل والباقات', icon: Package },
    { id: 3, title: 'الوسائط', icon: ImageIcon },
    { id: 4, title: 'المراجعة والنشر', icon: CheckCircle },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addPackage = () => {
    setFormData(prev => ({
      ...prev,
      packages: [...prev.packages, { name: '', description: '', price: '', features: [''] }]
    }));
  };

  const removePackage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index)
    }));
  };

  const addFeature = (packageIndex: number) => {
    setFormData(prev => {
      const newPackages = [...prev.packages];
      newPackages[packageIndex].features.push('');
      return { ...prev, packages: newPackages };
    });
  };

  const removeFeature = (packageIndex: number, featureIndex: number) => {
    setFormData(prev => {
      const newPackages = [...prev.packages];
      newPackages[packageIndex].features = newPackages[packageIndex].features.filter((_, i) => i !== featureIndex);
      return { ...prev, packages: newPackages };
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        router.push(`/projects/${data.project.id}`);
      } else {
        alert('حدث خطأ: ' + data.error);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      alert('حدث خطأ أثناء إنشاء المشروع');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                عنوان المشروع *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="أدخل عنواناً جذاباً لمشروعك"
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                وصف مختصر *
              </label>
              <input
                type="text"
                value={formData.shortDescription}
                onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                placeholder="وصف قصير يلخص فكرة مشروعك (100 حرف)"
                className="input"
                maxLength={100}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.shortDescription.length}/100 حرف
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                الوصف التفصيلي *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="اشرح مشروعك بالتفصيل، ما المشكلة التي يحلها؟ ما الذي يميزه؟"
                className="input min-h-[200px]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                الفئة *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => handleInputChange('category', cat.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.category === cat.value
                        ? 'border-primary bg-primary-light'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className="text-sm font-medium text-gray-900">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <DollarSign className="w-4 h-4 inline ml-1" />
                  هدف التمويل (ريال سعودي) *
                </label>
                <input
                  type="number"
                  value={formData.fundingGoal}
                  onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                  placeholder="100000"
                  className="input"
                  min="1000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  <Calendar className="w-4 h-4 inline ml-1" />
                  مدة الحملة (يوم)
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                  className="input"
                >
                  <option value={15}>15 يوم</option>
                  <option value={30}>30 يوم</option>
                  <option value={45}>45 يوم</option>
                  <option value={60}>60 يوم</option>
                  <option value={90}>90 يوم</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  <Package className="w-5 h-5 inline ml-2" />
                  باقات الدعم
                </h3>
                <button
                  type="button"
                  onClick={addPackage}
                  className="btn btn-outline text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة باقة</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.packages.map((pkg, pkgIndex) => (
                  <div key={pkgIndex} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="font-semibold text-gray-900">باقة {pkgIndex + 1}</h4>
                      {formData.packages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePackage(pkgIndex)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <input
                        type="text"
                        value={pkg.name}
                        onChange={(e) => {
                          const newPackages = [...formData.packages];
                          newPackages[pkgIndex].name = e.target.value;
                          handleInputChange('packages', newPackages);
                        }}
                        placeholder="اسم الباقة (مثال: باقة البرونزية)"
                        className="input"
                      />

                      <input
                        type="number"
                        value={pkg.price}
                        onChange={(e) => {
                          const newPackages = [...formData.packages];
                          newPackages[pkgIndex].price = e.target.value;
                          handleInputChange('packages', newPackages);
                        }}
                        placeholder="السعر (ريال)"
                        className="input"
                      />

                      <textarea
                        value={pkg.description}
                        onChange={(e) => {
                          const newPackages = [...formData.packages];
                          newPackages[pkgIndex].description = e.target.value;
                          handleInputChange('packages', newPackages);
                        }}
                        placeholder="وصف الباقة"
                        className="input min-h-[80px]"
                      />

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          المزايا
                        </label>
                        {pkg.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 mb-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => {
                                const newPackages = [...formData.packages];
                                newPackages[pkgIndex].features[featureIndex] = e.target.value;
                                handleInputChange('packages', newPackages);
                              }}
                              placeholder="ميزة من مزايا الباقة"
                              className="input flex-1"
                            />
                            {pkg.features.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeFeature(pkgIndex, featureIndex)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addFeature(pkgIndex)}
                          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>إضافة ميزة</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                صور المشروع
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">اسحب الصور هنا أو انقر للتحميل</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF حتى 10MB</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                فيديو تعريفي (اختياري)
              </label>
              <input
                type="url"
                value={formData.video}
                onChange={(e) => handleInputChange('video', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="input"
              />
              <p className="text-xs text-gray-500 mt-1">
                رابط فيديو من YouTube أو Vimeo
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="card p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">مراجعة المشروع</h4>
                  <p className="text-sm text-blue-700">
                    سيتم مراجعة مشروعك من قبل فريقنا خلال 24-48 ساعة. سنتواصل معك في حال كانت هناك أي ملاحظات.
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ملخص المشروع</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">العنوان</p>
                  <p className="font-semibold text-gray-900">{formData.title || '-'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">الفئة</p>
                  <p className="font-semibold text-gray-900">
                    {categories.find(c => c.value === formData.category)?.label || '-'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">هدف التمويل</p>
                  <p className="font-semibold text-gray-900">
                    {formData.fundingGoal ? `${parseInt(formData.fundingGoal).toLocaleString()} ريال` : '-'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">عدد الباقات</p>
                  <p className="font-semibold text-gray-900">{formData.packages.length} باقة</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">مدة الحملة</p>
                  <p className="font-semibold text-gray-900">{formData.duration} يوم</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-primary mb-4"
          >
            <ArrowRight className="w-5 h-5" />
            <span>رجوع</span>
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">إنشاء مشروع جديد</h1>
              <p className="text-gray-600">شارك فكرتك مع المستثمرين والداعمين</p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-primary to-secondary text-white scale-110'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <p
                      className={`text-xs mt-2 text-center ${
                        isActive ? 'text-primary font-semibold' : 'text-gray-600'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="card p-8 mb-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className="btn btn-outline"
          >
            <ArrowRight className="w-5 h-5" />
            <span>السابق</span>
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
              className="btn btn-primary"
            >
              <span>التالي</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" />
                  <span>جاري النشر...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>نشر المشروع</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


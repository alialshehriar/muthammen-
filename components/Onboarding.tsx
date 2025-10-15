'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Rocket, Users, TrendingUp, Award, Shield,
  CheckCircle, ArrowRight, ArrowLeft, X, Zap, Heart,
  Target, Gift, Crown, Star
} from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
  userName?: string;
}

export default function Onboarding({ onComplete, userName }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [username, setUsername] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  const steps = [
    {
      title: 'مرحباً بك في بذرة! 🌱',
      description: 'منصة الوساطة الذكية الأولى في المملكة لربط الأفكار المبدعة بالمستثمرين الأذكياء',
      icon: Sparkles,
      color: 'from-[#14B8A6] to-[#0F9D8F]',
      features: [
        { icon: Rocket, text: 'أطلق مشروعك واحصل على التمويل' },
        { icon: Users, text: 'تواصل مع مستثمرين حقيقيين' },
        { icon: Shield, text: 'نظام تفاوض آمن ومراقب' },
        { icon: Award, text: 'تقييم AI ذكي لمشاريعك' },
      ]
    },
    {
      title: 'كيف تعمل بذرة؟',
      description: 'عملية بسيطة وسهلة للوصول إلى أهدافك',
      icon: Target,
      color: 'from-[#8B5CF6] to-[#7C3AED]',
      features: [
        { icon: CheckCircle, text: 'أنشئ مشروعك وحدد هدف التمويل' },
        { icon: Zap, text: 'احصل على تقييم AI فوري ومجاني' },
        { icon: Heart, text: 'اجذب الداعمين والمستثمرين' },
        { icon: TrendingUp, text: 'ابدأ التفاوض وحقق أهدافك' },
      ]
    },
    {
      title: 'اختر اسم المستخدم',
      description: 'اختر اسم مستخدم فريد يمثلك في المنصة',
      icon: Star,
      color: 'from-[#F59E0B] to-[#D97706]',
      isUsernameStep: true,
    },
    {
      title: 'ما الذي يهمك؟',
      description: 'اختر المجالات التي تهتم بها لنقدم لك محتوى مخصص',
      icon: Heart,
      color: 'from-[#EC4899] to-[#DB2777]',
      isInterestsStep: true,
    },
  ];

  const interestOptions = [
    { id: 'tech', label: 'التقنية', icon: Rocket },
    { id: 'business', label: 'الأعمال', icon: TrendingUp },
    { id: 'education', label: 'التعليم', icon: Award },
    { id: 'health', label: 'الصحة', icon: Heart },
    { id: 'environment', label: 'البيئة', icon: Sparkles },
    { id: 'social', label: 'اجتماعي', icon: Users },
  ];

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      // Save username and interests
      saveOnboardingData();
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const saveOnboardingData = async () => {
    try {
      await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, interests }),
      });
    } catch (error) {
      console.error('Failed to save onboarding data:', error);
    }
  };

  const toggleInterest = (id: string) => {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const canProceed = () => {
    const step = steps[currentStep];
    if (step.isUsernameStep) {
      return username.length >= 3;
    }
    if (step.isInterestsStep) {
      return interests.length > 0;
    }
    return true;
  };

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative max-w-2xl w-full"
      >
        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute -top-12 right-0 text-white/80 hover:text-white font-bold flex items-center gap-2 transition-colors"
        >
          <span>تخطي</span>
          <X className="w-5 h-5" />
        </button>

        {/* Main Card */}
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-r ${currentStepData.color} rounded-3xl blur-2xl opacity-30`} />
          
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="h-2 bg-gray-200">
              <motion.div
                className={`h-full bg-gradient-to-r ${currentStepData.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center shadow-lg`}>
                      <StepIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-4">
                    {currentStepData.title}
                  </h2>
                  <p className="text-gray-600 text-center mb-8 text-lg">
                    {currentStepData.description}
                  </p>

                  {/* Features List */}
                  {currentStepData.features && (
                    <div className="space-y-4 mb-8">
                      {currentStepData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200"
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentStepData.color} flex items-center justify-center flex-shrink-0`}>
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-gray-900 font-bold">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Username Input */}
                  {currentStepData.isUsernameStep && (
                    <div className="mb-8">
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        اسم المستخدم
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                        placeholder="مثال: ahmed_tech"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#14B8A6] focus:outline-none text-lg font-bold"
                        maxLength={20}
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        يمكن استخدام الحروف الإنجليزية والأرقام والشرطة السفلية فقط
                      </p>
                    </div>
                  )}

                  {/* Interests Selection */}
                  {currentStepData.isInterestsStep && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {interestOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => toggleInterest(option.id)}
                          className={`p-4 rounded-2xl border-2 transition-all ${
                            interests.includes(option.id)
                              ? 'border-[#14B8A6] bg-gradient-to-br from-teal-50 to-teal-100'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <option.icon className={`w-8 h-8 mx-auto mb-2 ${
                            interests.includes(option.id) ? 'text-[#14B8A6]' : 'text-gray-400'
                          }`} />
                          <span className={`text-sm font-bold ${
                            interests.includes(option.id) ? 'text-[#14B8A6]' : 'text-gray-700'
                          }`}>
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    currentStep === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  السابق
                </button>

                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep
                          ? `bg-gradient-to-r ${currentStepData.color} w-8`
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    canProceed()
                      ? `bg-gradient-to-r ${currentStepData.color} text-white hover:shadow-lg`
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {currentStep === steps.length - 1 ? 'ابدأ الآن' : 'التالي'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


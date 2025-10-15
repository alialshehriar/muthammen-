'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Eye,
  EyeOff,
  Check,
  X,
  Save,
  LogOut,
  Trash2,
  AlertCircle,
} from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    // Profile
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    bio: 'مستثمر ومطور تطبيقات',
    location: 'الرياض، السعودية',
    
    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: true,
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    projectUpdates: true,
    newProjects: true,
    messages: true,
    
    // Preferences
    language: 'ar',
    theme: 'light',
    currency: 'SAR',
  });

  const sections = [
    { id: 'profile', label: 'الملف الشخصي', icon: User },
    { id: 'security', label: 'الأمان', icon: Shield },
    { id: 'notifications', label: 'الإشعارات', icon: Bell },
    { id: 'payment', label: 'الدفع', icon: CreditCard },
    { id: 'preferences', label: 'التفضيلات', icon: Globe },
    { id: 'privacy', label: 'الخصوصية', icon: Eye },
  ];

  const handleSave = () => {
    // TODO: API call to save settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">الإعدادات</h1>
          <p className="text-gray-600">إدارة حسابك وتفضيلاتك</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-4 sticky top-24">
              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 pt-6 border-t">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">تسجيل الخروج</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card p-8">
              {/* Profile Section */}
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">الملف الشخصي</h2>
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold">
                      {formData.name.charAt(0)}
                    </div>
                    <div>
                      <button className="btn btn-outline mb-2">تغيير الصورة</button>
                      <p className="text-sm text-gray-600">JPG, PNG أو GIF (حد أقصى 2MB)</p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        الاسم الكامل
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        رقم الجوال
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="input"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        الموقع
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      نبذة عنك
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="input min-h-[100px]"
                      placeholder="اكتب نبذة مختصرة عنك..."
                    />
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">الأمان</h2>
                    <p className="text-gray-600">إدارة كلمة المرور والأمان</p>
                  </div>

                  <div className="card p-6 bg-blue-50 border-blue-200">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-1">حسابك محمي</h3>
                        <p className="text-sm text-blue-700">
                          المصادقة الثنائية مفعلة. حسابك محمي بطبقة أمان إضافية.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">تغيير كلمة المرور</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          كلمة المرور الحالية
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.currentPassword}
                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                            className="input pl-12"
                          />
                          <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          كلمة المرور الجديدة
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.newPassword}
                          onChange={(e) => handleInputChange('newPassword', e.target.value)}
                          className="input"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                          تأكيد كلمة المرور
                        </label>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="input"
                        />
                      </div>

                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-sm text-primary hover:text-primary/80 flex items-center gap-2"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        <span>{showPassword ? 'إخفاء' : 'إظهار'} كلمة المرور</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">المصادقة الثنائية</h3>
                      <p className="text-sm text-gray-600">حماية إضافية لحسابك</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.twoFactorEnabled}
                        onChange={(e) => handleInputChange('twoFactorEnabled', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:right-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Notifications Section */}
              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">الإشعارات</h2>
                    <p className="text-gray-600">إدارة تفضيلات الإشعارات</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'emailNotifications', label: 'إشعارات البريد الإلكتروني', icon: Mail },
                      { id: 'pushNotifications', label: 'الإشعارات الفورية', icon: Bell },
                      { id: 'smsNotifications', label: 'إشعارات SMS', icon: Smartphone },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-gray-900">{item.label}</span>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData[item.id as keyof typeof formData] as boolean}
                              onChange={(e) => handleInputChange(item.id, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:right-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">تفضيلات الإشعارات</h3>
                    <div className="space-y-3">
                      {[
                        { id: 'projectUpdates', label: 'تحديثات المشاريع' },
                        { id: 'newProjects', label: 'مشاريع جديدة' },
                        { id: 'messages', label: 'الرسائل' },
                      ].map((item) => (
                        <label key={item.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                          <input
                            type="checkbox"
                            checked={formData[item.id as keyof typeof formData] as boolean}
                            onChange={(e) => handleInputChange(item.id, e.target.checked)}
                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                          />
                          <span className="font-medium text-gray-900">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences Section */}
              {activeSection === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">التفضيلات</h2>
                    <p className="text-gray-600">تخصيص تجربتك</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <Globe className="w-4 h-4 inline ml-1" />
                        اللغة
                      </label>
                      <select
                        value={formData.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className="input"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        العملة
                      </label>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleInputChange('currency', e.target.value)}
                        className="input"
                      >
                        <option value="SAR">ريال سعودي (SAR)</option>
                        <option value="USD">دولار أمريكي (USD)</option>
                        <option value="EUR">يورو (EUR)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      المظهر
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: 'light', label: 'فاتح', icon: Sun },
                        { value: 'dark', label: 'داكن', icon: Moon },
                      ].map((theme) => {
                        const Icon = theme.icon;
                        return (
                          <button
                            key={theme.value}
                            onClick={() => handleInputChange('theme', theme.value)}
                            className={`p-6 rounded-xl border-2 transition-all ${
                              formData.theme === theme.value
                                ? 'border-primary bg-primary-light'
                                : 'border-gray-200 hover:border-primary/50'
                            }`}
                          >
                            <Icon className="w-8 h-8 mx-auto mb-2" />
                            <p className="font-semibold text-gray-900">{theme.label}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Section */}
              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">الخصوصية</h2>
                    <p className="text-gray-600">إدارة خصوصية بياناتك</p>
                  </div>

                  <div className="card p-6 bg-red-50 border-red-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-red-900 mb-1">منطقة الخطر</h3>
                        <p className="text-sm text-red-700 mb-4">
                          الإجراءات التالية لا يمكن التراجع عنها. يرجى التأكد قبل المتابعة.
                        </p>
                        <button className="btn bg-red-600 hover:bg-red-700 text-white">
                          <Trash2 className="w-5 h-5" />
                          <span>حذف الحساب نهائياً</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="flex items-center justify-between pt-6 border-t mt-8">
                <button className="btn btn-outline">
                  <X className="w-5 h-5" />
                  <span>إلغاء</span>
                </button>
                <button
                  onClick={handleSave}
                  className={`btn ${saved ? 'btn-success' : 'btn-primary'}`}
                >
                  {saved ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>تم الحفظ</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      <span>حفظ التغييرات</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


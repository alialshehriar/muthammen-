'use client';

import { Sparkles, X } from 'lucide-react';
import { useState } from 'react';

export default function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white py-2.5 px-4 animate-gradient">
      <div className="container-custom flex items-center justify-center gap-2 text-sm font-medium">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span className="text-center">
          نسخة العرض والتطوير - النسخة التجريبية ستكون متاحة قريباً
        </span>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute left-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}


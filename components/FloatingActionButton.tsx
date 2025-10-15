'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Rocket, Sparkles, X } from 'lucide-react';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      href: '/projects/create',
      label: 'إنشاء مشروع',
      icon: Rocket,
      color: 'from-[#14B8A6] to-[#0D9488]',
    },
    {
      href: '/ai-evaluation',
      label: 'تقييم مشروع',
      icon: Sparkles,
      color: 'from-[#8B5CF6] to-[#7C3AED]',
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* FAB Container */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="relative">
          {/* Action Buttons */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col gap-3"
              >
                {actions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.div
                      key={action.href}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 20, scale: 0.8 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={action.href}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center gap-4 px-6 py-4 rounded-2xl bg-gradient-to-r ${action.color} text-white shadow-2xl hover:shadow-3xl transition-all hover:scale-105 whitespace-nowrap`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="font-bold text-lg">{action.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center group"
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-8 h-8" />
            </motion.div>

            {/* Pulse Animation */}
            {!isOpen && (
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] animate-ping opacity-75" />
            )}
          </motion.button>

          {/* Tooltip */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-bold whitespace-nowrap pointer-events-none"
            >
              إجراء سريع
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}


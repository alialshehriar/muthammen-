'use client';

import { use, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Send, ArrowLeft, Shield, Clock, AlertCircle,
  CheckCircle, Eye, Lock, Sparkles, Info, X, Check, User,
  FileText, Image as ImageIcon, Paperclip, MoreVertical, Flag,
  Crown, Zap, TrendingUp, Award, Star
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Message {
  id: number;
  content: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
  flagged?: boolean;
}

interface Negotiation {
  id: string;
  projectId: string;
  projectTitle: string;
  otherParty: {
    id: string;
    name: string;
    avatar: string;
  };
  status: 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  daysLeft: number;
  messagesCount: number;
}

export default function NegotiationChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [negotiation, setNegotiation] = useState<Negotiation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetchNegotiationDetails();
    fetchMessages();
    
    // Auto-scroll to bottom
    scrollToBottom();
    
    // Poll for new messages every 5 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchNegotiationDetails = async () => {
    try {
      const response = await fetch(`/api/negotiations/${id}`);
      const data = await response.json();
      if (data.success) {
        setNegotiation(data.negotiation);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/negotiations/${id}/messages`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    
    // Optimistic update
    const tempMessage: Message = {
      id: Date.now(),
      content: newMessage,
      senderId: 'current-user',
      senderName: 'أنت',
      timestamp: new Date().toISOString(),
      isOwn: true,
      status: 'sent',
    };
    
    setMessages(prev => [...prev, tempMessage]);
    setNewMessage('');

    try {
      const response = await fetch(`/api/negotiations/${id}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage }),
      });

      const data = await response.json();
      
      if (data.success) {
        // Replace temp message with real one
        setMessages(prev => 
          prev.map(m => m.id === tempMessage.id ? data.message : m)
        );
      } else {
        // Remove temp message on error
        setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
        alert(data.message || 'فشل إرسال الرسالة');
      }
    } catch (error) {
      setMessages(prev => prev.filter(m => m.id !== tempMessage.id));
      alert('حدث خطأ أثناء إرسال الرسالة');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#14B8A6] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-bold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!negotiation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/20 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 font-bold">لم يتم العثور على التفاوض</p>
        </div>
      </div>
    );
  }

  const timeRemaining = negotiation.daysLeft;
  const hoursLeft = timeRemaining * 24;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50/20">
      <Navigation />

      <div className="pt-20 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => router.back()}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-bold">رجوع</span>
                </button>

                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  <Info className="w-5 h-5" />
                  <span>معلومات التفاوض</span>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#14B8A6] to-[#8B5CF6] flex items-center justify-center text-white text-2xl font-black shadow-lg">
                    {negotiation.otherParty.name[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{negotiation.projectTitle}</h2>
                    <p className="text-gray-600">محادثة مع {negotiation.otherParty.name}</p>
                  </div>
                </div>

                {/* Time Remaining Badge */}
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                      <div className="text-right">
                        <div className="text-2xl font-black text-white">{timeRemaining}</div>
                        <div className="text-xs text-white/90 font-bold">يوم متبقي</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                    <div className="text-right">
                      <div className="text-sm font-black text-white">محمي بالكامل</div>
                      <div className="text-xs text-white/90">مراقبة AI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Panel */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-3xl p-8 border-2 border-purple-200/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0F9D8F] flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">فترة التفاوض</h4>
                      <p className="text-gray-600 text-sm">3 أيام من المحادثات المراقبة</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">حماية كاملة</h4>
                      <p className="text-gray-600 text-sm">مراقبة ذكية للملكية الفكرية</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1">ضمان الاسترجاع</h4>
                      <p className="text-gray-600 text-sm">استرجاع كامل عند عدم الاتفاق</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Container */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#14B8A6]/10 to-[#8B5CF6]/10 rounded-3xl blur-2xl" />
          
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            {/* Messages Area */}
            <div className="h-[600px] overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-center"
              >
                <div className="max-w-2xl bg-gradient-to-br from-[#14B8A6]/10 to-[#8B5CF6]/10 rounded-2xl p-6 border-2 border-[#14B8A6]/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-2">مرحباً بك في نظام التفاوض الآمن</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        هذه المحادثة محمية ومراقبة بواسطة نظام ذكاء اصطناعي متقدم. يرجى الالتزام بالاحترام المتبادل وعدم مشاركة معلومات حساسة. لديك {timeRemaining} أيام للوصول إلى اتفاق.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Messages */}
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    <div className="flex items-end gap-3">
                      {!message.isOwn && (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {message.senderName[0]}
                        </div>
                      )}
                      
                      <div className="flex-1">
                        {!message.isOwn && (
                          <div className="text-sm font-bold text-gray-700 mb-1 px-2">
                            {message.senderName}
                          </div>
                        )}
                        
                        <div className={`relative group/msg ${message.isOwn ? 'text-left' : 'text-right'}`}>
                          {message.flagged && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center z-10">
                              <Flag className="w-3 h-3 text-white" />
                            </div>
                          )}
                          
                          <div className={`inline-block px-6 py-4 rounded-2xl shadow-lg ${
                            message.isOwn
                              ? 'bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}>
                            <p className="leading-relaxed">{message.content}</p>
                          </div>
                          
                          <div className={`flex items-center gap-2 mt-2 px-2 text-xs text-gray-500 ${
                            message.isOwn ? 'justify-end' : 'justify-start'
                          }`}>
                            <span>{new Date(message.timestamp).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
                            {message.isOwn && (
                              <div>
                                {message.status === 'read' && <CheckCircle className="w-4 h-4 text-[#14B8A6]" />}
                                {message.status === 'delivered' && <Check className="w-4 h-4 text-gray-400" />}
                                {message.status === 'sent' && <Clock className="w-4 h-4 text-gray-400" />}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {message.isOwn && (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#8B5CF6] flex items-center justify-center text-white font-bold flex-shrink-0">
                          أ
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* AI Monitoring Badge */}
            <div className="px-8 py-3 bg-gradient-to-r from-purple-50 to-teal-50 border-t border-purple-200/50">
              <div className="flex items-center justify-center gap-3">
                <Eye className="w-5 h-5 text-[#8B5CF6]" />
                <span className="text-sm font-bold text-gray-700">
                  هذه المحادثة مراقبة بواسطة نظام AI لضمان الأمان والاحترام
                </span>
                <Shield className="w-5 h-5 text-[#14B8A6]" />
              </div>
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-gray-200">
              <div className="flex items-end gap-4">
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                    placeholder="اكتب رسالتك هنا..."
                    rows={3}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#14B8A6] resize-none text-gray-900 placeholder-gray-400 font-medium"
                  />
                  
                  {/* Character Count */}
                  <div className="absolute bottom-2 left-2 text-xs text-gray-400">
                    {newMessage.length} / 1000
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={!newMessage.trim() || sending}
                  whileHover={{ scale: newMessage.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: newMessage.trim() ? 0.95 : 1 }}
                  className={`px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all shadow-lg ${
                    newMessage.trim() && !sending
                      ? 'bg-gradient-to-r from-[#14B8A6] to-[#8B5CF6] text-white hover:shadow-2xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>إرسال...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>إرسال</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Guidelines */}
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Info className="w-4 h-4" />
                <span>اضغط Enter للإرسال • Shift + Enter لسطر جديد • التزم بالاحترام المتبادل</span>
              </div>
            </form>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Lock, label: 'تشفير كامل', color: 'from-[#14B8A6] to-[#0F9D8F]' },
            { icon: Shield, label: 'مراقبة AI', color: 'from-[#8B5CF6] to-[#7C3AED]' },
            { icon: CheckCircle, label: 'موثوق 100%', color: 'from-[#10B981] to-[#059669]' },
            { icon: Award, label: 'معتمد رسمياً', color: 'from-[#F59E0B] to-[#D97706]' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-lg text-center">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-3`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-gray-900 text-sm">{item.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Footer />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #14B8A6, #8B5CF6);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0F9D8F, #7C3AED);
        }
      `}</style>
    </div>
  );
}


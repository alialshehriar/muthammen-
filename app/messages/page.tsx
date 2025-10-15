'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Image as ImageIcon,
  File,
  Check,
  CheckCheck,
  Circle,
} from 'lucide-react';

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'text' | 'image' | 'file';
}

interface Conversation {
  id: number;
  user: {
    id: number;
    name: string;
    avatar: string;
    online: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 1; // Replace with actual user ID

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversations = async () => {
    // Simulated data - replace with actual API call
    setConversations([
      {
        id: 1,
        user: {
          id: 2,
          name: 'أحمد محمد',
          avatar: '/images/avatar1.jpg',
          online: true,
        },
        lastMessage: 'شكراً على دعمك للمشروع!',
        timestamp: '10:30 ص',
        unread: 2,
      },
      {
        id: 2,
        user: {
          id: 3,
          name: 'فاطمة علي',
          avatar: '/images/avatar2.jpg',
          online: false,
        },
        lastMessage: 'هل يمكننا مناقشة التفاصيل؟',
        timestamp: 'أمس',
        unread: 0,
      },
      {
        id: 3,
        user: {
          id: 4,
          name: 'خالد سعيد',
          avatar: '/images/avatar3.jpg',
          online: true,
        },
        lastMessage: 'تم إرسال الملفات',
        timestamp: 'الأحد',
        unread: 0,
      },
    ]);
  };

  const fetchMessages = async (conversationId: number) => {
    // Simulated data - replace with actual API call
    setMessages([
      {
        id: 1,
        senderId: 2,
        content: 'مرحباً! شاهدت مشروعك وأعجبني جداً',
        timestamp: '10:25 ص',
        read: true,
        type: 'text',
      },
      {
        id: 2,
        senderId: currentUserId,
        content: 'شكراً جزيلاً! سعيد بإعجابك',
        timestamp: '10:27 ص',
        read: true,
        type: 'text',
      },
      {
        id: 3,
        senderId: 2,
        content: 'هل يمكنني الاستثمار في المشروع؟',
        timestamp: '10:28 ص',
        read: true,
        type: 'text',
      },
      {
        id: 4,
        senderId: currentUserId,
        content: 'بالتأكيد! يمكنك اختيار الباقة المناسبة من صفحة المشروع',
        timestamp: '10:29 ص',
        read: true,
        type: 'text',
      },
      {
        id: 5,
        senderId: 2,
        content: 'شكراً على دعمك للمشروع!',
        timestamp: '10:30 ص',
        read: false,
        type: 'text',
      },
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: messages.length + 1,
      senderId: currentUserId,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'text',
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // TODO: Send message via API
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className="w-full md:w-96 bg-white border-l flex flex-col">
          {/* Header */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">الرسائل</h1>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="بحث في المحادثات..."
                className="w-full pr-12 pl-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors ${
                  selectedConversation?.id === conversation.id ? 'bg-primary-light' : ''
                }`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {conversation.user.name.charAt(0)}
                  </div>
                  {conversation.user.online && (
                    <div className="absolute bottom-0 left-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-right min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{conversation.user.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 mr-2">{conversation.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-white text-xs rounded-full flex items-center justify-center mr-2">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation ? (
          <div className="flex-1 flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                    {selectedConversation.user.name.charAt(0)}
                  </div>
                  {selectedConversation.user.online && (
                    <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">{selectedConversation.user.name}</h2>
                  <p className="text-sm text-gray-600">
                    {selectedConversation.user.online ? 'متصل الآن' : 'غير متصل'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Info className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => {
                const isOwn = message.senderId === currentUserId;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl ${
                        isOwn
                          ? 'bg-gradient-to-r from-primary to-secondary text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className={`flex items-center gap-1 mt-1 text-xs ${isOwn ? 'text-white/80' : 'text-gray-500'}`}>
                        <span>{message.timestamp}</span>
                        {isOwn && (
                          message.read ? (
                            <CheckCheck className="w-4 h-4" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-6 border-t">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ImageIcon className="w-5 h-5 text-gray-600" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="اكتب رسالتك..."
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-primary"
                  />
                  <button className="absolute left-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors">
                    <Smile className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">اختر محادثة</h2>
              <p className="text-gray-600">ابدأ بالتواصل مع المستثمرين وأصحاب المشاريع</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


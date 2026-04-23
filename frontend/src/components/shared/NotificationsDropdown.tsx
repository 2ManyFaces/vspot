"use client";

import { useState, useEffect, useRef } from 'react';
import { Bell, Info, Star, MapPin, Calendar, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'alert' | 'event';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'event',
    title: 'New Event Nearby',
    message: 'Live Jazz at Blue Note Banani starts in 2 hours!',
    time: '2h ago',
    read: false,
  },
  {
    id: '2',
    type: 'success',
    title: 'Review Approved',
    message: 'Your review for "Neon Nights Rooftop" is now live.',
    time: '5h ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'New Place Added',
    message: 'Check out "The Secret Garden", a new cafe in Dhanmondi.',
    time: '1d ago',
    read: true,
  },
];

export default function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'event': return <Calendar className="h-4 w-4 text-sky-500" />;
      case 'success': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'alert': return <Star className="h-4 w-4 text-amber-500" />;
      default: return <Info className="h-4 w-4 text-brand-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:text-brand-500 hover:bg-brand-500/5 hover:scale-105"
        style={{
          backgroundColor: 'var(--bg-elevated)',
          color: 'var(--text-muted)',
        }}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-[var(--bg-elevated)] rounded-full" />
        )}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-3 w-80 sm:w-96 surface-elevated border border-[var(--border)] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Notifications</h3>
            <button 
              onClick={markAllRead}
              className="text-xs font-semibold text-brand-500 hover:text-brand-400 transition-colors"
            >
              Mark all as read
            </button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-[var(--border)]">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`p-4 flex gap-4 transition-colors hover:bg-brand-500/5 cursor-pointer ${!n.read ? 'bg-brand-500/[0.02]' : ''}`}
                  >
                    <div className="mt-1 w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center shrink-0">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm font-bold ${!n.read ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] font-medium text-[var(--text-muted)] shrink-0">{n.time}</span>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                        {n.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-[var(--text-muted)] space-y-2">
                <Bell className="h-8 w-8 mx-auto opacity-20" />
                <p className="text-sm">No notifications yet</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-[var(--bg-card)] text-center border-t border-[var(--border)]">
            <Link 
              href="/profile?tab=notifications" 
              className="text-xs font-bold text-[var(--text-muted)] hover:text-brand-500 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View all notification history
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

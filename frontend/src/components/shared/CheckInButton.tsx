"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CheckInButtonProps {
  placeId?: number;
  eventId?: number;
}

export default function CheckInButton({ placeId, eventId }: CheckInButtonProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const handleCheckIn = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);
    const token = Cookies.get('auth_token');

    try {
      await axios.post('http://127.0.0.1:8000/api/check-ins', 
        { place_id: placeId, event_id: eventId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHasCheckedIn(true);
    } catch (error) {
      console.error('Check-in failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasCheckedIn) {
    return (
      <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
        <CheckCircle2 className="h-5 w-5" />
        Checked In
      </div>
    );
  }

  return (
    <button
      onClick={handleCheckIn}
      disabled={isLoading}
      className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 shadow-lg ${
        isLoading 
          ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
          : 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98]'
      }`}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <MapPin className="h-5 w-5" />
      )}
      {isLoading ? 'Checking in...' : 'Check In'}
    </button>
  );
}

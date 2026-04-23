"use client";

import { useState, useEffect, useCallback } from 'react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';
import { MessageSquare, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Cookies from 'js-cookie';
import ConfirmModal from '../shared/ConfirmModal';

interface ReviewSectionProps {
  placeId?: number;
  eventId?: number;
  initialReviews: any[];
}

export default function ReviewSection({ placeId, eventId, initialReviews }: ReviewSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(initialReviews);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync state if initialReviews (from server) changes
  useEffect(() => {
    setReviews(initialReviews || []);
  }, [initialReviews]);

  const refreshReviews = useCallback(async () => {
    try {
      const params = placeId ? `place_id=${placeId}` : `event_id=${eventId}`;
      const res = await fetch(`http://127.0.0.1:8000/api/reviews?${params}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setReviews(data.data || []);
      }
    } catch {
      // silently fail
    }
  }, [placeId, eventId]);

  const handleConfirmDelete = async () => {
    if (!reviewToDelete) return;
    
    setIsDeleting(true);
    try {
      const token = Cookies.get('auth_token');
      const res = await fetch(`http://127.0.0.1:8000/api/reviews/${reviewToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      
      if (res.ok) {
        setReviewToDelete(null);
        refreshReviews();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(errorData.message || 'Failed to delete review. Please try again.');
      }
    } catch (err) {
      console.error("Failed to delete review", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8" id="review-form">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-5 w-5 text-brand-400" />
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Reviews ({reviews.length})
        </h2>
      </div>

      {user ? (
        <ReviewForm
          placeId={placeId}
          eventId={eventId}
          editingReview={editingReview}
          onCancelEdit={() => setEditingReview(null)}
          onReviewSubmitted={() => {
            setEditingReview(null);
            refreshReviews();
          }}
        />
      ) : (
        /* ... existing guest message ... */
        <div className="surface-elevated rounded-2xl p-6 border border-[var(--border)] text-center flex flex-col items-center gap-3 mt-6">
          <MessageSquare className="h-8 w-8 text-brand-500 opacity-50" />
          <div>
            <h3 className="font-bold text-[var(--text-primary)]">Have you been here?</h3>
            <p className="text-sm text-[var(--text-muted)] mt-1 mb-4">You must be logged in to share your experience and write a review.</p>
          </div>
          <Link href="/login" className="bg-brand-500 hover:bg-brand-400 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition flex items-center gap-2">
            <LogIn className="h-4 w-4" /> Log in to review
          </Link>
        </div>
      )}

      <ReviewList 
        reviews={reviews} 
        onEdit={(review) => {
          setEditingReview(review);
          window.scrollTo({ top: document.getElementById('review-form')?.offsetTop ? document.getElementById('review-form')!.offsetTop - 100 : 0, behavior: 'smooth' });
        }}
        onDelete={(id) => setReviewToDelete(id)}
      />

      <ConfirmModal
        isOpen={reviewToDelete !== null}
        onClose={() => setReviewToDelete(null)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
        title="Delete Review?"
        message="Are you sure you want to remove your review? This action cannot be undone and will update the overall rating for this place."
        confirmText="Delete Review"
      />
    </div>
  );
}

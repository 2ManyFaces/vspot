"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { 
  Camera, 
  MapPin, 
  Star, 
  Heart, 
  Clock, 
  Edit3, 
  Check, 
  X, 
  Loader2,
  CalendarDays
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { user, isLoading, login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") as "reviews" | "wishlist" | "checkins";

  // Activity State
  const [activityData, setActivityData] = useState<any>(null);
  const [stats, setStats] = useState({ reviews: 0, wishlist: 0, checkins: 0 });
  const [activeTab, setActiveTab] = useState<"reviews" | "wishlist" | "checkins">(initialTab || "reviews");
  const [loadingActivity, setLoadingActivity] = useState(true);

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    display_name: "",
    bio: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user && !activityData) {
      fetchActivity();
    }
    // Set initial form state when user loads
    if (user && !isEditing) {
      setEditForm({
        display_name: user?.display_name || "",
        bio: user?.bio || "",
      });
      setPreviewUrl(user?.profile_photo_url ? (user.profile_photo_url.startsWith('http') ? user.profile_photo_url : `http://127.0.0.1:8000${user.profile_photo_url}`) : null);
    }
  }, [user, isEditing]);

  useEffect(() => {
    if (initialTab && ["reviews", "wishlist", "checkins"].includes(initialTab)) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const fetchActivity = async () => {
    try {
      const token = Cookies.get("auth_token");
      const res = await fetch("http://127.0.0.1:8000/api/profile/activity", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
      if (res.ok) {
        const json = await res.json();
        setActivityData(json.data);
        setStats({
          reviews: json.data.stats.review_count,
          wishlist: json.data.stats.wishlist_count,
          checkins: json.data.stats.check_in_count,
        });
      }
    } catch (err) {
      console.error("Failed to load activity", err);
    } finally {
      setLoadingActivity(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setError("");
    const token = Cookies.get("auth_token");
    
    try {
      const formData = new FormData();
      // append only if changed
      if (editForm.display_name !== user?.display_name) {
        formData.append("display_name", editForm.display_name);
      }
      if (editForm.bio !== user?.bio) {
        formData.append("bio", editForm.bio);
      }
      if (selectedFile) {
        formData.append("profile_photo", selectedFile);
      }
      
      // No _method spoofing needed anymore as backend is POST
      const res = await fetch("http://127.0.0.1:8000/api/profile", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        },
        body: formData
      });

      const data = await res.json();
      
      if (res.ok) {
        setIsEditing(false);
        // Refresh global user state carefully merging updated info. 
        if (token) login(token, data.data, "user"); 
        setSelectedFile(null); // Clear selected file after success
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-brand-500" />
      </div>
    );
  }

  // Helper to format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[85vh]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - User Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="surface-elevated rounded-3xl p-8 border border-[var(--border)] relative overflow-hidden shadow-sm flex flex-col items-center">
            
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-brand-500/20 to-brand-600/5"></div>
            
            <div className="relative group mb-6 mt-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--bg-elevated)] bg-gray-100 dark:bg-zinc-800 shadow-xl relative z-10">
                {previewUrl ? (
                  <Image src={previewUrl} alt="Avatar" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                    {user.display_name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              {isEditing && (
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 z-20 bg-brand-500 text-white p-2.5 rounded-full shadow-lg hover:bg-brand-400 transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </button>
              )}
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="w-full relative z-10 text-center">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1 block text-left">Display Name</label>
                    <input 
                      type="text" 
                      value={editForm.display_name}
                      onChange={(e) => setEditForm({...editForm, display_name: e.target.value})}
                      className="w-full surface border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1 block text-left">Short Bio</label>
                    <textarea 
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      rows={3}
                      className="w-full surface border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-brand-500/50 outline-none resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  {error && <p className="text-red-500 text-xs font-medium text-left">{error}</p>}
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-2 rounded-xl text-sm font-semibold surface border border-[var(--border)] hover:bg-[var(--bg-default)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="flex-1 bg-brand-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex justify-center items-center gap-2 hover:bg-brand-400 transition-colors shadow-lg shadow-brand-500/25"
                    >
                      {saving ? <Loader2 className="h-4 w-4 animate-spin"/> : <Check className="h-4 w-4" />} Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight mb-1">
                    {user.display_name}
                  </h1>
                  <p className="text-sm font-medium text-[var(--text-muted)] mb-5">
                    {user.email}
                  </p>
                  
                  {user.bio && (
                    <div className="text-sm text-[var(--text-primary)] opacity-80 italic bg-[var(--bg-default)] p-4 rounded-2xl mb-6">
                      "{user.bio}"
                    </div>
                  )}

                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full py-2.5 rounded-xl border border-[var(--border)] font-semibold text-sm hover:bg-[var(--bg-default)] transition-all flex items-center justify-center gap-2 text-[var(--text-primary)]"
                  >
                    <Edit3 className="h-4 w-4" /> Edit Profile
                  </button>
                </>
              )}
            </div>
            
            <div className="w-full mt-8 pt-6 border-t border-[var(--border)] grid grid-cols-3 divide-x divide-[var(--border)]">
              <div className="text-center">
                <div className="text-xl font-black text-[var(--text-primary)]">{stats.reviews}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-black text-[var(--text-primary)]">{stats.wishlist}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Saved</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-black text-[var(--text-primary)]">{stats.checkins}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Visited Places</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Activity Dashboard */}
        <div className="lg:col-span-8">
          <div className="flex gap-2 mb-6 border-b border-[var(--border)] pb-px">
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'reviews' ? 'border-brand-500 text-brand-500' : 'border-transparent text-[var(--text-muted)] hover:border-[var(--border)]'}`}
            >
              My Reviews
            </button>
            <button 
              onClick={() => setActiveTab("wishlist")}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'wishlist' ? 'border-brand-500 text-brand-500' : 'border-transparent text-[var(--text-muted)] hover:border-[var(--border)]'}`}
            >
              Wishlist
            </button>
            <button 
              onClick={() => setActiveTab("checkins")}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-all ${activeTab === 'checkins' ? 'border-brand-500 text-brand-500' : 'border-transparent text-[var(--text-muted)] hover:border-[var(--border)]'}`}
            >
              Visited Places
            </button>
          </div>

          <div className="relative min-h-[400px]">
            {loadingActivity ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-brand-500/50" />
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* REVIEWS TAB */}
                {activeTab === 'reviews' && activityData?.reviews?.map((review: any) => (
                  <div key={review.id} className="p-5 surface-elevated border border-[var(--border)] rounded-2xl flex flex-col gap-3 transition-colors hover:border-brand-500/30">
                    <div className="flex justify-between items-start">
                      <Link href={`/places/${review.place?.id}`} className="font-bold text-lg hover:text-brand-500 transition-colors">
                        {review.place?.name || "Unknown Venue"}
                      </Link>
                      <div className="flex bg-amber-500/10 px-2.5 py-1 rounded-lg items-center gap-1">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-amber-600">{review.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--text-primary)] opacity-80 leading-relaxed">
                      "{review.body}"
                    </p>
                    <div className="text-xs text-[var(--text-muted)] font-medium flex items-center gap-1.5 mt-1">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Posted on {formatDate(review.created_at)}
                    </div>
                  </div>
                ))}
                {activeTab === 'reviews' && activityData?.reviews?.length === 0 && (
                   <p className="text-center py-20 text-[var(--text-muted)] text-sm">You haven't written any reviews yet.</p>
                )}

                {/* WISHLIST TAB */}
                {activeTab === 'wishlist' && activityData?.wishlist?.map((item: any) => (
                  <Link key={item.id} href={`/places/${item.place?.id}`}>
                    <div className="p-4 surface-elevated border border-[var(--border)] rounded-2xl flex items-center gap-5 hover:border-brand-500/30 transition-all group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0">
                        {item.place?.cover_image_url ? (
                          <Image src={item.place.cover_image_url} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-zinc-800" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{item.place?.name}</h3>
                        <div className="flex items-center text-xs text-[var(--text-muted)] gap-3 font-medium">
                          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {item.place?.area_name}</span>
                          <span className="flex items-center gap-1 text-rose-500"><Heart className="h-3.5 w-3.5 fill-rose-500" /> Saved {formatDate(item.added_at)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                {activeTab === 'wishlist' && activityData?.wishlist?.length === 0 && (
                   <p className="text-center py-20 text-[var(--text-muted)] text-sm">Your wishlist is empty.</p>
                )}

                {/* HISTORY/CHECK-INS TAB */}
                {activeTab === 'checkins' && activityData?.check_ins?.map((ci: any) => (
                  <div key={ci.id} className="px-5 py-4 surface-elevated border border-[var(--border)] rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold">{ci.place?.name}</h3>
                        <p className="text-xs text-[var(--text-muted)] font-medium flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                          Visited on {formatDate(ci.checked_in_at)}
                        </p>
                      </div>
                    </div>
                    <Link href={`/places/${ci.place?.id}`} className="px-4 py-2 bg-[var(--bg-default)] rounded-xl text-xs font-bold hover:text-brand-500 transition-colors border border-[var(--border)]">
                      View Venue
                    </Link>
                  </div>
                ))}
                {activeTab === 'checkins' && activityData?.check_ins?.length === 0 && (
                   <p className="text-center py-20 text-[var(--text-muted)] text-sm">No venue visitation history found.</p>
                )}

              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

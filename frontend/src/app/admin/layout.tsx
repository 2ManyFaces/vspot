"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MapPin, 
  Calendar, 
  Users, 
  FileText, 
  LogOut,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, role, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && role !== 'admin') {
      router.push('/admin-login');
    }
  }, [role, isLoading, router]);

  if (isLoading || role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-brand-500 rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/admin-login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Places', href: '/admin/places', icon: <MapPin className="w-5 h-5" /> },
    { name: 'Events', href: '/admin/events', icon: <Calendar className="w-5 h-5" /> },
    { name: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Blog Posts', href: '/admin/blog', icon: <FileText className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-default)]">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-[var(--border)] surface-elevated h-full flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
          <Link href="/" className="flex items-center gap-2 group">
            <ShieldCheck className="h-6 w-6 text-red-500 group-hover:scale-110 transition-transform" />
            <span className="font-bold tracking-tight text-[var(--text-primary)]">Admin Portal</span>
          </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-colors text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 flex-shrink-0 border-t border-[var(--border)]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.15)]"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 relative overflow-y-auto focus:outline-none">
        <div className="py-6 px-8">
          <h1 className="text-3xl font-extrabold tracking-tight mb-8" style={{ color: 'var(--text-primary)' }}>
            Welcome back, {user?.display_name || 'Admin'}
          </h1>
          {children}
        </div>
      </main>
    </div>
  );
}

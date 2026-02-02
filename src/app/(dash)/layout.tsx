'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Settings, LogOut, FileText, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'All Quotes', href: '/dashboard/quotes', icon: History },
        { label: 'New Quotations', href: '/dashboard/quotes/create', icon: FileText },
        // { label: 'Users', href: '/dashboard/users', icon: Users }, // Commenting out until implemented
        // { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-[#F8FAFC] dark:bg-zinc-950 text-slate-900 dark:text-slate-100 overflow-hidden relative">
            {/* Branded UI accents - subtle glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="flex w-full h-full relative z-10">
                {/* Sidebar - premium glassmorphism */}
                <aside className="w-64 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-r border-slate-200 dark:border-white/5 flex flex-col hidden md:flex shrink-0">
                    <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-white/5 bg-white/40 dark:bg-transparent">
                        <Link href="/dashboard" className="transition-transform hover:scale-105 duration-200">
                            <Image src="/logo_1bg.png" alt="Logo" width={140} height={40} className="object-contain" />
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
                        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div className={`group flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${isActive
                                        ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg shadow-primary/20 scale-[1.02]'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-primary dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                                        }`}>
                                        <Icon className={`w-5 h-5 mr-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary'}`} />
                                        {item.label}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-6 border-t border-slate-100 dark:border-white/5">
                        <form action="/api/auth/logout" method="POST">
                            <Button type="submit" variant="ghost" className="w-full justify-start text-slate-500 hover:text-red-500 hover:bg-red-50 dark:text-slate-400 dark:hover:bg-red-500/10 rounded-xl px-4 font-semibold">
                                <LogOut className="w-5 h-5 mr-3" />
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Topbar - Ultra clean and floating feel */}
                    <header className="h-16 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md border-b border-slate-200/60 dark:border-white/5 flex items-center justify-between px-8 sticky top-0 z-20">
                        <div className="flex items-center space-x-2">
                             <div className="w-1.5 h-6 bg-secondary rounded-full" />
                             <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                                {navItems.find(i => i.href === pathname)?.label || 'Dashboard'}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="hidden sm:flex flex-col items-end mr-1">
                                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Admin User</span>
                                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">Project Manager</span>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[2px] shadow-lg shadow-primary/10 transition-transform hover:rotate-3 duration-300 cursor-pointer">
                                <div className="h-full w-full rounded-[10px] bg-white dark:bg-zinc-900 flex items-center justify-center">
                                    <span className="text-xs font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">AD</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Page Content - with a soft entry animation feel */}
                    <main className="flex-1 overflow-auto p-8 relative">
                         {/* Optional page header title could go here if removing from header */}
                        <div className="max-w-7xl mx-auto h-full">
                            {children}
                        </div>
                    </main>
                </div>
                <Toaster position='top-center' />
            </div>
        </div>
    );
}

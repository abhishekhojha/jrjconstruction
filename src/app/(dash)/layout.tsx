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
        { label: 'New Quote', href: '/dashboard/quotes/create', icon: FileText },
        // { label: 'Users', href: '/dashboard/users', icon: Users }, // Commenting out until implemented
        // { label: 'Settings', href: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-cover bg-center" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')`,
        }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] pointer-events-none" />

            <div className="flex w-full h-full relative z-10">
                {/* Sidebar - macOS style transparency and color */}
                <aside className="w-64 bg-[#F2F3F5]/80 dark:bg-[#1E1E1E]/80 backdrop-blur-2xl border-r border-black/5 dark:border-white/5 flex-col hidden md:flex shrink-0">
                    <div className="h-16 flex items-center px-6 border-b border-slate-100 dark:border-zinc-800">
                        <div className="mr-3">
                            <Image src="/logo_1bg.png" alt="Logo" width={125} height={32} className="object-contain" />
                        </div>
                    </div>

                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link key={item.href} href={item.href}>
                                    <div className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-400 shadow-sm border border-primary/10'
                                        : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-primary dark:text-slate-400 dark:hover:bg-zinc-800 dark:hover:text-slate-100'
                                        }`}>
                                        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-primary'}`} />
                                        {item.label}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-slate-100 dark:border-zinc-800">
                        <form action="/api/auth/logout" method="POST">
                            <Button type="submit" variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                                <LogOut className="w-5 h-5 mr-3" />
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Topbar - Floating glass effect */}
                    <header className="h-14 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 flex items-center justify-between px-6 sticky top-0 z-20">
                        <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                            {navItems.find(i => i.href === pathname)?.label || 'Dashboard'}
                        </h1>

                        <div className="flex items-center space-x-4">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-teal to-secondary flex items-center justify-center text-sm font-medium text-white shadow-md">
                                AD
                            </div>
                        </div>
                    </header>

                    {/* Page Content - White background for contrast against sidebar */}
                    <main className="flex-1 overflow-auto bg-white/70 dark:bg-black/50 p-6 backdrop-blur-sm">
                        {children}
                    </main>
                </div>
                <Toaster position='top-center' />
            </div>
        </div>
    );
}

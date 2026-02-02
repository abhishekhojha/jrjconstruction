import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Activity, FileText } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-10">
            {/* Upper Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Total Revenue Card */}
                <div className="relative group bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-white/5 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <DollarSign className="h-6 w-6 text-primary" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">+20.1%</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Total Revenue</h3>
                        <div className="text-3xl font-black text-slate-800 dark:text-white">$45,231.89</div>
                    </div>
                </div>

                {/* Active Users Card */}
                <div className="relative group bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-white/5 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-secondary/10 rounded-2xl">
                                <Users className="h-6 w-6 text-secondary" />
                            </div>
                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-lg">+180%</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Active Users</h3>
                        <div className="text-3xl font-black text-slate-800 dark:text-white">+2,350</div>
                    </div>
                </div>

                {/* Quotations Card */}
                <div className="relative group bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-white/5 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-brand-blue-muted/10 rounded-2xl">
                                <FileText className="h-6 w-6 text-brand-blue-muted" />
                            </div>
                            <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded-lg">+19%</span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Quotations</h3>
                        <div className="text-3xl font-black text-slate-800 dark:text-white">12,234</div>
                    </div>
                </div>

                {/* Active Now Card */}
                <div className="relative group bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-white/5 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl">
                                <Activity className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                            </div>
                            <div className="flex space-x-1 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-emerald-500">Live</span>
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Active Now</h3>
                        <div className="text-3xl font-black text-slate-800 dark:text-white">+573</div>
                    </div>
                </div>
            </div>

            {/* Bottom Section - Recent Activity */}
            <div className="grid grid-cols-1 gap-8">
                <Card className="border-none rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-zinc-900 overflow-hidden">
                    <CardHeader className="border-b border-slate-50 dark:border-white/5 px-8 py-6">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-bold text-slate-800 dark:text-white">Recent Activity</CardTitle>
                            <button className="text-sm font-bold text-primary hover:underline transition-all">View All</button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-slate-50 dark:divide-white/5">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center p-8 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-300 group">
                                    <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 transition-transform group-hover:scale-110 duration-300">
                                        <FileText className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div className="ml-6 space-y-1">
                                        <p className="text-base font-bold text-slate-800 dark:text-slate-200">New quotation generated</p>
                                        <p className="text-xs font-medium text-slate-400">2 minutes ago • Reference #JRJ-2024-{i}42</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <div className="text-lg font-black text-secondary">+$1,999.00</div>
                                        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Completed</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

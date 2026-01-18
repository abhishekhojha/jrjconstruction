import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, Activity, FileText } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-primary to-primary/80 border-none shadow-lg shadow-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-white/90">Total Revenue</CardTitle>
                        <div className="p-2 bg-white/10 rounded-full">
                            <DollarSign className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">$45,231.89</div>
                        <p className="text-xs text-white/70 mt-1">+20.1% from last month</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-secondary to-secondary/80 border-none shadow-lg shadow-secondary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-white/90">Active Users</CardTitle>
                        <div className="p-2 bg-white/10 rounded-full">
                            <Users className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+2350</div>
                        <p className="text-xs text-white/70 mt-1">+180.1% from last month</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-brand-teal to-brand-teal/80 border-none shadow-lg shadow-brand-teal/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-white/90">Quotations</CardTitle>
                        <div className="p-2 bg-white/10 rounded-full">
                            <FileText className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">12,234</div>
                        <p className="text-xs text-white/70 mt-1">+19% from last month</p>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-brand-blue-muted to-brand-blue-muted/80 border-none shadow-lg shadow-brand-blue-muted/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-white/90">Active Now</CardTitle>
                        <div className="p-2 bg-white/10 rounded-full">
                            <Activity className="h-4 w-4 text-white" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">+573</div>
                        <p className="text-xs text-white/70 mt-1">+201 since last hour</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="col-span-1 border-light shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-gray-800">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center p-3 hover:bg-slate-50 rounded-lg transition-colors">
                                    <div className="h-9 w-9 rounded-full bg-brand-teal/10 flex items-center justify-center border border-brand-teal/20">
                                        <FileText className="h-4 w-4 text-brand-teal" />
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none text-gray-800">New quotation created</p>
                                        <p className="text-sm text-gray-500">2 minutes ago</p>
                                    </div>
                                    <div className="ml-auto font-medium text-brand-teal">+$1,999.00</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

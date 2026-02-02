'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Redirect to dashboard on success
            router.push('/dashboard');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-[#F8FAFC] dark:bg-zinc-950 relative overflow-hidden">
            {/* Branded UI accents - subtle glows */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="w-full max-w-[420px] relative z-10 transition-all duration-500 animate-in fade-in zoom-in-95">
                <div className="flex flex-col items-center mb-10">
                    <div className="p-4 dark:bg-zinc-900 mb-6 hover:scale-105 transition-transform duration-300">
                        <Image src="/logo_1bg.png" alt="Logo" width={250} height={40} className="object-contain" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Log into your JRJ Contractors account</p>
                </div>

                <Card className="border-none rounded-[2.5rem] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl shadow-slate-200/50 dark:shadow-none p-10 border border-slate-100 dark:border-white/5">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 text-sm text-red-600 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl animate-shake">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2.5">
                            <Label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 px-5 rounded-2xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 focus:ring-secondary/20 focus:border-secondary transition-all"
                            />
                        </div>
                        <div className="space-y-2.5">
                            <Label htmlFor="password" className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 px-5 rounded-2xl bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 focus:ring-secondary/20 focus:border-secondary transition-all"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-xl shadow-primary/20 text-white font-black h-14 mt-4 rounded-2xl border-none text-base disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : 'Sign In Now'}
                        </Button>
                    </form>
                </Card>

                <p className="text-center text-[10px] text-slate-400 font-black uppercase tracking-widest mt-12">
                    &copy; 2024 JRJ Contractors • Australia
                </p>
            </div>
        </div>
    );
}

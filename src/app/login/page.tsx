'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

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

            // Redirect to dashboard or home on success
            router.push('/dashboard');
            router.refresh();
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-cover bg-center" style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop')`, // macOS-ish gradient
        }}>
            {/* Overlay for better text contrast if needed, though glass card handles it well */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />

            {/* Glass Card */}
            <Card className="w-full max-w-md relative z-10 bg-white/70 dark:bg-black/60 backdrop-blur-xl border-white/20 shadow-2xl overflow-hidden">

                {/* Title Bar / Window Controls */}
                <div className="px-4 py-3 border-b border-black/5 flex items-center bg-white/30">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-sm border border-[#E0443E]/50"></div>
                        <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-sm border border-[#DEA123]/50"></div>
                        <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-sm border border-[#1AAB29]/50"></div>
                    </div>
                    <div className="text-xs font-medium text-gray-500 ml-4">Login</div>
                </div>

                <CardHeader className="pt-8">
                    <div className="mx-auto flex justify-center mb-6">
                        <Image
                            src="/logo_1bg.png"
                            alt="Logo"
                            width={180}
                            height={60}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <CardTitle className="text-3xl text-center text-gray-800 font-semibold tracking-tight">Welcome Back</CardTitle>
                    <CardDescription className="text-center text-gray-500">Please sign in to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm text-red-600 bg-red-50/80 border border-red-200 rounded-lg">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                className="bg-white/50 border-gray-200 focus:bg-white focus:ring-brand-blue-muted/50 placeholder:text-gray-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                className="bg-white/50 border-gray-200 focus:bg-white focus:ring-brand-blue-muted/50 placeholder:text-gray-400"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-white font-medium h-10 mt-2 transition-all active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

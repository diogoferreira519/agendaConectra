'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { LoginSchema, loginSchema } from './schemas/login.schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(data: LoginSchema) {
        try {
            const login = await axios.post('api/login', {
                data
            })

            console.log(JSON.stringify(login));
            
            if (login.status != 200) {
                toast.error(login.data.message)
                return;
            }

            router.push('/agenda');

        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Erro ao se logar'
            )
            console.error(error);
        }
    }

    return (
        <main className="flex min-h-screen bg-gradient-to-br from-blue-500 to-blue-700">
            <div className="hidden lg:flex w-1/2 items-center justify-center">
                <img
                    src="/meeting.png"
                    alt="Reunião"
                    className="max-h-[520px] object-contain 
                        pointer-events-none 
                        select-none 
                        caret-transparent 
                        cursor-default"
                />
            </div>

            <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
                <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-2xl">
                    <div className=" flex justify-center">
                        <img
                            src="/conectraazul.png"
                            alt="Conectra"
                            className="h-32 object-contain pointer-events-none 
                        select-none 
                        caret-transparent 
                        cursor-default"
                        />
                    </div>

                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-semibold text-gray-800">
                            Bem-vindo a Agenda Conectra
                        </h1>
                        <p className="text-sm text-gray-500">
                            Faça login para continuar
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="seu@email.com"
                                {...register('username')}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Label htmlFor="password">Senha</Label>

                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    {...register('password')}
                                    className="pr-10"
                                />

                                <button
                                    type="button"
                                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Entrando...' : 'Entrar'}
                        </Button>
                        <ToastContainer />

                        <p className="text-center text-sm text-gray-600">
                            Não possui uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => router.push('/cadastro')}
                                className="font-medium text-blue-600 hover:underline cursor-pointer"
                            >
                                Cadastre-se
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}

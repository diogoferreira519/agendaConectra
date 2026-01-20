'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios'

import { CadastroSchema, cadastroSchema } from './schemas/cadastro.schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ToastContainer, toast } from 'react-toastify';

export default function Cadastro() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CadastroSchema>({
        resolver: zodResolver(cadastroSchema),
    });

    async function onSubmit(data: CadastroSchema) {
        try {
            if (data.password != data.confirmPassword) {
                toast.error("Senhas não são iguais");
                return;
            }
            const cadastro = await axios.post('api/cadastro', {
                data
            })

            console.log(cadastro);
            
            if (cadastro.status != 200) {
                toast.error(cadastro.data.message)
                return;
            }

            toast.success('Cadastro realizado com sucesso');
            
            setTimeout(() => {
                router.push('/login');
            }, 1500);

        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Erro ao cadastrar'
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
                        <div className="space-y-1">
                            <Label htmlFor="email">Confirme a Senha</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showPasswordConfirm ? 'text' : 'password'}
                                    {...register('confirmPassword')}
                                    className="pr-10"
                                />

                                <button
                                    type="button"
                                    aria-label={showPasswordConfirm ? 'Ocultar senha' : 'Mostrar senha'}
                                    onClick={() => setShowPasswordConfirm((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPasswordConfirm ? (
                                        <Eye className="h-5 w-5" />
                                    ) : (
                                        <EyeOff className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className='flex-col'>
                            <Button
                                type="submit"
                                className="w-full mb-3"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                            </Button>
                            <ToastContainer />

                            <Button
                                className="w-full bg-red-400 hover:bg-red-500"
                                onClick={() => router.push('/login')}
                            >
                                Voltar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

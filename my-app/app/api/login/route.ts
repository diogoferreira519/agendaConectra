import { NextResponse } from "next/server";
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
    try {
        const dados = await req.json()
        const { username, password } = dados.data;

        if (!username || !password) {
            return NextResponse.json({
                message:
                    'Dados inválidos'
            },
                { status: 400 })
        }

        const userExists = await prisma.user.findUnique({
            where: { email: username }
        })

        if (!userExists) {
            return NextResponse.json({
                message:
                    'Não existe uma conta com este usuário'
            },
                { status: 400 })
        }

        const senhaIgual = await bcrypt.compare(password, userExists.password);

        if (!senhaIgual) {
            return NextResponse.json(
                { message: 'Senha incorreta' },
                { status: 401 }
            )
        }
        const jwtSecret = process.env.JWT_SECRET;
        const jwtExpires = process.env.JWT_EXPIRES_IN;

        if (!jwtSecret || !jwtExpires) {
            return NextResponse.json(
                { message: 'jwt erro' },
                { status: 404 }
            )
        }

        const token = jwt.sign(
            {
                sub: userExists.id,
                email: userExists.email
            },
            jwtSecret,
            {
                expiresIn: jwtExpires,

            }
        );
        const response = NextResponse.json({
            user: userExists.email,
        });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 dia
        })

        return response;
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 200 }
        )
    }
}
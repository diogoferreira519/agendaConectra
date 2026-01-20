import { NextResponse } from "next/server";
import prisma  from '@/lib/prisma'
import bcrypt from 'bcryptjs'
 
export async function POST(req: Request) {
    const dados = await req.json()
    const { username, password, confirmPassword } = dados.data;

    if (!username || !password) {
        return NextResponse.json({
            message:
                'Dados inválidos'
        },
            { status: 400 })
    }
    if (password != confirmPassword) {
        return NextResponse.json({
            message:
                'As senhas são diferentes'
        },
            { status: 400 })
    }

    const userExists = await prisma.user.findUnique({
        where: { email: username }
    })

    if (userExists) {
        return NextResponse.json({
            message:
                'Já existe esse usuário'
        },
            { status: 400 })
    }

    const hash = await bcrypt.hash(password, 12)

    const newUser = await prisma.user.create({
        data: {
            email: username,
            password: hash
        }
    })
    
    return NextResponse.json(
        { message: newUser },
        { status: 200 }
    )
}
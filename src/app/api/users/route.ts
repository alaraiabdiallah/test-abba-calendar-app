import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const searchKeyword: string | null = request.nextUrl.searchParams.get('search');
    let where = {}
    if (searchKeyword) {
        where = {
            ...where,
            OR: [
                { name: { contains: searchKeyword } },
                { email: { contains: searchKeyword } },
            ],
        }
    }
    const users = await prisma.user.findMany({
        where,
    });
    return NextResponse.json(users);
}
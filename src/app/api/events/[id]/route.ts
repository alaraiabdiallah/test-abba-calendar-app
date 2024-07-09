import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

// get event by id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = parseInt(params.id)
    const event = await prisma.event.findFirst({
        where: {
            id
        },
        include: {
            people: {
                select: {
                    person: true
                }
            },
            author: true
        }
    });
    return NextResponse.json(event)
}
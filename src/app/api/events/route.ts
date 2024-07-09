import { PrismaClient } from "@prisma/client";

import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

const defaultAuthorId = 1

export async function GET(request: NextRequest) {
    const searchKeyword: string | null = request.nextUrl.searchParams.get('search');
    let where = {
        authorId: defaultAuthorId
    }
    let whereSearch = {}
    if (searchKeyword) {
        whereSearch = {
            OR: [
                { title: { contains: searchKeyword } },
            ],
        }
    }
    const events = await prisma.event.findMany({
        where: {
            ...where,
            ...whereSearch
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
    return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
    // create event
    const body = await request.json()

    const peopleEmail = body.people
    const people = peopleEmail.length > 0 ? {
        create: peopleEmail.map((email: string) => ({person: {connect: { email }}}))
    } : undefined

    const event = await prisma.event.create({
        data:{
            title: body.title,
            startTime: new Date(body.startTime),
            endTime: new Date(body.endTime),
            authorId: defaultAuthorId,
            content: body.description,
            people 
        }
    })
    return NextResponse.json(event)
    
} 

// delete event
export async function DELETE(request: NextRequest) {
    const body = await request.json()
    const id = body.id
    const event = await prisma.event.delete({
        where: {
            id
        }
    })
    return NextResponse.json(event)
}
// update event

export async function PUT(request: NextRequest) {
    const body = await request.json()
    const id = body.id
    const peopleEmail = body.people
    const people = peopleEmail.length > 0 ? {
        deleteMany: {},
        create: peopleEmail.map((email: string) => ({person: {connect: { email }}}))
    } : undefined
    const event = await prisma.event.update({
        where: {
            id
        },
        data: {
            title: body.title,
            startTime: new Date(body.startTime),
            endTime: new Date(body.endTime),
            content: body.description,
            people
        }
    })
    return NextResponse.json(event)

}
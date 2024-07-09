import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function userSeeder() {
    const jane = prisma.user.upsert({
        where: { email: "jane@test.com" },
        update: {},
        create: {
            id: 1,
            name: "Jane",
            email: "jane@test.com",
        },
    });

    const john = prisma.user.upsert({
        where: { email: "john@test.com" },
        update: {},
        create: {
            id: 2,
            name: "John",
            email: "john@test.com",
        },
    });

    return Promise.all([jane, john]);
}

async function eventSeeder() {
    const startTime = new Date();
    let endTime = new Date();
    endTime.setDate(endTime.getHours() + 1);
    const event = prisma.event.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            title: "My event",
            startTime,
            endTime,
            authorId: 1,
            people: {
                create: [
                    { person: { connect: { email: "jane@test.com" } } },
                    { person: { connect: { email: "john@test.com" } } },
                ],
            }
        },
    });

    return Promise.all([event]);
}

async function main() {
    const users = await userSeeder();
    const events = await eventSeeder();
    const [jane, john] = users;
    console.log({ jane, john, events });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
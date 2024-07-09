import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

async function main() {
    const users = prisma.user.findMany();
    const events = prisma.event.findMany({
        include: {
            people: {
                include: {
                    person: true
                }
            }
        }
    });
    const eventPeople = prisma.eventPeople.findMany();
    const [userData, eventData, eventPeopleData] = await Promise.all([users, events, eventPeople])
    console.log(JSON.stringify({ userData, eventData, eventPeopleData }, null, 2));
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
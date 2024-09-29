import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB


async function createUser(username: string, password: string, firstname: string, lastname: string){
    const user = await prisma.user.create({
        data: {
            username,
            password,
            firstname,
            lastname
            
        },
        select: {
            username: true
        }
    })
    console.log(user)
}

async function updateUser(username: string){
    const user = await prisma.user.update({
        where: {
            username: username
        },
        data: {
            password: "12345"
        }
    })
    console.log(user)
}


createUser("koka", "kokakoka", "kaokao", "joe");
// updateUser("shyam12")
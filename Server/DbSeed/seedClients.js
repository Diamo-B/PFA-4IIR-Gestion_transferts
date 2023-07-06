const prisma = require("../prisma/prismaInstance");
const bcrypt = require("bcrypt");
const { faker } = require('@faker-js/faker');

async function seed (){
    let salt = await bcrypt.genSalt();
    let password = await bcrypt.hash("123456",salt);
    let newUser = await prisma.user.create({
        data: {
            firstName:faker.person.firstName(),
            lastName:faker.person.lastName(),
            email:faker.internet.email(),
            password: password,
        },
    });
    let newClient = await prisma.client.create({
        data: {
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
        include:{
          user:true,
        }
    });
}

for(let i = 0; i < 20; i++){
    seed();
}
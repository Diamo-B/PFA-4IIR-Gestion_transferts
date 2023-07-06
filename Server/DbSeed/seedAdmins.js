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
    let newAgent = await prisma.agent.create({
        data:{
            user:{
                connect:{
                    id: newUser.id
                }
            }
        },
        include:{
            user:true
        }
    });
    
    //DONE: Create an AgentCategoryPermission for each Category for this agent
    //?Fetch the Ids of the available categories in the format [{id: @value}]
    let categories = await prisma.category.findMany({
        select:{
            id: true
        }
    });

    //? Loop through categories and create AgentCategoryPermission for each
    let agentCatPermPromises = categories.map(category => {
        return prisma.agentCategoryPermission.create({
            data: {
                agent: {
                    connect: {
                        userId: newAgent.userId
                    }
                },
                category: {
                    connect: {
                        id: category.id
                    }
                }
            }
        });
    });

    //? Wait for all AgentCategoryPermission creations to complete
    let agentCatPerms = await Promise.all(agentCatPermPromises);
}

for(let i = 0; i < 20; i++){
    seed();
}
const prisma = require("../prisma/prismaInstance");
const bcrypt = require("bcrypt");

async function seed (){
    await prisma.category.createMany({
        data:[
            {name: "Reservations"},
            {name: "Billing"},
            {name: "Extras"},
            {name: "Vehicules"},
            {name: "Periods"},
            {name: "Locations"}
        ]
    })

    await prisma.permission.createMany({
        data:[
            {value: "read"},
            {value: "write"},
            {value: "update"},
            {value: "delete"}
        ]
    })

    let salt = await bcrypt.genSalt();
    let password = await bcrypt.hash("123456",salt);
    let newUser = await prisma.user.create({
        data: {
            firstName:"agent",
            lastName:"super",
            email:"agent@super.com",
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

    let superAgent = await prisma.agent.update({
        where:{
            userId: newAgent.userId
        },
        data:{
            isSuperAdmin: true
        }
    })
    console.log(superAgent);

    let ExtraTypes = await prisma.extraType.createMany({
        data:[
            {label: "Automatic"},
            {label: "Special"}
        ]
    })

}

seed();
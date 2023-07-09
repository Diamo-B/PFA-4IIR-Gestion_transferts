const prisma = require("../../prisma/prismaInstance");
const {faker} = require("@faker-js/faker");
async function seedRegularVehicles()
{
    try {
        let models = await prisma.model.findMany({});
        if(models.length === 0)
            cpnsole.log("No models were found");
        else
        {
            try {
                let newVehicle = await prisma.vehicule.create({
                    data:{
                        brand: faker.vehicle.manufacturer(),
                        sub_Brand: faker.vehicle.model(),
                        places: faker.number.int({min:2, max:6}),
                        lux: faker.datatype.boolean(),
                        model:{
                            connect:{
                                id: models.filter(model => model.label === "Regular")[0].id
                            }
                        }
                    }
                })
                console.log(newVehicle);
            } catch (err) {
                console.log(err);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

for (let i = 0; i < 5; i++) {
    seedRegularVehicles()
}
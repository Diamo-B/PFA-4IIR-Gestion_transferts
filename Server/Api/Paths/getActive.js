const prisma = require('../../prisma/prismaInstance');

let getActive = async (req,res) => {
    try {
        let paths = await prisma.transferPath.findMany({
            where:{
                active: true
            },
            select:{
                id: true,
                departure: {
                    select:{
                        id: true,
                        name: true
                    }
                },
                arrival: {
                    select:{
                        id: true,
                        name: true
                    }
                },
                price: true,
                distance: true,
            }
        });
        if(paths.length <= 0)
        {
            throw {message: "No active paths were found"}
        }

        let objs = paths?.map((item) => {
            return {
                id: item.id,
                departureId: item.departure.id,
                arrivalId: item.arrival.id,
                departure: item.departure.name,
                arrival: item.arrival.name,
                price: item.price,
                distance: item.distance
            }
        });
        return res.status(200).json(objs);
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    getActive
}
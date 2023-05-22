const prisma = require("../../prisma/prismaInstance");

let create = async (req, res) => {
    try {
        let { departure, arrival, distance, price } = req.body;

        if(departure === arrival){
            return res.status(400).json({
                err: "You can't have a path that starts and ends in the same place"
            })
        }

        try {
            departurePlace = await prisma.place.findFirstOrThrow({
                where: {
                    id: departure,
                },
            });
        } catch (departureError) {
            return res.status(400).json({
                err: `Failed to find departure place: ${departureError.message}`,
            });
        }

        try {
            arrivalPlace = await prisma.place.findFirstOrThrow({
                where: {
                    id: arrival,
                },
            });
        } catch (arrivalError) {
            return res.status(400).json({
                err: `Failed to find arrival place: ${arrivalError.message}`,
            });
        }

        let newPath = await prisma.transferPath.create({
            data:{
                distance: distance,
                price: price,
                active: false,
                departure:{
                    connect:{
                        id: departure
                    }
                },
                arrival:{
                    connect:{
                        id: arrival
                    }
                }
            }
        })
        return res.status(200).json({ newPath });
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports = { create };

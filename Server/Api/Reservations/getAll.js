const prisma = require('../../prisma/prismaInstance')
const getAll = async (req, res) => {
    try {
        let reservations = await prisma.reservation.findMany({
            include: {
                client: {
                    include:{
                        user: true
                    }
                },
                extras: true,
                Vehicles: true,
                period: true,
                transferPath: true,
            }
        })
        if(reservations.length == 0) return res.status(404).json("No reservations were found")
        else return res.status(200).json(reservations)
    } catch (err) {
        console.log(err)
        return res.status(500).json("Server Error")    
    }
}

module.exports = { getAll }
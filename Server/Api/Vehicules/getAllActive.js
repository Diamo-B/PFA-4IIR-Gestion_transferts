const prisma = require('../../prisma/prismaInstance')
const getAllActive = async (req, res) => {

    try {
        const vehicules = await prisma.vehicule.findMany({
            where: {
                Status: true
            },
            include: {
                model: true,
                images: true
            }
        })
        if(!vehicules)
            throw new Error("No vehicules found")
        return res.status(200).json(vehicules)
    } catch (error) {
        return res.status(400).json(error)
    }

}
module.exports = { getAllActive }
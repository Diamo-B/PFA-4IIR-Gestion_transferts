const prisma = require('../../prisma/prismaInstance');

const remove = async (req, res) => {
    const { id } = req.body;
    try {
        const period = await prisma.period.delete({
            where: {
                id: id,
            },
        });
        if(!period) 
            throw new Error("Period not found")
        else
            return res.status(200).json(period);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { remove }
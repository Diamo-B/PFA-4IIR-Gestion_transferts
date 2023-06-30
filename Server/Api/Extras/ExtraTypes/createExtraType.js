const prisma = require('../../../prisma/prismaInstance');

const createExtraType = async (req, res) => {
    let {label} = req.body;
    try {
        let extraType = await prisma.extraType.create({
            data:{
                label
            }
        });
        return res.status(200).json(extraType);
    } catch (error) {
        return res.status(500).json(error);
    }           
}

module.exports = createExtraType;
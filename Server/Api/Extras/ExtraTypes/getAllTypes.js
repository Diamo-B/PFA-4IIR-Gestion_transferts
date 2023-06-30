const prisma = require("../../../prisma/prismaInstance");

let getAllTypes = async (req, res) => {
    try {
        let extras = await prisma.extraType.findMany({
            include:{
                extras:true
            }
        });
        return res.status(200).json(extras);
    } catch (error) {
        return res.status(500).json(error);
    } 
}

module.exports = getAllTypes;
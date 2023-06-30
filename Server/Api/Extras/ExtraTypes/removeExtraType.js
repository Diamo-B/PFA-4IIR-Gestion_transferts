const prisma = require("../../../prisma/prismaInstance");

let removeExtraType = async (req, res) => {
    let {id} = req.body;
    try {
        let extraType = await prisma.extraType.delete({
            where:{
                id
            }
        });
        return res.status(200).json(extraType);
    } catch (error) {
        if(error.code === "P2025")
            return res.status(404).json({message:"The requested extra type was not found"});
        return res.status(500).json(error);
    }
}

module.exports = removeExtraType;
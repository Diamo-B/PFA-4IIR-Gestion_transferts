const prisma = require("../../../prisma/prismaInstance");

const getTypeByLabel = async (req, res) => {
    let {label} = req.params;
    try {
        let type = await prisma.extraType.findUniqueOrThrow({
            where:{
                label
            }
        });

        return res.status(200).json(type);

    }
    catch (err) {
        if(err.code === "P2025"){
            return res.status(404).json({message:"Type not found"});
        }
        return res.status(500).json(err);
    }
}

module.exports = getTypeByLabel;
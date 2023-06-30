const prisma = require("../../../prisma/prismaInstance");
const updateExtraType = async (req, res) => {
    let {id, label} = req.body;
    try {
        let updatedExtraType = await prisma.extraType.update({
            where:{
                id
            },
            data:{
                label: label ? label : undefined
            }
        });
        return res.status(200).json(updatedExtraType);
    }catch (error) {
        if(error.code === "P2025"){
            return res.status(404).json({message:"Extra type not found"});
        }
        return res.status(500).json(error);
    }
}

module.exports = updateExtraType;
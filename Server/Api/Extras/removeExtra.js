const prisma = require("../../prisma/prismaInstance");
const removeExtra = async (req, res) => {
    let { id } = req.body;
    try {
        let removedExtra = await prisma.extra.delete({
            where:{
                id:id
            }
        });
        
        return res.status(200).json(removedExtra);
    }
    catch (error) {
        if(error.code === "P2025")
            return res.status(404).json({message:"The requested Extra was not found"});
        return res.status(500).json(error);
    }
}

module.exports = removeExtra;
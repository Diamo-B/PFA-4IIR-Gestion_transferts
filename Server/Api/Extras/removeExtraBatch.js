const prisma = require("../../prisma/prismaInstance");
const removeExtraBatch = async (req, res) => {
    let { ids } = req.body;
    try {
        let removedExtras = await prisma.extra.deleteMany({
            where:{
                id:{
                    in:ids
                }
            }
        });
        if(removedExtras.count === 0)
            return res.status(404).json({message:"One or more of the requested Extras were not found"});
        return res.status(200).json(removedExtras);
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = removeExtraBatch;
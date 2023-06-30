const prisma = require("../../../prisma/prismaInstance");

let removeExtraType = async (req, res) => {
    let {ids} = req.body;
    try {
        let extraType = await prisma.extraType.deleteMany({
            where:{
                id : {
                    in : ids
                }
            }
        });
        if(extraType.count === 0)
            return res.status(404).json({message:"The requested extra type was not found"});
        return res.status(200).json(extraType);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = removeExtraType;
const prisma = require("../../prisma/prismaInstance");

let getAll = async (req, res) => {
    try {
        let extra = await prisma.extra.findMany({
            include:{
                type:true
            }
        });
        return res.status(200).json(extra);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = getAll;
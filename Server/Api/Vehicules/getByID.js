const prisma = require("../../prisma/prismaInstance");

let getByID = async (req, res) => {
    let {id} = req.params;
    try {
        let vehicle = await  prisma.vehicule.findFirst({
            where:{
                id: id
            }
        });
        if(vehicle === null)
            return res.status(400).json({err: "There's no vehicle with the given id!!"})
        return res.status(200).json(vehicle)
    }
    catch (err)
    {
        return res.status(500).json(err);
    }
}

module.exports = { getByID }
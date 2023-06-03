const prisma = require("../../prisma/prismaInstance")

let getAll = async (req,res) => {
    try {
        let Vehicules = await prisma.vehicule.findMany({});
        if(Vehicules.length === 0)
        {
            return res.status(400).json({err: "No Vehicules Were found."})
        }
        return res.status(200).json(Vehicules);
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {getAll}
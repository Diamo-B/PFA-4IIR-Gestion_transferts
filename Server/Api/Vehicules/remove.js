const prisma = require("../../prisma/prismaInstance");

let remove = async  (req,res) => {
    let {id} = req.body;
    try
    {
        let removedVehicle = await  prisma.vehicule.delete({
            where:{
                id: id
            }
        })
        return res.status(200).json(removedVehicle);
    }
    catch (err)
    {
        if(err.code === "P2025")
            return  res.status(500).json({err: "The vehicle you want to delete does not exist!!"})
        return res.status(500).json(err)
    }
}

module.exports = {remove}
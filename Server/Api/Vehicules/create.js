let prisma = require("../../prisma/prismaInstance");

let create = async (req,res) => {
    let {modelID, brand, brandModel, nbr_places, luxe} = req.body;
    
    let model; 
    try {
        model = await prisma.model.findFirst({
            where:{
                id:modelID
            }
        })
        if(model === null)
        {
            return res.status(400).json({err:"The requested model isn't valid !!"})
        }
    } catch (err) {
        return res.status(500).json(err)
    }


    try {
        let newVehicle = await prisma.vehicule.create({
            data:{
                brand: brand,
                sub_Brand: brandModel,
                places: parseInt(nbr_places),
                lux: luxe,
                model:{
                    connect:{
                        id: model.id
                    }
                }
            }
        })
        return res.status(200).json(newVehicle)
    } catch (err) {
        return res.status(500).json(err)
    }
    
}

module.exports = {create}
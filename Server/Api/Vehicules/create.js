let prisma = require("../../prisma/prismaInstance");

let create = async (req,res) => {
    let {modelId, brand, brandModel, nbr_places, luxe} = req.body;
    
    let model; 
    try {
        model = await prisma.model.findFirst({
            where:{
                id:modelId
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
        let newVehicule = await prisma.vehicule.create({
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
        return res.status(200).json(newVehicule)
    } catch (err) {
        return res.status(500).json(err)
    }
    
}

module.exports = {create}
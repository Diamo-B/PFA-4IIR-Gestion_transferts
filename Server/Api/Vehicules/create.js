let prisma = require("../../prisma/prismaInstance");

let create = async (req,res) => {
    let {modelID, brand, brandModel, nbr_places, luxe, images} = req.body;
    
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

    let imagesIDS = new Array();
    Promise.all(
    images.map(async(image)=>{
        try {
            let newImage = await prisma.image.create({
                data:{
                    path: image
                }
            })
            if(newImage !== null)
                imagesIDS.push(newImage.id);
        } catch (err) {
            return res.status(500).json(err)
        }
    })
    ).then(async()=>{
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
                    },
                    images:{
                        connect: imagesIDS.map((id) => ({ id }))
                    }
                }
            })
            return res.status(200).json(newVehicle)
        } catch (err) {
            return res.status(500).json(err)
        }
    }).catch((err)=>{
        return res.status(500).json(err)
    })
    
}

module.exports = {create}
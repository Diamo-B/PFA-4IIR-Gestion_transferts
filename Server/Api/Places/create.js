const prisma = require("../../prisma/prismaInstance");

let create = async (req,res) => {
    let {name,longitude,latitude} = req.body;
    if(!name)
        return res.status(400).json({err: "The name is required"});
    if(isNaN(longitude) && longitude !== undefined)
        return res.status(400).json({err: "The longitude needs to be a number"});
    if(isNaN(latitude) && longitude !== undefined)
        return res.status(400).json({err: "The latitude needs to be a number"})

    try {
        let newPlace = await prisma.place.create({
            data:{
                name: name,
                longitude: longitude!==undefined?parseFloat(longitude):undefined,
                latitude: latitude!==undefined?parseFloat(latitude):undefined
            }
        });
        return res.status(200).json(newPlace);
    } catch (err) { 
        console.log(err);
        if (err.code === "P2002") {
            return res.status(500).json({err: `A place with the name ${name} already exists.`});
        } else {
            return res.status(500).json({err: "An error occurred while creating the place."});
        }
    }
}

module.exports = {create}
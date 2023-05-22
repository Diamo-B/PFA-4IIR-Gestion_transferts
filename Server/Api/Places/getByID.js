const prisma = require("../../prisma/prismaInstance");

let getByID = async  (req,res) => {
    let {ID} = req.params;
    if(!ID)
        return res.status(400).json({err:"You need to include the ID of the place you wanna get"});
    try {
        let place = await prisma.place.findFirst({
            where:{
                id: ID
            }
        })
        if (place === null)
            return res.status(200).json({err: "There is no place with the id of "+ID+"."})
        else
            return res.status(200).json(place)
    } catch (err) {
        return res.status(500).json(err)       
    }
}   

module.exports = {getByID}
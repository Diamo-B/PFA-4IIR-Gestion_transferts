const prisma = require("../../prisma/prismaInstance");

let getAll = async (req,res) => {
    try 
    {
        let places = await prisma.place.findMany({});
        if(places.length === 0)
            return res.status(200).json({err: "No Places were found"});
        else 
            return res.status(200).json(places);
    } 
    catch (err) 
    {
        return res.status(500).json(err);
    }
}

module.exports={
    getAll
}
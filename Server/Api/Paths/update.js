const prisma = require("../../prisma/prismaInstance");

let update = async(req,res) => {
    let {id,newData} = req.body; 
    try{
        //? find a record with the given id
        let record = await prisma.transferPath.findMany({});
        if(record === null)
        {
            return res.status(400).json({
                err: "There is no path with the provided ID"
            })
        }
        let updatedRecord = await prisma.transferPath.update({
            where:{
                id: id
            },
            data:newData
        })
        return res.status(200).json(updatedRecord);
    }
    catch(err)
    {
        return res.status(500).json(err);
    }
}

module.exports = {update}
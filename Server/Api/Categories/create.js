const prisma = require('../../prisma/prismaInstance');

let create = async (req,res) => {
    let {name} = req.body;
    try {
        let category = await prisma.category.create({
            data:{
                name:name
            }
        })
        return res.status(200).json(category)
    } catch (err) {
        if(err.code == "P2002")
            return res.status(500).json({err: "There's a category with the same name!"})
        return res.status(500).json(err);
    }
}

module.exports = {create}
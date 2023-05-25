const prisma = require('../../prisma/prismaInstance');

let remove = async (req,res) => {
    let {name} = req.body;
    try {
        let category = await prisma.category.delete({
            where:{
                name: name
            }
        });
        return res.status(200).json(category)
    } catch (err) {
        if(err.code == "P2025")
            return res.status(400).json({err: `There is no category with the name of ${name}`});
        return res.status(500).json(err);
    }
}

module.exports = {remove}
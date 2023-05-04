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
        return res.status(500).json(err);
    }
}

module.exports = {remove}
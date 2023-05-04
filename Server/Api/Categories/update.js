const prisma = require('../../prisma/prismaInstance');

let update = async (req,res) => {
    let {name, data} = req.body;
    try {
        let category = await prisma.category.update({
            data:data,
            where:{
                name: name
            }
        });
        return res.status(200).json(category)
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {update}
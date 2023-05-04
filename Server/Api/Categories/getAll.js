const prisma = require('../../prisma/prismaInstance');

let getAll = async (req,res) => {
    try {
        let category = await prisma.category.findMany({});
        return res.status(200).json(category)
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {getAll}
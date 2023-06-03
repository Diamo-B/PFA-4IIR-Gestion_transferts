const prisma = require('../../prisma/prismaInstance');

let getAll = async (req,res) => {
    try {
        let models = await prisma.model.findMany({});
        if(models.length === 0)
            return res.status(400).json({err: "No models were found"})
        return res.status(200).json(models);
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports={getAll}
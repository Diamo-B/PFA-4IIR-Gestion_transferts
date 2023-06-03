const prisma = require("../../prisma/prismaInstance")

let getByModel = async (req,res) => {
    let {modelName} = req.params;
    let model;
    try {
        model = await prisma.model.findFirst({
            where:{
                label: modelName
            }
        });
        if(model === null)
        {
            return res.status(400).json({err: "The requested model was not found"})
        }
    } catch (err) {
        return res.status(500).json(err)
    }

    try {
        let vehicules = await prisma.vehicule.findMany({
            where:{
                modelId: model.id
            }
        })
        if(vehicules.length === 0)
        {
            return res.status(400).json({err: "No vehicules associated with the model "+model.label+" were found !!"})
        }
        return res.status(200).json(vehicules);
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = {getByModel}
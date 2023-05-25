const prisma = require("../../prisma/prismaInstance");

let removeAuthorisation = async (req,res) => {
    let {agentId, categoryName} = req.body;
    try {
        let agent = await prisma.agent.findFirst({
            where:{
                userId: agentId
            }
        })
        if(agent === null)
            return res.status(400).json({err: `There is no agent with an Id of ${agentId}`})

        let category = await prisma.category.findFirst({
            where:{
                name: categoryName
            }
        })
        if(category === null)
            return res.status(400).json({err: `There is no category with the name of ${categoryName}`})

        let authorisation = await prisma.AgentCategoryPermission.delete({
            where:{
                agentId: agentId,
                categoryId: categoryName
            }
        })
        return res.status(200).json({authorisation,status: "done"});
    } catch (err) {
        return err.code == "P2025"?
            res.status(500).json({err: "The specified authorisation was not found!!"})
        :
            res.status(500).json(err)
    }   
}

module.exports = {
    removeAuthorisation
}
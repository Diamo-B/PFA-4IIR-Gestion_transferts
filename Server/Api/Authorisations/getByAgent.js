const prisma = require("../../prisma/prismaInstance");

let getByAgent = async (req,res) => {
    let {id} = req.params;

    try {
        let agentAuthorizations = await prisma.agentCategoryPermission.findMany({
            where:{
                agentId: id
            },
            include:{
                permissions: {
                    select:{
                        value: true,
                        agents: false
                    }
                },
                category: {
                    select:{
                        name: true,
                        categories:false
                    }
                }
            }
        })
        if(agentAuthorizations.length == 0)
            return res.status(400).json({err: `There is no agent with an ID of ${id}`})
        return res.status(200).json(agentAuthorizations)
    } catch (err) {
        return res.status(500).json(err);     
    }
}

module.exports = {getByAgent}
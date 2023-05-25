const prisma = require('../../prisma/prismaInstance');


let linkAgent = async (req,res) => {
    let {agentId, categoryName, permissionNames} = req.body;
    try {
        let agent = await prisma.agent.findFirst({
            where:{
                userId: agentId
            }
        })
        if(agent === null)
            return res.status(400).json({err: `There is no agent with the ID ${agentId}`})
        
        let category = await prisma.category.findFirst({
            where:{
                name: categoryName
            }
        })
        if(category === null )
            return res.status(400).json({err: `There is no category with the name of ${categoryName}`})

        let permissions
        try {
            permissions = await prisma.permission.findMany({
                where: {
                value: {
                    in: permissionNames
                }
                }
            });

            if (permissions.length === 0) {
                return res.status(404).json({ error: 'No matching permissions found.' });
            }

            //? Check if any input values were not found in the results
            const validPermissionNames = permissions.map((permission) => permission.value);
            const invalidPermissionNames = permissionNames.filter((name) => !validPermissionNames.includes(name));

            if (invalidPermissionNames.length > 0) {
                return res.status(400).json({ error: `Invalid permission names: ${invalidPermissionNames.join(', ')}` });
            }
        } catch (error) {
            return res.status(500).json(error)
        }

        let thisAgentAuthorisations = await prisma.agentCategoryPermission.findMany({
            where:{
                agentId: agent.userId
            },
            include:{
                category: true
            }
        })

        let wantedAuthorisation = thisAgentAuthorisations.filter(field=>field.category.name.toLowerCase() == categoryName.toLowerCase());
        console.log(wantedAuthorisation);
        let permissionIDS = permissions.map(perm=>perm.id);

        let link = await prisma.agentCategoryPermission.update({
            where:{
                id: wantedAuthorisation[0].id
            },
            data:{
                permissions: {
                    set: permissionIDS.map(id => ({ id })),
                },
            },
            include:{
                agent:{
                    include:{
                        user: true
                    }
                },
                category: true,
                permissions: true
            }
        }) 
        return res.status(200).json(link);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    linkAgent
}
let prisma = require('../../prisma/prismaInstance');
let changeAgentPermissions = async (req,res) => {
    let {email, category, permissions} = req.body;
    
    try {
        
        let AgentPermission = await prisma.agentCategoryPermission.findFirst({
            where:{
                agent:{
                    user:{
                        email: email
                    }
                },
                AND:{
                    category:{
                        name:category
                    }
                }
            },
            include:{
                permissions: true
            }
        })
        if(AgentPermission == null)
            return res.status(500).json({err: "Invalid data"});

        let AvailablePermissions = await prisma.permission.findMany({});

        const permissionIDS = AvailablePermissions.filter(perm => permissions.some(newPerm => perm.value === newPerm.value)).map(match => ({ id: match.id }));

        let modifiedAgent = await prisma.agentCategoryPermission.update({
            where: { id: AgentPermission.id },
            data: {
                permissions: permissionIDS.length === 0 ? { set: [] } : { connect: permissionIDS }
            },
            include:{
                permissions:true
            }
        });

        return res.status(200).json({
            AgentPermission, modifiedAgent
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {changeAgentPermissions}
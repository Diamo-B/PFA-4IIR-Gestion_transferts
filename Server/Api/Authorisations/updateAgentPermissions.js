const prisma = require("../../prisma/prismaInstance");

let updateAgentPermissions = async (req,res) => {
    let {data,catName} = req.body;
    try {
        let permObjs = (await prisma.permission.findMany({}));
        if(permObjs.length === 0)
        {
            return res.status(400).json({"err": "The permissions table is empty"})
        }
        let category = await prisma.category.findFirst({
            where:{
                name: catName
            }
        })
        if(category.length === 0)
        {
            return res.status(400).json({"err": "There's no category with the name of "+catName})
        }
        for (let item of data) 
        {
            let agentId = item.agentId;
            let permsToAdd = item.permissions.New; //? array of perms to add
            let permsToRemove = item.permissions.Remove; //? array of perms to remove
            try {
                let permsObjsToAdd = permObjs.filter(perm => permsToAdd.includes(perm.value));
                let permsObjsToRemove = permObjs.filter(perm => permsToRemove.includes(perm.value));
                if(permsObjsToAdd.length === 0 && permsObjsToRemove.length === 0)
                    throw {"err": "something went wrong with the permission values for the agent "+agentId}                
                try {
                    let agentPermissions = await prisma.agentCategoryPermission.findFirst({
                        where:{
                            AND:[
                                {agent:{
                                    userId: agentId
                                }},
                                {categoryId: category.id}
                            ]
                        },
                        select:{
                            id: true
                        }
                    })
                    
                } catch (err) {
                    throw {"err": "error: either the agentID doesn't exist or the categoryID doesn't exist"}
                }
                /* let modifiedAgent = await prisma.agentCategoryPermission.update({
                    where:{
                        id: agentPermissions.id
                    }
                }) */
                return res.status(200).json(agentPermissions);
            } catch (err) {
                throw err
            }
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}

module.exports = {updateAgentPermissions}
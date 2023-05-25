const prisma = require("../../prisma/prismaInstance")

let createAuthorisation = async (req,res) => {
    let {categoryName, agentID, level} = req.body;
    try
    {
        let checkLevel = await prisma.permission.findFirst({
            where:{
                value: level
            }
        })
        
        if( checkLevel === null )
        {
            return res.status(400).json({err: `No Permission with the name of ${level} was found`})
        }
        
        let category = await prisma.category.findFirst({
            where:{
                name: categoryName
            }
        })

        if(category === null)
        {
            return res.status(400).json({err: `No category with the name of ${categoryName} exists`})
        }
        let agent = await prisma.agent.findFirst({
            where:{
                userId: agentID
            }
        })
        if(agent === null)
        {
            return res.status(400).json({err: `No agent with the id of ${agentID} was found` })
        }
        let Authorisation = await prisma.agentCategoryPermission.create({
            data:{
                agent:{
                    connect:{
                        userId: agentID
                    }
                },
                category:{
                    connect:{
                        id: category.id
                    }
                },
                
            }
        })
    }
    catch(err)
    {
        return res.status(500).json({err: err});
    }
    
   /*  if(!levels.includes(level.toLowerCase()))
    {
        return res.status(500).json({
            code: "invalid_level",
            err: "Invalid level of authorisation: The levels are ["+levels+"]"})
    }
    try {
        let authorisation = await prisma.authorisation.create({
            data:{
                name,
                level
            }
        })
        return res.status(200).json({authorisation})
    } catch (err) {
        return  err.code == "P2002"?
            res.status(500).json({
                code:"duplicate_name",
                message:"duplicate authorisation name"
            }) 
            : 
            res.status(500).json(err)
        ;
    } */
}

module.exports = {
  createAuthorisation
}
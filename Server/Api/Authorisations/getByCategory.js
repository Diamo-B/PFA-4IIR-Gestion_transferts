const prisma = require("../../prisma/prismaInstance");

let getByCategory = async(req,res) => {
    let {name} = req.params;
    try {
        let Authorizations = await prisma.agentCategoryPermission.findMany({
            where:{
                category:{
                    name: name
                }
            },
            include:{
                agent:{
                    include:{
                        user:{
                            select:{
                                firstName:true,
                                lastName:true,
                                email:true,
                            }
                        }
                    }
                },
                category:{
                    select:{
                        name:true
                    }
                },
                permissions:{
                    select:{
                        value:true
                    }
                }
            }
        })
        if(!Authorizations)
        {
            return res.status(404).json(`No Authorizations were found for the category: ${categoryName}`);
        }
        return res.status(200).json(Authorizations)
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {getByCategory}
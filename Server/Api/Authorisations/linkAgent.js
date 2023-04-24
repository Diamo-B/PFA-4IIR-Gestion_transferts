const prisma = require('../../prisma/prismaInstance');


let linkAgent = async (req,res) => {
    let {email, authName} = req.body;
    try {
        let agent = await prisma.agent.findFirstOrThrow({
            include:{
                user: true,
                authorisations: true
            },
            where:{
                user:{
                    email: email
                }  
            }
        })
        for (let i = 0; i < agent.authorisations.length; i++) {
            const element = agent.authorisations[i];
            if (element.name == authName)
                return res.status(500).json({
                    code: "already_linked",
                    message: "The agent is already linked to the '"+authName+"' authorization"
                })
        }
        let link = await prisma.authorisation.update({
            where:{
                name: authName
            },
            data:{
                agents:{
                    connect:{
                        userId: agent.userId
                    }
                }
            },
            include:{
                agents:{
                    include:{
                        user: true
                    },
                    where:{
                        user:{
                            email:email
                        }
                    }
                }
            }
        })
        return res.status(200).json(link);
    } catch (err) {
        return err.code == "P2025" ? 
        res.status(500).json({
            code:"notFound",
            message:"The agent with the email '"+email+"' was not found"
        })
        :
        (
            err.code == "P2016"?
            res.status(500).json({
                code:"notFound",
                message:"The authorisation '"+authName+"' doesn't exist!!"
            })
            :
            res.status(500).json(err)
        )
        ;
    }
}

module.exports = {
    linkAgent
}
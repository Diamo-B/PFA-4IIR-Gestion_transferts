const prisma = require("../../prisma/prismaInstance");

let unlinkAgent = async (req,res) => {
    let {email, authName} = req.body;

    try {
        let agent = await prisma.agent.findFirst({
            where:{
                user:{
                    email: email
                }
            }
        })
        if (!agent) {
            throw{
                code: "agent_not_found",
                message: "There's no agent with the email '" + email + "'"
            };
        }
    
    let authorization = await prisma.authorisation.findFirst({
        include:{
            agents:{
                include:{
                    user: true
                }
            }
        },
        where:{
            name: authName,
        }
    })

    if (!authorization) {
        throw{
            code: "auth_not_found",
            message: "There's no authorization under the name '" + authName + "'"
        };
    }

    if (!authorization.agents.some(agent => agent.user.email === email)) {
        throw{
            code: "agent_not_linked",
            message: "The agent with email '" + email + "' is not linked to the authorization '" + authName + "'"
        };
    }

    let updatedAuthorisation = await prisma.authorisation.update({
        where:{
            name: authName
        },
        include:{
            agents:{
                include:{
                    user: true
                }
            }
        },
        data:{
            agents:{
                disconnect:{
                    userId: agent.userId
                }
            }
        }
    })

    return res.status(200).json({updatedAuthorisation,status:"done"})
    } catch (err) {
    return  res.status(500).json(err)
    }

    
}

module.exports = {
    unlinkAgent
}
const prisma = require("../../prisma/prismaInstance");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let createToken = (user,type) => {
  let token = jwt.sign({userId: user.id,type: type},process.env.JWT_SECRET,{expiresIn: "1h"});
  return token;
}

let hashPassword = async (pass) =>{
  let salt = await bcrypt.genSalt();
  return await bcrypt.hash(pass,salt); 
}

let createUser = async (req, res) => {
  let {firstName,lastName,email,password} = req.body;
  try {
    password = await hashPassword(password);
    let newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
      }
    });
    return newUser;
  } catch (err) {
    throw err.code=="P2002"?
    {
      code: "duplicate_email",
      message:"email already used"
    }
    :
      err
    ;
  }
};

let createClient = async (req, res) => {
  try {
    let newUser = await createUser(req, res);
    let newClient = await prisma.client.create({
      data: {
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
      include:{
        user:true,
      }
    });
    
    // Make JWT & cookie
    let token = createToken(newClient, "client");

    return res.status(200).json({newClient,token});
  } catch (error) {
    return res.status(500).json({error});
  }
};

let createAgent = async (req, res, isSuperAgent) => {
  try {
    let newUser = await createUser(req, res);
    let newAgent = await prisma.agent.create({
      data:{
        user:{
          connect:{
            id: newUser.id
          }
        }
      },
      include:{
        user:{
          select:{
            createdAt: false,
            password: false,
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            banned: true,
            agent:true,
            client:true
          }
        }
      }
    });
    //DONE: Create an AgentCategoryPermission for each Category for this agent
        //?Fetch the Ids of the available categories in the format [{id: @value}]
        let categories = await prisma.category.findMany({
          select:{
            id: true
          }
        });

        //? Loop through categories and create AgentCategoryPermission for each
        let agentCatPermPromises = categories.map(category => {
          return prisma.agentCategoryPermission.create({
            data: {
              agent: {
                connect: {
                  userId: newAgent.userId
                }
              },
              category: {
                connect: {
                  id: category.id
                }
              }
            }
          });
        });

        //? Wait for all AgentCategoryPermission creations to complete
        let agentCatPerms = await Promise.all(agentCatPermPromises);

    if(isSuperAgent === true)
      return newAgent;
    //DONE: Make JWT & cookie
    let token = createToken(newAgent, "agent");
    return res.status(200).json({newAgent, token});
  } catch (err) {
    return res.status(500).json(err);
  }
};

let createSuperAgent = async (req,res) => {
  try 
  {
    let Agent = await createAgent(req,res,true);

    let superAgent = await prisma.agent.update({
      where:{
        userId: Agent.userId
      },
      data:{
        isSuperAdmin: true
      },
      include:{
        user:{
          select:{
            createdAt: false,
            password: false,
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            banned: true,
            agent:true,
            client:true
          }
        }
      }
    })
    let token = createToken(superAgent, "superAgent");
    return res.status(200).json({superAgent, token});
  }
  catch (err) 
  {
    return res.status(500).json(err);
  }
}

module.exports = {
  createClient,
  createAgent,
  createSuperAgent
};

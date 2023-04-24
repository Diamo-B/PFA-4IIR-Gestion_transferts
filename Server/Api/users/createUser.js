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
      },
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
        user:true
      }
    });
    
    // Make JWT & cookie
    let token = createToken(newClient, "client");

    return res.status(200).json({newClient,token});
  } catch (error) {
    return res.status(500).json({error});
  }
};

let createAgent = async (req, res) => {
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
        user:true
      }
    });
    // Make JWT & cookie
    let token = createToken(newAgent, "agent");
    return res.status(200).json({newAgent, token});
  } catch (err) {
    return res.status(500).json(err);
  }
  
};

module.exports = {
  createClient,
  createAgent
};

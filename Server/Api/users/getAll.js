const prisma = require("../../prisma/prismaInstance");

let getAllUsers = async (req,res) => {
  try {
    let users = await prisma.user.findMany({
      include:{
        agent: true,
        client: true
      }
    })
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
}

let getClients = async (req,res) => {
  try {
    let clients = await prisma.client.findMany({
      include:{
        user: true
      }
    });
    return res.status(200).json(clients);
  } catch (err) {
    return res.status(500).json(err);
  }
}

let getAgents = async (req,res) => {
  try {
    let agents = await prisma.agent.findMany({
      include: {
        user: true
      }
    });
    return res.status(200).json(agents)
  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = {
  getClients,
  getAgents,
  getAllUsers
}
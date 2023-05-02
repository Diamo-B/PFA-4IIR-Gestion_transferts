const prisma = require("../../prisma/prismaInstance");

let countUsers = async (req, res) => {
    let type = req.params.type; // clients, agents or all
    try {
      let count;
      if (type === "clients") {
        count = await prisma.client.count();
      } else if (type === "agents") {
        count = await prisma.agent.count();
      } 
      else {
        count = await prisma.user.count();
      }
      return res.status(200).json(count);
    } catch (err) {
      return res.status(500).json(err);
    }
  };
  

module.exports = {countUsers}
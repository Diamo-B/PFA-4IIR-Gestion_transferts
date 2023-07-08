const prisma = require("../../prisma/prismaInstance");

let getAllUsers = async (req, res) => {
    try {
        let users = await prisma.user.findMany({
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              password: false,
              createdAt: false,
              banned: true,
              client: true,
              agent: true
            }
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
};

let getClients = async (req, res) => {
    try {
        let clients = await prisma.client.findMany({
            include: {
                user: true,
            },
        });
        clients.map((client) => {
            client.type = "client";
        })
        return res.status(200).json(clients);
    } catch (err) {
        return res.status(500).json(err);
    }
};

let getAgents = async (req, res) => {
    try {
        let agents = await prisma.agent.findMany({
            include: {
                user: true,
            },
        });
        return res.status(200).json(agents);
    } catch (error) {
        return res.status(500).json(error);
    }
};

let getNormalAgentsOnly = async (req,res) => {
    try {
        let agents = await prisma.agent.findMany({
            where:{
                isSuperAdmin: false
            },
            include:{
                user: true
            }
        });
        if(agents.length === 0)
        {
            return res.status(400).json({err: "No Agents were found"})
        }
        agents.map((agent) => {
            agent.type = "agent";
        })
        return res.status(200).json(agents);
    } catch (err) {
        return res.status(500).josn(err);
    }
}

let getSuperAgentsOnly = async (req,res) => {
    try {
        let agents = await prisma.agent.findMany({
            where:{
                isSuperAdmin: true
            },
            include:{
                user: true
            }
        });
        if(agents.length === 0)
        {
            return res.status(400).json({err: "No SuperAgents were found"})
        }
        agents.map((agent) => {
            agent.type = "superAgent";
        })
        return res.status(200).json(agents);
    } catch (err) {
        return res.status(500).josn(err);
    }
}

module.exports = {
    getClients,
    getAgents,
    getAllUsers,
    getNormalAgentsOnly,
    getSuperAgentsOnly
};

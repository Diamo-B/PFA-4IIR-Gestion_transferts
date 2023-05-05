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

let getAgentsWithPermissions = async (req, res) => {
    try {
        let agents = await prisma.agent.findMany({
            include: {
                user: {
                    select:{
                        email:true,
                        firstName:true,
                        lastName:true
                    }
                },
                categories:{
                    select: {
                        id: false,
                        agentId: false,
                        categoryId: false,
                        category: {
                            select: {
                                name: true
                            }
                        },
                        permissions: {
                            select: {
                                value: true
                            }
                        }
                    }
                }
            },
        });
        return res.status(200).json(agents);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    getClients,
    getAgents,
    getAllUsers,
    getAgentsWithPermissions
};

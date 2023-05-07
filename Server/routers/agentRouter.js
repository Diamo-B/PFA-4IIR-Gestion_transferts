const express = require("express");
const router = express.Router();
const {createAgent} = require('../Api/users/createUser');
const {getAgents} = require("../Api/users/getAll");
const {requireAuthAgent} = require('../middlewares/agentAuth');
const {getAgentsWithPermissions} = require('../Api/users/getAll');
const { requireAuthSuperAgent } = require("../middlewares/superAgentAuth");

router.post('/create',requireAuthSuperAgent,createAgent);
router.get('/getAll',requireAuthAgent, getAgents); // auth middleware (agent)
router.get('/permissions/getAll',requireAuthAgent,getAgentsWithPermissions)
module.exports = router;
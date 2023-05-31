const express = require("express");
const router = express.Router();
const {createAgent} = require('../Api/users/createUser');
const {getAgents, getNormalAgentsOnly, getSuperAgentsOnly} = require("../Api/users/getAll");
const {requireAuthAgent} = require('../middlewares/agentAuth');
const { requireAuthSuperAgent } = require("../middlewares/superAgentAuth");

router.post('/create',requireAuthSuperAgent,createAgent);
router.get('/getAll/Normal',requireAuthSuperAgent, getNormalAgentsOnly);
router.get('/getAll/Super',requireAuthSuperAgent,getSuperAgentsOnly);
router.get('/getAll',requireAuthAgent, getAgents); // auth middleware (agent)
module.exports = router;
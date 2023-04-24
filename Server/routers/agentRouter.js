const express = require("express");
const router = express.Router();
const {createAgent} = require('../Api/users/createUser');
const {getAgents} = require("../Api/users/getAll");
const {requireAuthAgent} = require('../middlewares/agentAuth');

router.post('/create',createAgent);
router.get('/getAll',requireAuthAgent, getAgents); // auth middleware (agent)

module.exports = router;
const express = require("express");
const router = express.Router();
const {createClient} = require('../Api/users/createUser');
const {getClients} = require('../Api/users/getAll');
const {requireAuthAgent} = require('../middlewares/agentAuth');


router.post('/create',createClient);
router.get('/getAll',requireAuthAgent,getClients) // auth middleware (agent)


module.exports = router;
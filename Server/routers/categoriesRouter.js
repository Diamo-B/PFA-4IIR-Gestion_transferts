const express = require("express");
const router = express.Router();
const { create } = require("../Api/Categories/create");
const { getAll } = require("../Api/Categories/getAll");
const { remove } = require("../Api/Categories/remove");
const { update } = require("../Api/Categories/update");

const {requireAuthAgent} = require('../middlewares/agentAuth');
 
router.use(requireAuthAgent); // auth middleware (agent)
router.get('/getAll',getAll);
router.post('/create',create);
router.put('/update',update);
router.delete('/remove',remove);

module.exports=router;
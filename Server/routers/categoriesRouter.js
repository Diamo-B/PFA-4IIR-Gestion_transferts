const express = require("express");
const router = express.Router();
const { create } = require("../Api/Categories/create");
const { getAll } = require("../Api/Categories/getAll");
const { remove } = require("../Api/Categories/remove");
const { update } = require("../Api/Categories/update");

const { requireAuthSuperAgent } = require("../middlewares/superAgentAuth");
 
router.use(requireAuthSuperAgent); // auth middleware (agent)
router.get('/getAll',getAll);
router.post('/create',create);
router.put('/update',update);
router.delete('/remove',remove);

module.exports=router;
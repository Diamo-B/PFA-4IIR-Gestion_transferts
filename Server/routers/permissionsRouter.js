const express = require("express");
const router = express.Router();

const {requireAuthAgent} = require('../middlewares/agentAuth');
const { create } = require("../Api/Permissions/create");
const { changeAgentPermissions } = require("../Api/Permissions/linkAgentPermissions");


router.use(requireAuthAgent);
router.post('/create',create);
router.post('/link',changeAgentPermissions);


module.exports = router;
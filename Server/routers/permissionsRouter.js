const express = require("express");
const router = express.Router();

const {requireAuthSuperAgent} = require('../middlewares/superAgentAuth');
const { create } = require("../Api/Permissions/create");
const { changeAgentPermissions } = require("../Api/Permissions/linkAgentPermissions");


router.use(requireAuthSuperAgent);
router.post('/create',create);
router.post('/link',changeAgentPermissions);


module.exports = router;
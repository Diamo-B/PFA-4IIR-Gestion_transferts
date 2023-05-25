const express = require("express");
const router = express.Router();

const {requireAuthSuperAgent} = require('../middlewares/superAgentAuth');
const { create } = require("../Api/Permissions/create");
const { deletePermissions } = require("../Api/Permissions/delete");
const { update } = require("../Api/Permissions/update");
const { getAll } = require("../Api/Permissions/getAll");


router.use(requireAuthSuperAgent);
router.post('/create',create);
router.get("/getAll",getAll);
router.put('/update',update)
router.delete('/remove',deletePermissions)

module.exports = router;
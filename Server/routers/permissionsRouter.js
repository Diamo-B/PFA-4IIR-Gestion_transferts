const express = require("express");
const router = express.Router();

const {requireAuthAgent} = require('../middlewares/agentAuth');
const { create } = require("../Api/Permissions/create");


router.use(requireAuthAgent);
router.post('/create',create);


module.exports = router;
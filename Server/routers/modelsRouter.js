const express = require("express");
const { create } = require("../Api/Models/create");
const { getAll } = require("../Api/Models/getAll");
const { remove } = require("../Api/Models/remove");
const { requireAuthAgent } = require("../middlewares/agentAuth");
let router = express.Router();

router.use(requireAuthAgent);
router.post("/create",create);
router.get("/getAll",getAll);
router.delete("/remove",remove);
module.exports = router;
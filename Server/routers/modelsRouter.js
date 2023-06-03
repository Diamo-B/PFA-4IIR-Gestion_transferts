const express = require("express");
const { create } = require("../Api/Models/create");
const { getAll } = require("../Api/Models/getAll");
const { remove } = require("../Api/Models/remove");
const { update } = require("../Api/Models/update");
const { requireAuthAgent } = require("../middlewares/agentAuth");
let router = express.Router();

router.use(requireAuthAgent);
router.post("/create",create);
router.get("/getAll",getAll);
router.put("/update",update);
router.delete("/remove",remove);
module.exports = router;
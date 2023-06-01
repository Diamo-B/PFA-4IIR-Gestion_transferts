const express = require("express");
let router = express.Router();
const { getAll } = require("../Api/Paths/getAll");
const {requireAuthAgent} = require("../middlewares/agentAuth");
const { create } = require("../Api/Paths/create");
const { remove } = require("../Api/Paths/remove");
const { update } = require("../Api/Paths/update");
const { removeMany } = require("../Api/Paths/removeMany");

router.use(requireAuthAgent);
router.post("/create",create);
router.get("/getAll",getAll);
router.put("/update",update);
router.delete("/remove",remove);
router.delete("/removeMany",removeMany);

module.exports = router;
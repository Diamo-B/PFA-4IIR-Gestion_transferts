const express = require("express");
let router = express.Router();
const { getAll } = require("../Api/Periods/getAll");
const { create } = require("../Api/Periods/create");
const { remove } = require("../Api/Periods/remove");
const {requireAuthAgent} = require("../middlewares/agentAuth");
const { update } = require("../Api/Periods/update");
const { removeMany } = require("../Api/Periods/removeMany");


router.use(requireAuthAgent);
router.post("/create",create);
router.get("/getAll",getAll);
router.put("/update",update);
router.delete("/delete",remove);
router.delete("/removeMany",removeMany);
module.exports = router;
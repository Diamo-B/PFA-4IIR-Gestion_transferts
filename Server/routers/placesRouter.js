const express = require("express");
let router = express.Router();
const { getAll } = require("../Api/Places/getAll");
const {requireAuthAgent} = require("../middlewares/agentAuth");
const { create } = require("../Api/Places/create");
const { remove } = require("../Api/Places/remove");
const { update } = require("../Api/Places/update");
const { removeMany } = require("../Api/Places/removeMany");
const { getByID } = require("../Api/Places/getByID");

router.use(requireAuthAgent);
router.get("/getAll",getAll);
router.get("/get/:ID",getByID)
router.post("/create",create);
router.put("/update",update);
router.delete("/remove",remove);
router.delete("/removeMany",removeMany);
module.exports = router;
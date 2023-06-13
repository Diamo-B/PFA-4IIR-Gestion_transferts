const express = require("express");
const { create } = require("../Api/Vehicules/create");
const { getAll } = require("../Api/Vehicules/getAll");
const { getByModel } = require("../Api/Vehicules/getByModel");
const { remove } = require("../Api/Vehicules/remove");
//const { update } = require("../Api/Vehicules/update");
const { requireAuthAgent } = require("../middlewares/agentAuth");
const {getByID} = require("../Api/Vehicules/getByID");
let router = express.Router();

router.use(requireAuthAgent);
router.post("/create",create);
router.get("/getAll",getAll);
router.get("/getByModel/:modelName",getByModel);
router.get("/getById/:id",getByID);
//router.put("/update",update);
router.delete("/remove",remove);
module.exports = router;
const express = require("express");
let router = express.Router();
const { getAll } = require("../Api/Reservations/getAll");
const {requireAuthAgent} = require("../middlewares/agentAuth");
const {requireGeneralAuth} = require("../middlewares/AuthorizeAll");
const { create } = require("../Api/Reservations/create");
const { remove } = require("../Api/Reservations/remove");
const { update } = require("../Api/Reservations/update");
const { removeMany } = require("../Api/Reservations/removeMany");
const { getByID } = require("../Api/Reservations/getByID");
const { getByClientID } = require("../Api/Reservations/getByClientID");

router.use(requireGeneralAuth);
router.get("/getByClient",getByClientID)
router.post("/create",create);
router.use(requireAuthAgent);
router.get("/get/:ID",getByID)
router.get("/getAll",getAll);
router.put("/update",update);
router.delete("/remove",remove);
router.delete("/removeMany",removeMany);
module.exports = router;
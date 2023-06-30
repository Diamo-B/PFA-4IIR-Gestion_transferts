const express = require("express");

const router = express.Router();
const typesRouter = express.Router(); 

const {requireAuthAgent} = require('../middlewares/agentAuth');
const getAll = require("../Api/Extras/getAll");
const createExtra = require("../Api/Extras/createExtra");
const updateExtra = require("../Api/Extras/updateExtra");
const removeExtra = require("../Api/Extras/removeExtra");
const removeExtraBatch = require("../Api/Extras/removeExtraBatch");

const getAllTypes = require("../Api/Extras/ExtraTypes/getAllTypes");
const createExtraType = require("../Api/Extras/ExtraTypes/createExtraType");
const updateExtraType = require("../Api/Extras/ExtraTypes/updateExtraType");
const removeExtraType = require("../Api/Extras/ExtraTypes/removeExtraType");
const removeExtraTypeBatch = require("../Api/Extras/ExtraTypes/removeExtraTypeBatch");

//auth middleware
router.use(requireAuthAgent);

//extras
router.get("/getAll",getAll);
router.post("/create",createExtra);
router.put("/update",updateExtra);
router.delete("/remove",removeExtra);
router.delete("/removeMany",removeExtraBatch);

//extra types
typesRouter.get("/getAll",getAllTypes);
typesRouter.post("/create",createExtraType);
typesRouter.put("/update",updateExtraType);
typesRouter.delete("/remove",removeExtraType);
typesRouter.delete("/removeMany",removeExtraTypeBatch)

router.use("/types",typesRouter);

module.exports = router;
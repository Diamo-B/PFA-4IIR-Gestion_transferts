const express = require("express");
const router = express.Router();
const { createAuthorisation } = require("../Api/Authorisations/create");
const { linkAgent } = require("../Api/Authorisations/linkAgent");
const { getAll } = require("../Api/Authorisations/getAll");
const { unlinkAgent } = require("../Api/Authorisations/unlinkAgent");
const { removeAuthorisation } = require("../Api/Authorisations/remove");
const {requireAuthAgent} = require('../middlewares/agentAuth');
const { getByAgent } = require("../Api/Authorisations/getByAgent");
const { getByCategory } = require("../Api/Authorisations/getByCategory");
const { updateAgentPermissions } = require("../Api/Authorisations/updateAgentPermissions");

router.use(requireAuthAgent); // auth middleware (agent)

router.get('/getAll',getAll);
router.get('/getByAgentID/:id',getByAgent);
router.get('/getByCategoryName/:name',getByCategory);
router.post('/create',createAuthorisation);
router.put('/link',linkAgent);
router.put('/unlink',unlinkAgent);
router.put('/updatePermissions',updateAgentPermissions);
router.delete('/remove',removeAuthorisation);

module.exports=router;
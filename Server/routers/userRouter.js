const express = require("express");
const router = express.Router();
const {removeUser} = require('../Api/users/removeUser');
const {updateUser} = require('../Api/users/updateUser');
const { getByMail } = require("../Api/users/getByMail");
const {getAllUsers} = require('../Api/users/getAll');
const {requireAuthAgent} = require('../middlewares/agentAuth');
const {getByTerm} = require("../Api/users/getByTerm");
const { countUsers } = require("../Api/users/countUsers");
const { removeUsers } = require("../Api/users/removeUsers");

const {login} = require('../Api/login');
router.post('/login',login);

router.use(requireAuthAgent); // auth middleware (agent)
router.get('/getAll',getAllUsers);
router.get('/getMail/:mail',getByMail);
router.get('/termSearch/:term',getByTerm);
router.get("/count/:type",countUsers);
router.put('/update',updateUser);
router.delete('/remove',removeUser);
router.delete('/removeBatch',removeUsers);



module.exports = router;

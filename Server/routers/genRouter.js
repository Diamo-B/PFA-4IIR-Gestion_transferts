const express = require("express");
const router = express.Router();

const genUserRouter = require('./userRouter');
const clientRouter = require('./clientRouter');
const agentRouter = require('./agentRouter');
const authorisationsRouter = require('./authorisationRouter');
const categoriesRouter = require('./categoriesRouter');
const permissionRouter = require('./permissionsRouter');

router.use('/client',clientRouter);
router.use('/agent',agentRouter);
router.use('/user',genUserRouter);
router.use('/category',categoriesRouter);
router.use('/authorisation',authorisationsRouter);
router.use('/permission',permissionRouter);


const {verifyJWT} = require('../Api/verifyJWT');
router.post('/verifyJWT',verifyJWT);

router.get('/',(req,res) => {
  return res.status(200).json("hello api root");
})


module.exports = router;
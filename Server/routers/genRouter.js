const express = require("express");
const router = express.Router();

const genUserRouter = require('./userRouter');
const clientRouter = require('./clientRouter');
const agentRouter = require('./agentRouter');
const authorisationsRouter = require('./authorisationRouter');
const categoriesRouter = require('./categoriesRouter')

router.use('/client',clientRouter);
router.use('/agent',agentRouter);
router.use('/user',genUserRouter);
router.use('/categories',categoriesRouter);
router.use('/authorisation',authorisationsRouter);
const {verifyJWT} = require('../Api/verifyJWT');
router.post('/verifyJWT',verifyJWT);

router.get('/',(req,res) => {
  return res.status(200).json("hello api root")
})


module.exports = router;
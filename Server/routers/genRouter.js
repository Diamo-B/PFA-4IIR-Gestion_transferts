const express = require("express");
const router = express.Router();

const genUserRouter = require('./userRouter');
const clientRouter = require('./clientRouter');
const agentRouter = require('./agentRouter');
const authorisationsRouter = require('./authorisationRouter');
const categoriesRouter = require('./categoriesRouter');
const permissionRouter = require('./permissionsRouter');
const placesRouter = require('./placesRouter');
const pathsRouter = require('./pathsRouter');
const modelsRouter = require("./modelsRouter");
const vehiculesRouter = require("./vehiculesRouter");
const periodRouter = require("./periodRouter");
const extraRouter = require("./extraRouter");
const reservationRouter = require("./reservationRouter");

router.use('/client',clientRouter);
router.use('/agent',agentRouter);
router.use('/user',genUserRouter);
router.use('/category',categoriesRouter);
router.use('/authorisation',authorisationsRouter);
router.use('/permission',permissionRouter);
router.use('/place',placesRouter)
router.use('/path',pathsRouter);
router.use('/models',modelsRouter)
router.use('/vehicule',vehiculesRouter)
router.use('/period',periodRouter);
router.use('/extra',extraRouter);
router.use('/reservation',reservationRouter);

const {verifyJWT} = require('../Api/verifyJWT');

router.post('/verifyJWT',verifyJWT);

router.get('/',(req,res) => {
  return res.status(200).json("hello api root");
})

router.get('/images/:filename', (req, res) => {
  const { filename } = req.params;
  res.sendFile(`../public/imgs/${filename}`, { root: __dirname });
});

module.exports = router;
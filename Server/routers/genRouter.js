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

const fs = require("fs");
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/imgs');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});

// pass the path and the filename to multer
var upload = multer({ storage: storage });

router.get("/images/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    console.log(imageName);
    const readStream = fs.createReadStream(`public/imgs/${imageName}`);
    readStream.pipe(res);
});

router.post("/images/upload", upload.array("images", 10), (req, res) => {
  const imageNames = req.files.map(file => file.filename);
  return res.status(200).json(imageNames);
});


module.exports = router;
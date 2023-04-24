const dotEnv = require('dotenv');
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotEnv.config();

/* middlewares */
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.static('public'))
app.use(cookieParser());

const genRouter = require('./routers/genRouter');
app.use('/api',genRouter);


app.listen(3000, ()=>{
    console.log(`listening on port 3000`);
})
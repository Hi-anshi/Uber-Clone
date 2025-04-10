const dotenv = require('dotenv');
dotenv.config();
const express = require('express'); 
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require('./db/db');
connectDB();
const userRoutes = require('./routes/user.route');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", (req,res)=>{
    res.send("Hello World");
})

app.use('/users', userRoutes);

module.exports = app;
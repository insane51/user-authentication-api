const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');

const app = express();
app.use(express.json());
env.config();


const host = process.env.host;
const port = process.env.port;

//DB Connection
mongoose.connect(process.env.dB_url).then(()=>{
    console.log("DB connected successfully");
}).catch((err)=>{
    console.log(err);
});


app.listen(port,(req,res)=>{
    console.log(`Server running at http://${host}:${port}/`);
});

app.get('/',(req,res)=>{
    res.json('app is fine');
})

const userRoute = require('./routes/userRoutes');
app.use('/api',userRoute);




//Add all dependencies
const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Create an instance of express app
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

//For swaggers API documentation
const options = {
    definition: {
        openapi : "3.0.0",
        info : {
            title : "NodeJS API for user authentication",
            version : "1.0.0"
        },
        servers:[
            {
                url : "http://localhost:3000"
            }
        ]
    },
    apis:['./index.js','./routes/*.js']
}

//Add the '/api-docs' route to fetch the API documantation
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

//App will be listioning to the given port
app.listen(port,(req,res)=>{
    console.log(`Server running at http://${host}:${port}/`);
});

const apiDocs = `http://${host}:${port}/api-docs`;


/**
 * @swagger
 * /:
 *   get:
 *     summary: Root endpoint
 *     description: Get information about the API
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: App is running fine
 *       500:
 *         description: Internal server error
 */

app.get('/',(req,res)=>{
    res.status(200).json(`App is running fine : ${apiDocs}`);
})

//User's route 
const userRoute = require('./routes/userRoutes');
app.use('/api',userRoute);

//If user try to fetch a route,which is not defined then this route will be executed
app.use('/*',(req,res)=>{
    res.status(404).json("404 Page not found!!!");
})




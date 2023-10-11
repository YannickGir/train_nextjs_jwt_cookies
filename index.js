const express = require('express');
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const cors = require('cors');

const routes = require('./routes/routes')
dotenv.config();

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb+srv://User_test:' + process.env.PASSWORDDB + '@cluster0.rhyjx.mongodb.net/crud', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const app = express()
    app.use(express.json())
    app.use(cors({
        credentials: true,
        origin:['http://localhost:3000', 'http://localhost:8080']
    }))
    app.use('/api', routes)

    app.listen(8080, ()=> {
        console.log('connected to server !!')
    })
}
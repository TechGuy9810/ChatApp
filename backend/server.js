import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser'
import MessageRoute from './routes/messageRoute.js';
import authRoute from "./routes/authroute.js";
import connectMongo from "./db/connectToMongo.js";
import UserRoute from "./routes/userRoute.js";
import {app, server} from './socket/socket.js';

const __dirname = path.resolve();
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoute);
app.use("/api/messages",MessageRoute);
app.use("/api/user",UserRoute);

app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
})
server.listen(PORT,()=>{
    connectMongo();
    console.log(`Server is running on port ${PORT}`);

})
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MongoDB_URL);

const dataBase = mongoose.connection
dataBase.on("open", ()=>{
    console.log("MongoDB Connected Successfully");
});
dataBase.on("error", ()=>{
    console.log("Error : Database connection failed");
});


export default dataBase;
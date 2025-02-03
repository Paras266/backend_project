import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const DBconnect = async ()=>{
    try {
        const dbconnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database is connected and running on port ${process.env.PORT}`);
        // console.log(dbconnectionInstance.connection.host);
    } catch (error) {
        console.log("MOBNGODB CONNECTION FAILED : " , error);
        throw(error) 
    }
}

export default DBconnect ;
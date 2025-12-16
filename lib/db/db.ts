import { connect } from "mongoose";

const mongodbURL= process.env.MONGODB_URI;

if(!mongodbURL){
    throw new Error("mongodb url is not found");
}

let cached = global.mongoose;

if(!cached){
    cached=global.mongoose = {conn:null,promise:null}
}


const connectDB = async () =>{

    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        cached.promise = connect(mongodbURL).then((c) => c.connection);
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        throw error;
    }


    return cached.conn;
}

export default connectDB;
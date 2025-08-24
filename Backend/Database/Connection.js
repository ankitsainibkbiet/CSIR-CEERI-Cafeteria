import mongoose from "mongoose"

export const connection = async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DATABASE_NAME}`);
        console.log("Database Connected")
    }catch(err){
        console.log("Connection Failed in MongoDB Database : ", err.message)
    }
}
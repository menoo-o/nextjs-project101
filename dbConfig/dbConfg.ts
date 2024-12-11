import { log } from "console";
import mongoose from "mongoose";

export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection ;

        connection.on('connected', () =>{
            console.log('Mongodb connected!!')
        })

        connection.on("error", (err)=>{
            console.log('mongodb error during connection' +err);
            process.exit();
        })

        
    } catch (error) {
        console.log(error)
    }

}
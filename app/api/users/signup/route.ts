import { connect } from "@/dbConfig/dbConfg"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs" ;
import { sendEmail } from "@/helpers/mailer";

connect()


export async function POST(request: NextRequest){

    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        if( !username || !password || !email ){
            return NextResponse.json( {error: "Invalid data entry"}, {status:400} )
        }

        // checking if user exists
       const user =  await User.findOne({email})
       const existingUsername = await User.findOne({ username });
      
       if(user){
         return NextResponse.json( {error:"user already exists"}, {status:400} )
       } 

    //    email check
       if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
      }

     // existing username
        if (existingUsername) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 });
        }

       //hash password
       
       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(password, salt)
     
       const newUser = new User({
        username, 
        email,
        password: hashedPassword
       })


       const savedUser = await newUser.save();
       console.log(savedUser);

       //sending verification email
       await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
       
      
       return NextResponse.json( {message: "user created successfully"}, {status: 201} )

    } catch(error: any){
        return NextResponse.json({error:error.message}, {status: 500})
    }

}




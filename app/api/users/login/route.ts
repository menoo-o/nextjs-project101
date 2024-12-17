import { connect } from "@/dbConfig/dbConfg"
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs" ;
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json(); // Await is required here
        const { email, password } = reqBody;

        // Validate email and password presence
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if the password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
        }
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1h'})

        // If everything is fine, return success (e.g., JWT token generation can go here)
        const response =  NextResponse.json( { message: "Login successful", success: true, } );

        response.cookies.set("token", token, {
            httpOnly: true,
        } )

        return response

    } catch (error: any) {
        // Log the error for debugging purposes (but don't expose it to the client)
        console.error("Login error:", error);

        return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
    }
}

import { NextResponse } from "next/server";

// GET req-logout
export async function GET(){
    try {
        const response = NextResponse.json({
            message: "logout success",
            sucess: true,
        })

        response.cookies.set( "token", "", 
            {
                httpOnly: true, 
                expires: new Date(0)
            });

            return response

    } catch (error:any) {
        return NextResponse.json({message:"smth went wront", error}, {status:500})
    }

}
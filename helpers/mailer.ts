import nodemailer from 'nodemailer'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({email, emailType, userId}:any)=>{

    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, 
                {
                    verifyToken:hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        } else if (emailType === 'RESET'){
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000 
                }
            )
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "89de3bce2236b4",
            pass: "492a1e0b953796"
            }
        });

        const mailOptions = {
            from: 'supernovian123@gmail.com',
            to : email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a> to ${emailType ==='VERIFY' ? "verify your email" : "reset your passwd"} </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error:any) {
        throw new error(error.message)
    }

}
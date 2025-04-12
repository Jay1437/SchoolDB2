import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: true,
  },
};



export async function POST(request: Request) {
  try {
    // Get session data
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const currentEmail = session.user.email;

    // Get new email from request body
    const { newEmail } = await request.json();
    if (!newEmail) {
      return NextResponse.json({ error: "Missing new email" }, { status: 400 });
    }

    // Connect to MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    });

    // Check if the new email is already taken
    const [existingUser]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [newEmail]
    );
    if (existingUser.length > 0) {
      await connection.end();
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Generate OTP (6-digit) and set expiration (10 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 min from now

    // Store OTP in the users table
    await connection.execute(
      `UPDATE users 
       SET otp = ?, otp_expires = ?, pending_email = ? 
       WHERE email = ?`,
      [otp, otpExpires, newEmail, currentEmail]
    );

    await connection.end();

    // Send OTP email to the new email address
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"EduManager" <${process.env.EMAIL_USER}>`,
      to: newEmail,
      subject: "Verify Your New Email for EduManager",
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    });

    return NextResponse.json(
      { message: "OTP sent. Please verify your new email." },
      { status: 200 }
    );
  } catch (error: unknown) {
    // TypeScript expects 'unknown' here
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "OTP sending failed" }, { status: 500 });
  }
}

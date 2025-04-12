import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentEmail = session.user.email;
    const { newEmail } = await request.json();
    if (!newEmail) {
      return NextResponse.json({ error: "Missing new email" }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    });

    // Check if new email already exists
    const [rows]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [newEmail]
    );

    if (rows.length > 0) {
      await connection.end();
      return NextResponse.json({ error: "Email already in use" }, { status: 400 });
    }

    // Generate OTP and expiration time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

    // Store pending email and OTP
    await connection.execute(
      `UPDATE users SET pending_email = ?, otp = ?, otp_expires = ? WHERE email = ?`,
      [newEmail, otp, otpExpires, currentEmail]
    );
    await connection.end();

    // Send OTP email
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
      { message: "Verification OTP sent to your new email." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating email:", error);
    return NextResponse.json({ error: "Email update failed" }, { status: 500 });
  }
}

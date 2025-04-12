import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const config = {
  api: {
    bodyParser: true,
  },
};

interface User {
  id: number;
  verification_status: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Normalize email: trim spaces and convert to lowercase
    const normalizedEmail = email.trim().toLowerCase();

    // Hash the password for security.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 6-digit OTP code.
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Set OTP expiration to 10 minutes from now.
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    // Create a connection to your database.
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    });

    // Check if a user with that email already exists.
    const [queryResult]: [mysql.QueryResult, mysql.FieldPacket[]] = await connection.execute(
      "SELECT id, verification_status FROM users WHERE email = ?",
      [normalizedEmail]
    );

    // Access the rows from the QueryResult
    const existingRows = queryResult as User[];

    if (existingRows.length > 0) {
      const existingUser = existingRows[0];
      if (existingUser.verification_status === "Pending") {
        // If registration is pending, update OTP fields.
        await connection.execute(
          "UPDATE users SET otp = ?, otp_expires = ? WHERE email = ?",
          [otp, otpExpires, normalizedEmail]
        );
        await connection.end();

        // Send OTP email.
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        await transporter.sendMail({
          from: `"EduManager" <${process.env.EMAIL_USER}>`,
          to: normalizedEmail,
          subject: "Your OTP for EduManager Registration",
          text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
        });

        return NextResponse.json(
          { message: "A new OTP has been sent to your email." },
          { status: 200 }
        );
      } else {
        await connection.end();
        return NextResponse.json(
          { error: "Email is already registered." },
          { status: 400 }
        );
      }
    } else {
      // Insert the new user record.
      await connection.execute(
        `INSERT INTO users 
         (name, email, password, role, school_id, verified, verification_status, otp, otp_expires)
         VALUES (?, ?, ?, ?, NULL, false, 'Pending', ?, ?)`,
        [name, normalizedEmail, hashedPassword, "Admin", otp, otpExpires]
      );
      await connection.end();

      // Send OTP email.
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      await transporter.sendMail({
        from: `"EduManager" <${process.env.EMAIL_USER}>`,
        to: normalizedEmail,
        subject: "Your OTP for EduManager Registration",
        text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
      });

      return NextResponse.json(
        { message: "Registration successful. Check your email for OTP." },
        { status: 201 }
      );
    }
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

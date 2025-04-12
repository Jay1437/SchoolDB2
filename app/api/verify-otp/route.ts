import { NextResponse } from "next/server";
import mysql, { OkPacket, FieldPacket, QueryResult } from "mysql2/promise";

// Define User interface to match the result shape of the SELECT query
interface User {
  id: number;
  pending_email: string | null;
  verified: boolean;
  verification_status: string;
}

// Define UpdateResult to match the result shape of the UPDATE query
interface UpdateResult extends OkPacket {
  affectedRows: number;
}

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({ error: "Missing email or OTP" }, { status: 400 });
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
    });

    // Correctly typing the result of the SELECT query and extracting rows
    const [rows]: [QueryResult, FieldPacket[]] = await connection.execute(
      `SELECT id, pending_email, verified, verification_status FROM users 
       WHERE email = ? AND otp = ?`,
      [email, otp]
    );

    // Extract rows from the QueryResult and cast to User[]
    const users = rows as User[]; // Explicitly cast the result to User[]

    if (users.length === 0) {
      await connection.end();
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    const userId = users[0].id;
    const newEmail = users[0].pending_email ?? email;

    console.log("🔍 User ID:", userId);
    console.log("📩 New Email:", newEmail);

    // Correcting the typing for the UPDATE query result
    const [updateResult]: [UpdateResult, FieldPacket[]] = await connection.execute(
      `UPDATE users 
       SET email = ?, verified = 1, verification_status = 'Approved', 
           otp = NULL, otp_expires = NULL, pending_email = NULL, email_verified = 1
       WHERE id = ?`,
      [newEmail, userId]
    );

    console.log("✅ Update Result:", updateResult);

    await connection.commit();
    await connection.end();

    return NextResponse.json({ message: "Email verified successfully!" }, { status: 200 });

  } catch (error: unknown) {
    // Catch block with 'unknown' type
    console.error("🔥 Error verifying OTP:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}

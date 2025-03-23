import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import db from "./db";
import { OkPacket } from "mysql2";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// 📌 REGISTER API
app.post("/api/register", async (req: Request, res: Response): Promise<void> => {
    try {
        const { schoolName, adminName, email, password } = req.body;

        if (!schoolName || !adminName || !email || !password) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        // 🔍 Check if email exists
        const [existingUsers]: [any[], mysql.FieldPacket[]] = await db.query(
            "SELECT id FROM schools WHERE email = ? UNION SELECT id FROM admins WHERE email = ?",
            [email, email]
        );

        if (existingUsers.length > 0) {
            res.status(400).json({ error: "Email already in use" });
            return;
        }

        // 🛡️ Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Insert school
        const [schoolResult]: [OkPacket, mysql.FieldPacket[]] = await db.query(
            "INSERT INTO schools (school_name, email) VALUES (?, ?)",
            [schoolName, email]
        );

        const schoolId = schoolResult.insertId;

        // ✅ Insert admin
        const [adminResult]: [OkPacket, mysql.FieldPacket[]] = await db.query(
            "INSERT INTO admins (school_id, admin_name, email, password) VALUES (?, ?, ?, ?)",
            [schoolId, adminName, email, hashedPassword]
        );

        res.status(201).json({
            message: "Registration successful",
            schoolId,
            adminId: adminResult.insertId,
        });

    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ error: "Server error", details: error });
    }
});

// 🚀 Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});

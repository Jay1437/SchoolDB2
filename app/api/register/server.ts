import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db from "../../db"; // ✅ Import MySQL connection (Ensure it's using mysql2/promise)
import { OkPacket } from "mysql2"; // ✅ Fix TypeScript type issues

const router = express.Router();

// 📌 REGISTER API
router.post("/register", async (req: Request, res: Response): Promise<void> => {
    try {
        const { school_name, school_email, admin_name, admin_email, password } = req.body;

        // 🔍 Check if required fields are provided
        if (!school_name || !school_email || !admin_name || !admin_email || !password) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        // 🔍 Check if school email already exists
        const [schoolExists] = await db.query<any[]>(
            "SELECT id FROM schools WHERE email = ?",
            [school_email]
        );
        if (schoolExists.length > 0) {
            res.status(400).json({ error: "School email already exists" });
            return;
        }

        // 🔍 Check if admin email already exists
        const [adminExists] = await db.query<any[]>(
            "SELECT id FROM admins WHERE email = ?",
            [admin_email]
        );
        if (adminExists.length > 0) {
            res.status(400).json({ error: "Admin email already exists" });
            return;
        }

        // 🛡️ Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Insert new school
        const [schoolInsertResult] = await db.query<OkPacket>(
            "INSERT INTO schools (school_name, email) VALUES (?, ?)",
            [school_name, school_email]
        );

        const school_id = schoolInsertResult.insertId;

        // ✅ Insert new admin
        const [adminInsertResult] = await db.query<OkPacket>(
            "INSERT INTO admins (school_id, admin_name, email, password) VALUES (?, ?, ?, ?)",
            [school_id, admin_name, admin_email, hashedPassword]
        );

        res.status(201).json({
            message: "School and admin registered successfully",
            school_id,
            admin_id: adminInsertResult.insertId,
        });

    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Internal Server Error", details: error });
    }
});

export default router;

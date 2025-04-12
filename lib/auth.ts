import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth"; // ✅ Fix missing export issue

// ✅ Extend the User type to include schoolId
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    schoolId?: number; // ✅ Add schoolId with optional modifier
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    schoolId?: number; // ✅ Ensure it's in the token with optional modifier
  }
}

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        try {
          const [rows]: [mysql.RowDataPacket[], mysql.FieldPacket[]] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
          if (rows.length === 0) throw new Error("Invalid credentials");

          const dbUser = rows[0];

          if (!dbUser.verified) throw new Error("User is not verified.");

          const isValid = await bcrypt.compare(password, dbUser.password);
          if (!isValid) throw new Error("Invalid credentials");

          // ✅ Ensure schoolId is included
          return { id: String(dbUser.id), name: dbUser.name, email: dbUser.email, role: dbUser.role, schoolId: dbUser.schoolId };
        } catch (err) {
          throw err instanceof Error ? err : new Error("Login failed.");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.schoolId = user.schoolId; // ✅ Add schoolId to JWT token
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.schoolId = token.schoolId; // ✅ Ensure schoolId is passed to session
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
};

// ✅ Fix missing getSession export
export const getSession = async () => {
  return await getServerSession(authOptions);
};

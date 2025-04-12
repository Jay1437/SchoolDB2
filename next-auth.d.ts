import { DefaultSession } from "next-auth";

// Extending the default User interface
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    schoolId?: number; // schoolId can be optional
  }

  // Extending the session object to include schoolId
  interface Session {
    user: User;
  }
}

// Extending the JWT interface
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    schoolId?: number; // schoolId can be optional
  }
}

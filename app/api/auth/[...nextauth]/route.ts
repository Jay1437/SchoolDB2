import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Create an authentication handler using NextAuth
const handler = NextAuth(authOptions);

// Export GET and POST handlers to properly handle authentication requests
export { handler as GET, handler as POST };

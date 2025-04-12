import { getSession } from "@/lib/auth"; // ✅ Now correctly exported

export async function GET() {
  const session = await getSession();
  if (!session || !session.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  console.log("User's School ID:", session.user.schoolId);
  return new Response(JSON.stringify({ schoolId: session.user.schoolId }), { status: 200 });
}

import { getUser } from "@netlify/identity";

export async function requireAdmin() {
  const user = await getUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  if (!user.roles?.includes("admin")) return new Response("Forbidden", { status: 403 });
  return null;
}

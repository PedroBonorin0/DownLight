import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { backend } from "../lib/axios";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const res = await backend.get("/me");
  return (
    <div>
      <div>Dashboard</div>
      <div>{session?.user.role}</div>
    </div>
  );
}

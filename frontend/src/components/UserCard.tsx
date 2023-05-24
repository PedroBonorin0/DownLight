import { getServerSession } from "next-auth";
import { User } from "./Icons/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function UserCard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center gap-4 font-medium hover:bg-gray-100">
      {session?.user.avatar_url ? (
        <img src={session?.user.avatar_url} alt="" className="rounded-full" />
      ) : (
        <div className="rounded-full bg-gray-300 p-3 text-gray-500">
          <User />
        </div>
      )}

      <span>{session?.user.name}</span>
    </div>
  );
}

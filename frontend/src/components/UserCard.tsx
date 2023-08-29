import { getServerSession } from "next-auth";
import { User } from "./Icons/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export async function UserCard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex items-center gap-4 font-medium hover:bg-gray-100">
      <Avatar>
        <AvatarImage src={session?.user.avatar_url} />
        <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
      </Avatar>

      <span>{session?.user.name}</span>
    </div>
  );
}

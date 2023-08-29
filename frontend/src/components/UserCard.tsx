import { getServerSession, } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { useSession } from "next-auth/react";

interface Props {
  collapsed: boolean
}

export function UserCard({ collapsed }: Props) {
  const { data: session, status } = useSession()

  return (
    <div className="flex items-center gap-4 font-medium hover:bg-gray-100">
      <Avatar>
        <AvatarImage src={session?.user.avatar_url} />
        <AvatarFallback>{session?.user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      {
        !collapsed &&
        <span>{session?.user.name}</span>
      }
    </div>
  );
}

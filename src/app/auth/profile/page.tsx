"use client";
import Avatar from "@/components/ui/Avatar";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { userLogged } = useAuth();

  return (
    <div
      className="flex-1 flex flex-col sm:flex-row justify-center items-center p-2 gap-2"
    >
      {userLogged && (
        <div className="flex flex-col justify-center items-center p-2 gap-2 bg-zinc-800 rounded-xl">
          <Avatar
            src={`/${userLogged.avatar}`}
            alt={userLogged.username}
            className="size-32"
          />
          <p>{userLogged.username}</p>
        </div>
      )}
    </div>
  );
}

"use client";
import { useUserLogged } from "@/contexts/UserLoggedContext";
import Image from "next/image";

export default function ProfilePage() {
  const { userLogged, logout } = useUserLogged();

  const handleUserLogoutButtonClick = async () => {
    const logoutSuccess = await logout();
    if (logoutSuccess) {
      window.location.href = "/";
    } else {
      alert("Failed to logout");
    }
  };

  return (
    <div
      id="profile"
      className="h-full flex flex-col justify-center items-center p-2 gap-2"
    >
      <h2>Logged In as</h2>
      {userLogged && (
        <div className="w-full max-w-[200px] flex flex-col justify-center items-center p-2 gap-2 bg-zinc-900 rounded-xl">
          <Image
            src={userLogged.avatar}
            alt={userLogged.username}
            width={150}
            height={150}
            className="rounded-full"
          />
          <p>{userLogged.username}</p>

          <button
            className="p-2 bg-zinc-800 rounded-xl cursor-pointer"
            onClick={handleUserLogoutButtonClick}
          >
            Logout
          </button>

          <div>
            <h3>Favorite Movies</h3>
            <ul>{userLogged.favoriteMovies.join(", ")}</ul>
          </div>
        </div>
      )}
    </div>
  );
}

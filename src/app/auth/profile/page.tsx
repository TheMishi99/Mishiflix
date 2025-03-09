"use client";
import { useUserLogged } from "@/contexts/UserLoggedContext";
import Image from "next/image";
import Link from "next/link";

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
      className="flex flex-col justify-center items-center p-2 gap-2"
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
            {userLogged.favoriteMovies.length > 0 && (
              <>
                <h3>Favorite Movies</h3>
                <ul>
                  {userLogged.favoriteMovies.reduce<React.ReactNode[]>(
                    (acc, favMov, index) => {
                      acc.push(
                        <Link
                          key={favMov.id + favMov.title}
                          href={`/movies/${favMov.id}`}
                          className="text-red-600"
                        >
                          {favMov.title}
                        </Link>
                      );
                      if (index < userLogged.favoriteMovies.length - 1) {
                        acc.push(", ");
                      }
                      return acc;
                    },
                    []
                  )}
                </ul>
              </>
            )}
            {userLogged.favoriteSeries.length > 0 && (
              <>
                <h3>Favorite Series</h3>
                <ul>
                  {userLogged.favoriteSeries.reduce<React.ReactNode[]>(
                    (acc, favSer, index) => {
                      acc.push(
                        <Link
                          key={favSer.id + favSer.title}
                          href={`/series/${favSer.id}`}
                          className="text-red-600"
                        >
                          {favSer.title}
                        </Link>
                      );
                      if (index < userLogged.favoriteSeries.length - 1) {
                        acc.push(", ");
                      }
                      return acc;
                    },
                    []
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

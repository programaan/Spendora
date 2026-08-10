import { Link } from "react-router-dom";

import { Moon, Sun, CalendarDays } from "lucide-react";
import { useTheme } from "next-themes";

import { useUser } from "../../context/UserContext";

import MobileSidebar from "./MobileSidebar";

function Topbar() {
  const { theme, setTheme } = useTheme();

  const { user } = useUser();

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const displayName =
    user?.first_name ||
    user?.username ||
    "User";

return (

    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-3 backdrop-blur sm:px-4 md:h-20 md:px-6 lg:px-8">

      <div className="flex items-center gap-2 sm:gap-3">

        <div className="lg:hidden">
          <MobileSidebar />
        </div>

        <div className="min-w-0">
          <h2 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
            Welcome, {displayName} 👋
          </h2>
        </div>

      </div>

      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4">

        <div className="hidden sm:flex items-center gap-2 rounded-xl border bg-card px-4 py-2 shadow-sm">
          <CalendarDays size={18} />
          <span className="text-sm font-medium">
            {currentDate}
          </span>
        </div>

        <button
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
          className="
            rounded-full
            border
            bg-card
            p-2
            sm:p-2.5
            shadow-sm
            transition-all
            duration-300
            hover:scale-105
            hover:bg-accent
          "
        >
          {theme === "dark" ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

        <Link
          to="/profile"
          className="
            flex h-9 w-9
            sm:h-10 sm:w-10
            md:h-11 md:w-11
            items-center justify-center
            overflow-hidden rounded-full
            bg-primary shadow-sm
            transition-all duration-300
            hover:scale-105
          "
        >

          {user?.profile_image ? (

            <img
              src={user.profile_image}
              alt="Profile"
              className="h-full w-full object-cover"
            />

          ) : (

            <span className="font-semibold text-primary-foreground">

              {displayName.charAt(0).toUpperCase()}

            </span>

          )}

        </Link>

      </div>

    </header>
    
);

}

export default Topbar;
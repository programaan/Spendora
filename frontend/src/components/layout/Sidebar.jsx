import logo from "../../assets/expense.png";
import { NavLink, useNavigate } from "react-router-dom";

import { logoutUser } from "../../services/authService";
import { useUser } from "../../context/UserContext";

import { LayoutDashboard, Wallet, Receipt, Target, ChartColumn, User, LogOut } from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Income",
    icon: Wallet,
    path: "/income",
  },
  {
    name: "Expenses",
    icon: Receipt,
    path: "/expenses",
  },
  {
    name: "Budget",
    icon: Target,
    path: "/budget",
  },
  {
    name: "Reports",
    icon: ChartColumn,
    path: "/reports",
  },
  {
    name: "Profile",
    icon: User,
    path: "/profile",
  },
];

function Sidebar() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  function handleLogout() {
    logoutUser();
    setUser(null);
    navigate("/login", { replace: true });
  }

return (

    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-card lg:flex">
      
      <div className="flex h-20 shrink-0 items-center border-b px-7">

        <div className="flex h-12 w-12 items-center justify-center overflow-hidden">
          <img
            src={logo}
            alt="Spendora"
            className="h-12 w-12 object-cover"
          />
        </div>

        <div className="ml-3">    
          <h1 className="text-xl font-bold tracking-wide">
            Spendora
          </h1>

          <p className="text-xs text-muted-foreground">
            Personal Finance
          </p>
        </div>

      </div>

      <nav className="min-h-0 flex-1 space-y-2 overflow-y-auto p-5">

        {menuItems.map((item) => { 
          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`
              }
            >
              <Icon
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="shrink-0 border-t p-5">

        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            flex
            w-full
            items-center
            gap-4
            rounded-2xl
            px-4
            py-3
            text-sm
            font-medium
            text-red-500
            transition-all
            duration-300
            hover:bg-red-500
            hover:text-white
          "
        >
          <LogOut
            size={20}
            className="transition-transform duration-300 group-hover:scale-110"
          />

          <span>Logout</span>
        </button>

      </div>

    </aside>

);

}

export default Sidebar;
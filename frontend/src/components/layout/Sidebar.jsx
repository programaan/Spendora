import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Wallet,
 Receipt,
  Target,
  ChartColumn,
  User,
} from "lucide-react";

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
  return (
    <aside className="w-64 border-r bg-white flex flex-col">

      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-2xl font-bold tracking-wide">
          Spendora
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;
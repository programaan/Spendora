import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout({ children }) {
  return (

    <div className="min-h-screen bg-background">
      
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:ml-64">
        <Topbar />

        <main className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">

          <div className="mx-auto w-full max-w-7xl min-w-0">
            {children}
          </div>

        </main>

      </div>
    </div>
    
  );
}

export default DashboardLayout;
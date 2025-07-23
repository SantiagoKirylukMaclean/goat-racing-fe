import { Home, Users } from "lucide-react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { 
  Sidebar, 
  SidebarSection, 
  SidebarTitle, 
  SidebarNav, 
  SidebarNavItem 
} from "@/components/ui/sidebar"

export function Dashboard() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen mt-16">
      <Sidebar className="w-64 border-r bg-background pt-4">
        <SidebarSection>
          <SidebarTitle className="text-lg font-semibold">
            Dashboard
          </SidebarTitle>
          <SidebarNav>
            <SidebarNavItem 
              as={Link} 
              to="/dashboard" 
              active={location.pathname === "/dashboard"}
            >
              <Home className="h-4 w-4" />
              Home
            </SidebarNavItem>
            <SidebarNavItem 
              as={Link} 
              to="/dashboard/teams" 
              active={location.pathname === "/dashboard/teams"}
            >
              <Users className="h-4 w-4" />
              Teams
            </SidebarNavItem>
          </SidebarNav>
        </SidebarSection>
      </Sidebar>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard

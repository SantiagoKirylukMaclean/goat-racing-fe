import { 
  BarChart3, 
  PlayCircle, 
  Clock, 
  Settings, 
  Car, 
  FileText 
} from "lucide-react"
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"

export default function Home() {
  const { isAuthenticated, canAccess, permissions } = useAuth()

  const links = [
    {
      title: "Standings",
      href: "/standings",
      icon: BarChart3,
      resource: "standings",
    },
    {
      title: "Simulate weekend",
      href: "/simulate-events",
      icon: PlayCircle,
      resource: "simulate",
    },
    {
      title: "Timing by microsector",
      href: "/timing",
      icon: Clock,
      resource: "timing",
    },
    {
      title: "Tests configuration",
      href: "/tests",
      icon: Settings,
      resource: "tests",
    },
    {
      title: "Parts list",
      href: "/parts",
      icon: Car,
      resource: "parts",
    },
    {
      title: "Notes",
      href: "/notes",
      icon: FileText,
      resource: "notes",
    },
  ]

  console.log({
    isAuthenticated,
    permissions,
    canAccessStandings: canAccess('standings')
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link, index) => (
        (!isAuthenticated || !canAccess(link.resource)) ? (
          <div
            key={link.href}
            className="p-6 bg-card rounded-lg border shadow-sm flex items-center space-x-4 animate-fade-in opacity-50 cursor-not-allowed"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <link.icon className="h-6 w-6" />
            <span className="font-medium">{link.title}</span>
          </div>
        ) : (
          <Link
            key={link.href}
            to={link.href}
            className="p-6 bg-card hover:bg-accent rounded-lg border shadow-sm transition-colors flex items-center space-x-4 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <link.icon className="h-6 w-6" />
            <span className="font-medium">{link.title}</span>
          </Link>
        )
      ))}
    </div>
  )
}

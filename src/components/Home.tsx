import { 
  BarChart3, 
  PlayCircle, 
  Clock, 
  Settings, 
  Car, 
  FileText 
} from "lucide-react"
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
        <a
          key={link.href}
          href={(isAuthenticated && canAccess(link.resource)) ? link.href : "#"}
          className={`p-6 bg-card hover:bg-accent rounded-lg border shadow-sm transition-colors flex items-center space-x-4 animate-fade-in ${
            (!isAuthenticated || !canAccess(link.resource)) ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
          onClick={(e) => {
            if (!isAuthenticated || !canAccess(link.resource)) {
              e.preventDefault()
            }
          }}
        >
          <link.icon className="h-6 w-6" />
          <span className="font-medium">{link.title}</span>
        </a>
      ))}
    </div>
  )
}
import React from "react"

export function DashboardHome() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Welcome to Dashboard</h3>
          <p className="text-muted-foreground">
            This is the dashboard home page. More content will be added here in the future.
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Quick Stats</h3>
          <p className="text-muted-foreground">
            Statistics and metrics will be displayed here.
          </p>
        </div>
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h3 className="text-lg font-medium mb-2">Recent Activity</h3>
          <p className="text-muted-foreground">
            Recent activities and notifications will appear here.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome
import { AuthProvider } from './contexts/auth-context'
import { ThemeProvider } from './contexts/theme-context'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './home/Home'
import { Header } from './components/Header'
import Standings from './standings/Standings'
import SimulateWeekend from './simulate-weekend/SimulateWeekend'
import Timing from './timing/Timing'
import Tests from './tests/Tests'
import Parts from './parts/Parts'
import Notes from './notes/Notes'
import Dashboard from './dashboard/Dashboard'
import DashboardHome from './dashboard/DashboardHome'
import { ProtectedRoute } from './components/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/dashboard" element={
                <ProtectedRoute requireAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }>
                <Route index element={<DashboardHome />} />
              </Route>
              <Route path="*" element={
                <div className="container mx-auto py-8 px-4 mt-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/standings" element={<Standings />} />
                    <Route path="/simulate-events" element={<SimulateWeekend />} />
                    <Route path="/timing" element={<Timing />} />
                    <Route path="/tests" element={<Tests />} />
                    <Route path="/parts" element={<Parts />} />
                    <Route path="/notes" element={<Notes />} />
                  </Routes>
                </div>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

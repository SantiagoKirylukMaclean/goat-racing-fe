import { AuthProvider } from './contexts/auth-context'
import { ThemeProvider } from './contexts/theme-context'
import Home from './components/Home'
import { Header } from './components/Header'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="container mx-auto py-8 px-4 mt-16">
            <h1 className="text-3xl font-bold mb-8 text-center">Goat Racing Dashboard</h1>
            <Home />
          </div>
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App

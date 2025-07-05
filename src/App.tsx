import { AuthProvider } from './contexts/auth-context'
import Home from './components/Home'

function App() {
  return (
    <AuthProvider>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Goat Racing Dashboard</h1>
        <Home />
      </div>
    </AuthProvider>
  )
}

export default App

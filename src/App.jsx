import { lazy, Suspense } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/UI/ProtectedRoute'
import LoadingSpinner from './components/UI/LoadingSpinner'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProblemSelect from './pages/ProblemSelect'
import SessionReview from './pages/SessionReview'

const InterviewRoom = lazy(() => import('./pages/InterviewRoom'))
const Patterns = lazy(() => import('./pages/Patterns'))

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner fullPage />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <ProblemSelect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview/:problemId"
          element={
            <ProtectedRoute>
              <InterviewRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review/:sessionId"
          element={
            <ProtectedRoute>
              <SessionReview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patterns"
          element={
            <ProtectedRoute>
              <Patterns />
            </ProtectedRoute>
          }
        />

    <Route
      path="*"
      element={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white flex-col gap-4">
          <p className="text-6xl">404</p>
          <p className="text-slate-400">Page not found</p>
          <Link to="/" className="text-green-400 hover:underline">
            Go home
          </Link>
        </div>
      }
    />
      </Routes>
    </Suspense>
  )
}

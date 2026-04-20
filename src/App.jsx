import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
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
      </Routes>
    </Suspense>
  )
}

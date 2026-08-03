import Registration from './pages/RegistrationPage.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import { JobProvider } from './context/jobContext.jsx'
import { Toaster } from 'react-hot-toast'
import { CandidateProvider } from './context/candidateContext.jsx'

const App = () => {
  return (
    <div data-testid="app-root">
      <JobProvider>
      <CandidateProvider>
        <Toaster />
      <AppRoutes />
      </CandidateProvider>
      </JobProvider>
    </div>
  )
}

export default App
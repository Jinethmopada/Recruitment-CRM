import Registration from './pages/RegistrationPage.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import { JobProvider } from './context/jobContext.jsx'
import { Toaster } from 'react-hot-toast'
import { CandidateProvider } from './context/candidateContext.jsx'
import { EmployeeProvider } from './context/employeeContext.jsx'

const App = () => {
  return (
    <div data-testid="app-root">
      <JobProvider>
      <CandidateProvider>
      <EmployeeProvider>
        <Toaster />
      <AppRoutes />
      </EmployeeProvider>
      </CandidateProvider>
      </JobProvider>
    </div>
  )
}

export default App
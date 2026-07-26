import Registration from './pages/RegistrationPage.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import { JobProvider } from './context/jobContext.jsx'

const App = () => {
  return (
    <JobProvider>
    <AppRoutes />
    </JobProvider>
  )
}

export default App
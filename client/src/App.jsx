import Registration from './pages/RegistrationPage.jsx'
import AppRoutes from './routes/AppRoutes.jsx'
import { JobProvider } from './context/jobContext.jsx'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <JobProvider>
    <Toaster/>
    <AppRoutes />
    </JobProvider>
  )
}

export default App
import { Route, Routes } from 'react-router-dom'
import EngineerProfile from './pages/EngineerProfile'
import Engineers from './pages/Engineers'
import MakePayment from './pages/MakePayment'
import NotFound from './pages/NotFound'
import PaymentCallback from './pages/PaymentCallback'
import ProjectBooking from './pages/ProjectBooking'
import Studios from './pages/Studios'
import StudioDetails from './pages/StudioDetails'
import Index from './pages/services/Index'  
import Create from './pages/projects/Create'
import UserProjects from './pages/projects/UserProjects'
import ProjectDetail from './pages/projects/ProjectDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/services" element={<Index />} />
      <Route path="/my-projects" element={<UserProjects />} />
      <Route path="/projects/create" element={<Create />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="/studios" element={<Studios />} />
      <Route path="/studios/:studioId" element={<StudioDetails />} />
      <Route path="/engineer-profile" element={<EngineerProfile />} />
      <Route path="/project-booking" element={<ProjectBooking />} />
      <Route path="/make-payment" element={<MakePayment />} />
      <Route path="/payment/callback" element={<PaymentCallback />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

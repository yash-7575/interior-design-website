import { Routes, Route } from 'react-router'
import Layout from '@/components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Journal from './pages/Journal'
import NotFound from './pages/NotFound'
import RequireAuth from '@/components/admin/RequireAuth'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProjectForm from './pages/admin/ProjectForm'

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin — deliberately outside Layout: no public Navbar, Footer or
          WhatsApp button. Everything past the login is behind RequireAuth. */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAuth />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/projects/new" element={<AdminProjectForm />} />
        <Route path="/admin/projects/:id" element={<AdminProjectForm />} />
      </Route>
    </Routes>
  )
}

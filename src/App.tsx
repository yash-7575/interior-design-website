import { Routes, Route } from 'react-router'
import Layout from '@/components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Journal from './pages/Journal'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import AiNews from './pages/AiNews'
import UsefulLinks from './pages/UsefulLinks'
import Prompts from './pages/Prompts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projeler" element={<Projects />} />
          <Route path="ai-news" element={<AiNews />} />
          <Route path="faydali-linkler" element={<UsefulLinks />} />
          <Route path="yardimci-promptlar" element={<Prompts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

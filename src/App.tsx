import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Archive } from './pages/Archive'
import { Article } from './pages/Article'
import { Sources } from './pages/Sources'
import { Updates } from './pages/Updates'
import { Disclaimer } from './pages/Disclaimer'
import { NotFound } from './pages/NotFound'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/archive/:slug" element={<Article />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

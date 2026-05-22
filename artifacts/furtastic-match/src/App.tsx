import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import BreedProfile from './pages/BreedProfile';
import Comparison from './pages/Comparison';
import Breeders from './pages/Breeders';
import About from './pages/About';
import Contact from './pages/Contact';
import FindABreeder from './pages/FindABreeder';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AffiliateDisclosure from './pages/AffiliateDisclosure';
import AuthorProfile from './pages/AuthorProfile';
import NotFound from './pages/NotFound';

export default function App() {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';
  return (
    <BrowserRouter basename={base}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/breeds/:slug" element={<BreedProfile />} />
        <Route path="/compare/:slug" element={<Comparison />} />
        <Route path="/breeders" element={<Breeders />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/find-a-breeder" element={<FindABreeder />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
        <Route path="/about/author/:slug" element={<AuthorProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
import { useSearchParams } from 'react-router-dom';
import { ArrowRight } from '../components/CustomIcons';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import { getBreedBySlug } from '../lib/matchingEngine';
import { trackEvent } from '../lib/analytics';

export default function FindABreeder() {
  const [searchParams] = useSearchParams();
  const breedSlug = searchParams.get('breed') || '';
  const breed = getBreedBySlug(breedSlug);
  const breedName = breed?.name || breedSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Dog';

  const handleSearch = () => {
    trackEvent('breeder_click', { breed_name: breedName, card_slot: 'find_page' });
    window.open(`https://www.google.com/search?q=${encodeURIComponent(breedName + ' breeder near me')}`, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '80px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '24px' }}>
          Find a {breedName} Breeder Near You
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto' }}>
          We are currently building our network of verified breeders. In the meantime, you can search locally to find reputable breeders in your area.
        </p>
        <button onClick={handleSearch} className="btn-primary" style={{ padding: '16px 32px', fontSize: '18px' }}>
          Search for {breedName} Breeders <Icon icon={ArrowRight} size={18} />
        </button>
      </main>
      <Footer />
    </div>
  );
}
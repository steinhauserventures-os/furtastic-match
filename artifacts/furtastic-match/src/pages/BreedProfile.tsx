import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Ruler, Zap, Scissors, Baby, PawPrint, ArrowRight } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AdZone from '../components/AdZone';
import AffiliateCard from '../components/AffiliateCard';
import EmailCapture from '../components/EmailCapture';
import AuthorByline from '../components/AuthorByline';
import Icon, { BRAND_PURPLE } from '../components/Icon';
import { getBreedBySlug } from '../lib/matchingEngine';
import BreedImage from '../components/BreedImage';

export default function BreedProfile() {
  const { slug } = useParams();
  const breed = getBreedBySlug(slug || '');

  useEffect(() => {
    if (breed) {
      document.title = breed.meta_title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', breed.meta_description);
    }
  }, [breed]);

  if (!breed) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1, padding: '80px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px' }}>Breed not found</h1>
          <Link to="/" className="btn-primary" style={{ marginTop: '24px', padding: '12px 24px', textDecoration: 'none' }}>Go Home</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const activityLabels = ['Very Low', 'Low', 'Moderate', 'High', 'Very High', 'Extreme'];
  const groomingLabels = ['Minimal', 'Low', 'Moderate', 'High', 'Very High', 'Daily'];
  const kidsLabels = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent', 'Exceptional'];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": breed.meta_title,
    "description": breed.meta_description,
    "image": `https://furtasticmatch.com/breeds/${breed.slug}.png`,
    "author": {
      "@type": "Organization",
      "name": "FurtasticMatch"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FurtasticMatch",
      "logo": {
        "@type": "ImageObject",
        "url": "https://furtasticmatch.com/opengraph.jpg"
      }
    },
    "dateModified": breed.last_updated
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Nav />
      
      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px' }} className="breed-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ width: '96px', height: '96px', borderRadius: '16px', background: `linear-gradient(135deg, ${breed.illustration_bg[0]}, ${breed.illustration_bg[1]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', flexShrink: 0, overflow: 'hidden' }}>
              <BreedImage slug={breed.slug} emoji={breed.emoji} emojiFontSize="48px" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.1 }}>
              {breed.name}
            </h1>
          </div>

          <p style={{ fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
            {breed.breed_page_content.intro}
          </p>

          <AuthorByline updatedDate={breed.last_updated} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
            {[
              { l: 'Size', v: breed.size.charAt(0).toUpperCase() + breed.size.slice(1), icon: Ruler },
              { l: 'Energy', v: activityLabels[breed.activity_level], icon: Zap },
              { l: 'Grooming', v: groomingLabels[breed.grooming], icon: Scissors },
              { l: 'Kid-Friendly', v: kidsLabels[breed.good_with_kids], icon: Baby }
            ].map(t => (
              <div key={t.l} className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex' }}><Icon icon={t.icon} size={24} color={BRAND_PURPLE} /></div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', fontWeight: 700 }}>{t.l}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '16px' }}>{t.v}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#F8F5FF', borderRadius: '16px', padding: '24px', border: '1px dashed #D4C5F9', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '16px' }}>
              FurtasticMatch participates in affiliate programs. We earn a commission if you make a purchase through our breeder links.
            </p>
            <a href={breed.affiliate_link || `/find-a-breeder?breed=${breed.slug}`} className="btn-primary" style={{ padding: '16px 32px', fontSize: '16px', textDecoration: 'none' }}>
              Find {breed.name} Breeders <Icon icon={ArrowRight} size={18} />
            </a>
          </div>

          <div className="content-section" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Family Fit</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{breed.breed_page_content.family_fit}</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Grooming Needs</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{breed.breed_page_content.grooming}</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Activity & Exercise</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{breed.breed_page_content.activity}</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>Cost of Ownership</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{breed.breed_page_content.cost}</p>
            </div>
            {breed.breed_page_content.fun_fact && (
              <div style={{ background: '#FFF8E0', border: '2px solid #FFBE00', borderRadius: '14px', padding: '20px 24px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <span style={{ flexShrink: 0, display: 'flex' }}><Icon icon={PawPrint} size={24} color="#B07800" /></span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px', color: '#B07800', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>Fun Fact</div>
                  <p style={{ color: '#7A5500', lineHeight: 1.6, margin: 0 }}>{breed.breed_page_content.fun_fact}</p>
                </div>
              </div>
            )}
          </div>

          <div style={{ background: 'var(--cta)', color: 'white', padding: '40px 24px', borderRadius: '18px', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 800, marginBottom: '16px' }}>Still not sure if a {breed.name} is right for you?</h3>
            <Link to="/quiz" className="btn-accent" style={{ padding: '14px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>Take the Quiz <Icon icon={ArrowRight} size={18} /></Link>
          </div>

          <EmailCapture />

          {/* Mobile-only affiliate card — sidebar version is hidden below md */}
          <div className="md:hidden">
            <AffiliateCard breedName={breed.name} />
          </div>

          <AdZone width={728} height={90} id="ADSENSE UNIT 8" desktopOnly />

        </div>

        <div className="hidden md:flex flex-col gap-6" style={{ width: '300px', position: 'sticky', top: '100px', alignSelf: 'start' }}>
          {/* Reserved ad slot (ADSENSE UNIT 7) — holding Nexbie affiliate card until AdSense goes live */}
          <AffiliateCard breedName={breed.name} />
          <AdZone width={300} height={250} id="ADSENSE UNIT 7" desktopOnly />
        </div>

      </main>

      <div className="md:hidden" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--bg-card)', padding: '16px', borderTop: '1px solid var(--border)', zIndex: 50, display: 'flex', gap: '8px' }}>
        <Link to="/quiz" className="btn-primary" style={{ flex: 1, padding: '16px', justifyContent: 'center', textDecoration: 'none', fontSize: '16px' }}>
          Find out if it's a match <Icon icon={ArrowRight} size={18} />
        </Link>
      </div>

      <Footer />
      <style>{`
        @media (max-width: 768px) { 
          .breed-grid { grid-template-columns: 1fr !important; padding-bottom: 100px !important; } 
        }
      `}</style>
    </div>
  );
}
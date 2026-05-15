import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AdZone from '../components/AdZone';
import { getBreedBySlug } from '../lib/matchingEngine';

export default function Comparison() {
  const { slug } = useParams();
  const parts = slug?.split('-vs-');
  const breedA = getBreedBySlug(parts?.[0] || '');
  const breedB = getBreedBySlug(parts?.[1] || '');

  useEffect(() => {
    if (breedA && breedB) {
      document.title = `${breedA.name} vs ${breedB.name}: Which Is Right for Your Family? | FurtasticMatch`;
    }
  }, [breedA, breedB]);

  if (!breedA || !breedB) return null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, maxWidth: '1000px', margin: '0 auto', width: '100%', padding: '40px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', textAlign: 'center', marginBottom: '48px' }}>
          {breedA.name} vs {breedB.name}: Which Is Right for Your Family?
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '48px' }}>
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{breedA.emoji}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px' }}>{breedA.name}</h2>
          </div>
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{breedB.emoji}</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px' }}>{breedB.name}</h2>
          </div>
        </div>

        <div className="card" style={{ overflow: 'hidden', marginBottom: '48px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <tbody>
              {[
                { label: 'Size', a: breedA.size, b: breedB.size },
                { label: 'Energy Level', a: `${breedA.activity_level}/5`, b: `${breedB.activity_level}/5` },
                { label: 'Grooming', a: `${breedA.grooming}/5`, b: `${breedB.grooming}/5` },
                { label: 'Kid-Friendly', a: `${breedA.good_with_kids}/5`, b: `${breedB.good_with_kids}/5` },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : '#FAFAFA' }}>
                  <th style={{ padding: '16px', color: 'var(--text-muted)', fontWeight: 700, width: '33%' }}>{row.label}</th>
                  <td style={{ padding: '16px', fontWeight: 600 }}>{row.a}</td>
                  <td style={{ padding: '16px', fontWeight: 600, borderLeft: '1px solid var(--border)' }}>{row.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }} className="md-cols-1">
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>When to choose the {breedA.name}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>{breedA.breed_page_content.family_fit}</p>
            <Link to={`/breeds/${breedA.slug}`} className="btn-outline" style={{ display: 'inline-block', padding: '8px 16px', textDecoration: 'none' }}>Learn more about {breedA.name}</Link>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>When to choose the {breedB.name}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>{breedB.breed_page_content.family_fit}</p>
            <Link to={`/breeds/${breedB.slug}`} className="btn-outline" style={{ display: 'inline-block', padding: '8px 16px', textDecoration: 'none' }}>Learn more about {breedB.name}</Link>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', padding: '32px', borderRadius: '18px', textAlign: 'center', border: '2px solid var(--border)', marginBottom: '48px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Still unsure?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Take our 3-minute quiz to see which breed scores higher for your specific lifestyle.</p>
          <Link to="/quiz" className="btn-primary" style={{ padding: '14px 32px', textDecoration: 'none', display: 'inline-block' }}>Take the Quiz →</Link>
        </div>

        <AdZone width={728} height={90} id="ADSENSE UNIT 8" desktopOnly />

      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) { .md-cols-1 { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
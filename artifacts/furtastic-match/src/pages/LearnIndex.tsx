import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, PawPrint } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Icon, { BRAND_PURPLE } from '../components/Icon';

const ARTICLES = [
  {
    slug: 'hypoallergenic-dog-breeds',
    title: 'Best Hypoallergenic Dog Breeds: A Complete Guide for Allergy-Sensitive Families',
    description: 'A complete guide to dogs that produce less dander and shed less than average — including small, medium, and large options with honest health notes.',
    publishDate: '2026-06-09',
    readTime: '7 min read',
    tag: 'Breed Guide',
  },
  {
    slug: 'golden-retriever-vs-labrador',
    title: 'Golden Retriever vs. Labrador Retriever: Which Breed Is Right for Your Family?',
    description: 'A plain-language comparison of the two most popular breeds in the US — covering temperament, grooming, health risks, and a head-to-head decision guide.',
    publishDate: '2026-06-09',
    readTime: '8 min read',
    tag: 'Breed Comparison',
  },
];

export default function LearnIndex() {
  useEffect(() => {
    document.title = 'Breed Guides & Articles | FurtasticMatch';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'In-depth breed guides and comparisons to help you find the right dog for your lifestyle. Research-backed, honest, and jargon-free.');
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <main style={{ flex: 1, maxWidth: '900px', margin: '0 auto', width: '100%', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ color: 'var(--teal)', fontFamily: 'var(--font-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '12px', marginBottom: '8px' }}>
            Breed guides
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 40px)', lineHeight: 1.15, marginBottom: '16px' }}>
            Research the right dog <Icon icon={BookOpen} size={32} color={BRAND_PURPLE} style={{ verticalAlign: '-0.2em' }} />
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '60ch' }}>
            In-depth guides and comparisons to help you find the right breed for your life. Research-backed, honest, no fluff.
          </p>
        </div>

        {/* Article list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '60px' }}>
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/learn/${article.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                className="card"
                style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    background: 'var(--bg-muted)',
                    color: 'var(--cta)',
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    padding: '3px 10px',
                    borderRadius: '8px',
                  }}>
                    {article.tag}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{article.readTime}</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '20px', lineHeight: 1.3, margin: 0 }}>
                  {article.title}
                </h2>

                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, maxWidth: '65ch' }}>
                  {article.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cta)', fontWeight: 700, fontSize: '14px', marginTop: '4px' }}>
                  Read guide <Icon icon={ArrowRight} size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quiz CTA */}
        <div style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--border)',
          borderRadius: '18px',
          padding: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex' }}>
            <Icon icon={PawPrint} size={48} color={BRAND_PURPLE} />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', marginBottom: '6px' }}>
              Not sure which breed is right for you?
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Our free 3-minute quiz weighs your lifestyle, living space, and family situation to find your best match across 30 breeds.
            </p>
          </div>
          <Link to="/quiz" className="btn-primary" style={{ padding: '14px 28px', textDecoration: 'none', fontSize: '15px', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Take the Quiz <Icon icon={ArrowRight} size={16} />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

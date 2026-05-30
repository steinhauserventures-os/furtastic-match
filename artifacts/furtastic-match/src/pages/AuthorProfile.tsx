import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

export default function AuthorProfile() {
  const { slug } = useParams();

  useEffect(() => {
    document.title = "Editorial Team | FurtasticMatch";
  }, []);

  // Placeholder author info - to be replaced by Chuck
  const author = {
    name: "Editorial Team",
    slug: "editorial-team",
    title: "Dog Breed Experts",
    bio: "Our editorial team consists of experienced dog owners, breed enthusiasts, and animal welfare advocates passionate about helping families find the perfect canine companion. With decades of combined experience in dog training, breeding, and veterinary care, we're committed to providing accurate, unbiased breed information.",
    expertise: [
      "Dog breed characteristics and temperament",
      "Family-dog compatibility matching",
      "Responsible breeding practices",
      "Canine behavior and training"
    ],
    placeholder: true
  };

  if (slug !== 'editorial-team') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1, padding: '80px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px' }}>Author not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Author Header */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3DBFB8, #6B4FBB)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Icon icon={PenLine} size={56} color="white" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 42px)', marginBottom: '8px' }}>
              {author.name}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>{author.title}</p>
          </div>

          {/* Placeholder Notice */}
          {author.placeholder && (
            <div style={{
              background: '#FFF8E0',
              border: '2px solid #FFBE00',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '14px',
              color: '#B07800'
            }}>
              <strong>Note:</strong> This is a placeholder author profile. Real attribution and credentials will be added by site owner.
            </div>
          )}

          {/* Bio */}
          <div className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', marginBottom: '16px' }}>About</h2>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              {author.bio}
            </p>
          </div>

          {/* Expertise */}
          <div className="card" style={{ padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '24px', marginBottom: '16px' }}>Areas of Expertise</h2>
            <ul style={{ paddingLeft: '24px', fontSize: '16px', lineHeight: 2, color: 'var(--text-secondary)' }}>
              {author.expertise.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Credentials Notice */}
          <div style={{
            textAlign: 'center',
            padding: '24px',
            background: 'var(--bg-card)',
            borderRadius: '8px',
            fontSize: '14px',
            color: 'var(--text-muted)',
            fontStyle: 'italic'
          }}>
            All breed content is reviewed for accuracy and objectivity. We consult with certified dog trainers and veterinarians to ensure our recommendations are sound.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

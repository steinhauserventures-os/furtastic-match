import { useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function About() {
  useEffect(() => {
    document.title = "About FurtasticMatch | Dog Breed Matching Quiz";
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />
      <main style={{ flex: 1, maxWidth: '800px', margin: '0 auto', width: '100%', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '32px' }}>
          About FurtasticMatch
        </h1>
        
        <div style={{ fontSize: '18px', lineHeight: 1.8, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p>
            FurtasticMatch was built by a team passionate about helping families make the right decision before bringing a dog home. We believe every family deserves a dog that truly fits their lifestyle — not just the most popular breed on Instagram.
          </p>
          <p>
            Our quiz takes just 3 minutes and asks the questions that really matter: your activity level, living space, experience with dogs, and whether you have young children. We then match you with breeds from our database of 40 dogs, each carefully profiled for temperament, grooming needs, and family suitability.
          </p>
          <p id="disclosure">
            FurtasticMatch is free and completely unbiased. The quiz requires no sign-up. We participate in affiliate programs and may earn a commission if you purchase through our breeder links, at no extra cost to you.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
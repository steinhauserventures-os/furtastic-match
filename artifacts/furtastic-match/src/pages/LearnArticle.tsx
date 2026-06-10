import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, PawPrint, BookOpen } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import AdZone from '../components/AdZone';
import AuthorByline from '../components/AuthorByline';
import Icon, { BRAND_PURPLE } from '../components/Icon';

import hypoRaw from '../content/articles/hypoallergenic-dog-breeds.md?raw';
import labRaw from '../content/articles/golden-retriever-vs-labrador.md?raw';

const ARTICLES: Record<string, { raw: string; publishDate: string }> = {
  'hypoallergenic-dog-breeds': { raw: hypoRaw, publishDate: '2026-06-09' },
  'golden-retriever-vs-labrador': { raw: labRaw, publishDate: '2026-06-09' },
};

function processInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="article-link">$1</a>');
}

function renderMarkdown(md: string): string {
  const lines = md.split('\n');
  const parts: string[] = [];
  let inList = false;
  let inTable = false;
  let tableStarted = false;

  const closeList = () => { if (inList) { parts.push('</ul>'); inList = false; } };
  const closeTable = () => { if (inTable) { parts.push('</tbody></table>'); inTable = false; tableStarted = false; } };

  for (const line of lines) {
    if (line.startsWith('### ')) {
      closeList(); closeTable();
      parts.push(`<h3 class="article-h3">${processInline(line.slice(4))}</h3>`);
    } else if (line.startsWith('## ')) {
      closeList(); closeTable();
      parts.push(`<h2 class="article-h2">${processInline(line.slice(3))}</h2>`);
    } else if (line.startsWith('# ')) {
      closeList(); closeTable();
      // H1 is rendered separately as the page title — skip in body
    } else if (line.startsWith('|')) {
      closeList();
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      if (!tableStarted) {
        tableStarted = true;
        inTable = true;
        parts.push('<div class="article-table-wrap"><table class="article-table"><thead><tr>');
        parts.push(cells.map(h => `<th>${processInline(h)}</th>`).join(''));
        parts.push('</tr></thead><tbody>');
      } else if (line.match(/^\|[-|: ]+\|$/)) {
        // separator row — skip
      } else {
        parts.push('<tr>' + cells.map(c => `<td>${processInline(c)}</td>`).join('') + '</tr>');
      }
    } else if (inTable && !line.startsWith('|')) {
      closeTable();
      if (line.trim() === '' || line.match(/^---+$/)) {
        // continue
      } else {
        parts.push(`<p class="article-p">${processInline(line)}</p>`);
      }
    } else if (line.startsWith('- ')) {
      if (!inList) { parts.push('<ul class="article-ul">'); inList = true; }
      parts.push(`<li>${processInline(line.slice(2))}</li>`);
    } else if (line.match(/^---+$/)) {
      closeList(); closeTable();
      parts.push('<hr class="article-hr" />');
    } else if (line.trim() === '') {
      closeList();
    } else {
      closeList();
      parts.push(`<p class="article-p">${processInline(line)}</p>`);
    }
  }

  closeList(); closeTable();
  return parts.join('\n');
}

function extractTitle(raw: string): string {
  const match = raw.match(/^# (.+)$/m);
  return match ? match[1] : 'Article';
}

function extractDescription(raw: string): string {
  const lines = raw.split('\n').filter(l => l.trim() && !l.startsWith('#') && !l.startsWith('---') && !l.startsWith('-'));
  const first = lines[0] || '';
  return first.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[(.+?)\]\(.+?\)/g, '$1').slice(0, 160);
}

export default function LearnArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? ARTICLES[slug] : undefined;

  const title = useMemo(() => article ? extractTitle(article.raw) : '', [article]);
  const description = useMemo(() => article ? extractDescription(article.raw) : '', [article]);
  const html = useMemo(() => article ? renderMarkdown(article.raw) : '', [article]);

  const canonicalUrl = `https://furtasticmatch.com/learn/${slug}`;

  useEffect(() => {
    if (!article) return;
    document.title = `${title} | FurtasticMatch`;
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setOg = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el); }
      el.setAttribute('content', content);
    };
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el); }
      el.setAttribute('href', href);
    };
    setMeta('description', description);
    setOg('og:title', title);
    setOg('og:description', description);
    setOg('og:url', canonicalUrl);
    setOg('og:type', 'article');
    setLink('canonical', canonicalUrl);
  }, [article, title, description, canonicalUrl]);

  if (!article) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1, padding: '80px 24px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', marginBottom: '16px' }}>Article not found</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>That guide doesn't exist — try browsing all our breed articles below.</p>
          <Link to="/learn" className="btn-primary" style={{ padding: '12px 24px', textDecoration: 'none' }}>
            Browse Breed Guides <Icon icon={BookOpen} size={18} />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": { "@type": "Organization", "name": "FurtasticMatch" },
    "publisher": {
      "@type": "Organization",
      "name": "FurtasticMatch",
      "logo": { "@type": "ImageObject", "url": "https://furtasticmatch.com/opengraph.jpg" }
    },
    "datePublished": article.publishDate,
    "url": canonicalUrl,
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Nav />

      <main style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px' }} className="article-grid">
        <div>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
            <span>›</span>
            <Link to="/learn" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Breed Guides</Link>
            <span>›</span>
            <span style={{ color: 'var(--text-primary)' }}>{title}</span>
          </nav>

          {/* Article title */}
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 42px)', lineHeight: 1.15, marginBottom: '20px' }}>
            {title}
          </h1>

          <AuthorByline updatedDate={article.publishDate} />

          <AdZone width={728} height={90} id="ADSENSE LEARN TOP" desktopOnly />

          {/* Article body */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {/* Bottom CTA */}
          <div style={{ background: 'var(--cta)', color: 'white', padding: '40px 24px', borderRadius: '18px', textAlign: 'center', marginTop: '48px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
              <Icon icon={PawPrint} size={32} color="white" />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800, marginBottom: '12px' }}>
              Find your perfect breed match
            </h3>
            <p style={{ opacity: 0.85, fontSize: '16px', marginBottom: '24px' }}>
              Answer 8 quick questions about your lifestyle and we'll match you with the right breed.
            </p>
            <Link
              to="/quiz?utm_source=organic&utm_medium=seo&utm_campaign=demand_seo&utm_content=article-cta"
              className="btn-accent"
              style={{ padding: '14px 32px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Take the Quiz <Icon icon={ArrowRight} size={18} />
            </Link>
          </div>

          <AdZone width={728} height={90} id="ADSENSE LEARN BOTTOM" desktopOnly />
        </div>

        {/* Sidebar */}
        <div className="hidden md:flex flex-col gap-6" style={{ width: '300px', position: 'sticky', top: '100px', alignSelf: 'start' }}>
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon icon={PawPrint} size={18} color={BRAND_PURPLE} /> Find Your Breed
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
              Not sure which breed fits your life? Our free 3-minute quiz gives you a personalized match.
            </p>
            <Link to="/quiz" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px 16px', textDecoration: 'none', fontSize: '14px' }}>
              Take the Quiz <Icon icon={ArrowRight} size={16} />
            </Link>
          </div>
          <AdZone width={300} height={250} id="ADSENSE LEARN SIDEBAR" desktopOnly />
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) { .article-grid { grid-template-columns: 1fr !important; } }

        .article-body { margin-top: 32px; }

        .article-body .article-h2 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 26px;
          color: var(--text-primary);
          margin: 44px 0 14px;
          padding-top: 8px;
        }
        .article-body .article-h3 {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 20px;
          color: var(--text-primary);
          margin: 32px 0 10px;
        }
        .article-body .article-p {
          font-size: 17px;
          line-height: 1.75;
          color: var(--text-secondary);
          max-width: 68ch;
          margin: 0 0 16px;
        }
        .article-body .article-ul {
          margin: 0 0 20px 0;
          padding-left: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .article-body .article-ul li {
          font-size: 17px;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 68ch;
        }
        .article-body .article-hr {
          border: none;
          border-top: 2px solid var(--border);
          margin: 40px 0;
        }
        .article-body .article-link {
          color: var(--cta);
          font-weight: 700;
          text-decoration: none;
        }
        .article-body .article-link:hover { text-decoration: underline; }

        .article-table-wrap {
          overflow-x: auto;
          margin: 0 0 28px;
          border-radius: 14px;
          border: 2px solid var(--border);
          box-shadow: 4px 4px 0 var(--border);
        }
        .article-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 15px;
        }
        .article-table th {
          background: var(--bg-muted);
          padding: 12px 16px;
          text-align: left;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-primary);
          border-bottom: 2px solid var(--border);
        }
        .article-table td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          color: var(--text-secondary);
          line-height: 1.5;
          vertical-align: top;
        }
        .article-table tr:last-child td { border-bottom: none; }
        .article-table tr:hover td { background: var(--bg); }

        @media (max-width: 768px) {
          .article-body .article-h2 { font-size: 22px; }
          .article-body .article-h3 { font-size: 18px; }
          .article-body .article-p,
          .article-body .article-ul li { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}

import { useEffect } from 'react';

/**
 * Injects/updates a <link rel="canonical"> in document.head for the current page.
 * Cleans up on unmount. Safe to call from multiple pages — only one canonical
 * element is ever present at a time.
 */
export function useCanonical(url: string) {
  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const created = !link;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
    return () => {
      if (link && created) {
        try { document.head.removeChild(link); } catch {}
      }
    };
  }, [url]);
}

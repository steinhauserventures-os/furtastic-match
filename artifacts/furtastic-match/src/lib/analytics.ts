import posthog from 'posthog-js';

declare function gtag(...args: unknown[]): void;

/**
 * Initialize PostHog. Call once at app startup (main.tsx) before React renders.
 * Key is read from VITE_POSTHOG_KEY env var. No-ops silently if key is absent.
 * Automatically opts out on localhost to exclude developer traffic.
 */
export function initPostHog(): void {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined;
  if (!key) return;
  posthog.init(key, {
    api_host: 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: false, // keep noise low; use explicit captures
    loaded: (ph) => {
      // Opt out on localhost so developer/Chuck sessions don't pollute analytics.
      // Day 1 KPI (10+ completions from non-Chuck sources) requires clean data.
      const host = window.location.hostname;
      if (host === 'localhost' || host === '127.0.0.1') {
        ph.opt_out_capturing();
      }
    },
  });
}

/**
 * Capture a PostHog event directly (low-level). Silently no-ops if PostHog
 * is not initialised (key missing).
 */
export function capturePostHogEvent(
  name: string,
  properties?: Record<string, unknown>
): void {
  try {
    posthog.capture(name, properties);
  } catch {
    // PostHog not initialised or blocked — fail silently
  }
}

/**
 * Track a named event to both Google Analytics (gtag) and PostHog.
 * Excludes localhost to prevent Chuck/developer sessions from polluting GA4.
 * All existing callers of trackEvent() automatically get PostHog coverage.
 */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  const host = window.location.hostname;
  const isLocalhost = host === 'localhost' || host === '127.0.0.1';
  if (!isLocalhost && typeof gtag !== 'undefined') {
    gtag('event', name, params);
  }
  capturePostHogEvent(name, params);
}

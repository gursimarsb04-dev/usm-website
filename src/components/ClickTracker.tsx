'use client';
// One delegated click listener for link-based GA4 events, so new links are
// covered automatically without wiring each one:
//  - donate_click          any link out to dvnetwork.org (Dasvandh Network)
//  - join_network_click    the SSA Collective signup form (forms.gle/wHkPjPA8JVDuFSXE8)
//  - data-track="<event>"  explicit opt-in, e.g. event_register_click on /events
import { useEffect } from 'react';
import { track } from '@/lib/track';

const JOIN_NETWORK_PATH = '/wHkPjPA8JVDuFSXE8';

export default function ClickTracker() {
  useEffect(() => {
    function onClick(ev: MouseEvent) {
      const a = (ev.target as HTMLElement | null)?.closest?.('a');
      if (!a || !a.href) return;
      const params = {
        link_url: a.href,
        link_text: (a.textContent ?? '').trim().slice(0, 100),
        page_path: window.location.pathname,
      };
      const explicit = a.dataset.track;
      if (explicit) {
        track(explicit, { ...params, event_name: a.dataset.eventName });
        return;
      }
      let url: URL;
      try {
        url = new URL(a.href);
      } catch {
        return;
      }
      if (url.hostname === 'dvnetwork.org' || url.hostname.endsWith('.dvnetwork.org')) {
        track('donate_click', params);
      } else if (url.hostname === 'forms.gle' && url.pathname === JOIN_NETWORK_PATH) {
        track('join_network_click', params);
      }
    }
    // Capture phase: fires before navigation, even for target="_blank" links.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
  return null;
}

'use client';
// The centerpiece: every SSA as a pin. Live chapters link to their page;
// unclaimed chapters show a "claim your page" prompt — scale without dead pages.
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import type { SSA } from '@/lib/types';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

// Frames the map to whatever pins exist — no hard-coded center as chapters spread.
const FitBounds = dynamic(
  () => import('react-leaflet').then((m) => {
    const { useMap } = m;
    return function Fit({ points }: { points: [number, number][] }) {
      const map = useMap();
      useEffect(() => {
        if (points.length === 0) return;
        if (points.length === 1) { map.setView(points[0], 11); return; }
        map.fitBounds(points as any, { padding: [40, 40] });
      }, [map, points]);
      return null;
    };
  }),
  { ssr: false }
);

export default function SSAMap({ ssas }: { ssas: SSA[] }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    // Leaflet CSS — loaded client-side only
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    setReady(true);
    return () => { document.head.removeChild(link); };
  }, []);

  if (!ready) return <div className="ssa-map bg-mist animate-pulse" />;

  const pinned = ssas.filter(s => s.latitude && s.longitude);

  return (
    <MapContainer center={[39.5, -98]} zoom={4} className="ssa-map" scrollWheelZoom={true}>
      <FitBounds points={pinned.map((s) => [s.latitude!, s.longitude!])} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {pinned.map((s) => (
        <CircleMarker
          key={s.id}
          center={[s.latitude!, s.longitude!]}
          radius={s.status === 'live' ? 9 : 6}
          pathOptions={{
            color: '#235470',
            fillColor: s.status === 'live' ? '#F5D78C' : '#E9F1F3',
            fillOpacity: 0.95,
            weight: 2,
          }}
        >
          <Popup className="ssa-popup">
            <div className="min-w-[15rem] max-w-[16rem]">
              <div className="font-display text-base font-bold text-teal">{s.name}</div>
              <div className="text-xs text-teal-soft">{s.school}</div>

              {s.description && (
                <p className="mt-2 text-xs leading-relaxed text-teal-ink/80 line-clamp-4">
                  {s.description}
                </p>
              )}

              {s.instagram_handle && (
                <a
                  href={`https://instagram.com/${s.instagram_handle.replace(/^@/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal underline"
                >
                  @{s.instagram_handle.replace(/^@/, '')} on Instagram ↗
                </a>
              )}

              <div className="mt-3 flex items-center gap-2">
                {/* Join button — no functionality wired up yet */}
                <button
                  type="button"
                  className="rounded-full bg-gold px-4 py-2 text-xs font-display font-semibold text-teal-ink hover:bg-gold-deep transition-colors"
                >
                  Join SSA →
                </button>
                {s.status === 'live' ? (
                  <Link href={`/ssas/${s.slug}`} className="text-xs font-semibold text-teal underline">
                    View chapter →
                  </Link>
                ) : (
                  <Link href="/portal/login" className="text-xs text-teal-soft underline">
                    Claim page
                  </Link>
                )}
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

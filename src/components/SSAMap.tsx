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
    <MapContainer center={[39.5, -96]} zoom={4} className="ssa-map" scrollWheelZoom={false}>
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
          <Popup>
            <div className="font-semibold">{s.name}</div>
            <div className="text-xs">{s.school}</div>
            {s.status === 'live' ? (
              <Link href={`/ssas/${s.slug}`} className="text-xs font-semibold underline">
                View chapter →
              </Link>
            ) : (
              <Link href="/portal/login" className="text-xs underline">
                On the network — claim your page
              </Link>
            )}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

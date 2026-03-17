'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface SSAChapter {
  id: string;
  university: string;
  city: string;
  state: string;
  country: string;
  region: string;
}

const ssaChapters: SSAChapter[] = [
  { id: '1', university: 'UCLA', city: 'Los Angeles', state: 'CA', country: 'USA', region: 'West' },
  { id: '2', university: 'UC Berkeley', city: 'Berkeley', state: 'CA', country: 'USA', region: 'West' },
  { id: '3', university: 'UC Davis', city: 'Davis', state: 'CA', country: 'USA', region: 'West' },
  { id: '4', university: 'UC San Diego', city: 'San Diego', state: 'CA', country: 'USA', region: 'West' },
  { id: '5', university: 'UC Irvine', city: 'Irvine', state: 'CA', country: 'USA', region: 'West' },
  { id: '6', university: 'University of Washington', city: 'Seattle', state: 'WA', country: 'USA', region: 'West' },
  { id: '7', university: 'Arizona State University', city: 'Tempe', state: 'AZ', country: 'USA', region: 'West' },
  { id: '8', university: 'University of Michigan', city: 'Ann Arbor', state: 'MI', country: 'USA', region: 'Midwest' },
  { id: '9', university: 'University of Illinois Urbana-Champaign', city: 'Champaign', state: 'IL', country: 'USA', region: 'Midwest' },
  { id: '10', university: 'Purdue University', city: 'West Lafayette', state: 'IN', country: 'USA', region: 'Midwest' },
  { id: '11', university: 'University of Texas at Austin', city: 'Austin', state: 'TX', country: 'USA', region: 'South' },
  { id: '12', university: 'Texas A&M University', city: 'College Station', state: 'TX', country: 'USA', region: 'South' },
  { id: '13', university: 'University of Florida', city: 'Gainesville', state: 'FL', country: 'USA', region: 'South' },
  { id: '14', university: 'Georgia Institute of Technology', city: 'Atlanta', state: 'GA', country: 'USA', region: 'South' },
  { id: '15', university: 'Virginia Tech', city: 'Blacksburg', state: 'VA', country: 'USA', region: 'South' },
  { id: '16', university: 'University of Maryland', city: 'College Park', state: 'MD', country: 'USA', region: 'Northeast' },
  { id: '17', university: 'New York University', city: 'New York', state: 'NY', country: 'USA', region: 'Northeast' },
  { id: '18', university: 'Rutgers University', city: 'New Brunswick', state: 'NJ', country: 'USA', region: 'Northeast' },
  { id: '19', university: 'Stony Brook University', city: 'Stony Brook', state: 'NY', country: 'USA', region: 'Northeast' },
  { id: '20', university: 'University of Toronto', city: 'Toronto', state: 'ON', country: 'Canada', region: 'Canada' },
];

export default function FindSSAPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChapters = useMemo(() => {
    if (!searchTerm.trim()) return ssaChapters;

    const term = searchTerm.toLowerCase();
    return ssaChapters.filter(
      (chapter) =>
        chapter.university.toLowerCase().includes(term) ||
        chapter.city.toLowerCase().includes(term) ||
        chapter.state.toLowerCase().includes(term) ||
        chapter.country.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1a1a2e] to-[#2d2d44] px-4 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Find Your Sikh Student Association
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Connect with one of our 39 SSA chapters at universities across North America
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 py-12 bg-[F8F9FA]">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by university name or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6B00] transition-colors"
            />
          </div>
          <p className="mt-4 text-gray-600">
            Showing {filteredChapters.length} of {ssaChapters.length} chapters
          </p>
        </div>
      </section>

      {/* SSA Chapters Grid */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {filteredChapters.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-gradient-to-r from-[#FF6B00] to-[#D4A843] px-6 py-4">
                    <h3 className="text-xl font-bold text-white">{chapter.university}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-2">
                      {chapter.city}, {chapter.state} {chapter.country !== 'USA' ? ` • ${chapter.country}` : ''}
                    </p>
                    <div className="flex items-center justify-between mt-6">
                      <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                        Active
                      </span>
                      <Link
                        href="#"
                        className="bg-[#1a1a2e] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#2d2d44] transition-colors"
                      >
                        Connect
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">
                No chapters found matching "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="text-[#FF6B00] font-semibold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-[#1a1a2e] px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Don't see your school?
          </h2>
          <Link
            href="/get-involved"
            className="inline-block bg-[#FF6B00] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#E55A00] transition-colors text-lg"
          >
            Start a Chapter
          </Link>
        </div>
      </section>
    </div>
  );
}

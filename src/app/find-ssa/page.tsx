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
  // California
  { id: '1', university: 'Sacramento State', city: 'Sacramento', state: 'CA', country: 'USA', region: 'California' },
  { id: '2', university: 'UC Berkeley', city: 'Berkeley', state: 'CA', country: 'USA', region: 'California' },
  { id: '3', university: 'UC Davis', city: 'Davis', state: 'CA', country: 'USA', region: 'California' },
  { id: '4', university: 'CSU Stanislaus', city: 'Turlock', state: 'CA', country: 'USA', region: 'California' },
  { id: '5', university: 'Fresno State', city: 'Fresno', state: 'CA', country: 'USA', region: 'California' },
  { id: '6', university: 'UC Merced', city: 'Merced', state: 'CA', country: 'USA', region: 'California' },
  { id: '7', university: 'CSU East Bay', city: 'Hayward', state: 'CA', country: 'USA', region: 'California' },
  { id: '8', university: 'San Francisco State', city: 'San Francisco', state: 'CA', country: 'USA', region: 'California' },
  { id: '9', university: 'University of San Francisco', city: 'San Francisco', state: 'CA', country: 'USA', region: 'California' },
  { id: '10', university: 'Cal Poly Pomona', city: 'Pomona', state: 'CA', country: 'USA', region: 'California' },
  { id: '11', university: 'UC Riverside', city: 'Riverside', state: 'CA', country: 'USA', region: 'California' },
  { id: '12', university: 'University of Southern California', city: 'Los Angeles', state: 'CA', country: 'USA', region: 'California' },
  { id: '13', university: 'UC Irvine', city: 'Irvine', state: 'CA', country: 'USA', region: 'California' },
  { id: '14', university: 'Cal State Fullerton', city: 'Fullerton', state: 'CA', country: 'USA', region: 'California' },
  { id: '15', university: 'UC San Diego', city: 'San Diego', state: 'CA', country: 'USA', region: 'California' },
  { id: '16', university: 'Cal State Long Beach', city: 'Long Beach', state: 'CA', country: 'USA', region: 'California' },
  { id: '17', university: 'UCLA', city: 'Los Angeles', state: 'CA', country: 'USA', region: 'California' },
  { id: '18', university: 'UC Santa Barbara', city: 'Santa Barbara', state: 'CA', country: 'USA', region: 'California' },
  { id: '19', university: 'Orange Coast College', city: 'Costa Mesa', state: 'CA', country: 'USA', region: 'California' },
  // Washington
  { id: '20', university: 'University of Washington', city: 'Seattle', state: 'WA', country: 'USA', region: 'West' },
  // New York
  { id: '21', university: "St. John's University", city: 'Queens', state: 'NY', country: 'USA', region: 'Northeast' },
  // New Jersey
  { id: '22', university: 'New Jersey Institute of Technology', city: 'Newark', state: 'NJ', country: 'USA', region: 'Northeast' },
  { id: '24', university: 'Rutgers University', city: 'New Brunswick', state: 'NJ', country: 'USA', region: 'Northeast' },
  // Indiana
  { id: '23', university: 'Purdue University', city: 'West Lafayette', state: 'IN', country: 'USA', region: 'Midwest' },
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
            Meet your local sangat. Connect with one of our {ssaChapters.length} SSA chapters at universities across the US.
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
          <h2 className="text-3xl font-bold text-white mb-4">
            Don&apos;t see your school? Start a chapter.
          </h2>
          <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
            USM provides everything you need — resources, training, and ongoing support to build a thriving SSA on your campus.
          </p>
          <Link
            href="/get-involved"
            className="inline-block bg-[#FF6B00] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#E55A00] transition-colors text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
}

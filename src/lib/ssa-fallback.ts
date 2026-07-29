// Full active-chapter roster — used when Supabase has no `ssas` rows (e.g. no
// database configured yet). Mirrors `program-fallbacks.ts`: real data ships
// with the app so the map and directory work before any DB is wired up, and
// Supabase data wins the moment it's populated. Sourced from the 25–26
// "Active SSA's List" tracker. Coordinates are city-level approximations —
// fine for map pins, not for driving directions.
//
// `instagram_handle` is each chapter's only public web presence today (none
// have a standalone site) — the map pin's "website" link points there.
import type { SSA } from './types';

function ssa(
  slug: string,
  name: string,
  school: string,
  city: string,
  state: string,
  lat: number,
  lng: number,
  instagram: string | null
): SSA {
  return {
    id: slug,
    slug,
    name,
    school,
    city,
    state,
    latitude: lat,
    longitude: lng,
    instagram_handle: instagram,
    contact_email: null,
    description: null,
    joining_instructions: null,
    board_members: [],
    cover_photo_url: null,
    status: 'unclaimed',
  };
}

export const ssaFallbacks: SSA[] = [
  // ── Northern California ──
  ssa('fresno-gurbani', 'Fresno Gurbani Club', 'CSU Fresno', 'Fresno', 'CA', 36.7378, -119.7871, 'fresnostate_gurbani_club'),
  ssa('fresno-state', 'Fresno State SSA', 'CSU Fresno', 'Fresno', 'CA', 36.7378, -119.7871, 'fresnostate_ssa'),
  ssa('sacstate', 'SSA Sac State', 'CSU Sacramento', 'Sacramento', 'CA', 38.5816, -121.4944, 'ssasacstate'),
  ssa('stanstate', 'SSA Stan State', 'CSU Stanislaus', 'Turlock', 'CA', 37.4947, -120.8466, 'stanstatessa'),
  ssa('ucdavis', 'UCD SSA', 'UC Davis', 'Davis', 'CA', 38.5449, -121.7405, 'ssaucd'),
  ssa('ucmerced', 'SSA UCM', 'UC Merced', 'Merced', 'CA', 37.3022, -120.4830, 'ssaucm'),
  ssa('uop', 'UOP SSA', 'University of the Pacific', 'Stockton', 'CA', 37.9577, -121.2908, 'ssa_uop'),

  // ── Bay Area ──
  ssa('csueastbay', 'SSAEB', 'CSU East Bay', 'Hayward', 'CA', 37.6688, -122.0808, 'ssa.eastbay'),
  ssa('ohlone', 'SSA Ohlone', 'Ohlone College', 'Fremont', 'CA', 37.5485, -121.9886, 'ssaohlone'),
  ssa('stanford', 'Stanford University SSA', 'Stanford University', 'Stanford', 'CA', 37.4275, -122.1697, 'stanfordsikhs'),
  ssa('sfsu', 'SFSU SSA', 'San Francisco State University', 'San Francisco', 'CA', 37.7749, -122.4194, 'sfsu_ssa'),
  ssa('sjsu', 'SJSU SSA', 'San Jose State University', 'San Jose', 'CA', 37.3382, -121.8863, 'ssasjsu'),
  ssa('santaclara', 'Sikhs of Santa Clara', 'Santa Clara University', 'Santa Clara', 'CA', 37.3541, -121.9552, 'scusikhs'),
  ssa('berkeley', 'UCBSSA', 'UC Berkeley', 'Berkeley', 'CA', 37.8715, -122.2730, 'ucbssa'),
  ssa('ucsc', 'SSA UC Santa Cruz', 'UC Santa Cruz', 'Santa Cruz', 'CA', 36.9741, -122.0308, 'ucsc_ssa'),
  ssa('usf', 'SSA USFCA', 'University of San Francisco', 'San Francisco', 'CA', 37.7749, -122.4380, 'ssa.usfca'),

  // ── Southern California ──
  ssa('calpolypomona', 'CPP Sikh Student Association', 'Cal Poly Pomona', 'Pomona', 'CA', 34.0551, -117.7500, 'cppssa'),
  ssa('calpolyslo', 'Cal Poly SSA', 'Cal Poly SLO', 'San Luis Obispo', 'CA', 35.2828, -120.6596, 'calpolyssa'),
  ssa('csufullerton', 'SSA CSUF', 'CSU Fullerton', 'Fullerton', 'CA', 33.8704, -117.9243, 'csufssa'),
  ssa('csulb', 'CSULB SSA', 'CSU Long Beach', 'Long Beach', 'CA', 33.7701, -118.1937, 'ssa_csulb'),
  ssa('csun', 'CSUN SSA', 'CSU Northridge', 'Los Angeles', 'CA', 34.2381, -118.5301, 'csun_ssa'),
  ssa('csusb', 'CSUSB SSA', 'CSU San Bernardino', 'San Bernardino', 'CA', 34.1083, -117.2898, 'csusbssa'),
  ssa('occ', 'SSA at OCC', 'Orange Coast College', 'Costa Mesa', 'CA', 33.6411, -117.9187, 'ssa.occ'),
  ssa('uci', 'SSA UCI', 'UC Irvine', 'Irvine', 'CA', 33.6846, -117.8265, 'ssa.ucirvine'),
  ssa('ucla', 'SSA UCLA', 'UC Los Angeles', 'Los Angeles', 'CA', 34.0689, -118.4452, 'ucla_ssa'),
  ssa('ucr', 'Sikh Student Association at UCR', 'UC Riverside', 'Riverside', 'CA', 33.9737, -117.3281, 'ssa_ucr'),
  ssa('ucsd', 'UCSD SSA', 'UC San Diego', 'La Jolla', 'CA', 32.8328, -117.2713, 'ssa_ucsd'),
  ssa('ucsb', 'UCSB SSA', 'UC Santa Barbara', 'Santa Barbara', 'CA', 34.4140, -119.8489, 'ucsbssa'),
  ssa('usc', 'USC SSA', 'University of Southern California', 'Los Angeles', 'CA', 34.0224, -118.2851, 'uscsikhs'),
  ssa('sdsu', 'SDSU SSA', 'San Diego State University', 'San Diego', 'CA', 32.7757, -117.0719, 'sdsu_ssa'),

  // ── Northeast ──
  ssa('brown', 'Brown SSA', 'Brown University', 'Providence', 'RI', 41.8240, -71.4128, 'brownsikhs'),
  ssa('yale', 'Yale SSA', 'Yale University', 'New Haven', 'CT', 41.3083, -72.9279, 'sikhsofyale'),
  ssa('umass-amherst', 'UMass Amherst SSA', 'University of Massachusetts – Amherst', 'Amherst', 'MA', 42.3732, -72.5199, 'umass_ssa'),
  ssa('harvard', 'SACH', 'Harvard University', 'Cambridge', 'MA', 42.3736, -71.1097, 'harvardsikhs'),
  ssa('baruch', 'Baruch Sikhs', 'Baruch College', 'New York City', 'NY', 40.7402, -73.9834, 'baruchsikhs'),
  ssa('st-johns', 'SJUAVAAZ', "St. John's University", 'New York City', 'NY', 40.7268, -73.7918, 'sjuavaaz'),
  ssa('nyu', 'SSA at NYU', 'New York University', 'New York City', 'NY', 40.7295, -73.9965, 'nyu_sikhassociation'),
  ssa('stony-brook', 'Stony Brook SSA', 'Stony Brook University', 'Stony Brook', 'NY', 40.9126, -73.1234, 'stonybrookssa'),
  ssa('buffalo', 'UB SSA', 'SUNY University at Buffalo', 'Amherst', 'NY', 42.9784, -78.7997, 'ub_ssa'),
  ssa('hofstra', 'Hofstra SSA', 'Hofstra University', 'Hempstead', 'NY', 40.7062, -73.6187, 'ssahofstra'),
  ssa('cornell', 'Cornell SSA', 'Cornell University', 'Ithaca', 'NY', 42.4534, -76.4735, 'cornellsikhs'),
  ssa('rutgers-nb', 'RU Sikh', 'Rutgers University – New Brunswick', 'New Brunswick', 'NJ', 40.5008, -74.4474, 'rutgerssikh'),
  ssa('rutgers-camden', 'The SSA at Rutgers University – Camden', 'Rutgers University – Camden', 'Camden', 'NJ', 39.9259, -75.1196, 'rucssa'),
  ssa('njit', 'NJIT SSA', 'New Jersey Institute of Technology', 'Newark', 'NJ', 40.7420, -74.1787, 'njitsikhs'),
  ssa('fordham', 'Fordham Sikhs', 'Fordham University', 'Bronx', 'NY', 40.8617, -73.8858, 'fordham_sikhs'),
  ssa('pittsburgh', 'Pittsburgh SSA', 'Carnegie Mellon University & University of Pittsburgh', 'Pittsburgh', 'PA', 40.4406, -79.9959, 'pittsburgh_ssa'),
  ssa('columbia', 'Columbia SSA', 'Columbia University', 'New York City', 'NY', 40.8075, -73.9626, 'columbiasikhs'),

  // ── Midwest ──
  ssa('iu-bloomington', 'IU SSA', 'Indiana University – Bloomington', 'Bloomington', 'IN', 39.1653, -86.5264, 'ssa.iu'),
  ssa('purdue', 'Purdue SSA', 'Purdue University', 'Lafayette', 'IN', 40.4237, -86.9212, 'ssa.purdue'),
  ssa('notre-dame', 'Notre Dame C.S.S. SSA', 'University of Notre Dame', 'Notre Dame', 'IN', 41.7002, -86.2379, 'notredamessa'),
  ssa('uic', 'Sikh and Punjabi Student Association at UIC', 'University of Illinois at Chicago', 'Chicago', 'IL', 41.8708, -87.6505, 'ssa.atuic'),
  ssa('uiuc', 'SSA UIUC', 'University of Illinois Urbana-Champaign', 'Champaign', 'IL', 40.1164, -88.2434, 'uiuc_ssa'),
  ssa('uw-madison', 'SSA UW Madison', 'University of Wisconsin – Madison', 'Madison', 'WI', 43.0731, -89.4012, 'ssauwmadison'),
  ssa('umn', 'SSA UMN', 'University of Minnesota', 'Minneapolis', 'MN', 44.9778, -93.2650, 'ssa_umn'),
  ssa('john-carroll', 'SSA @ JCU', 'John Carroll University', 'University Heights', 'OH', 41.5023, -81.5065, 'jcu_ssa'),
  ssa('cwru', 'CWRU SSA', 'Case Western Reserve University', 'Cleveland', 'OH', 41.5044, -81.6083, 'cwru.ssa'),
  ssa('msu', 'SSA @ MSU', 'Michigan State University', 'East Lansing', 'MI', 42.7360, -84.4839, 'spartansikhs'),
  ssa('michigan', 'SSA at UM', 'University of Michigan', 'Ann Arbor', 'MI', 42.2808, -83.7430, 'michigansikhs'),
  ssa('umkc', 'SSA at UMKC', 'University of Missouri – Kansas City', 'Kansas City', 'MO', 39.0997, -94.5786, 'ssa_umkc'),

  // ── South ──
  ssa('georgetown', 'Georgetown SSA', 'Georgetown University', 'Washington', 'DC', 38.9076, -77.0723, 'gusikhstudents'),
  ssa('gwu', 'GWU SSA', 'George Washington University', 'Washington', 'DC', 38.9007, -77.0473, 'gwsikhs'),
  ssa('unc', 'UNC SSA', 'University of North Carolina', 'Chapel Hill', 'NC', 35.9132, -79.0558, 'uncssa'),
  ssa('gmu', 'GMU SSA', 'George Mason University', 'Fairfax', 'VA', 38.8462, -77.3064, 'gmu_ssa'),
  ssa('uva', 'SSA @ UVA', 'University of Virginia', 'Charlottesville', 'VA', 38.0293, -78.4767, 'ssaatuva'),
  ssa('vcu', 'SSA of VCU', 'Virginia Commonwealth University', 'Richmond', 'VA', 37.5407, -77.4360, 'ssa_vcu'),
  ssa('virginia-tech', 'VT SSA', 'Virginia Tech', 'Blacksburg', 'VA', 37.2296, -80.4139, 'virginiatechssa'),
  ssa('umd', 'SSA @ UMD', 'University of Maryland', 'College Park', 'MD', 38.9897, -76.9378, 'umdssa'),
  ssa('uab', 'SSA @ UAB', 'University of Alabama at Birmingham', 'Birmingham', 'AL', 33.5186, -86.8104, 'uab.ssa'),
  ssa('tamu', 'TAMU SSA', 'Texas A&M University', 'College Station', 'TX', 30.6280, -96.3344, 'tamu.ssa'),
  ssa('ut-dallas', 'SSA at UT Dallas', 'University of Texas at Dallas', 'Dallas', 'TX', 32.9857, -96.7500, 'utd.ssa'),
  ssa('ut-austin', 'UT SSA', 'University of Texas at Austin', 'Austin', 'TX', 30.2672, -97.7431, 'texas_ssa'),
  ssa('uf', 'UF SSA', 'University of Florida', 'Gainesville', 'FL', 29.6516, -82.3248, 'ssa.uf'),

  // ── West ──
  ssa('uw-seattle', 'SSA @ UW', 'University of Washington', 'Seattle', 'WA', 47.6062, -122.3321, 'ssa_uw'),
  ssa('kentridge', 'Kentridge SSA', 'Kentridge High School', 'Kent', 'WA', 47.3809, -122.2348, 'kentridgessa'),

  // ── Canada ──
  ssa('ubc', "UBC Sikh Students' Association", 'University of British Columbia', 'Surrey', 'BC', 49.1913, -122.8490, 'ssaubc'),
  ssa('uofc', 'SSA UofC', 'University of Calgary', 'Calgary', 'AB', 51.0447, -114.0719, 'ssauofc'),
  ssa('bow-valley', 'SSA BVC', 'Bow Valley College', 'Calgary', 'AB', 51.0447, -114.0719, 'ssa_bvc'),
  ssa('york', 'York University Sikh Student Association', 'York University', 'Toronto', 'ON', 43.7735, -79.5019, 'york.sikhs'),
  ssa('ottawa', 'UOTTAWA SSA', 'University of Ottawa', 'Ottawa', 'ON', 45.4215, -75.6972, 'uottawa_ssa'),
  ssa('western', 'Western Sikh Students', 'Western University', 'London', 'ON', 42.9849, -81.2453, 'western_ssa'),
  ssa('concordia', 'Concordia SSA', 'Concordia University', 'Montreal', 'QC', 45.5017, -73.5673, 'concordia_ssa'),
  ssa('castlebrook', 'Castlebrook SSA', 'Castlebrook Secondary School', 'Brampton', 'ON', 43.7315, -79.7624, 'castlebrookssa'),
];

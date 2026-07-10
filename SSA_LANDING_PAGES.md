# SSA landing pages — California chapters

Generated from the outreach tracker spreadsheet. Run `supabase/seed_ca_chapters.sql`
against the project's Supabase instance to make these live — each row gets a page at
its URL path automatically via `src/app/ssas/[slug]/page.tsx`.

Two sheet rows were skipped (no club name yet, just a target school): CSU San Marcos, Claremont Colleges.

| SSA | School | City | Slug | URL path |
|---|---|---|---|---|
| Fresno Gurbani Club | CSU Fresno | Fresno | `fresno-gurbani` | `/ssas/fresno-gurbani` |
| Fresno State SSA | CSU Fresno | Fresno | `fresno-state` | `/ssas/fresno-state` |
| SSA Sac State | CSU Sac State | Sacramento | `sacstate` | `/ssas/sacstate` |
| SSA Stan State | CSU Stanislaus | Turlock | `stanstate` | `/ssas/stanstate` |
| UCD SSA | UC Davis | Davis | `ucdavis` | `/ssas/ucdavis` |
| SSA UCM | UC Merced | Merced | `ucmerced` | `/ssas/ucmerced` |
| UOP SSA | University of Pacific | Stockton | `uop` | `/ssas/uop` |
| SSAEB | CSU East Bay | Hayward | `csueastbay` | `/ssas/csueastbay` |
| SSA Ohlone | Ohlone College | Fremont | `ohlone` | `/ssas/ohlone` |
| Stanford University SSA | Leland Stanford Junior University | Stanford | `stanford` | `/ssas/stanford` |
| SFSU SSA | San Francisco State University | San Francisco | `sfsu` | `/ssas/sfsu` |
| SJSU SSA | San Jose State University | San Jose | `sjsu` | `/ssas/sjsu` |
| Sikhs of Santa Clara | Santa Clara University | Santa Clara | `santaclara` | `/ssas/santaclara` |
| UCBSSA | UC Berkeley | Berkeley | `berkeley` | `/ssas/berkeley` |
| SSA UC Santa Cruz | UC Santa Cruz | Santa Cruz | `ucsc` | `/ssas/ucsc` |
| SSA USFCA | University of San Francisco | San Francisco | `usf` | `/ssas/usf` |
| CPP Sikh Student Association | Cal Poly Pomona | Pomona | `calpolypomona` | `/ssas/calpolypomona` |
| Cal Poly SSA | Cal Poly SLO | San Luis Obispo | `calpolyslo` | `/ssas/calpolyslo` |
| SSA CSUF | CSU Fullerton | Fullerton | `csufullerton` | `/ssas/csufullerton` |
| CSULB SSA | CSU Long Beach | Long Beach | `csulb` | `/ssas/csulb` |
| CSUN SSA | CSU Northridge | Los Angeles | `csun` | `/ssas/csun` |
| CSUSB SSA | CSU San Bernardino | San Bernardino | `csusb` | `/ssas/csusb` |
| SSA at OCC | Orange Coast College | Costa Mesa | `occ` | `/ssas/occ` |
| SSA UCI | UC Irvine | Irvine | `uci` | `/ssas/uci` |
| SSA UCLA | UC Los Angeles | Los Angeles | `ucla` | `/ssas/ucla` |
| Sikh Student Association at UCR | UC Riverside | Riverside | `ucr` | `/ssas/ucr` |
| UCSD SSA | UC San Diego | La Jolla | `ucsd` | `/ssas/ucsd` |
| UCSB SSA | UC Santa Barbara | Santa Barbara | `ucsb` | `/ssas/ucsb` |
| USC SSA | University of Southern California | Los Angeles | `usc` | `/ssas/usc` |
| SDSU SSA | San Diego State University | San Diego | `sdsu` | `/ssas/sdsu` |

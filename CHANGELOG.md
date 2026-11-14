# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.5.0] - 2026-11-14

### Added
- **Character Sheet Page 2 Skills Manifest & Encultured Aptitudes (Table #1-7)**:
  - Extracted and codified the full canonical 69-skill taxonomy from Page 2 of the Genesis Character Sheet across 7 major areas: Combat (1–7), Language (8–13), Non-Technical (14–19), Science (20–35), Social Science (36–50), Technical (51–60), and Additional General Slots (61–69).
  - Implemented Table #1-7 Encultured Skills for all 13 Genesis playable species and variants (including Aracnian color variations and Krane gender-distinct cultural skills), automatically calculating starting aptitude scores (40% to 100%).
  - Added baseline aptitude calculation defaulting un-encultured skills to the character's general Attribute Average ($\text{Round}(\frac{\sum \text{Attributes}}{8})$).
  - Integrated interactive Skills roster into Character Generator (`CharacterGenerator.jsx`) with area filters, encultured indicators, and sub-specialty tags.
  - Added complete Character Sheet modal inspector in Character Vault (`CharacterVault.jsx`) displaying all primary/secondary attributes, encultured skills, and 69-skill ratings for saved characters.
  - Updated Cloud Firestore security rules (`firestore.rules`) with schema support for `enculturedSkills` and `sheetSkills`.

## [1.4.0] - 2026-11-14

### Added
- **Genesis Game-Play Engine Sub-Domain Application (`engine.genesisrpg.com`)**:
  - Scaffolded modern React + Vite + Tailwind CSS single page web application under `engine/` targeting the dedicated Firebase Hosting sub-domain `genesisrpg-engine`.
  - **Comprehensive Character Generation Module**:
    - **Table #1-1 (Race Selection)**: Supports random percentile roll (1:100sd) with Aracnian sub-variant rolls, or manual selection across all 13 Genesis sentient species.
    - **Table #1-2 (Primary Attributes)**: Implemented exact racial base ratings and dice variance (Physical: PS, AG, CO, PR; Mental: WS, IT, MC, IN base 30 + 5:10sd).
    - **Table #1-4 (Appearance & Influence)**: Percentile roll calculating physical appearance tier and influence modifications (-25 to +25) with Tanaian immunity.
    - **Secondary Attributes (Combat Specs)**: Computes Aim (AM), Brawl (BR), and Move (MV).
    - **Table #1-5 (Damage Record)**: Generates complete anatomical body segment hit points scaled proportionally by Constitution racial quotient $(CO / \text{RacialAverage})$.
    - **Table #1-6 (Background Skills)**: Auto-populates starting points across Combat, Languages, Non-Tech, Science, Socio-Sci, and Technology.
    - **Tables #1-10 to #1-14 (Vitals & Starting Wealth)**: Implements starting age, height (m), mass (kg), and occupation starting wealth in Dits (Đ).
  - **Interactive Game Master Dice Tray**:
    - Quick-roll presets for `1:100sd` (percentile), `1:10sd`, `3:10sd` (variance), `5:10sd` (mental), `1:1000sd` (wealth), and custom multi-die roll distributions with live telemetry logs.
  - **Firebase Authentication & Cloud Character Vault**:
    - Integrated Firebase Auth supporting Google Sign-In, Email/Password, and Anonymous Guest access.
    - Cloud Firestore persistence under `/users/{userId}/characters/{characterId}` enabling Game Masters and players to store, browse, inspect, and delete characters across sessions.
  - **Firestore Security Rules**: Authored strict production security rules (`firestore.rules`) enforcing user-scoped read/write ownership and character document schema validation.
  - **Multi-Site Firebase Hosting**: Configured `firebase.json` and `.firebaserc` with dual hosting targets: `site` (`genesisrpg.com`) and `engine` (`engine.genesisrpg.com`).
  - **CI/CD Integration**: Updated `.gitlab-ci.yml` pipeline to build, test, and package both the main documentation site and the engine web app.

### Fixed
- **Cloud Firestore Persistence & Rules Compatibility**:
  - Hardened `firestore.rules` validation to permit both numeric and map representations for appearance rolls.
  - Added non-blocking merge tolerance for immutable character identifiers and creation timestamps during Firestore document updates.
  - Added a 10-second timeout safeguard to character cloud persistence preventing indefinite pending UI states.

## [1.3.1] - 2026-11-07

### Fixed
- **404 Not Found Page Content**: Restored the thematic "Lost in Deep Space" custom 404 hero layout, background imagery (`404-bg.webp`), glassmorphism card styling, and direct action buttons ("Return to Base", "Open Rules Manifest") into `src/404.html`.

## [1.3.0] - 2026-11-07

### Added
- **LLM Machine-Readability Index (`/llms.txt` and `/llms-full.txt`)**: Implemented open standard LLM context index files summarizing the Genesis RPG universe, rules framework, combat trauma systems, playable species, and direct canonical documentation links for AI retrieval systems (ChatGPT, Claude, Perplexity, Gemini, etc.).
- **Automated XML Sitemap (`/sitemap.xml`)**: Added Eleventy template generating dynamic XML sitemap with `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` across all 67+ canonical documentation and blog pages.
- **Search Engine Guidance (`/robots.txt`)**: Added crawler directive allowing indexing and pointing explicitly to `https://genesisrpg.com/sitemap.xml`.
- **JSON-LD Schema.org Structured Data**:
  - Embedded `WebSite` and `Game` entities at site level.
  - Injected `TechArticle` and `BreadcrumbList` schemas across all rulebook and documentation pages.
  - Injected `BlogPosting` and `BreadcrumbList` schemas across all fiction and world-building story posts.

### Fixed
- **Welcome to Taleneed Story Assets**: Restored hero background image (`Full_JungleCamp.webp`), updated description, and fixed broken thumbnail on `/blog/index.html`.

## [1.2.0] - 2026-11-07

### Added
- **GitLab CI/CD Automated Deployment**: Configured `.gitlab-ci.yml` pipeline with automated `test` and `deploy` stages using Google Cloud Service Account credentials (`FIREBASE_SERVICE_ACCOUNT`) to deploy to Firebase Hosting on commits to `master`.

### Performance
- **Mobile PageSpeed Optimizations**:
  - **Hero Image Preload & Fetch Priority**: Added `<link rel="preload" as="image" fetchpriority="high">` for the hero banner (`JungleCampCropped.webp`), slashing Largest Contentful Paint (LCP) time.
  - **Explicit Image Dimensions & Lazy Loading**: Specified explicit `width` and `height` attributes on header logo and homepage images to eliminate layout shifts (CLS), and applied `loading="lazy"` on below-the-fold artwork.
  - **Non-Render-Blocking Google Fonts**: Loaded Google Fonts asynchronously using the `media="print" onload="this.media='all'"` pattern with `fonts.gstatic.com` preconnect to eliminate First Contentful Paint render-blocking delay.
  - **Script Deferral**: Added `defer` attribute to non-critical layout JavaScript bundles.
  - **Immutable Asset Caching**: Added 1-year immutable cache headers (`public, max-age=31536000, immutable`) in `firebase.json` for static images.

### Fixed
- **Favicon Manifest Syntax**: Corrected smart quote encoding error in `site.webmanifest` that triggered JSON parsing failures on mobile browsers.

## [1.1.0] - 2026-11-07

### Added
- **Eleventy (11ty) Static Site Generator Architecture**: Converted the static site into a DRY Eleventy architecture with Nunjucks layouts (`base.njk`, `doc.njk`, `blog.njk`) and reusable partials (`header.njk`, `docs-sidebar.njk`, `footer.njk`), dramatically improving maintainability and eliminating repetitive markup.
- **Active Navigation Auto-Expansion**: Implemented automatic detection and expansion of active parent menus and sub-menus in the documentation sidebar based on current URL path.
- **Accordion State Persistence**: Added `sessionStorage` persistence so manually expanded/collapsed documentation navigation sections remain intact as users navigate across documentation pages.
- **Automated Link & Asset Verification**: Added `scripts/verify-links.js` run via `npm test` to validate all internal links and asset references across all compiled HTML pages.

### Fixed
- **Blog Feed Index (`/blog/`)**: Restored the full article grid of stories, excerpts, and thumbnail images on the main blog index page.
- **Blog Hero Images (`/blog/*`)**: Restored hero headers and background images for all blog story posts with standardized root-relative image links.
- **Missing Navigation Highlights**: Ensured current page and active menu items receive `aria-current="page"` and appropriate active theme styling across documentation and main navigation.

## [1.0.0] - 2026-11-07 - Site-wide 404 and Asset Resolution Fixes

### Fixed
- **Site-Wide Root-Relative Links & Image Maps**: Converted all remaining relative links, page body links, section indexes, and `<area>` image maps (296 links across 68 HTML files) to root-relative paths (`/docs/races/fenbin/index.html`, etc.), resolving 404s on section landing pages like `/docs/races` and `/docs/technology`.
- **Documentation & Sidebar Navigation Links**: Converted all navigation and docs menu links across 67 HTML pages to root-relative paths (`/docs/races/...`, `/docs/...`), resolving 404 errors caused by relative URLs resolving incorrectly when trailing slashes were omitted by Firebase `cleanUrls`.
- **Favicon Resource Paths**: Corrected malformed absolute and relative favicon URLs across 67 HTML pages to root-relative `/images/favicon/...` paths, fixing 404 asset errors across race and documentation subpages.
- **Sedna Rendezvous Floorplan Image**: Updated image source link in `public/docs/adventures/sednarendezvous/index.html` to reference `Chk_O_O_Ka.jpg` matching the normalized file name.
- **Obsolete Gatsby JS Bundle Preloads**: Purged leftover references and preload tags for `0f7106e4636c39179bdca46b0242ae73d2d832f3-*.js` from all blog pages.

## [2026-05-23] - Usability and Performance Remaster

### Fixed
- **Malformed Search Input Tag**: Resolved a major HTML syntax error globally across all static pages where a trailing slash was trapped inside the search `<input>` tag, breaking modern browser compliance.
- **Obsolete WCAG scripts**: Corrected the regex replacement in `scripts/apply-wcag.js` and `scripts/apply-wcag.py` to prevent reintroducing the search input syntax bug.

### Performance
- **Framework Overhead Elimination**: Removed references to all obsolete Gatsby JS runtime bundles (`commons`, `framework`, `webpack-runtime`, `app`, and template-specific scripts) from every HTML document, saving ~600KB on initial page load.
- **Obsolete Preloads**: Pruned obsolete link preloads for script chunks and `page-data` JSON files across the entire site.
- **Bootstrap JS Pruning**: Stripped the unused 130KB Bootstrap JS bundle loaded via CDN.
- **Directory Sanitization**: Safely deleted all dead Gatsby JS chunk assets and the obsolete `public/page-data` directory from the repository, reducing deployment sizes.
- **LCP Image Preload Priority**: Injected critical above-the-fold image preloads on the homepage (with `fetchpriority="high"`) and template-level logo priorities to optimize Core Web Vitals (LCP/FCP).

## [2026-04-13] - WCAG 2.2 Accessibility Enhancements

### Added
- **Global Contrast Focus Rings**: Inserted high-contrast, 3px solid focus indicators globally via `main.css`, overriding low-contrast `.palette-gold` links with a distinct dark background.
- **Form Identifiers**: Added `type="search"`, `autocomplete="off"`, and `aria-label="Search site"` to `#search-input` across all `.html` pages.
- **Menu Target Sizes**: Expanded `.menu-toggle` and `.submenu-toggle` to maintain a rigid minimum `44px x 44px` target size for reliable touch interactions.
- **ARIA States**: Enforced `aria-expanded="false"` specifically on all `.submenu-toggle` instances structure.
- **Scroll Padding**: Prevented the fixed glass-nav header from obscuring keyboard-focused anchors via `scroll-padding-top: 100px;` applied to the HTML root.

### Changed
- **Image Accessibility**: Crawled all `public/` files and systematically parsed `<img>` paths missing an `alt=` attribute to inject meaningful semantic labels extracted from the base filename.

## [2026-03-28] - SEO & Social Media Metadata Enhancements

### Added
- **Node Scripts**: Created `scripts/update-seo.js` using `cheerio` to reliably parse and update static HTML files globally.
- **HTML Language**: Appended `<html lang="en-CA">` uniformly across all 69 static files.
- **Canonical URLs**: Added `<link rel="canonical" href="...">` tags to all documents to establish exact search indexing targeting `https://genesisrpg.com/`.
- **OpenGraph Identity Tags**: Inserted `<meta property="og:url" content="...">` and `<meta property="og:site_name" content="Genesis - The Role Playing Game">` to improve contextual social snippets.

### Changed
- **Absolute Social Media Assets**: Upgraded `og:image` and `twitter:image` tags from relative paths to structurally compliant absolute URLs (`https://genesisrpg.com/images/...`).
- **Formatting**: Auto-formatted all modified HTML files using Prettier for clean syntax maintenance.

## [2026-03-22] - Navigation & 404 Page Fixes

### Changed
- **Navigation Update**: Updated the "Caudex Universum" menu item across all HTML files to link correctly to the blog posts.
- **Typo Fix**: Corrected the spelling in the menu from "Caudex Universium" to "Caudex Universum".
- **404 Menu Consistency**: Replaced the truncated navigation menu on the 404 error page with the complete, responsive site header, ensuring all links use absolute paths to prevent resolution errors on nested paths.
- **Copyright Page**: Update the Published section to include the link to this site.

## [2026-03-19] - Mobile Navigation & Analytics Fixes

### Added
- **Google Analytics**: Verified that the GA tracking code (`G-WQ787F9BJ0`) is present on all 71 HTML pages, including injecting it into the missing `404.html` and `_downloads.html`.

### Fixed
- **Mobile Hamburger Menu (JavaScript)**: Stripped the Gatsby-specific `window.onGatsbyInitialClientRender` wrapper from the menu toggling functions in `public/js/main.js` and reattached the click listeners using a standard `DOMContentLoaded` event, ensuring the mobile toggle works natively on the static site.
- **Mobile Hamburger Menu (CSS Layout)**: Added `flex-wrap: wrap` to the header and `order: 3` to the search bar so it elegantly drops to a new line on mobile devices. This prevents the search input from squishing the menu toggle button.
- **Viewport Scaling**: Fixed an invalid HTML meta tag where `initialScale=1.0` was causing mobile browsers to ignore scaling. Replaced it with `initial-scale=1.0` across 71 files.

## [2026-03-18] - Site Optimization & Maintenance

### Added
- Custom "Lost in Space" 404 page.
- Lightning-fast Docs Search (client-side).
- Professional Print-Friendly Styles (Refined Header for clean printouts).
- "Made with Google Antigravity, Gemini, and Firebase" branding with text links.

### Changed
- Optimized CSS by moving inline styles to external file (`public/css/main.css`).
- Beautified all HTML files with Prettier.
- Optimized all images to WebP format for faster loading.
- Finalized conversion to 100% static site (removed Gatsby source/branches).
- Converted all internal links to relative paths for portability.
- Updated Google Antigravity URL to `https://antigravity.google/`.
- **Static Integrity**: Cleaned up the repository to be purely static by deleting Gatsby source code and development branches (`Genesis-dev`, `IPad2`, etc.).
- **Relative Linking**: Converted 69 absolute internal links (pointing to `theengine.com`) to relative paths, ensuring complete site portability across any hosting environment.
- **File Cleanup**: Removed redundant `static/` directory and synchronized the `master` branch as the primary production source.

### Fixed
- Mailgun 401 Unauthorized error (Domain and Secret formatting).

### Removed
- Stackbit branding and scripts from footer.
- All images and icons from footer links.
- **Stackbit Branding**: Completely removed "This Jamstack site was created with Stackbit" text and the Stackbit widget script from all production files.

## [2026-03-12] - Mailgun Integration & Performance Optimization

### Added
- **Mailgun Cloud Function**: Deployed a secure Node.js 22 backend function to handle contact form submissions via Mailgun API.
- **Global Stylesheet**: Created `/css/main.css`.
- **Custom 404 Page**: Implemented a "Lost in Space" thematic error page.
- **WebP Optimization**: Converted 153 images to WebP format.
- **Docs Search**: Implemented lightning-fast client-side search.
- **Print Optimization**: Added professional `@media print` rules; refined the printed header to be ultra-simple and space-efficient for tabletop play.
- **Code Beautification**: Formatted all HTML files with Prettier. Securely managed `MAILGUN_KEY`, `MAILGUN_DOMAIN`, and `MAILGUN_REGION` via Firebase CLI.

### Changed
- **CSS Performance**: Extracted redundant inline CSS from 68 HTML files into the global stylesheet, reducing page sizes by ~30KB each.
- **README Updates**: Cleaned up the README (removed Gitpod badge) and updated the screenshot link.
- **Screenshot Location**: Moved `GenesisScreenShot.png` to the repository root for better cross-platform support.
- **Git Sync**: Synchronized all branches across GitHub and GitLab remotes.

### Fixed
- **Mailgun 401 Errors**: Resolved authentication issues caused by domain mismatches between Firebase Secrets and Mailgun configuration.
- **Broken Image Links**: Fixed relative paths for the README screenshot on the live site.

## [Previous] - Static Hosting Migration

### Changed
- **Codebase Cleanup**: Removed Gatsby source files and build tools to leave a 100% static project structure.
- **Firebase Deployment**: Initial setup and deployment to Firebase Hosting.
- **Multi-Remote Support**: Configured concurrent synchronization with GitHub and GitLab.

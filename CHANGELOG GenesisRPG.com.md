# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2026-05-23] - Usability, Performance, and Premium RPG Theme Remaster

### Fixed
- **Malformed Search Input Tag**: Resolved a major HTML syntax error globally across all static pages where a trailing slash was trapped inside the search `<input>` tag, breaking modern browser compliance.
- **Obsolete WCAG scripts**: Corrected the regex replacement in `scripts/apply-wcag.js` and `scripts/apply-wcag.py` to prevent reintroducing the search input syntax bug.

### Performance
- **Framework Overhead Elimination**: Removed references to all obsolete Gatsby JS runtime bundles (`commons`, `framework`, `webpack-runtime`, `app`, and template-specific scripts) from every HTML document, saving ~600KB on initial page load.
- **Obsolete Preloads**: Pruned obsolete link preloads for script chunks and `page-data` JSON files across the entire site.
- **Bootstrap JS Pruning**: Stripped the unused 130KB Bootstrap JS bundle loaded via CDN.
- **Directory Sanitization**: Safely deleted all dead Gatsby JS chunk assets and the obsolete `public/page-data` directory from the repository, reducing deployment sizes.
- **LCP Image Preload Priority**: Injected critical above-the-fold image preloads on the homepage (with `fetchpriority="high"`) and template-level logo priorities to optimize Core Web Vitals (LCP/FCP).

### Styling & Visual Enhancements
- **Glassmorphic Site Navigation**: Redesigned the sticky header and main menu to support sleek glassmorphism with dynamic opacity transitions and blur backdrops.
- **Premium Tabletop RPG Scrollbars**: Injected stylized, webkit-custom scrollbars matching the gold and dark tabletop gaming aesthetic.
- **Interactive Card Micro-Animations**: Enhanced grid items and document template panels with scale-up transitions, hover borders, and elegant gold glows.
- **Translucent Search Panel UI**: Re-styled search result suggestions using translucent dark glass backdrops with high-contrast readable elements.

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

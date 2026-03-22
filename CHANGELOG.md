# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2026-03-22] - Caudex Universum Menu Update

### Changed
- **Navigation Update**: Updated the "Caudex Universum" menu item across all HTML files to link correctly to the blog posts.
- **Typo Fix**: Corrected the spelling in the menu from "Caudex Universium" to "Caudex Universum".


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

const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

// Append CSS fixes to main.css
const cssFile = path.join(publicDir, 'css', 'main.css');
if (fs.existsSync(cssFile)) {
  let css = fs.readFileSync(cssFile, 'utf8');
  
  const accessibilityCSS = `
/* WCAG 2.2 Accessibility Fixes */
html {
  /* Prevent sticky masthead from obscuring focused items */
  scroll-padding-top: 100px;
}

/* Ensure minimum target size (2.5.8) */
.menu-toggle, .submenu-toggle {
  min-width: 44px;
  min-height: 44px;
  padding: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Ensure focus appearance contrast and visibility (2.4.13) */
*:focus-visible {
  outline: 3px solid #fdc71c !important;
  outline-offset: 4px;
}

/* High contrast overrides for specific low-contrast palette-gold items if they exist */
.palette-gold a:focus-visible {
  background-color: #2a2a2a;
  color: #fdc71c;
}
`;
  if (!css.includes("WCAG 2.2 Accessibility Fixes")) {
    fs.writeFileSync(cssFile, css + accessibilityCSS);
    console.log("Updated main.css with WCAG 2.2 fixes.");
  }
}

// Function to recursively find all HTML files
function getHtmlFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getHtmlFiles(fullPath, filesList);
    } else if (fullPath.endsWith('.html')) {
      filesList.push(fullPath);
    }
  }
  return filesList;
}

const htmlFiles = getHtmlFiles(publicDir);

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Fix 1: Search Inputs and Forms (Redundant entry / Accessible Auth)
  if (content.includes('id="search-input"') && !content.includes('autocomplete=')) {
    content = content.replace(
      /<input([^>]+?)id="search-input"([^>]*?)>/g, 
      (match, p1, p2) => {
        const cleanP2 = p2.trim().replace(/\/$/, '').trim();
        return `<input${p1}id="search-input" ${cleanP2} type="search" name="q" autocomplete="off" aria-label="Search site" />`.replace(/type="text"/, '');
      }
    );
    changed = true;
  }

  // Fix 2: Add aria-expanded to submenu toggles if missing
  if (content.includes('class="submenu-toggle"') && !content.includes('aria-expanded=')) {
    content = content.replace(/<button class="submenu-toggle">/g, '<button class="submenu-toggle" aria-expanded="false">');
    changed = true;
  }

  // Fix 3: Image ALT tags
  // Matches <img src="..." /> or <img src="..."> without alt=""
  const imgRegex = /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/g;
  content = content.replace(imgRegex, (match, prefix, src, suffix) => {
    // If it already has an alt attribute, skip
    if (match.includes('alt=')) return match;
    
    // Extract a descriptive name from the file path
    const filename = path.basename(src, path.extname(src));
    // Clean up filename (e.g. EebekTrade -> Eebek Trade)
    const cleaned = filename.replace(/([A-Z])/g, ' $1').trim();
    
    changed = true;
    return `<img ${prefix}src="${src}" alt="${cleaned}"${suffix}>`;
  });

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${path.relative(publicDir, file)}`);
  }
});

console.log("WCAG 2.2 markup modifications complete.");

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const publicDir = path.join(__dirname, '../public');

// Recursively find all HTML files
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
console.log(`Found ${htmlFiles.length} HTML files to process.`);

let processedCount = 0;
let modifiedCount = 0;

htmlFiles.forEach(file => {
  processedCount++;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Fix 1: Search Inputs and Forms syntax errors (caused by malformed regex replacement in previous runs)
  // Check if we have the malformed `/ type="search" ...` string in the content
  if (content.includes('/ type="search"')) {
    // Regex matches the malformed input structure and captures text up to the malformed type="search" tag
    const malformedRegex = /<input[^>]+?id="search-input"[\s\S]+?\/ type="search" name="q" autocomplete="off" aria-label="Search site">/g;
    content = content.replace(malformedRegex, 
      '<input id="search-input" placeholder="Search archives..." type="search" name="q" autocomplete="off" aria-label="Search site" />'
    );
    changed = true;
  }

  // Load in Cheerio for standard structured operations
  const $ = cheerio.load(content, { decodeEntities: false });

  // Fix 2: Remove Obsolete Preloads
  $('link[rel="preload"]').each((i, el) => {
    const href = $(el).attr('href');
    if (href) {
      if (href.includes('webpack-runtime-') ||
          href.includes('framework-') ||
          href.includes('app-') ||
          href.includes('styles-') ||
          href.includes('commons-') ||
          href.includes('component---') ||
          href.includes('29107295-') ||
          href.includes('page-data/')) {
        $(el).remove();
        changed = true;
      }
    }
  });

  // Fix 3: Remove Gatsby Chunk Scripts, page-load, page-unload, and Bootstrap JS
  $('script').each((i, el) => {
    const src = $(el).attr('src');
    const id = $(el).attr('id');
    
    // Remove by ID
    if (id === 'gatsby-script-loader' || id === 'gatsby-chunk-mapping') {
      $(el).remove();
      changed = true;
      return;
    }
    
    // Remove by Src
    if (src) {
      if (src.includes('webpack-runtime-') ||
          src.includes('framework-') ||
          src.includes('app-') ||
          src.includes('styles-') ||
          src.includes('commons-') ||
          src.includes('component---') ||
          src.includes('29107295-') ||
          src.includes('page-load.js') ||
          src.includes('page-unload.js') ||
          src.includes('bootstrap.bundle.min.js')) {
        $(el).remove();
        changed = true;
      }
    }
  });

  // Fix 4: Add Largest Contentful Paint (LCP) preloads and image priorities
  const relativePath = path.relative(publicDir, file);
  const unixPath = relativePath.split(path.sep).join('/');
  
  if (unixPath === 'index.html') {
    // homepage hero LCP background image preload
    const hasPreload = $('link[href="images/JungleCampCropped.webp"]').length > 0;
    if (!hasPreload) {
      $('head').append('  <link rel="preload" href="images/JungleCampCropped.webp" as="image" fetchpriority="high" />\n');
      changed = true;
    }
  } else if (unixPath.startsWith('docs/')) {
    // doc templates: logo is the main logo
    const logoImg = $('img[src*="Genesislogo1.webp"]');
    if (logoImg.length > 0 && !logoImg.attr('fetchpriority')) {
      logoImg.attr('fetchpriority', 'high');
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(file, $.html(), 'utf8');
    modifiedCount++;
    console.log(`Optimized: ${relativePath}`);
  }
});

console.log(`\nCompleted! Processed ${processedCount} files, optimized and repaired ${modifiedCount} files.`);

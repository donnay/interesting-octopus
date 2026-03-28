const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Configuration
const BASE_URL = 'https://genesisrpg.com/';
const LANG = 'en-CA';
const SITE_NAME = 'Genesis - The Role Playing Game';

function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const publicDir = path.join(__dirname, '..', 'public');
const htmlFiles = findHtmlFiles(publicDir);

console.log(`Found ${htmlFiles.length} HTML files to process.`);

let modifiedCount = 0;

for (const filePath of htmlFiles) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(fileContent, { decodeEntities: false });
  
  // Set HTML language
  $('html').attr('lang', LANG);
  
  // Clean up relative path for resolving URLs
  // filepath might be: /absolute/.../public/docs/index.html
  // relativePath: docs/index.html
  const relativePath = path.relative(publicDir, filePath);
  
  // Fix slashes for windows platforms generically just in case
  const pathWithUnixSlashes = relativePath.split(path.sep).join('/');
  
  // Construct absolute page URL for the current document (base URL)
  // E.g., https://genesisrpg.com/docs/index.html
  const documentAbsoluteUrl = new URL(pathWithUnixSlashes, BASE_URL).href;
  
  // Construct canonical URL (stripping index.html)
  // E.g., https://genesisrpg.com/docs/
  const canonicalUrl = documentAbsoluteUrl.replace(/index\.html$/, '');
  
  // 1. Canonical Tag
  let canonicalTag = $('link[rel="canonical"]');
  if (canonicalTag.length === 0) {
    $('head').append(`\n  <link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    canonicalTag.attr('href', canonicalUrl);
  }
  
  // 2. OpenGraph url
  let ogUrlTag = $('meta[property="og:url"]');
  if (ogUrlTag.length === 0) {
    $('head').append(`\n  <meta property="og:url" content="${canonicalUrl}" />`);
  } else {
    ogUrlTag.attr('content', canonicalUrl);
  }
  
  // 3. OpenGraph site_name
  let ogSiteNameTag = $('meta[property="og:site_name"]');
  if (ogSiteNameTag.length === 0) {
    $('head').append(`\n  <meta property="og:site_name" content="${SITE_NAME}" />`);
  } else {
    ogSiteNameTag.attr('content', SITE_NAME);
  }
  
  // 4. Update relative images to absolute in og:image
  let ogImageTag = $('meta[property="og:image"]');
  if (ogImageTag.length > 0) {
    const curImg = ogImageTag.attr('content');
    if (curImg && !curImg.startsWith('http')) {
      const absImgUrl = new URL(curImg, documentAbsoluteUrl).href;
      ogImageTag.attr('content', absImgUrl);
    }
  }
  
  // 5. Update relative images to absolute in twitter:image
  let twitterImageTag = $('meta[name="twitter:image"]');
  if (twitterImageTag.length > 0) {
    const curImg = twitterImageTag.attr('content');
    if (curImg && !curImg.startsWith('http')) {
      const absImgUrl = new URL(curImg, documentAbsoluteUrl).href;
      twitterImageTag.attr('content', absImgUrl);
    }
  }

  // Write the changes back
  const newContent = $.html();
  if (newContent !== fileContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    modifiedCount++;
  }
}

console.log(`Successfully modified ${modifiedCount} files.`);

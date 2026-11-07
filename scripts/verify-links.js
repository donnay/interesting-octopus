const fs = require('fs');
const path = require('path');
const url = require('url');

const publicDir = path.resolve(__dirname, '../public');

function getAllFiles(dir, ext = '.html') {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(getAllFiles(fullPath, ext));
    } else if (item.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = getAllFiles(publicDir);
let brokenLinks = 0;
let brokenAssets = 0;

const hrefRegex = /<(?:a|area)\s+[^>]*?href=["']([^"']+)["']/gi;
const srcRegex = /<img\s+[^>]*?src=["']([^"']+)["']/gi;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;

  while ((match = hrefRegex.exec(content)) !== null) {
    const rawHref = match[1].trim();
    if (!rawHref || rawHref.startsWith('http://') || rawHref.startsWith('https://') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:') || rawHref.startsWith('#') || rawHref.startsWith('javascript:')) {
      continue;
    }
    const parsedPath = url.parse(rawHref).pathname;
    if (!parsedPath) continue;

    const target = parsedPath.startsWith('/')
      ? path.join(publicDir, parsedPath.replace(/^\//, ''))
      : path.resolve(path.dirname(file), parsedPath);

    if (fs.existsSync(target)) {
      if (fs.statSync(target).isDirectory() && !fs.existsSync(path.join(target, 'index.html'))) {
        console.error(`[Broken Link] Directory missing index.html in ${path.relative(publicDir, file)} -> ${rawHref}`);
        brokenLinks++;
      }
    } else if (!fs.existsSync(target + '.html')) {
      console.error(`[Broken Link] File not found in ${path.relative(publicDir, file)} -> ${rawHref}`);
      brokenLinks++;
    }
  }

  while ((match = srcRegex.exec(content)) !== null) {
    const rawSrc = match[1].trim();
    if (!rawSrc || rawSrc.startsWith('http://') || rawSrc.startsWith('https://') || rawSrc.startsWith('data:')) {
      continue;
    }
    const parsedPath = url.parse(rawSrc).pathname;
    if (!parsedPath) continue;

    const target = parsedPath.startsWith('/')
      ? path.join(publicDir, parsedPath.replace(/^\//, ''))
      : path.resolve(path.dirname(file), parsedPath);

    if (!fs.existsSync(target)) {
      console.error(`[Broken Asset] Image not found in ${path.relative(publicDir, file)} -> ${rawSrc}`);
      brokenAssets++;
    }
  }
}

console.log(`Audited ${htmlFiles.length} HTML files.`);
if (brokenLinks === 0 && brokenAssets === 0) {
  console.log('✅ All internal links and media assets resolved successfully (0 errors).');
  process.exit(0);
} else {
  console.error(`❌ Found ${brokenLinks} broken links and ${brokenAssets} broken assets.`);
  process.exit(1);
}

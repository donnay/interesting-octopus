import os
import re

import os

base_dir = os.path.dirname(os.path.abspath(__file__))
public_dir = os.path.join(base_dir, '..', 'public')
css_file = os.path.join(public_dir, 'css', 'main.css')

# 1. Update CSS
if os.path.exists(css_file):
    with open(css_file, 'r') as f:
        css = f.read()
        
    accessibility_css = """
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
"""
    if "WCAG 2.2 Accessibility Fixes" not in css:
        with open(css_file, 'a') as f:
            f.write(accessibility_css)
        print("Updated main.css")

# 2. Update HTML
for root, dirs, files in os.walk(public_dir):
    for file in files:
        if file.endswith('.html'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r') as f:
                content = f.read()
            
            changed = False
            
            # Fix 1: Search inputs
            if 'id="search-input"' in content and 'autocomplete=' not in content:
                # Basic substitution
                def repl_search(m):
                    p1, p2 = m.group(1), m.group(2)
                    clean_p2 = p2.strip().rstrip('/').strip()
                    return f'<input{p1}id="search-input" {clean_p2} type="search" name="q" autocomplete="off" aria-label="Search site" />'.replace('type="text"', '')
                content = re.sub(r'<input([^>]+?)id="search-input"([^>]*?)>', repl_search, content)
                changed = True
                
            # Fix 2: Submenu toggle aria-expanded
            if 'class="submenu-toggle"' in content and 'aria-expanded=' not in content:
                content = content.replace('<button class="submenu-toggle">', '<button class="submenu-toggle" aria-expanded="false">')
                changed = True
                
            # Fix 3: Image alt tags
            def repl_img(m):
                prefix, src, suffix = m.group(1), m.group(2), m.group(3)
                if 'alt=' in prefix or 'alt=' in suffix:
                    return m.group(0)
                
                filename = os.path.basename(src).split('.')[0]
                cleaned = re.sub(r'([A-Z])', r' \1', filename).strip()
                if not cleaned:
                    cleaned = "Decorative image"
                return f'<img {prefix}src="{src}" alt="{cleaned}"{suffix}>'
                
            new_content = re.sub(r'<img\s+([^>]*?)src=["\']([^"\']+)["\']([^>]*?)>', repl_img, content)
            if new_content != content:
                changed = True
                content = new_content
                
            if changed:
                with open(file_path, 'w') as f:
                    f.write(content)
                print(f"Updated {os.path.relpath(file_path, public_dir)}")

print("WCAG 2.2 fixes complete.")

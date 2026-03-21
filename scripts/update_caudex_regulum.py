import os
import re

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')

# The items to include in the Caudex Regulum menu.
# URL is relative to the `docs/` directory.
MENU_ITEMS = [
    ("Introduction", "index.html"),
    ("About", "about/index.html"),
    ("Character", "characters/index.html"),
    ("Character Life", "character-life/index.html"),
    ("Combat", "combat/index.html"),
    ("Adventures", "adventures/index.html"),
]

# Regex to find the entire Caudex Regulum list item and its submenu.
# We capture:
# 1. The prefix up to the opening <ul class="submenu">
# 2. The prefix for the docs path from the href (e.g., 'docs/', '', '../', '../../')
# 3. The inner <li> items (which we will replace)
# 4. The closing </ul>\s*</li>
#
# Note: Since the HTML is formatted in a specific way by Gatsby, we account for optional newlines.
regex = re.compile(
    r'(<li class="menu-item has-children(?: current)?">\s*<a[^>]*href="([^"]*)index\.html"[^>]*>Caudex Regulum</a\s*>\s*<button class="submenu-toggle">.*?<span class="screen-reader-text">Sub-menu</span>\s*</button>\s*<ul class="submenu">)(.*?)(</ul>\s*</li>)',
    re.DOTALL
)

def update_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine the file's path relative to the `public/docs` folder to check for "current" page status.
    # E.g., for `public/docs/characters/index.html`, relative path is `characters/index.html`
    # For `public/docs/index.html`, relative path is `index.html`
    # For `public/index.html`, this isn't in docs, so it won't match any item (which is correct).
    try:
        rel_to_public = os.path.relpath(filepath, PUBLIC_DIR)
        
        # We only care about matching the logic if it's inside `docs/`
        if rel_to_public.startswith('docs/'):
            rel_to_docs = rel_to_public[5:] # remove 'docs/'
        elif rel_to_public == 'docs':
            rel_to_docs = 'index.html'
        else:
            rel_to_docs = None
    except ValueError:
        rel_to_docs = None

    def replouncer(match):
        prefix_block = match.group(1)
        path_prefix = match.group(2)
        suffix_block = match.group(4)
        
        new_inner = "\n"
        for label, url in MENU_ITEMS:
            href = path_prefix + url
            
            # Check if this menu item represents the current page.
            is_current = False
            if rel_to_docs and url == rel_to_docs:
                is_current = True
                
            li_class = "menu-item current" if is_current else "menu-item"
            a_attrs = ' aria-current="page" class=""' if is_current else ''
            
            new_inner += f'             <li class="{li_class}">\n'
            new_inner += f'              <a{a_attrs} href="{href}">{label}</a>\n'
            new_inner += f'             </li>\n'
            
        new_inner += "            "
        return prefix_block + new_inner + suffix_block

    new_content, count = regex.subn(replouncer, content)
    
    if count > 0 and new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    elif "Caudex Regulum" in content:
        print(f"Regex failed to match in: {filepath}")
    return False

def main():
    updated_count = 0
    total_count = 0
    for root, dirs, files in os.walk(PUBLIC_DIR):
        for file in files:
            if file.endswith('.html'):
                total_count += 1
                filepath = os.path.join(root, file)
                if update_html_file(filepath):
                    updated_count += 1
    
    print(f"Checked {total_count} HTML files.")
    print(f"Successfully updated menu in {updated_count} files.")

if __name__ == "__main__":
    main()

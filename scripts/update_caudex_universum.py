import os
import re

PUBLIC_DIR = os.path.join(os.path.dirname(__file__), '..', 'public')

# The items to include in the Caudex Universum menu.
# URL is relative to the `blog/` directory.
MENU_ITEMS = [
    ("An Interstellar Christmas", "aninterstellarchristmas/index.html"),
    ("Writers' Guide to Genesis", "writersguidetogenesis/index.html"),
    ("Vaughn Marie Pendelton", "vaughmariependelton/index.html"),
    ("Welcome to Taleneed", "welcometotalemeed/index.html"),
    ("Hell of a way to die", "hellofawaytodie/index.html"),
    ("Between the Rocks!", "betweentherocks/index.html"),
    ("The Rising Sun", "risingsun/index.html"),
]

# Regex to find the entire Caudex Universium list item and its submenu.
# We capture:
# 1. The prefix up to the opening <ul class="submenu">
# 2. The prefix for the blog path from the href (e.g., 'blog/', '', '../', '../../blog/')
# 3. The inner <li> items (which we will replace)
# 4. The closing </ul>\s*</li>
regex = re.compile(
    r'(<li class="menu-item has-children(?: current)?">\s*<a[^>]*href="([^"]*)index\.html"[^>]*>Caudex Universium</a\s*>\s*<button class="submenu-toggle">.*?<span class="screen-reader-text">Sub-menu</span>\s*</button>\s*<ul class="submenu">)(.*?)(</ul>\s*</li>)',
    re.DOTALL
)

def update_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine the file's path relative to the `public/blog` folder to check for "current" page status.
    # E.g., for `public/blog/risingsun/index.html`, relative path is `risingsun/index.html`
    # For `public/blog/index.html`, relative path is `index.html`
    try:
        rel_to_public = os.path.relpath(filepath, PUBLIC_DIR)
        
        if rel_to_public.startswith('blog/'):
            rel_to_docs = rel_to_public[5:] # remove 'blog/'
        elif rel_to_public == 'blog':
            rel_to_docs = 'index.html'
        else:
            rel_to_docs = None
    except ValueError:
        rel_to_docs = None

    def replouncer(match):
        prefix_block = match.group(1)
        path_prefix = match.group(2)
        suffix_block = match.group(4)
        
        # Correct the spelling of "Universium" -> "Universum" in the prefix
        prefix_block = prefix_block.replace("Caudex Universium", "Caudex Universum")
        
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
    elif "Caudex Universium" in content:
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

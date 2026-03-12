(function() {
  let searchIndex = null;
  const searchInputId = 'search-input';
  const searchResultsId = 'search-results';

  async function initSearch() {
    try {
      const response = await fetch('/search-index.json');
      searchIndex = await response.json();
    } catch (e) {
      console.error('Failed to load search index:', e);
    }

    const input = document.getElementById(searchInputId);
    const resultsContainer = document.getElementById(searchResultsId);

    if (!input || !resultsContainer) return;

    input.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
      }

      const results = searchIndex.filter(page => {
        return page.title.toLowerCase().includes(query) || 
               page.description.toLowerCase().includes(query) ||
               page.content.toLowerCase().includes(query);
      }).slice(0, 8); // Limit to top 8 results

      renderResults(results, resultsContainer);
    });

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !resultsContainer.contains(e.target)) {
        resultsContainer.style.display = 'none';
      }
    });

    input.addEventListener('focus', () => {
      if (resultsContainer.children.length > 0) {
        resultsContainer.style.display = 'block';
      }
    });
  }

  function renderResults(results, container) {
    if (results.length === 0) {
      container.innerHTML = '<div class="search-no-results">No matches found in the archives.</div>';
    } else {
      container.innerHTML = results.map(res => `
        <a href="${res.url}" class="search-result-item">
          <div class="search-result-title">${res.title}</div>
          <div class="search-result-snippet">${res.description || res.content.substring(0, 100) + '...'}</div>
        </a>
      `).join('');
    }
    container.style.display = 'block';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();

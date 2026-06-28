/* Client-side search over the Jekyll-generated /search.json index.
   The index is rebuilt on every site build, so it never drifts from posts. */
(function () {
  var input = document.getElementById('search-input');
  var results = document.getElementById('search-results');
  var status = document.getElementById('search-status');
  if (!input || !results) return;

  var script = document.currentScript;
  var jsonUrl = (script && script.getAttribute('data-search-json')) || '/search.json';

  var posts = [];
  var ready = false;

  fetch(jsonUrl)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      posts = data;
      ready = true;
      if (input.value.trim()) run(input.value);
    })
    .catch(function () {
      if (status) status.textContent = 'Could not load the search index.';
    });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function matches(post, q) {
    var hay = (post.title + ' ' + (post.tags || []).join(' ') + ' ' + post.content).toLowerCase();
    return q.every(function (term) { return hay.indexOf(term) !== -1; });
  }

  function run(query) {
    var q = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    results.innerHTML = '';

    if (q.length === 0) {
      if (status) status.textContent = 'Type to search across all posts.';
      return;
    }
    if (!ready) {
      if (status) status.textContent = 'Loading…';
      return;
    }

    var found = posts.filter(function (p) { return matches(p, q); });

    if (status) {
      status.textContent = found.length === 0
        ? 'No posts found for "' + query.trim() + '".'
        : found.length + (found.length === 1 ? ' result' : ' results');
    }

    found.forEach(function (p) {
      var tags = (p.tags || []).map(function (t) {
        return '<a class="tag" href="/tags/#' + encodeURIComponent(t.toLowerCase()) + '">' + escapeHtml(t) + '</a>';
      }).join('');
      var li = document.createElement('li');
      li.innerHTML =
        '<a class="post-card" href="' + p.url + '">' +
          '<h3 class="post-card-title">' + escapeHtml(p.title) + '</h3>' +
          '<div class="post-card-meta">' + escapeHtml(p.date) + '</div>' +
          '<p class="post-card-excerpt">' + escapeHtml(p.excerpt) + '</p>' +
          (tags ? '<div style="margin-top:.6rem">' + tags + '</div>' : '') +
        '</a>';
      results.appendChild(li);
    });
  }

  input.addEventListener('input', function () { run(input.value); });

  // Support deep-linking like /search/?q=books
  var params = new URLSearchParams(window.location.search);
  if (params.get('q')) { input.value = params.get('q'); }
})();

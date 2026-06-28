# lichen0114.github.io

Personal blog built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.
GitHub builds the site automatically on every push to `main` — no CI/CD pipeline needed.

## Add a new post

Create one Markdown file in `_posts/` named `YYYY-MM-DD-title.md`:

```markdown
---
title: My Post Title
date: 2026-06-28
tags: [ai, robotics]
excerpt: One-line summary shown in lists and search.
---

Write your post in Markdown here.
```

Commit and push. The post automatically appears on the home page, the blog
archive, the relevant tag sections, and site search — no other files to edit.

## Run locally

```bash
bundle install            # one time
bundle exec jekyll serve  # http://localhost:4000
```

## Structure

| Path | Purpose |
|------|---------|
| `_config.yml` | Site settings, plugins, analytics ID |
| `_layouts/` | `default`, `post`, `page` templates |
| `_includes/` | `head`, `nav`, `footer`, `analytics` (edit nav once, applies everywhere) |
| `_posts/` | Blog posts (Markdown) |
| `assets/css/style.scss` | Theme (light/dark via CSS variables) |
| `assets/js/` | `main.js` (theme toggle, back-to-top), `search.js` (search) |
| `search.json` | Search index, regenerated on every build |
| `index.html` `blog.html` `tags.html` `search.html` `about.md` | Pages |

Tags use pure Liquid (a single `/tags/` page) because GitHub Pages runs Jekyll in
`--safe` mode and does not allow plugins like `jekyll-archives`.

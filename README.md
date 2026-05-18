# Network Engineer Roadmap — Interactive Learning

Interactive Thai/English learning app for Network Engineering, from fundamentals to automation, cloud, security, SD-WAN, monitoring, and advanced topics.

## Structure

- `index.html` — main static page for GitHub Pages
- `assets/css/styles.css` — original visual system extracted from the single HTML file
- `assets/css/enhancements.css` — GitHub-ready UX/navigation improvements
- `assets/js/app.js` — original interactive engines and data
- `assets/js/navigation.js` — improved section routing, all-topic explorer, boot guards
- `docs/network_learning.original.html` — archived source HTML before refactor

## Run locally

Open `index.html` directly, or serve it with any static server:

```bash
node tools/static-server.cjs
```

Then open <http://127.0.0.1:4173/>.

## GitHub Pages

Push this folder to GitHub and enable Pages from the repository root. No build step is required.

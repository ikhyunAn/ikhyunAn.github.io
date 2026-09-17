# Ikhyun John An — personal website

A minimal, light-only academic portfolio built with React and hosted on GitHub Pages.

## Edit content

Personal details, biography text, news, achievements, publications, teaching entries, and projects live in [`src/content/site.js`](src/content/site.js). Empty publications and teaching arrays are automatically omitted from the main navigation.

- Use `null` for an unavailable email, location, CV, date, or optional link.
- Keep news and publications in newest-first order. Keep projects in the order they should appear.
- Keep achievements in newest-first order. Each entry supports a date, title, description, and optional link.
- Portfolio entries are text-only and use a title, summary, contribution, and links.
- Do not use `#` as a placeholder link. Leave the URL `null` or omit the link.
- Replace the visible publication placeholders before deployment. Add more publications by copying the existing object and giving each entry a unique `id`.

The visual design is contained in [`src/styles/site.css`](src/styles/site.css). It intentionally uses system fonts, one light color scheme, and no animation or theme state.

## Run locally

```bash
npm install
npm start
```

Create a production build with:

```bash
npm run build
```

## Deploy

The `homepage` in `package.json` points to `https://ikhyunan.github.io/`. After reviewing a production build, deploy with:

```bash
npm run deploy
```

Deployment is a separate release step and is not performed automatically.

## License

[MIT](License.md)

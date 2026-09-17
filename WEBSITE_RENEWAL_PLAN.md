# Website renewal: repository findings and implementation plan

Prepared September 17, 2026. Companion to [the visual research](WEBSITE_RENEWAL_RESEARCH.md).

Implementation began on the `codex/website-renewal` branch after this plan was approved. The plan remains the rationale and acceptance checklist; current source files are authoritative for implemented details. Deployment has not been performed.

## 1. Recommendation

Adapt the reference’s content organization within the existing React website, with a **minimal, light-only design**. Use local content, a shared profile layout, readable typography, a short news list, and only the academic/project pages that have content. Keep the current deployment and hash routing for this first release. This delivers the requested renewal without making a framework migration a prerequisite.

User direction after the repository review: remove dark mode and avoid over-engineering. This supersedes earlier recommendations for dual themes, decorative backgrounds, and optional animation. Historical reference findings below remain evidence, not features to reproduce. The target has no theme toggle, theme persistence, theme media-query listeners, animated stars, grain, glass effects, or entrance animations.

Jekyll is documented as a deferred alternative, not an active workstream. No framework migration, CMS, preview platform, or new backend is needed for this renewal.

## 2. Evidence and inspection scope

The public repository was cloned read-only into a temporary directory and inspected at commit [`076b62ef48a930e14e8a5437a811a82ce35e6246`](https://github.com/oytunkuday/oytunkuday.github.io/tree/076b62ef48a930e14e8a5437a811a82ce35e6246), dated June 15, 2026, with commit subject “color/minor.” Source links below are pinned to that revision. Your local repository was on `main`, at `a81959e`, with the previous research document untracked before this work.

Reviewed: configuration, build manifests, layouts, author/navigation/archive includes, custom CSS, theme JavaScript, homepage, representative collection entries, SEO/footer includes, and the checked-in workflow. The reference was not built or executed locally, and its GitHub Pages account settings and deployment logs were not inspected. Source findings are distinguished below from behavior that still needs testing.

## 3. How the reference actually works

| Concern | Verified source implementation | Implication for your renewal |
| --- | --- | --- |
| Site engine | Jekyll/Liquid and vendored AcademicPages/Minimal Mistakes templates; `Gemfile` includes Jekyll and `github-pages`. | It produces static pages; it is not a React application. |
| Profile | `_config.yml` contains author details; `_includes/author-profile.html` conditionally renders populated fields. | Centralize profile content and omit missing links. |
| Navigation | `_data/navigation.yml` supplies ordered links; `_includes/masthead.html` renders them and an overflow menu. | Define one navigation list shared by every page. |
| Layout | `default` wraps the document, masthead, footer, and scripts; `single` and `archive` add the sidebar and reading area. | Build a reusable site shell rather than page-specific copies. |
| Homepage | `_pages/about.md` maps to `/`; biography is Markdown and news is hand-authored HTML. | Preserve the structure, but make news a data collection. |
| Publications / teaching | Collection files supply front matter and excerpts; index pages iterate in reverse collection order. | Use plain structured fields and maintain newest-first arrays. |
| Portfolio | `_pages/portfolio.html` sorts collection items by `order`; an additional project list is hard-coded below. | Use one curated project array in display order. |
| Entry rendering | `archive-single.html` renders excerpts and conditional resource links; titles for publications, teaching, and portfolio are deliberately unlinked. | Decide whether you need detail pages instead of generating unused ones automatically. |
| Styling | `main.scss` imports the base theme; `head/custom.html` loads `site-polish.css` afterward. | The custom layer supplies much of the recognizable visual treatment. |
| JavaScript | npm bundles jQuery, FitVids, smooth scrolling, greedy navigation, and `_main.js` into a committed `main.min.js`. | npm is an asset-build helper here, not the site generator. Do not import this bundle into React. |

Sources: [configuration][config], [build dependencies][gemfile], [npm asset build][package], [layouts][layouts], [profile include][author], [navigation][navigation], [homepage][about], [publications index][publications], [teaching index][teaching], [portfolio index][portfolio], [entry renderer][archive].

The reading flow is: configuration and content → Liquid layouts/includes → generated HTML; Sass and the polish stylesheet determine appearance; browser JavaScript adds theme and navigation behavior. Your equivalent should be: local content → React page components → shared layout, with only the small amount of interaction needed for navigation and older news.

## 4. Design details now confirmed by source

The earlier research used approximate visual observations. These values are now verified in [the polish stylesheet][polish] and [custom head][head-custom]:

| Property | Reference value |
| --- | --- |
| Display/headings/navigation | Fraunces, with Georgia fallback |
| Reading text | Newsreader, then Georgia / Times New Roman |
| Code | JetBrains Mono, then system monospace |
| Light background / accent | `#f3ede4` / `#b0432e` |
| Light solid panel | `#fffdf9` |
| Dark background / accent | `#1e1c22` / `#e3936b` |
| Dark solid panel | `#2b2830` |
| Main panel | 18 px radius; translucent surface, border, shadow, backdrop blur with solid fallback |
| Reading content | `1.06rem`, line height `1.72` |
| Greeting | Responsive size via `clamp(1.7rem, 3.2vw, 2.25rem)` |
| News layout | Grid with date column, vertical rail, dots, and accented section heading |
| Small-screen adjustments | Rules at 600 px, 924 px, and 1023 px; sidebar widening at 1200 px |

These are CSS declarations, not universal rendered pixel dimensions: the theme’s root sizing and surrounding layout also affect the result. The base sidebar uses fixed positioning at its configured desktop breakpoint; the polish layer adjusts wrapping and width. Prefer a CSS Grid layout in ordinary document flow for the React adaptation, eliminating the reference’s dependence on legacy float-grid offsets. Allow long affiliations and URLs to wrap at every width.

The source reveals moving gradients, grain, staggered reveals, and a dark-only star field. These explain the reference, but are excluded from the target. [Background and animation sources][polish], [star-field script][default].

### Minimal target design

- One solid warm off-white background, dark charcoal text, one restrained terracotta link accent, and light dividers. Treat the reference color values as starting points and verify contrast. Use underlined links in prose so color is not their only distinguishing feature.
- Use Georgia for headings/body and system sans-serif for profile metadata initially. This avoids external font requests and keeps a similar editorial character. Do not load a code font for pages without code.
- One centered container and a simple two-column grid that stacks on mobile. Use ordinary document flow first; a sticky sidebar is optional only if it remains useful with long content and short viewports.
- No gradient mesh, glass blur, grain, stars, shadows on every entry, rotating portrait, card scaling, or animated entrances. Use whitespace and typography to establish hierarchy.
- Prefer a small wrapping navigation row over a JavaScript overflow menu. Add a native menu button only if actual labels fail to fit comfortably on phones.
- Render recent news as a plain dated list. If there are more than four entries, put older entries in native `<details><summary>Older news</summary>…</details>`; omit the disclosure when unnecessary.
- Set `color-scheme: light` in CSS and light theme metadata in the initial HTML. Remove the existing toggle, ThemeProvider dependencies where no longer needed, Redux theme state, preference listeners, and theme localStorage reads/writes. Ensure any transitional Bootstrap markup explicitly uses `data-bs-theme="light"`. Old saved preferences should have no effect; there is no need for a new preference-migration subsystem. Preserve browser accessibility overrides such as forced colors.

## 5. Patterns to improve instead of copying directly

| Finding in reference source | Planned response |
| --- | --- |
| Homepage has `title: ""`; the single layout checks title truthiness and can output an empty heading, while the visible greeting is a `div`. | Render a meaningful homepage `h1` and separate document title. |
| News uses a hidden checkbox, CSS sibling selectors, and label text revealed on hover. `collapse.js` is not the homepage news mechanism. | Use native details/summary for older news, with a visible label and no custom state. |
| HTML starts with `data-theme="dark"`; `setTheme()` prefers that attribute before the system preference when no stored choice exists. | Remove theme selection entirely; use one light stylesheet. |
| The theme toggle is an anchor with `role="button"`, without a native button’s keyboard behavior. | Omit the control entirely. |
| `head.html` and `scripts.html` both include analytics, and GA4 is configured. | Do not copy the tracking ID or duplicated includes. Leave analytics off unless intentionally configured later. |
| Scripts include CDN jQuery, while the npm bundle recipe also bundles jQuery. `_main.js` imports Plotly theme data for chart support. | Use small React interactions; leave unrelated chart, jQuery, and video helpers out. |
| Some titles/excerpts contain raw HTML images, links, and lists. The generic renderer wraps rendered excerpts in a paragraph. | Use structured fields and semantic components; avoid invalid nested paragraphs and raw HTML in titles. |
| Three collections have `output: true` even though their index titles are unlinked. | Generate detail routes only when there is meaningful detail content. |
| Extra CV/archive/template pages remain in `_pages`; removing navigation does not exclude pages from output. | Maintain an explicit route allowlist; draft and sample content should not enter production output. |
| Footer’s “last updated” is the build date via Liquid `now`. | Label it “Built” if using build time, or derive “Updated” from explicit content dates. |
| Only a talk-location scraping workflow is checked in; it is not a Pages deployment workflow. | Inspect your own Pages settings before changing publishing. Do not infer the reference’s complete deployment process. |
| No dependency lockfiles were tracked in the inspected reference revision. | Preserve your existing lockfile; if adopting Jekyll, establish and validate a reproducible dependency set. |

Sources: [homepage][about], [single layout][single], [theme logic][main-js], [masthead][masthead], [head][head], [scripts][scripts], [entry renderer][archive], [configuration][config], [footer][footer], [workflow][workflow], [repository snapshot][snapshot]. These are source-level findings, not a runtime accessibility or security audit.

## 6. Architecture decision

| Path | Benefits | Costs / limitations | When to choose |
| --- | --- | --- | --- |
| **A. Retain React and hash routes — recommended initial scope** | Reuses this repository, existing deployment command, and React knowledge; isolates the visual/content renewal. | Core content still needs JavaScript; shared initial HTML limits per-route social previews; CRA maintenance remains. | Fastest controlled renewal of the existing site. |
| **B. Migrate to Jekyll / AcademicPages** | Markdown authoring, generated page HTML, clean routes, close conceptual match to the reference. | Replaces the React app; introduces Ruby/Jekyll tooling and template cleanup; deployment and old-cache migration required. | Academic publishing workflow and static output outweigh React continuity. |

A later build-tool change for path A should be a separate milestone. Moving from CRA to a different client bundler alone does not generate per-route HTML or resolve deep-link hosting. If static output is required for the first release, select B rather than treating it as a cosmetic follow-up.

Path A is the implementation scope. Path B remains a future option only if authoring or static HTML requirements change. No new framework is installed as part of this research.

## 7. Content contract and placeholder behavior

Start with one plain `src/content/site.js` file containing the profile and short content arrays. Split by collection only when the file becomes inconvenient to edit. Keep layout, JSX, icon objects, and styling out of records. Use stable IDs and `null` for unavailable destinations. Keep example records as commented examples or in the content-editing README; no draft flags, preview mode, or publishing workflow is needed. This replaces the current mixture of JSX, API selection rules, and content in `src/config.js`.

| Collection | Fields |
| --- | --- |
| Profile | `name`, `role`, `institution`, `location`, `avatar`, `avatarAlt`, `bioParagraphs`, `researchInterests`, `links`, `cvUrl`; optional `updatedAt` |
| News | `id`, `date`, `text`, optional `url` |
| Publications | `id`, `title`, `authors`, `venue`, `date`, optional `summary`, `links` |
| Teaching | `id`, `institution`, `role`, `startDate`, optional `endDate`, `courses` |
| Projects | `id`, `title`, optional `year`, `summary`, optional `image` / `imageAlt`, `links`; array order determines display order |
| Navigation | Derive links from the pages with content; avoid a second set of visibility flags |

Example record for the editing guide, to copy into the data file when ready:

```js
{
  id: "publication-placeholder",
  title: "[Publication title]",
  authors: ["[Author name]"],
  venue: "[Venue]",
  date: null,
  summary: "[One-sentence contribution]",
  links: { paper: null, code: null, project: null }
}
```

Rules:

1. Use explicit bracketed placeholders for the initial local design review. Before release, replace them or remove the incomplete entries. Keep empty academic arrays and omit their navigation links; a direct visit to an empty academic route may show a short “No entries yet” message. No separate preview build is needed.
2. Missing URLs produce no anchors. A missing CV can be a plain “CV coming soon” label. Do not create a fake PDF or `#` destination.
3. Keep the small arrays in intended display order: news/publications newest first, projects curated manually. Render dates consistently, using semantic `<time>` where appropriate. Do not invent dates or add sorting infrastructure for a handful of records.
4. Keep existing headshot and project assets as candidates. Retain verified existing project links; do not inherit the reference owner’s affiliations, papers, awards, CV, or profile URLs.
5. Require useful image alt text and reserve image dimensions. Render optional links independently rather than a long set of link combinations.
6. Check duplicate IDs, malformed dates, incomplete records, and placeholder tokens during release review. A schema library or custom content validation framework is unnecessary at this scale. Use appropriate `mailto:` links and site-relative paths.

## 8. Target files for path A

```text
src/
  content/
    site.js
  components/
    SiteLayout.jsx
    ProfileSidebar.jsx
    NavBar.jsx
    NewsList.jsx
    PublicationEntry.jsx
    TeachingEntry.jsx
    ProjectEntry.jsx
    Footer.jsx
  pages/
    Home.jsx
    Publications.jsx
    Teaching.jsx
    Portfolio.jsx
    NotFound.jsx
  styles/
    site.css
  App.js
  index.js
```

Use the existing `GlobalStyles.js` as the transition point, then remove overlapping rules once one `site.css` file owns the new layout and its small set of CSS variables. Bootstrap can remain during transition; remove it and `custom.scss` after no active page depends on their components/utilities. With local content and no theme state, Redux/RTK Query should become unnecessary. Remove their provider/store after all active consumers migrate. Do the same for styled-components and react-scroll once unused. Do not replace them with another state or styling library. Component filenames above describe responsibilities; tiny one-use entry markup can stay within its page instead of becoming a separate abstraction.

`Hero`, `AboutMe`, `Skills`, `Projects`, `ProjectCard`, `Contact`, and `ContactForm` become removable when their content or function is covered by the new pages. Preserve your existing error boundary where useful. Simplify `SocialLinks` to local profile data. Remove GitHub queries from the initial rendering path and from page-title logic.

## 9. Implementation milestones and completion gates

| Milestone | Work | Completion gate |
| --- | --- | --- |
| 0. Baseline | Create `codex/website-renewal` when implementation begins; record current production screenshots, routes, build output, and deployed revision. Inspect Pages publishing settings. | Reproducible baseline and known rollback artifact; architecture A or B recorded. |
| 1. Content independence | Add one local content file and documented placeholder examples. Replace required GitHub profile/project/social queries. | Home and portfolio render with GitHub access unavailable; no missing-link anchors. |
| 2. Shared shell | Build simple navigation, profile sidebar, responsive grid, main region, and footer. Remove all theme logic and controls. | Usable layout at phone, tablet, and desktop widths; light-only appearance even with an old dark preference saved. |
| 3. Page content | Replace homepage with intro/news; add academic pages only as needed and curated portfolio; use native older-news disclosure and legacy route mapping. | Each enabled route works; order is correct; no invented content or dead destinations. |
| 4. Design | Apply one solid light palette and system fonts; tune spacing, portrait, and dividers. | No clipping or unreadable text; clear hierarchy without decorative effects. |
| 5. Release preparation | Update initial metadata, favicon/manifest, content instructions, service-worker strategy, and deployment checklist. Remove orphaned imports/dependencies. | Production build passes; old-client update and route tests pass; only intended content/assets ship. |

Each milestone should be independently reviewable. Do not deploy a partial content migration that leaves pages dependent on removed Redux selectors or API fields.

## 10. URLs, metadata, caching, and deployment

**Initial React routes:** `/#/`, `/#/publications`, `/#/teaching`, and `/#/portfolio`. Keep `/#/All-Projects` as an explicit redirect to the portfolio. Preserve or map existing section links where applicable. Keep the name link pointed at home and use navigation links that support normal browser history. A CV is an external or static-file destination, not a placeholder application route.

**Metadata:** populate the initial HTML title, description, canonical site URL, Open Graph title/description/image/URL, and relevant image alt text. Route changes can update the browser title, but do not promise unique social previews for hash routes. Path B should render its own metadata for each generated page. Keep `https://ikhyunan.github.io` as the site origin unless you supply a custom domain; never copy the reference `CNAME`.

**Service worker:** retire offline/PWA behavior; a small personal website does not need a new caching subsystem. This is a one-time compatibility task because the current site already registers a Workbox worker. Serve a tested replacement at the same `/service-worker.js` URL that activates, clears only identified legacy app caches, and unregisters itself. Verify how existing controlled tabs transition or reload; do not assume unregistering instantly releases them. Removing the registration call alone is insufficient for returning users. Retain the retirement endpoint for returning clients; do not blanket-delete unrelated caches on this origin.

**Publishing:** verified through the GitHub Pages API on September 17, 2026: `https://ikhyunan.github.io/` is built with the legacy Pages publisher from the root of the `gh-pages` branch. The existing `npm run deploy` command builds locally and publishes `build/` to that branch, so the implementation keeps this path. If selecting an Actions-based pipeline later, replace the old deployment path deliberately instead of having two publishers. The reference’s committed talkmap workflow is unrelated and should not be copied.

**Rollback:** preserve the last good deployed artifact and source revision before publishing. If validation fails after deployment, republish that artifact and verify the root, project compatibility route, assets, and worker behavior. Source rollback alone does not undo client cache state. This document does not authorize or perform a deployment.

## 11. Validation plan

| Area | Checks before release |
| --- | --- |
| Build | Run the repository production build; inspect warnings, broken imports, and output. Use the lockfile for reproducible installs. |
| Data | Check array order, IDs/dates, empty sections, placeholders, and missing-link handling. Use a manual review for small static arrays; add automated tests only for nontrivial shared behavior. |
| Navigation | Test every enabled page, direct loads, browser Back/Forward, legacy `/#/All-Projects`, unknown routes, and CV behavior. |
| Accessibility | Keyboard-only navigation/news use; visible focus; skip link; meaningful `h1`; semantic list/entry structure; native disclosure works. |
| Responsive | Inspect approximately 375, 768, 1024, and 1440 px widths, plus 200% zoom; long affiliation, project title, and URL samples must wrap. |
| Appearance | Inspect the light palette on desktop/mobile. Confirm OS dark mode and an old saved dark preference do not switch the site or native controls. Preserve forced-colors readability. |
| Resilience | Block GitHub requests; test missing optional images, long content, and empty arrays. No font service, animation, or backdrop filter should be required. |
| Content | Search final output for reference-owner details, generic template metadata, placeholder URLs, sample publications, and wrong domain/analytics values. |
| Cache / deployment | Test both a fresh browser and a browser with the old worker installed. Verify correct assets, latest content, and no redirect loop. |
| Performance | Measure before/after with the same conditions. Confirm the 3.4 MB hero is no longer requested; optimize the headshot and lazy-load below-fold figures. |

Targets to validate, not measured claims: no horizontal overflow at the above sizes, readable contrast, reserved image dimensions, and no render-blocking GitHub API dependency. Resize/compress the headshot to its actual display needs and keep below-fold images lazy-loaded. A single before/after performance check is sufficient unless it reveals an issue; do not add a monitoring pipeline or optimize for a perfect score.

## 12. Scope boundaries and small worthwhile improvements

Keep the existing React stack for this renewal. Revisit Jekyll only if Markdown authoring and generated HTML become explicit requirements. Do not build migration scaffolding now. If any reference code is copied, preserve its [MIT notice][license] and record attribution; use your own content and assets.

| Keep / improve now | Defer or omit |
| --- | --- |
| One local content file and one stylesheet | CMS, schema framework, custom preview/draft system |
| Shared layout and ordinary page components | Generic page builder or configurable design system |
| Light palette, system fonts, static headshot | Dark mode, custom font loading, animation libraries |
| Native links and older-news disclosure | Search, tags, pagination, filtering for a small portfolio |
| Direct email, optional CV/profile links | Contact backend, analytics, tracking, newsletter tooling |
| Existing React router and publisher | Framework, route strategy, or hosting migration |
| Small images, reserved dimensions, lazy loading | Image service, CDN setup, aggressive preloading |
| One-time retirement of the existing service worker | Offline support, install prompts, new cache framework |

Additional implementation details worth doing:

- Use short descriptive project titles and two or three useful sentences: problem, contribution, and outcome where known. Keep technical detail optional and never invent results.
- Give page titles and internal links meaningful names. Show the current navigation item with `aria-current="page"`; keep email and CV discoverable.
- Use same-tab links by default. If a new tab is needed, label that behavior and set appropriate `rel` attributes.
- Provide a small not-found page with a working home link; preserve the old projects route. Empty content should never produce a broken page.
- Give the portrait explicit width/height and avoid lazy-loading it above the fold. Use `loading="lazy"` only for below-fold project images.
- Use a single `<main>`, a skip link, logical heading order, wrapping text, and visible focus. Keep browser zoom and forced-colors support intact.
- Keep the footer to name/copyright and optionally an honest content-update date; do not require another date field solely for decoration.
- Add a short editing section to the README showing where to change profile text, add news/projects, supply CV/contact links, run locally, and build. Documentation provides more value here than another content abstraction.

## 13. Ready-to-use implementation scope

Implement path A, milestones 0–5, using this plan and the updated visual research. Retain React/hash routing and the current deployment mechanism. Replace API-dependent content with one local data file; add a shared sidebar layout, a compact introduction/news list, and curated portfolio. Include academic navigation only when entries exist. Use a solid light palette, Georgia/system fonts, one stylesheet, and a static headshot. Remove all dark-mode controls, state, persistence, listeners, and conditional styles. Use native HTML for older news and simple wrapping navigation. Leave personal information as explicit placeholders for local review; omit missing destinations and remove unfinished entries before release. Preserve the old project route, optimize images, retire the old service worker safely, and document content editing. Validate the production build, responsive layout, keyboard behavior, links, and returning-client update. Provide a local preview and change summary; publishing remains a separate step.

The light-only React implementation now covers the shared layout, local content, portfolio, metadata, dependency cleanup, and service-worker retirement described above. The reference’s dark palette, fonts, and effects in section 4 remain historical findings; the light-only minimal target overrides them.

[snapshot]: https://github.com/oytunkuday/oytunkuday.github.io/tree/076b62ef48a930e14e8a5437a811a82ce35e6246
[config]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_config.yml
[gemfile]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/Gemfile
[package]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/package.json
[layouts]: https://github.com/oytunkuday/oytunkuday.github.io/tree/076b62ef48a930e14e8a5437a811a82ce35e6246/_layouts
[author]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_includes/author-profile.html
[navigation]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_data/navigation.yml
[about]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_pages/about.md
[publications]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_pages/publications.html
[teaching]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_pages/teaching.html
[portfolio]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_pages/portfolio.html
[archive]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_includes/archive-single.html
[polish]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/assets/css/site-polish.css
[head-custom]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_includes/head/custom.html
[default]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_layouts/default.html
[single]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_layouts/single.html
[main-js]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/assets/js/_main.js
[masthead]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_includes/masthead.html
[head]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_includes/head.html
[scripts]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_includes/scripts.html
[footer]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/_includes/footer.html
[workflow]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/.github/workflows/scrape_talks.yml
[license]: https://github.com/oytunkuday/oytunkuday.github.io/blob/076b62ef48a930e14e8a5437a811a82ce35e6246/LICENSE

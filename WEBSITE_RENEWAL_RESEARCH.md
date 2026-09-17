# Personal website renewal research

Reviewed September 17, 2026. Scope: the live reference homepage in both themes, its publications/teaching/portfolio content, your original live homepage, and this repository’s React source. Implementation subsequently began on the `codex/website-renewal` branch. Mobile behavior and performance scores were not measured during the initial research.

Companion: [Repository findings and comprehensive implementation plan](WEBSITE_RENEWAL_PLAN.md). It verifies the reference’s source-level design choices and provides architecture options, content contracts, milestones, and release checks for implementation.

## Recommended direction

Updated direction: **minimal and light-only**. Use a solid background, system serif/sans-serif fonts, a static portrait, and simple content lists. Remove dark mode and its toggle/state/listeners; omit decorative animation, glass effects, and background textures. Reference observations below describe the original site, not a requirement to copy those features.

Turn the current full-screen developer portfolio into a compact academic personal website. Keep your headshot and useful project material, put your introduction and research focus immediately in view, and make professional information available throughout the site. Personal details and destinations can remain explicit placeholders during implementation.

## What to borrow from the reference

The [reference homepage](https://oytunkuday.com/) combines a horizontal name/navigation bar, a narrow profile sidebar, a wider biography column, and dated news with an expansion control. Its light theme uses a warm cream surface, soft peach background, dark text, and rust accents; its dark theme uses charcoal surfaces and warm accents. Large serif headings and body copy contrast with compact sans-serif profile details. The circular portrait stays still. A rounded content surface and subtle background texture give the page character without a full-screen hero. A theme toggle and understated footer complete the layout.

The [publications page](https://oytunkuday.com/publications/) emphasizes publication title, venue, year, distinctions, and supporting links. The [teaching page](https://oytunkuday.com/teaching/) groups roles and courses by institution and dates. The [portfolio page](https://oytunkuday.com/portfolio/) uses descriptive project entries with selective images and links. These are useful content patterns; your site should use your own wording, work, and assets.

## Prioritized changes

| Priority | Current site / source evidence | Recommended update |
| --- | --- | --- |
| P0 | `Hero.jsx` fills the first screen with a laptop/coffee background and rotating headshot. | Replace it with a shared two-column profile/content layout. Show the introduction immediately. Keep the portrait static. |
| P0 | `GlobalStyles.js` gives `.section` a minimum height of `100vh`. | Use content-driven section heights and ordinary vertical spacing. Biography and recent news should be visible with much less scrolling. |
| P0 | `NavBar.jsx` primarily scrolls between Home, About, Skills, Projects, and Contact. | Use a name/home link plus Publications, Teaching, Portfolio, and CV; show only sections that are useful to you. Keep navigation consistent across pages. |
| P0 | `App.js` renders the site only after the GitHub user query succeeds. | Store core profile and content locally so a GitHub outage cannot replace the whole site with an error screen. Remove runtime GitHub enrichment from the renewal scope. |
| P0 | No news, publications, or teaching data model exists. | Add small editable arrays and documented placeholder examples. Do not infer academic achievements from the reference. |
| P1 | `custom.scss` uses bright cyan; headings use Google Sans Code. | Use one warm light palette, system serif typography, restrained accents, and subtle borders. Keep sans-serif text for compact profile metadata. |
| P1 | `ProjectCard.jsx` uses fixed-height cards with scrollable text, large images, and hover scaling. | Use natural-height project entries: title, year, contribution, short outcome, optional figure, and explicit links. Curate order locally. |
| P1 | `Skills.jsx` occupies a dedicated section. | Move useful technologies into project descriptions or a short expertise line; prioritize research interests on the homepage. |
| P1 | Contact occupies a full section and submits through Formspree. | Put email and professional profile links in the sidebar. Use direct contact links and remove the form. |
| P1 | `public/index.html` still says `React App`, has generic sharing text, and empty Open Graph image/URL values. | Set meaningful initial title, description, canonical URL, sharing metadata, and personal favicon. Add page-specific metadata if generating separate HTML pages. |
| P1 | `Footer.jsx` is a cyan strip of social icons. | Use a quiet copyright footer and an explicit content-update date. |
| P2 | The site uses Create React App and several state/styling layers. | Modernize the build separately from the visual changes; remove libraries only when their uses have been eliminated. |

## Proposed content and layout

Desktop structure: top navigation; below it, a 220–260 px profile column, a 40–64 px gap, and a flexible reading column inside an approximately 1100–1200 px container. These are proposed starting values, not measured reference dimensions. Use a 150–180 px circular portrait, roughly 18 px body text, and a line height around 1.6. At narrow widths, stack a compact profile above the content and let navigation wrap without horizontal overflow; add a menu only if the actual labels need it.

| Area | Editable content |
| --- | --- |
| Shared profile | `[Your name]`, `[Current role]`, `[Institution]`, `[Location]`, portrait, email, GitHub, LinkedIn, optional Scholar/ORCID |
| Home introduction | “I am a [role] at [institution]. My interests include [topics]. I am currently working on [research/project].” Add background, collaborators, or interests as appropriate. |
| News | `[YYYY-MM] — [Update]`, optional destination; show the newest four and use native details/summary for older items when needed |
| Publications | `[Title]`, `[Authors]`, `[Venue]`, `[Year]`, optional paper/code/project links and award text |
| Teaching | `[Institution]`, `[Course]`, `[Role]`, `[Dates]`, short responsibilities |
| Portfolio | `[Project title]`, `[Year]`, `[Problem]`, `[Your contribution]`, `[Outcome]`, optional figure, code/report/demo links |
| CV | A configurable PDF URL, or an inactive “CV coming soon” label until supplied |

Keep this in one clearly documented `src/content/site.js` file, splitting it only when necessary. Use `null` for missing URLs and omit their anchors; avoid clickable `#` placeholders. Keep examples in comments or the README; omit empty academic navigation and replace/remove visible placeholders before release. No separate draft or preview system is needed. Retain the existing project names and assets as candidates, but let you supply their final descriptions and ordering.

## Implementation map and technical findings

- **Shared shell:** refactor `src/App.js`; add `ProfileSidebar.jsx` and `SiteLayout.jsx`; replace the assembly in `src/pages/Home.jsx`. Add publications and teaching pages, and adapt `AllProjects.jsx` into a curated portfolio. Preserve compatibility for `/#/All-Projects` if routes change.
- **Visual system:** update `GlobalStyles.js`, `custom.scss`, `NavBar.jsx`, and `Footer.jsx`; retire the large hero, oversized skills section, and redundant contact section when their replacements exist.
- **Data independence:** replace required GitHub hooks in Home, SocialLinks, Projects, and AllProjects with local content. Simplify `app/apiSlice.js` and Redux only after consumers have migrated.
- **Remove theme logic:** `App.js` attaches a media-query listener during render without removing it. Delete the theme feature entirely, including this listener, the toggle, saved-preference logic, and dark styles; use a light color scheme for native controls as well.
- **Missing-link bug:** `ProjectCard.jsx` uses `demo !== (undefined && null && "")`, which effectively only excludes `undefined`. Require a nonempty URL. The live page currently displays a “Live Demo” label for the MCP entry without a usable link.
- **Template cleanup:** `config.js` contains `example-3` and a null resume; `public/manifest.json` contains generic portfolio branding. Replace or remove these deliberately.
- **Assets:** `hero-light.jpg` is approximately 3.4 MB on disk. Removing the hero avoids using this large background. Resize remaining images to their display needs and give them meaningful alternative text.
- **Deployment freshness:** `src/index.js` registers a service worker. Retire it with a one-time compatibility path and test returning visitors so cached assets do not obscure the redesign.

For the shortest implementation path, retain React and the existing hash routing initially. Matching the reference’s appearance does not require adopting its Jekyll/AcademicPages stack. Schedule a CRA migration as a separate maintenance step: React has [deprecated Create React App and recommends migration options](https://react.dev/blog/2025/02/14/sunsetting-create-react-app).

If clean URLs such as `/publications/` and individually shareable page metadata are priorities, generate static HTML per route. GitHub Pages is [static hosting for HTML, CSS, and JavaScript](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). Merely replacing HashRouter with BrowserRouter does not provide the required files for fresh deep-link requests. Verify deployed routing before choosing that change.

## Suggested delivery sequence

1. Create local placeholder content, the shared profile layout, and the compact homepage.
2. Add news, publication/teaching templates, curated portfolio entries, and configurable CV/contact links.
3. Apply the light-only palette, system fonts, responsive behavior, accessibility, and personal metadata.
4. Validate the production build and deployment behavior; undertake build-tool migration separately if desired.

Acceptance checks: homepage renders without GitHub requests; all enabled routes and browser Back work; missing URLs create no dead links; news expansion and navigation work by keyboard; focus is visible; each page has a meaningful heading; mobile widths around 375 px and desktop widths around 1280 px have no overflow; the light design remains consistent even with an old saved dark preference; direct page loads work for the chosen hosting strategy; returning visitors receive updated assets. The implementation build and local browser checks are recorded in the task history. Nothing has been deployed.

# ECHA Pasikudah — Informational Website

A static, fully responsive informational website for **ECHA Pasikudah**, a hospitality
association on Sri Lanka's east coast. The site introduces the association, promotes
Pasikudah as a destination, presents the member directory and provides practical travel
information.

Built with **HTML5, CSS3, Bootstrap 5.3, vanilla JavaScript and Bootstrap Icons** only.
No frameworks, no build step, no backend.

---

## 1. Running the website locally

### Option A — open the file directly

Double-click `index.html`. Everything works, including the gallery lightbox and form
validation. (Some browsers restrict a few features on `file://`, so Option B is preferred.)

### Option B — a simple local server

From this folder:

```bash
# Python 3 (macOS / Linux / Windows)
python -m http.server 8080

# or with Node installed
npx serve .
```

Then open <http://localhost:8080>.

### Option C — XAMPP

1. Copy the whole project folder into `C:\xampp\htdocs\`.
2. Start **Apache** in the XAMPP control panel.
3. Open <http://localhost/echa-pasikudah/> (adjust to the folder name you used).

> **Internet connection:** Bootstrap, Bootstrap Icons and Google Fonts are loaded from
> public CDNs. The site needs a connection the first time it is opened. For a fully
> offline build, download those files into `assets/vendor/` and update the `<link>` tags.

---

## 2. Folder structure

```text
ECHA-Pasikudah/
├── index.html              Homepage
├── about.html              About ECHA
├── vision-mission.html     Vision, mission and objectives
├── committee.html          Leadership and committee
├── members.html            Member hotels and establishments
├── pasikudah.html          Explore Pasikudah + travel information
├── attractions.html        Attractions, beaches and activities
├── news.html               News and updates
├── events.html             Events and announcements
├── gallery.html            Photo gallery with filter + lightbox
├── contact.html            Contact details, map and enquiry form
├── README.md
└── assets/
    ├── css/
    │   └── style.css       Shared design system and all page styles
    ├── js/
    │   └── main.js         Shared behaviour (no dependencies beyond Bootstrap)
    └── images/
        ├── hero-pasikudah.jpg
        ├── about.jpg
        ├── destinations/   Bay, sunset, lagoon, coast road
        ├── hotels/         Illustrative hospitality images
        ├── experiences/    (reserved for member-supplied images)
        ├── news/           (reserved for member-supplied images)
        └── gallery/        Pasikudah and Kalkudah photographs
```

Every page shares the same header, dropdown navigation, typography, colour system,
buttons, section rhythm and footer. Navigation is duplicated in each HTML file because
the project has no templating engine or build step.

---

## 3. Design system

| Token | Value | Use |
| --- | --- | --- |
| Deep Ocean Blue | `#123B50` | Primary headings, buttons, dark sections |
| Tropical Teal | `#176B70` | Accents, hover states, CTA band |
| Sand Beige | `#E9DDC8` | Warm accents on dark backgrounds |
| Warm White | `#FAFAF7` | Page background |
| Charcoal | `#292F32` | Body text |
| Muted Gold | `#B69A62` | Rules, eyebrows, small details |

Typography pairs **Cormorant Garamond** (display serif) with **Jost** (interface sans).
Spacing, colour and component styles live in `assets/css/style.css`, organised in ten
labelled sections.

---

## 4. Frontend behaviour (`assets/js/main.js`)

- Sticky header with a compact scrolled state
- Active navigation highlighting based on the current file name
- Responsive Bootstrap hamburger menu that closes after navigation
- Dropdown navigation (Bootstrap)
- Smooth scrolling for in-page anchors, offset for the sticky header
- Back-to-top button
- Subtle reveal-on-scroll (disabled under `prefers-reduced-motion`)
- Gallery lightbox: previous / next, captions, `Esc` to close, arrow-key support
- Gallery category filtering (All / Beaches / Hospitality / Experiences)
- Contact form validation with inline messages and a static-site notice
- Automatic copyright year

No unnecessary effects or heavy libraries are used.

---

## 5. Placeholders that must be replaced before publishing

This site deliberately **does not invent facts about ECHA Pasikudah**. The following are
clearly marked placeholders on the pages:

| Item | Where | Action needed |
| --- | --- | --- |
| Official logo | Header and footer wordmark | See section 6 |
| Telephone, email, address, office hours | Top bar, footer, `contact.html` | Replace with verified details |
| Social media links | Top bar, footer, `contact.html` | Add official profile URLs |
| Member hotels | `index.html`, `members.html` | Add verified names, descriptions, contact details and photography |
| Committee names and profiles | `committee.html` | Add confirmed names, roles and photos |
| Vision / mission wording | `vision-mission.html` | Replace draft text with adopted wording |
| Founding year, registration, membership numbers | `about.html` | Add verified association facts |
| News and event entries | `news.html`, `events.html` | Replace sample articles and TBA dates |
| Contact form delivery | `contact.html` | Connect a backend or form service |
| Gallery photographs | `gallery.html` | Replace illustrative images with member/association photography |

The contact form is intentionally inert: it validates input in the browser and then shows
a message explaining that no email was sent. To make it live, either:

- point the `<form>` at a form-to-email service (Formspree, Getform, Basin, etc.) by adding
  `action` and `method` and removing the `event.preventDefault()` behaviour, or
- add a small server-side handler if the site is hosted with PHP or Node.

---

## 6. Adding the official logo

The brief requires the official logo not to be recreated or recoloured, and a text-based
placeholder to be used until the real file is supplied. The site currently uses a
typographic `E` monogram wordmark.

To use the official logo:

1. Save the original file as `assets/images/echa-logo.png` (keep its proportions).
2. In each page, replace the `<span class="brand-mark">E</span>` block inside the header
   `<a class="brand">` with:

   ```html
   <img src="assets/images/echa-logo.png" alt="ECHA Pasikudah" height="56" />
   ```

3. Do the same for the footer brand (add `class="brand brand--light"` styling as needed).
4. If the logo has a light version for dark backgrounds, use it in the footer.

The `.brand-mark` styles can remain in the CSS for the placeholder.

---

## 7. Image credits

Illustrative hospitality, destination and lifestyle photographs in `assets/images/` were
produced for this demonstration template (AI-generated). They are placeholders and should
be replaced with photographs owned by ECHA Pasikudah and its members before launch.

The following genuine Pasikudah / Kalkudah photographs are from Wikimedia Commons and are
used under their respective licences. Attribution is required if they are kept:

| File | Original | Author | Licence |
| --- | --- | --- | --- |
| `gallery/sunset-at-pasikudah-beach.jpg` | *Sunset at Pasikudah Beach 2023-05-20-1.jpg* | Alexey Komarov | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `gallery/sunrise-at-kalkudah-beach.jpg` | *Sunrise at Kalkudah Beach 2023-05-21-1.jpg* | Alexey Komarov | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `gallery/pasikudah-beach-evening-01.jpg` | *Pasikudah Beach evening 01.jpg* | Dr S. Rajivraja | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `gallery/pasikudah-blue-beach.jpg` | *Pasikudah Blue beach.jpg* | Rovin Shanila | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) |
| `gallery/pasikudah-beach-sri-lanka.jpg` | *Pasikudah beach sri lanka.jpg* | Imaadwhd | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) |

If these images are replaced, remove the corresponding credit lines from the gallery page
and this README.

---

## 8. Responsive behaviour and accessibility notes

- Bootstrap 5 grid with custom breakpoints at 1200 px, 992 px, 768 px and 480 px.
- Single-column layouts, stacked navigation and scaled imagery on phones.
- No fixed-width elements; images use `max-width: 100%` and `object-fit` crops.
- Semantic landmarks (`header`, `nav`, `main`, `footer`), a skip link, visible focus styles,
  labelled form fields, `aria` attributes on the lightbox and gallery filters, and
  `prefers-reduced-motion` support.
- The gallery lightbox supports keyboard navigation (`Esc`, `←`, `→`).

---

## 9. Verification performed

- All internal links, anchors and local image paths were checked programmatically; there
  are no broken `href` or `src` targets.
- Pages were served locally over HTTP and loaded successfully.
- Form validation, gallery filtering and the lightbox were implemented but were **not**
  clicked through manually in a browser during this build.

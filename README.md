# Ishan Madushanka – 3D Interactive Particle Avatar Portfolio (6 Pages)

An interactive, premium, browser-first 3D portfolio website for **I.D. Ishan Madushanka** — Technology Stream Graduate & Certified Technical Professional (Aluminium Fabricator, RAC Technician, Web & Graphic Designer).

Exact reproduction of the 6-page design board featuring a 3D particle avatar reconstructed from Ishan's real portrait, mouse/gyro head tracking, scroll disintegration into floating technical icons, frosted glassmorphism, animated skill rings, interactive project carousel, web-safe CV viewer, and contact form.

---

## 🌟 Key Features

1. **Light Theme Primary with Dark Mode Toggle**:
   - Primary light theme: pure white (`#FFFFFF`) with lavender gradients (`#F1EDFF` → `#E9E3FF`), mint green (`#4ECB8D`), deep blue (`#1F4E9A`), and soft violet (`#8B7BFF`).
   - Alternate dark theme toggle (stored in `localStorage`).
2. **Interactive 3D Particle Avatar (`hero3d.js`)**:
   - Reconstructs Ishan's real photo from a 32,000 particle cloud into a textured 3D displaced mesh plane.
   - Smooth desktop head tracking (turns up to ±12° toward the mouse cursor) with eye-level parallax and breathing motion.
   - Mobile gyroscope tracking via `DeviceOrientationEvent` (with iOS permission button).
   - Click/hover disintegration (particles scatter outward and reform).
   - Scroll-driven tile breakdown (fractures into 24×24 tiles and drifts into 21 floating line icons).
3. **6 Complete Pages**:
   - **01 Home (`index.html`)**: 3D particle hero, floating HUD badges, download CV, mouse scroll indicator.
   - **02 About (`about.html`)**: "Who Am I?", objective, journey, handwritten signature, 3 stat cards (animated counters), glass framed portrait with orbiting rings.
   - **03 Education (`education.html`)**: Switchable pill tabs (`[ Education ] [ Skills ] [ Certificates ]`), vertical timeline with glowing nodes, 4 circular SVG progress rings, tech logos row, skills breakdown, and 10 certification cards.
   - **04 Experience (`experience.html`)**: Switchable pill tabs (`[ Experience ] [ Projects ]`), fabrication timeline, interactive project carousel with dots, laptop mockups, and project detail modal.
   - **05 My CV (`cv.html`)**: Floating 3D CV preview document, embedded modal PDF viewer, direct download button, and structured privacy-safe CV breakdown.
   - **06 Contact (`contact.html`)**: Contact details, interactive validated contact form (Formspree configurable), floating 3D globe, and handwritten "Let's Connect!".
4. **Zero Build Step & Offline Ready**:
   - Pure HTML5, modern CSS3, and ES modules.
   - CDN libraries (Three.js, GSAP, Lenis) with offline fallbacks in `/vendor`.
   - Ready for instant deployment to **GitHub Pages**.

---

## 📁 File Structure

```
├── index.html                 # 01 Home (3D Particle Avatar Hero)
├── about.html                 # 02 About (Who Am I?, Stats, Framed Portrait)
├── education.html             # 03 Education (Timeline • Skills • Certificates tabs)
├── experience.html            # 04 Experience (Timeline • Projects carousel tabs)
├── cv.html                    # 05 My CV (3D Preview, PDF Modal, Resume Breakdown)
├── contact.html               # 06 Contact (Form, Info, 3D Globe, "Let's Connect!")
├── css/
│   └── style.css              # Glassmorphism, theme variables, animations, responsive
├── js/
│   ├── main.js                # Nav, theme toggle, custom cursor, magnetic buttons, smooth scroll
│   ├── hero3d.js              # Three.js 3D Particle Avatar engine & head tracking
│   ├── animations.js          # Counters, tabs, radial rings, tilt cards, carousel, modals, form
│   └── data.js                # CENTRAL DATA STORE (All content easily editable)
├── assets/
│   ├── images/
│   │   ├── me-portrait.png    # Original portrait photo
│   │   ├── me-cutout.png      # Transparent background cutout
│   │   ├── me-depth.png       # 3D Depth displacement map
│   │   └── ai/                # Section illustrations (workshop, electrolab, cv-preview, etc.)
│   ├── icons/                 # 33 custom 3D glass SVG icons
│   └── cv/
│       └── Ishan_Madushanka_CV.pdf # Web-safe professional 2-page CV
├── vendor/
│   ├── three.module.js        # Three.js ES module (local fallback)
│   ├── gsap.min.js            # GSAP (local fallback)
│   ├── ScrollTrigger.min.js   # GSAP ScrollTrigger (local fallback)
│   └── lenis.min.js           # Lenis Smooth Scroll (local fallback)
└── README.md
```

---

## 🚀 How to Run Locally

### Option A: Direct Open (Double-Click)
You can open `index.html` directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Option B: Local Web Server (Recommended for full ES module / texture support)
Due to standard browser CORS security policies regarding local texture files (`file:///`), running a lightweight local server is recommended:

**Using Python (built into Windows/macOS/Linux):**
```bash
python -m http.server 8000
```
Then visit: `http://localhost:8000`

**Using VS Code:**
Install the "Live Server" extension, right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Deploy to GitHub Pages (100% Free & Fast)

1. Create a new repository on [GitHub](https://github.com).
2. Push this folder to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ishan Madushanka 3D Portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select **Branch: `main`**, folder **`/ (root)`**, then click **Save**.
4. In ~60 seconds, your website will be live at:
   `https://<your-username>.github.io/<repo-name>/`

---

## ✏️ How to Edit Content (`js/data.js`)

All portfolio content is centralized in `js/data.js`:

- **Personal Info & Objective**: Update `personal.fullName`, `personal.objective`, `personal.aboutText`.
- **Social Links**: Replace the `#TODO` URLs in `personal.socials` (`linkedin`, `github`, `facebook`, `whatsapp`).
- **Stats**: Modify `stats` numbers (`Awards: 5`, `Projects: 4`, `Experience: 2`).
- **Projects**: Add, remove, or edit items in the `projects` array. Each project accepts `title`, `description`, `tech`, `role`, `liveUrl`, `githubUrl`, and `thumbnail`.
- **Skills & Rings**: Update the ring percentages in `skills.radialRings` (e.g. `Fabrication & HVAC: 95`, `Web Dev: 90`).
- **Contact Form Endpoint**:
  1. Create a free form at [Formspree](https://formspree.io).
  2. In `js/data.js`, replace `formspreeEndpoint: "https://formspree.io/f/xyyllqzw"` with your Formspree form URL.

---

## 🔒 Strict Privacy Rules Followed

In strict compliance with privacy guidelines, the following personal data is **NEVER** displayed on the website or in the web-safe CV PDF:
- ❌ No National Identity Card (NIC) number.
- ❌ No Date of Birth or exact age.
- ❌ No Religion or Marital Status.
- ❌ No full home/residential address (only town level: **Thelwatta, Galle**).
- ❌ No instructor private telephone numbers ("References available upon request").

---

## 📦 Assets to Supply or Update

1. **Social URLs**:
   - LinkedIn: `https://linkedin.com/in/<your-profile>`
   - GitHub: `https://github.com/<your-username>`
   - Facebook: `https://facebook.com/<your-profile>`
2. **Project Live Demos & Repositories**:
   - ElectroLab Simulator URL
   - RAC Question Bank URL
   - VFX Portfolio showcase links
3. **Formspree Form ID**:
   - For real-time email delivery from the contact form.


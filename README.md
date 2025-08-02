# jamesinman.co.uk

## 🚀 Getting Started

### 1️⃣ Prerequisites
Make sure you have the following installed:
- **Ruby** (2.7 or later)
- **Bundler** (`gem install bundler`)
- **Node.js** (16+)
- **npm**

### 2️⃣ Install dependencies

    gem install foreman
    bundle install
    npm install

### 3️⃣ Run Jekyll locally, and Tailwind in watch mode

    foreman start

Visit the site at: **http://localhost:4000**

This will watch for changes in `assets/css/input.css` and output to `assets/css/main.css`.

---

## 📂 Project Structure

    website/
    ├── _config.yml                # Jekyll config
    ├── Gemfile                    # Ruby dependencies
    ├── index.md                   # Homepage
    ├── _layouts/                  # Layout templates
    ├── _includes/                 # Header & footer partials
    ├── pages/                     # Sub-pages (Tech for Good, Mentoring & Coaching, neurobetter)
    ├── assets/css/input.css       # Tailwind source
    ├── assets/css/main.css        # Compiled Tailwind (generated)
    └── package.json               # npm scripts for Tailwind

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Set the source branch to `main` (and `/root` folder).
4. Wait for GitHub Pages to build – your site will be live.

---

## ⚙️ Commands Summary

- `bundle exec jekyll serve` → Runs the Jekyll site locally.
- `npm run dev` → Watches and compiles Tailwind CSS.
- `foreman start` → Runs Jekyll and Tailwind (in watch mode) together.

---

## ✅ Next Steps

- Edit `index.md` to change homepage content.
- Update service pages in `/pages/`.
- Add images in `/assets/images/`.
- (Optional) Customize Tailwind in `tailwind.config.js` (run `npx tailwindcss init` to create one).

Happy building!

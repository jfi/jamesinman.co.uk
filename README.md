# jamesinman.co.uk

## 🚀 Getting Started

### 1️⃣ Prerequisites
Make sure you have the following installed:
- **Ruby** (3.4.5 or later)
- **Bundler** (`gem install bundler`)
- **Node.js** (18+)
- **npm**

### 2️⃣ Install dependencies

    gem install foreman
    bundle install
    npm install

### 3️⃣ Development Options

**Option A: Full development environment (recommended)**
```bash
foreman start
```

**Option B: Individual processes**
```bash
# Terminal 1: Jekyll with CSS building
npm run serve

# Terminal 2: Watch Tailwind CSS changes
npm run dev
```

Visit the site at: **http://localhost:4000**

**Note:** The pre-commit hook will automatically build CSS before commits.

---

## 📂 Project Structure

    website/
    ├── _config.yml                # Jekyll config
    ├── Gemfile                    # Ruby dependencies
    ├── index.md                   # Homepage
    ├── _layouts/                  # Layout templates
    ├── _includes/                 # Header & footer partials
    ├── assets/css/input.css       # Tailwind source
    ├── assets/css/main.css        # Compiled Tailwind (generated)
    └── package.json               # npm scripts for Tailwind

---

## 🌐 Deploying to GitHub Pages

The site automatically deploys via GitHub Actions when you push to `main`:

1. Push changes to the `main` branch.
2. GitHub Actions builds both Tailwind CSS and Jekyll.
3. Site is deployed to GitHub Pages automatically.

The workflow handles both Node.js (Tailwind) and Ruby (Jekyll) dependencies.

---

## ⚙️ Commands Summary

### Development
- `foreman start` → Runs Jekyll and Tailwind (in watch mode) together.
- `npm run serve` → Builds CSS once and starts Jekyll server.
- `npm run dev` → Watches and compiles Tailwind CSS.

### Building
- `npm run build` → Builds Tailwind CSS once.
- `npm run build:jekyll` → Builds Jekyll site.
- `npm run build:all` → Builds both CSS and Jekyll site.

### Git Integration
- Pre-commit hook automatically builds CSS and stages it.
- GitHub Actions automatically builds everything on push to main.

---

## ✅ Next Steps

- Edit `index.md` to change homepage content.
- Add images in `/assets/images/`.

Happy building!

# BrotherHood RolePlay Website

A static bilingual landing page for the BrotherHood FiveM & RedM roleplay community. Built with HTML/CSS/JS and optimized for GitHub Pages deployment.

## Highlights

- **Responsive layout** covering desktop, tablet, and mobile.
- **English/Arabic toggle** with proper RTL/LTR handling.
- **Server showcases** for both FiveM (QBCore) and RedM (VORPCore).
- **Interactive contact form** integrated with FormSubmit.
- **Optimized assets** with preconnect, lazy loading, and deferred scripts.

## Project Structure

```
BrotherHood-Site-main/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── hero-bg.jpg
│   ├── logo.png
│   ├── icon.png
│   └── about.png
└── README.md
```

## Getting Started

1. **Clone** the repository.
2. Open `index.html` directly in a browser, or serve the folder via any static server.
3. Update copy, images, or colors as needed.

### Local Development Tip

Use a lightweight server such as:

```bash
npx serve .
```

## Deployment

### GitHub Pages

1. Push the repository to GitHub.
2. Enable Pages under **Settings → Pages**, choosing the `main` branch and `/ (root)` folder.
3. Wait for GitHub to publish your site.

### Custom Domain

1. Point your DNS `A`/`CNAME` records to GitHub Pages according to GitHub docs.
2. Update the `CNAME` file with your domain.
3. Re-run the Pages build.

## Customization

- **Colors**: Edit CSS variables in `css/style.css` inside the `:root` block.
- **Sections**: Duplicate existing section markup in `index.html` and adjust IDs.
- **Images**: Replace files in `images/` keeping the same filenames or updating `src` attributes.

## Credits

- **Developer**: SPOO
- **Discord**: https://discord.gg/hh4YygkeNQ

---

### النسخة العربية المختصرة

- موقع ثابت ثنائي اللغة لخوادم BrotherHood (FiveM و RedM).
- يدعم التبديل بين العربية والإنجليزية مع RTL/LTR.
- جاهز للرفع على GitHub Pages أو أي استضافة ثابتة.
- للتشغيل المحلي افتح `index.html` أو استخدم خادم بسيط (`npx serve .`).
- لتغيير الألوان أو الأقسام عدل الملفات `css/style.css` و`index.html`.
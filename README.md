# 🌐 BrotherHood RolePlay Server Website

A beautiful bilingual website for BrotherHood QBCore FiveM Server with English and Arabic support.

## 📁 Website Structure

```
website/
├── index.html          # Main page (Bilingual)
├── css/
│   └── style.css       # Styling with RTL/LTR support
├── js/
│   └── script.js       # JavaScript with language switching
├── images/             # Images folder
│   └── placeholder.txt # Required images guide
└── README.md           # This file
```

## 🎨 Website Features

### Design
- ✅ Responsive Design (Mobile, Tablet, Desktop)
- ✅ Bilingual Support (English/Arabic)
- ✅ RTL/LTR Direction Support
- ✅ Beautiful color scheme
- ✅ Modern fonts (Inter for English, Cairo for Arabic)
- ✅ Font Awesome icons

### Sections
- 🏠 **Home** - Welcome and server statistics
- ℹ️ **About** - Detailed information about BrotherHood
- ⭐ **Features** - Server features showcase
- 💼 **Jobs** - Available jobs list
- 📋 **Rules** - Server rules and guidelines
- 📞 **Contact** - Contact information

### Interaction
- 🔗 **Direct Links** - Join server via FiveM
- 💬 **Discord** - Direct Discord server link
- 📱 **Mobile Menu** - For mobile devices
- ⬆️ **Scroll to Top** - Easy navigation
- 🎯 **Smooth Scrolling** - Between sections
- 🌐 **Language Switcher** - English/Arabic toggle

## 🚀 How to Use

### 1. Deploy to GitHub Pages
```bash
# 1. Create a new repository on GitHub
# 2. Upload all files to the repository
# 3. Go to Settings > Pages
# 4. Select "Deploy from a branch"
# 5. Choose "main" branch
# 6. Click Save
# 7. Wait a few minutes for deployment
```

### 2. Upload to Other Hosting
```bash
# Upload files to any web server
# Or use any free hosting service
```

### 3. Setup Formspree (Contact Form)
```bash
# 1. Go to https://formspree.io
# 2. Create a new account
# 3. Create a new form
# 4. Copy the form ID
# 5. Replace 'mrbajdpl' in index.html and js/script.js with your form ID
```

### 4. Add Images
- Place BrotherHood logo in `images/logo.png`
- Place hero background in `images/hero-bg.jpg`
- Place about section image in `images/about.png`

### 3. Customize Content
- Modify information in `index.html`
- Change colors in `css/style.css`
- Add new functions in `js/script.js`

## 🌐 Language Support

### English (Default)
- Primary language with LTR direction
- Inter font family
- Left-aligned text

### Arabic
- Secondary language with RTL direction
- Cairo font family
- Right-aligned text
- Full RTL support for all elements

## 🔧 Customization

### Change Colors
```css
/* In css/style.css file */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #ffd700;
}
```

### Add New Sections
```html
<!-- In index.html file -->
<section id="new-section" class="new-section">
    <div class="container">
        <!-- New section content -->
    </div>
</section>
```

### Add JavaScript Functions
```javascript
// In js/script.js file
function newFunction() {
    // New code here
}
```

### Language Customization
```javascript
// Add new language support
const newLanguage = {
    'en': 'English Text',
    'ar': 'النص العربي'
};
```

## 📱 Compatibility

- ✅ **Desktop** - All modern browsers
- ✅ **Tablets** - iPad, Android Tablets
- ✅ **Mobile** - iPhone, Android
- ✅ **Browsers** - Chrome, Firefox, Safari, Edge

## 🎯 Server Information

- **Name:** BrotherHood RolePlay
- **Address:** cfx.re/join/6gd4kj
- **Max Players:** 48
- **Framework:** QBCore 1.3.0
- **Developer:** SPOO
- **Discord:** https://discord.gg/hh4YygkeNQ

## 📞 Support

If you encounter any issues or need help:

1. **Discord:** https://discord.gg/hh4YygkeNQ
2. **Developer:** SPOO
3. **Host:** BH Cloud

## 📄 License

This website is designed for BrotherHood RolePlay Server.
All rights reserved to developer SPOO.

---

**Website Created by:** SPOO  
**Creation Date:** 2025  
**Version:** 1.1.0 (Bilingual)

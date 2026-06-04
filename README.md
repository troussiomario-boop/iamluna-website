# Luna Marketing Site

Static marketing site for the Luna mobile app, deployed at [iamluna.app](https://iamluna.app).

Luna is a trilingual women's health companion covering cycle tracking, fertility, pregnancy, and an AI companion. This repository holds the public marketing and legal site only, not the app itself.

## Owner

OTR MEDIA LLC
30 N Gould St Ste N, Sheridan, WY 82801-6317, USA

## Stack

Plain HTML and CSS with a small amount of vanilla JavaScript (mobile menu toggle only). No build step, no bundler, no npm packages, no frameworks. Fonts are loaded from Google Fonts (Fraunces, Hanken Grotesk, Tajawal).

## Languages

- English (default) at the site root
- French at `/fr/`
- Arabic at `/ar/` (right-to-left)

Each language has a landing page, privacy policy, terms of service, and contact page. A footer language switcher links between equivalent pages.

## Structure

```
iamluna-website/
├── index.html, privacy.html, terms.html, contact.html   (English)
├── fr/   (French)
├── ar/   (Arabic, RTL)
├── assets/
│   ├── css/styles.css        shared stylesheet
│   ├── css/styles-rtl.css    Arabic RTL overrides
│   └── images/               placeholder folder
├── netlify.toml              security headers, publish dir
├── _redirects                language-based routing
└── README.md
```

## Deploy

**Drag and drop:** drag the `iamluna-website` folder into the Netlify dashboard.

**GitHub auto-deploy:** connect the repository in Netlify. Leave the build command empty and set the publish directory to `.`. Netlify redeploys on every push.

## License

All rights reserved. Copyright OTR MEDIA LLC.

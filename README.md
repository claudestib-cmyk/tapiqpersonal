# Tapiq — Single-Person Digital NFC Landing Page

A mobile-first React, TypeScript, and Vite digital business card. **The home URL `/` opens the person's profile immediately.** There is no directory or intermediate screen.

## Start locally

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite.

## Edit the owner details

Edit the **first profile** in `src/profiles.ts` (currently fictional sample details for Alex Rivera). Change the name, role, company, bio, approved phone/email, website and social links. The home page `/` displays this profile. Remove details you don't want to publish. Replace sample contact info before launch.

To add a profile photo, place `photo.jpg` in `public/` and set `avatarUrl: '/photo.jpg'`. For a cover photo, use `coverUrl: '/cover.jpg'` after adding that file.

The exact uploaded Tapiq logo is in `public/tapiq-logo.png`, with its original logo artwork extracted from the white reference image. Do not redraw it.

## Deploy on Vercel

1. Push project to GitHub.
2. Import it into Vercel using the Vite preset.
3. Build command: `npm run build`, output directory: `dist`.
4. After deploying, visit the deployed **root URL**, for example `https://example.vercel.app/`. It should show the personal profile immediately.
5. Program the NFC card using NFC Tools → Write → URL and use this exact root URL. Print the same URL in your backup QR code.

The contact save button downloads a `.vcf`; social media icons open supplied real URLs. The page does not create accounts or require a database. Profiles are published publicly.

## About customization

The `src/profiles.ts` structure can be reused for future customers by replacing the first profile and deploying another copy. For now, each deployed site shows **one single person's profile**.

## New social-media and Google Business buttons

The default profile now includes **Facebook, TikTok, Instagram, Google Business, and WhatsApp** tiles. They show **Not set** until you paste a real URL into `src/profiles.ts`. Blank URLs **never** open made-up profiles. Optional LinkedIn and YouTube buttons can be added in the same `socials` object.

Paste the customer's public social profile URL for Facebook/TikTok/Instagram. For Google Business use the business's **Google Maps share link** (or direct review URL if the button is specifically for reviews). For WhatsApp use `https://wa.me/` followed by the number with country code but no plus sign, spaces or dashes, e.g. `https://wa.me/639XXXXXXXXX`.

The existing **Call, Email, Website and Save to Contacts** buttons are also supported. Only publish contact information that the customer approves.

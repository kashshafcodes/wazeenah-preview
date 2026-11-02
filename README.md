# Seller Storefront

A one-page shop for Facebook sellers. Customers browse products, fill a bag, and send
the finished order to the seller on WhatsApp (or copy it into Messenger). No backend,
no database, no monthly cost. Hosting on Vercel is free.

## Run it

```bash
npm install
npm run dev        # opens on http://localhost:5173
```

## Set up a new client (about 1 hour)

Everything about the shop lives in **`src/store.js`**. You never need to touch the other files.

1. Copy this folder and rename it, e.g. `client-rupkotha-fashion`.
2. In `src/store.js`, change:
   - `name`, `nameLatin`, `tagline`, `about`
   - `whatsapp` (country code, digits only: `8801712345678`), `messengerUsername`, `facebookUrl`
   - `delivery` fees, `payment` methods, `address`, `hours`
   - `categories` and `products`
3. Product photos: save the seller's Facebook photos into `public/` (e.g. `public/saree-1.jpg`)
   and set `image: "saree-1.jpg"` (no leading slash, so it works on GitHub Pages too). Products with no `image` show a stitched fabric swatch,
   which is fine for a first demo.
4. Change the `<meta name="description">` in `index.html` to describe the shop. This is what Google shows.
5. Change `lang` to `"en"` if the shop posts in English. All buttons and labels switch.

## Put it online

1. Push the folder to a new GitHub repo.
2. On vercel.com: **Add New → Project**, pick the repo, click **Deploy**. Vercel detects Vite automatically.
3. You get a link like `rupkotha-fashion.vercel.app`. Send that as the free demo.
4. When the client pays, connect their own domain in Vercel → Project → Settings → Domains.

## Check before every launch

- Tap "WhatsApp-এ অর্ডার পাঠান" on your own phone and confirm the message reaches the seller's number.
- Open the site on a cheap Android phone on mobile data. Most customers will see it that way.
- Keep photos under ~300 KB each (compress at squoosh.app), or the site will load slowly.

## Your credit

`builtBy` and `builtByUrl` in `store.js` put "ওয়েবসাইট তৈরি করেছেন Kazi Marzuk" in the footer of
every client site. Point `builtByUrl` at your own WhatsApp so other sellers can find you.
Remove the two lines if a client asks.

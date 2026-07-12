# Desck & Co

A premium, headless Shopify storefront built with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and the Shopify Storefront API.

## Start locally

1. Install Node.js 20.9+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and add your Shopify credentials.
4. Run `npm run dev` and open `http://localhost:3000`.

Without credentials, the site uses polished demo products so its UI can be reviewed immediately.

## Shopify setup

In Shopify Admin, create a custom app and grant Storefront API access for products, collections, carts, inventory, search, and customer accounts. Create a public Storefront access token, then enter the shop domain (without `https://`) and token in `.env.local`.

The storefront reads products and collections directly from Shopify on each request. Product pages are generated from product handles; collection pages use Shopify collection handles. Shopify remains the system of record for catalog, inventory, pricing, promotions, customers, payments, and orders.

## Checkout and customer accounts

The API route at `/api/cart` exposes Shopify Cart creation and returns Shopify's `checkoutUrl`. For production, connect the cart drawer's checkout control to that route using its line items, then redirect the customer to `checkoutUrl`. Shopify Checkout delivers Shop Pay, Apple Pay, Google Pay, PayPal, cards, discounts, tax, and shipping based on store configuration.

The account page links to Shopify's hosted customer login. To use the new Customer Account API, enable it in **Settings → Customer accounts** and add your deployed domain to its authorized redirect URLs.

## Deploy to Vercel

Import this repository in Vercel, add the same three environment variables, and deploy. Use the production domain in Shopify customer-account redirect settings. Product catalog changes appear without code changes because every request reads from the Storefront API.

## Project structure

- `app/` routes, API endpoint, metadata, and page UI
- `components/` reusable navigation, cart, motion, and product UI
- `lib/` Shopify Storefront client, formatters, and demo fallback
- `types/` strict Commerce data types

## Production notes

Before launch, replace the fallback image URLs with Shopify media, configure a custom domain, test checkout in Shopify's test mode, configure consent/analytics, and set your preferred revalidation/cache policy for catalog traffic.

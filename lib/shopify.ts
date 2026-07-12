import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import type { Cart, Product } from '@/types/shopify';
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const client = domain && token ? createStorefrontApiClient({ storeDomain: domain, apiVersion: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2025-01', publicAccessToken: token }) : null;
const productFields = `id handle title description tags featuredImage { url altText width height } images(first: 12) { nodes { url altText width height } } priceRange { minVariantPrice { amount currencyCode } } variants(first: 50) { nodes { id title availableForSale price { amount currencyCode } selectedOptions { name value } } }`;
const normalizeProduct = (p: any): Product => ({ ...p, images:p.images.nodes, variants:p.variants.nodes });
export async function shopifyFetch<T>(query:string, variables?:Record<string,unknown>): Promise<T | null> { if (!client) return null; const { data, errors } = await client.request(query, { variables }); if (errors) { console.error(errors); return null; } return data as T; }
export async function getProducts(first=8):Promise<Product[]> { const d = await shopifyFetch<any>(`query($first:Int!){ products(first:$first, sortKey:CREATED_AT, reverse:true){nodes{${productFields}}}}`,{first}); return d?.products.nodes.map(normalizeProduct) ?? []; }
export async function getProduct(handle:string):Promise<Product|null> { const d = await shopifyFetch<any>(`query($handle:String!){ product(handle:$handle){${productFields}}}`,{handle}); return d?.product ? normalizeProduct(d.product) : null; }
export async function getCollection(handle:string):Promise<{title:string;products:Product[]}|null> { const d = await shopifyFetch<any>(`query($handle:String!){ collection(handle:$handle){title products(first:24){nodes{${productFields}}}}}`,{handle}); return d?.collection ? { title:d.collection.title, products:d.collection.products.nodes.map(normalizeProduct) } : null; }
export const money = (amount:string, currency='USD') => new Intl.NumberFormat('en-US',{style:'currency',currency,maximumFractionDigits:0}).format(Number(amount));

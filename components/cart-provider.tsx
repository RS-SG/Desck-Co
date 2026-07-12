'use client';
import { createContext, useContext, useState } from 'react';
import type { Product } from '@/types/shopify';
type CartItem={product:Product;variant:Product['variants'][number];quantity:number};
const CartContext=createContext<{items:CartItem[];open:boolean;setOpen:(v:boolean)=>void;add:(p:Product,v:CartItem['variant'])=>void;count:number}>({items:[],open:false,setOpen:()=>{},add:()=>{},count:0});
export function CartProvider({children}:{children:React.ReactNode}){const[items,setItems]=useState<CartItem[]>([]);const[open,setOpen]=useState(false);const add=(product:Product,variant:CartItem['variant'])=>{setItems(i=>{const found=i.find(x=>x.variant.id===variant.id);return found?i.map(x=>x.variant.id===variant.id?{...x,quantity:x.quantity+1}:x):[...i,{product,variant,quantity:1}]});setOpen(true)};return <CartContext.Provider value={{items,open,setOpen,add,count:items.reduce((n,x)=>n+x.quantity,0)}}>{children}</CartContext.Provider>}; export const useCart=()=>useContext(CartContext);

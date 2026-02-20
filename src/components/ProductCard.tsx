import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const [imgSrc, setImgSrc] = React.useState(product.image_url || product.image);
  const placeholderImage = "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800";

  React.useEffect(() => {
    setImgSrc(product.image_url || product.image);
  }, [product.image_url, product.image]);

  return (
    <div
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-brand-beige relative">
        <img
          src={imgSrc}
          alt={product.title}
          onError={() => setImgSrc(placeholderImage)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.2em] text-brand-accent/60 font-semibold">
          {product.category}
        </p>
        <h3 className="font-serif text-xl group-hover:text-brand-accent transition-colors">
          {product.title}
        </h3>
        <p className="font-sans font-light text-brand-accent/80">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </div>
  );
}

import React from 'react';
import PriceDisplay from './PriceDisplay';
import Button from './Button';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        currency: string;
        image_url?: string;
    };
    onAction: (id: string) => void;
}

export default function ProductCard({ product, onAction }: ProductCardProps) {
    return (
        <div className="group flex flex-col bg-white border border-neutral-100 p-4 transition-all duration-300 hover:shadow-md">
            <div className="aspect-square w-full bg-neutral-50 mb-4 flex items-center justify-center overflow-hidden border border-neutral-100">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-light">Fizac Global Asset</span>
                )}
            </div>

            <div className="flex flex-col flex-grow mb-6">
                <h3 className="text-sm font-normal uppercase tracking-wider text-neutral-900 mb-1">{product.name}</h3>
                <p className="text-xs text-neutral-400 font-light line-clamp-2 mb-3 leading-relaxed">{product.description}</p>
                <PriceDisplay amount={product.price} currency={product.currency} />
            </div>

            <Button onClick={() => onAction(product.id)}>
                Acquire Entry
            </Button>
        </div>
    );
}


import React from 'react';

interface PriceDisplayProps {
    amount: number;
    currency: string;
}

export default function PriceDisplay({ amount, currency }: PriceDisplayProps) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    });

    return (
        <span className="text-sm font-medium text-neutral-800 tracking-wide">
            {formatter.format(amount)}
        </span>
    );
}


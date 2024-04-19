// components/Breadcrumb.tsx
import Link from 'next/link';

interface BreadcrumbProps {
  links: {
    href: string;
    label: string;
  }[];
}

import React from 'react';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
    return (
        <div className="w-full text-white flex justify-center p-4 animate-slide-fade-in">
            {links.map((link, index) => (
                <React.Fragment key={link.href}>
                    <Link href={link.href}>
                        <button>{link.label}</button>
                    </Link>
                    {index < links.length - 1 && ' / '}
                </React.Fragment>
            ))}
        </div>
    );
};
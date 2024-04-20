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
        <div className="w-full text-white flex justify-center p-4 animate-slide-fade-in font-mono">
            {links.map((link, index) => (
                <React.Fragment key={link.href}>
                    <Link href={link.href}>
                        <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded opacity-50 hover:opacity-100">
                            {link.label}
                        </button>
                    </Link>
                    {index < links.length - 1 && <span className="mx-2 bg-gray-500 text-white font-bold py-2 px-4 rounded opacity-50">/</span>}
                </React.Fragment>
            ))}
        </div>
    );
};
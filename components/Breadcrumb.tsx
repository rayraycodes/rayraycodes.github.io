// components/Breadcrumb.tsx
import Link from 'next/link';
import React from 'react';

interface BreadcrumbProps {
  links: {
    href: string;
    label: string;
  }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ links }) => {
    return (
        <div className="w-full text-white flex justify-center p-2 text-xs sm:text-sm md:text-base font-mono animate-slide-fade-in">
            {links.map((link, index) => (
                <React.Fragment key={link.href}>
                    <div className="flex items-center">
                        <Link href={link.href}>
                            <p className="hover:text-blue-500 transition-all duration-100">
                                {link.label}
                            </p>
                        </Link>
                        {index < links.length - 1 && <span className="mx-1 sm:mx-2">/</span>}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};
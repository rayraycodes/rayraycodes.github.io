// components/Socials.tsx
import React from 'react';
import Image from 'next/image';

interface SocialsProps {
  socials: {
    url: string;
    icon: string;
  }[];
  className?: string;
}

export const Socials: React.FC<SocialsProps> = ({ socials, className }) => {
  return (
    <div className={`flex justify-center space-x-4 mb-8 mt-8 animate-slide-fade-in ${className}`}>
      {socials.map((social, index) => (
        <a href={social.url} key={index} target="_blank" rel="noopener noreferrer">
          <div className="w-10 h-10 bg-nepal-blue rounded-full flex items-center justify-center">
            <Image src={social.icon} alt="" width={24} height={24} className="w-6 h-6" />
          </div>
        </a>
      ))}
    </div>
  );
};
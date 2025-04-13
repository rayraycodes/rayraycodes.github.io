import React from 'react';
import ThumbnailProject from '../components/ThumbnailProject';// Correct import path
import { Breadcrumb } from '../components/Breadcrumb';
const Portfolio = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-5 pt-20 text-white"
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    
      <Breadcrumb links={[
        { href: '/', label: 'Regan' },
        { href: '/portfolio', label: 'portfolio' },
      ]} />
      <h1 className="text-4xl font-bold text-center py-6">My Portfolio</h1>
      <ThumbnailProject />
    </div>
  );
};

export default Portfolio;
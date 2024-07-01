"use client"; // Ensure this component runs on the client side

import { useEffect, useState } from 'react';
import Link from 'next/link';
import RootLayout from '@/app/layout';
import { Breadcrumb } from '../components/Breadcrumb';
import StoryList from '../lib/StoryList'; 

const Stories = () => {

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

      <div className=" p-6 rounded-lg shadow-lg w-4/5 mx-auto animate-slide-fade-in " style={{ width: '80%', height: '80%' }}>

        <Breadcrumb links={[
          { href: '/ ', label: 'Regan' },
          { href: '/stories', label: 'Stories' },
        ]} />
        <div className="flex flex-wrap justify-center">
          <StoryList  /> 
        </div>
      </div>
    </div>
  );
};

export default Stories;
// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center text-center p-4 pt-20" 
         style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Head>
        <title>Know Regan</title>
      </Head>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-500 animate-slide-fade-in">
        <span className="text-nepal-blue">Namaste</span>, I am Regan from <span className="text-nepal-red">Nepal.</span>
      </h1>
      <p className="text-xl md:text-2xl text-white mb-4 font-bold transition-all duration-500 animate-slide-fade-in">What encapsulates me?</p>
      <div className="text-white">
        <Link href="/education">
          <button className="py-2 px-4 bg-nepal-blue text-white rounded mx-2 md:mx-4 transition-all duration-500 ease-in-out hover:text-black-500 cursor-pointer animate-slide-fade-in animate-shake">Education?</button>
        </Link>
        <Link href="/hobbies">
          <button className="py-2 px-4 bg-nepal-blue text-white rounded mx-2 md:mx-4 transition-all duration-500 ease-in-out hover:text-black-500 cursor-pointer animate-slide-fade-in animate-shake">Hobbies?</button>
        </Link>
        <Link href="/stories">
          <button className="py-2 px-4 bg-nepal-blue text-white rounded mx-2 md:mx-4 transition-all duration-500 ease-in-out hover:text-black-500 cursor-pointer animate-slide-fade-in animate-shake">Stories?</button>
        </Link>
        <Link href="/experiences">
          <button className="py-2 px-4 bg-nepal-blue text-white rounded mx-2 md:mx-4 transition-all duration-500 ease-in-out hover:text-black-500 cursor-pointer animate-slide-fade-in animate-shake">Experiences?</button>
        </Link>
      </div>
      <Link href="/iwonder">
          <p className="py-2 px-4 bg-nepal-blue text-white rounded text-white italic mt-4 transition-all duration-500 ease-in-out hover:text-black-500 cursor-pointer animate-slide-fade-in">I thinka about...</p>
      </Link>
    </div>
  );
}
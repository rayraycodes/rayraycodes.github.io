// pages/index.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center text-center p-4 pt-20" 
         style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-500 animate-slide-fade-in">
        <span style={{color: 'blue'}}>Namaste,</span> I am Regan from <span style={{color: 'red'}}>Nepal.</span>
      </h1>
      <p className="text-xl md:text-2xl text-white mb-4 font-bold transition-all duration-500 animate-slide-fade-in">What encapsulates me?</p>
      <div className="text-white">
        <Link href="/education">
          <button className="mx-2 md:mx-4 transition-all duration-500 ease-in-out hover:text-blue-500 cursor-pointer animate-slide-fade-in animate-shake">Education?</button>
        </Link>
        <Link href="/hobbies">
          <button className="mx-2 md:mx-4 transition-all duration-500 ease-in-out hover:text-blue-500 cursor-pointer animate-slide-fade-in animate-shake">Hobbies?</button>
        </Link>
        <Link href="/stories">
          <button className="mx-2 md:mx-4 transition-all duration-500 ease-in-out hover:text-blue-500 cursor-pointer animate-slide-fade-in animate-shake">Stories?</button>
        </Link>
        <Link href="/experiences">
          <button className="mx-2 md:mx-4 transition-all duration-500 ease-in-out hover:text-blue-500 cursor-pointer animate-slide-fade-in animate-shake">Experiences?</button>
        </Link>
      </div>
      <Link href="/iwonder">
          <p className="text-white italic mt-4 transition-all duration-500 ease-in-out hover:text-blue-500 cursor-pointer animate-slide-fade-in">I wonder...</p>
      </Link>
    </div>
  );
}
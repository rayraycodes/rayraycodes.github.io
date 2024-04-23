import Head from 'next/head';
import Link from 'next/link';
import { Tags } from '../components/Tags';
import { Breadcrumb } from '../components/Breadcrumb';
import { Socials } from '../components/Socials';


export default function Home() {

  const buttons = [
    { name: 'Resume', emoji: '🎓', path: '/resume' },
    { name: 'Hobbies', emoji: '🎮', path: '/hobbies' },
    { name: 'Stories', emoji: '📖', path: '/stories' },
    { name: 'Experiences', emoji: '💼', path: '/experiences' },
  ];

  const socials = [
    { url: 'https://www.instagram.com/rayheyheygun', icon: '/images/socials/instagram.png' },
    { url: 'https://www.linkedin.com/in/reganmaharjan', icon: '/images/socials/linkedin.png' },
    // Add more socials here
  ];

  const pages = [
    { path: '/education', label: 'Education' },
    { path: '/hobbies', label: 'Hobbies' },
    { path: '/stories', label: 'Stories' },
    { path: '/experiences', label: 'Experiences' },
    { path: '/hobbies/photography', label: 'Photography' },
    { path: '/hobbies/running', label: 'Running' },
    { path: '/hobbies/youtubing', label: 'Youtubing' },
    { path: '/hobbies/travel', label: 'Travel' },
    { path: '/hobbies/learning', label: 'Learning' },
    { path: '/hobbies/reading', label: 'Reading' },
    { path: '/hobbies/podcasts', label: 'Podcasts' },
    { path: '/hobbies/writing', label: 'Writing' },
    // Add more pages here
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

      <Breadcrumb links={[
        { href: '/ ', label: '/ Regan' }
      ]} />


      <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-all duration-100 animate-slide-fade-in">
        <span className="text-light-blue-500">Namaste</span>, I am Regan from <span className="text-nepal-red">Kathmandu, Nepal.</span>
      </h1>
      <p className="text-xl md:text-2xl text-white mb-4 font-bold transition-all duration-100 animate-slide-fade-in">What encapsulates me?</p>
      <div className="grid grid-cols-2 gap-2 items-center justify-items-center animate-slide-fade-in">
        {buttons.map((button, index) => (
          <Link href={button.path} key={index}>
            <button className="mt-4 inline-block bg-nepal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 h-16 flex items-center justify-center">
              <span className="text-2xl">{button.emoji}</span> {button.name}
            </button>
          </Link>
        ))}
      </div>
      <Link href="/iwonder">
        <p className="py-2 px-4 bg-nepal-blue text-white hover:bg-blue-700 rounded text-white italic mt-4 transition-all duration-100 ease-in-out hover:text-black-500 cursor-pointer animate-slide-fade-in mb-8">💭 I think about...</p>
      </Link>
      <Tags pages={pages} />

      <Socials socials={socials} />
    </div>
  );
}
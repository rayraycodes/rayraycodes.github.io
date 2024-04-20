import Link from 'next/link';
import { Breadcrumb } from '../components/Breadcrumb';


export default function Hobbies() {
  const hobbies = [
    { name: 'Photography', emoji: '📷' },
    { name: 'Running', emoji: '🏃' },
    { name: 'Youtubing', emoji: '🎥' },
    { name: 'Travel', emoji: '✈️' },
    { name: 'Learning', emoji: '📚' },
    { name: 'Reading', emoji: '📖' },
    { name: 'Podcasts', emoji: '🎧' },
    { name: 'Writing', emoji: '✍️' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="p-6 shadow-lg w-2/5 mx-auto animate-slide-fade-in">
        <Breadcrumb links={[
          { href: '/ ', label: 'Regan' },
          { href: '/ hobbies', label: 'Hobbies' },
        ]} />
        <h1 className="text-2xl font-bold sm:text-4xl mb-4">Hobbies...</h1>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-items-center">
          {hobbies.map((hobby, index) => (
            <Link href={`/hobbies/${hobby.name.toLowerCase()}`} key={index}>
              <button className="mt-4 inline-block bg-nepal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 h-24 flex items-center justify-center">
                <span className="text-2xl">{hobby.emoji}</span> {hobby.name}
              </button>
            </Link>
          ))}
        </div>
        <a href="/" className="mt-8 inline-block bg-nepal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </a>
      </div>
    </div>
  )
}
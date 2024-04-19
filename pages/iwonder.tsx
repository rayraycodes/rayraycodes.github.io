// pages/education.tsx
import { Breadcrumb } from '../components/Breadcrumb';
import '../app/globals.css';

export default function Iwonder() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-white"
      style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className=" p-6 rounded-lg shadow-lg w-4/5 mx-auto animate-slide-fade-in">
        <Breadcrumb links={[
          { href: '/ ', label: 'Regan' },
          { href: '/iwonder', label: 'I think about...' },
        ]} />
        <h1 className="text-2xl font-bold sm:text-4xl mb-4">I think about...</h1>
        <p className="text-lg sm:text-xl mb-4">Namaste!

          I am a creative computer scientist with a knack for innovative solutions and teamwork. </p>

        <a href="/" className="mt-4 inline-block bg-nepal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </a>
      </div>
    </div>
  )
}
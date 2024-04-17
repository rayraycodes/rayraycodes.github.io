// pages/education.tsx
import '../app/globals.css';

export default function Education() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-whie" 
         style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className=" p-6 rounded-lg shadow-lg w-4/5 mx-auto animate-slide-fade-in">
        <h1 className="text-2xl font-bold sm:text-4xl mb-4">Education...</h1>
        <p className="text-lg sm:text-xl mb-4">Namaste!

I am a creative computer scientist with a knack for innovative solutions and teamwork. </p>
        
        <a href="/" className="mt-4 inline-block bg-nepal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </a>
      </div>
    </div>
  )
}
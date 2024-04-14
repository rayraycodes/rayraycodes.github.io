// pages/education.tsx
import '../app/globals.css';

export default function Hobbies() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
         style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 mx-auto">
        <h1 className="text-2xl font-bold sm:text-4xl mb-4">Hobbies...</h1>
        <p className="text-lg sm:text-xl mb-4">Namaste!

I am a creative computer scientist with a knack for innovative solutions and teamwork. 

I am learning more about software engineering, data management, analytics, and systems software at the University of Michigan. Meanwhile, I am also experimenting more on diverse web technologies and LLMs creating education technologies at Open Learning Exchange. 

Previously, I drove a larger impact project as a Team Lead at Open Learning Exchange (OLE) Nepal, leading a game design team and co-creating EPaath (250+ interactive learning modules aligned with Nepali Curriculum deployed in schools in Nepal - https://epaath.olenepla.org) deployed across 500+ schools in Nepal and beyond. I am working with Open Learning Exchange International, making EPaath more inclusive and scalable while helping in Planet (https://planet.learning.ole.org/). 

I look forward to contributing my passion and diverse skills while creating meaningful solutions and learning from equally driven team.

At the heart of my technological journey, I found inspiration in Nepal's landscapes, leading initiatives that showcased the transformative potential of technology in education. This profound experience fueled my belief in technology's power to make significant societal impacts, guiding me to collaborate with the MIT Game Lab. There, I immersed myself in exploring how gaming could revolutionize learning, pushing the boundaries of education in math and science.

My calling demanded me to the University of Michigan. Here, I am embracing diverse cultures and experiences, all while maintaining a student's mindset—open, curious, and learning every day. As a student, I'm on a continuous quest to explore the depths of self and the world around me, always inspired by the endless possibilities of technology and driven by the desire to make a difference.

In sharing my story, I extend a "Namaste" to you—the spirit in me bows to the spirit in you. 

Thank you for taking the time to join me on this journey.</p>
        
        <a href="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </a>
      </div>
    </div>
  )
}
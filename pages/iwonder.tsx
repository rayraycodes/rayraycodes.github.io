import { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import Link from 'next/link';

export default function Iwonder() {
  const id = 'thinkingabout'; // replace with the id of the post you want to open
  const topics = [
    { title: 'How I connect with the world?', content: 'Content for How I connect with the world?' },
    { title: 'Education', content: 'Content for Education' },
    { title: 'Education Technology', content: 'Content for Education Technology' },
    { title: 'Nepal', content: 'Content for Nepal' },
    { title: 'Developing World', content: 'Content for Developing World' },
    { title: 'Psychology', content: 'Content for Psychology' },
    { title: 'Fitness', content: 'Content for Fitness' },
    { title: 'Sleep', content: 'Content for Sleep' },
    { title: 'Relationships', content: 'Content for Relationships' },
    { title: 'Politics in Nepal', content: 'Content for Politics in Nepal' }
  ];

  const [activeTopic, setActiveTopic] = useState(topics[0]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-white"
      style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className=" p-6 rounded-lg shadow-lg w-full md:w-4/5 mx-auto animate-slide-fade-in">
        <Breadcrumb links={[
          { href: '/ ', label: 'Regan' },
          { href: `/post/${id}`, label: 'I think about...' },
        ]} />
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/4 h-screen p-5 bg-gray-300 rounded">
            <h1 className="text-lg font-bold mb-4 text-black">Topics</h1>
            <ul>
              {topics.map((topic, index) => (
                <li key={index} className={`mb-2 ${activeTopic.title === topic.title ? 'bg-gray-400' : ''}`}>
                  <a href="#" className="block py-2 text-black no-underline hover:text-blue-500" onClick={() => setActiveTopic(topic)}>{topic.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-3/4 h-screen p-5 bg-gray-200">
            <h2 className="text-xl font-bold mb-5 text-black">{activeTopic.title}</h2>
            <p className="text-xl mb-5 text-black">{activeTopic.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
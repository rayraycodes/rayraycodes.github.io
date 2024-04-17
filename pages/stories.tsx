import fs from 'fs';
import path from 'path';
import { getSortedPostsData } from '../lib/posts';
import '../app/globals.css';
import { FC } from 'react';
import { PostMetaData, StoriesProps } from '../types';  
import Link from 'next/link';
import RootLayout from '@/app/layout';

const Stories: FC<StoriesProps> = ({ allPostsData }) => {
  return (
   
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black "
         style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

    
      <div className=" p-6 rounded-lg shadow-lg w-4/5 mx-auto animate-slide-fade-in" style={{ width: '80%', height: '80%' }}>
        <h1 className="text-2xl font-bold sm:text-4xl mb-4 text-white">Stories...</h1>
        <div className="flex flex-wrap justify-center"> 
          {allPostsData.map(({ id, date, title, content }) => {
            // Convert the date string back to a Date object
            const dateObject = date ? new Date(date) : new Date();
            // Format the date
            const formattedDate = dateObject.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });

            return (
              <div key={id} className="postCard bg-white p-4 rounded-lg shadow-lg mb-6 mx-2 my-4 relative overflow-hidden flex-shrink-0 flex flex-col justify-center items-center" style={{ minWidth: '300px', maxWidth: '500px' }}>
                <Link href={`/post/${id}`}>
                    <h4 className="text-xl font-bold mb-2">{title}</h4>
                    <p className="text-sm mb-4">{formattedDate}</p>
                </Link>
              </div>
            );

          })}
        </div>  
        <a href="/" className="mt-4 inline-block bg-nepal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </a>
      </div>
    </div>

  );
}


export default Stories;


import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData: PostMetaData[] = getSortedPostsData();

  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.md'));

  const allPostsContent: string[] = fileNames.map(fileName => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent;
  });

  return {
    props: {
      allPostsData,
      allPostsContent
    }
  };
};

import fs from 'fs';
import path from 'path';
import { getSortedPostsData } from '../lib/posts';
import { FC } from 'react';
import { PostMetaData, StoriesProps } from '../types';
import Link from 'next/link';
import { Breadcrumb } from '../components/Breadcrumb';
import StoryList from '../lib/StoryList'; 

const Experiences: FC<StoriesProps> = ({ allPostsData }) => {
  return (

    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

      <div className=" p-6 rounded-lg shadow-lg w-4/5 mx-auto animate-slide-fade-in" style={{ width: '80%', height: '80%' }}>
        <Breadcrumb links={[
          { href: '/ ', label: 'Regan' },
          { href: '/stories', label: 'Experiences' },
        ]} />
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
              <StoryList  storyType="experiences"/> 

            );
          })}
        </div>
    
      </div>
    </div>

  );
}


export default Experiences;


import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData: PostMetaData[] = getSortedPostsData('experiences');

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

import fs from 'fs';
import path from 'path';
import { getSortedPostsData } from '../lib/posts';
import '../app/globals.css';
import ReactMarkdown from 'react-markdown';
import { useState, FC } from 'react';
import { PostMetaData, StoriesProps } from '../types';  // Update the import path as needed

const Stories: FC<StoriesProps> = ({ allPostsData, allPostsContent }) => {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const toggleReadMore = (id: string) => {
    setExpandedPostId(expandedPostId === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black"
         style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 mx-auto">
        <h1 className="text-2xl font-bold sm:text-4xl mb-4">Stories...</h1>
        {allPostsData.map(({ id, date, title }, index) => {
          const isExpanded = id === expandedPostId;
          const content = isExpanded ? allPostsContent[index] : allPostsContent[index].split(/(?<=[.!?])\s/).slice(0, 2).join(' ');

          return (
            <div key={id} className="postCard bg-white p-8 rounded-lg shadow-lg mb-6 mx-2 my-4">
              <h2 className="text-xl font-bold mb-2">{title}</h2>
              <p className="text-sm mb-4">{date}</p>
              <ReactMarkdown className="prose">{content}</ReactMarkdown>
              <button onClick={() => toggleReadMore(id)} className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>      
            </div>
          );
        })}
        <a href="/" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </a>
      </div>
    </div>
  )
};

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

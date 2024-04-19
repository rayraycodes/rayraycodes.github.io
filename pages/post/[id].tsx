// [id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { PostProps } from '../../types';  // Update the import path as needed
import ReactMarkdown from 'react-markdown';
import { getPostData, getAllPostIds } from '../../lib/posts';  // Update the import path as needed
import '../../app/globals.css';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';


const Post: FC<PostProps> = ({ id, title, content }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Breadcrumb links={[
            { href: '/ ', label: 'Regan' },
            { href: '/stories', label: 'Stories' },
            { href: `/post/${id}`, label: title },
          ]} />
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 mx-auto animate-slide-fade-in" style={{ width: '80%', height: '80%', fontFamily: 'Montserrat, sans-serif' }}>
        <h1 className="text-2xl font-bold sm:text-4xl mb-4">{title}</h1>
        <div className="p-4 text-left rounded bg-white">
          <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}>
            {content}
          </ReactMarkdown>
        </div>
        <Link href="/stories">
          <p className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Stories
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  console.log('Paths:', paths);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const postData = await getPostData(id);
  return {
    props: {
      id,
      title: postData.title,
      content: postData.content,
    },
  };
};
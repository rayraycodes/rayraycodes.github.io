// [id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { PostProps } from '../../types';  // Update the import path as needed
import ReactMarkdown from 'react-markdown';
import { getPostData, getAllPostIds } from '../../lib/posts';  // Update the import path as needed
import '../../app/globals.css';
import 'github-markdown-css';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const Post: FC<PostProps> = ({ title, content }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black"
         style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 mx-auto" style={{ width: '80%', height: '80%' }}>
        <h1 className="text-2xl font-bold sm:text-4xl mb-4">{title}</h1>
        <div className="markdown-body p-4 text-left rounded">
        <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]} children={content} />
        </div>
        <a href="/stories" className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to Stories
        </a>
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
  const { id } = context.params;
  const postData = await getPostData(id as string);
  console.log('Post data:', postData);
  
  if (!postData || !postData.content) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      content: postData.content,
    },
  };
};
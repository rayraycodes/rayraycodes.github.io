// [id].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import PostContent from '../../components/PostContent';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { getPostData, getAllPostIds } from '../../lib/posts'; 
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';

interface PostProps {
  id: string;
  title: string;
  content: string;
  backTo: string;
}

const Post: FC<PostProps> = ({ id, title, content, backTo }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Breadcrumb links={[
            { href: '/ ', label: 'Regan' },
            { href: '/stories', label: 'Stories' },
            { href: `/post/${id}`, label: title },
          ]} />
      
      <PostContent title={title} content={content} />

      <Link href={backTo}>
          <p className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to {backTo.replace('/', '')}
          </p>
        </Link>

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
      backTo: postData.backTo,
    },
  };
};
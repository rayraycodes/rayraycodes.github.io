
import { GetStaticPaths, GetStaticProps } from 'next';
import PostContent from '../../components/PostContent';
import { FC } from 'react';
import { getPostData, getAllPostIds } from '../../lib/posts'; 
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';
import { getAllStories, getStoryById } from '../../lib/stories';

const Story: FC<{ story: { id: string, title: string, content: string, backTo: string } }> = ({ story }) => {
  const { id, title, content, backTo } = story;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Breadcrumb links={[
          { href: '/ ', label: 'Regan' },
          { href: '/stories', label: 'Stories' },
          { href: `/post/${id}`, label: title },
        ]} />
      
      <PostContent title={title} content={typeof content === 'object' ? JSON.stringify(content) : content} />

      <Link href={backTo}>
        <p className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back to {backTo.replace('/', '')}
        </p>
      </Link>
    </div>
  );
};

export default Story;

export const getStaticPaths = async () => {
  const stories = await getAllStories();
  const paths = stories.map((story) => ({
    params: { id: story.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.id;
  const story = await getStoryById(id);

  return { props: { story } };
};

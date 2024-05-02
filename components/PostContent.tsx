// components/PostContent.tsx
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface PostContentProps {
  title: string;
  content: string;
}

const PostContent: FC<PostContentProps> = ({ title, content }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-4/5 mx-auto animate-slide-fade-in" style={{ maxWidth: '90%', fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-2xl font-bold sm:text-4xl mb-4">{title}</h1>
      <div className="p-4 text-left rounded bg-white">
        <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostContent;
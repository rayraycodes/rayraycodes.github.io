// components/PostContent.tsx
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface PostContentProps {
  title: string;
  content: string;
}

interface DetailType {
  phase: string;
  description: string;
}

const PostContent: FC<PostContentProps> = ({ title, content }) => {
  const parsedContent = typeof content === 'string' ? JSON.parse(content) : content;

  return (
    <article className="prose lg:prose-xl mx-auto p-6 bg-white rounded-lg shadow-lg w-full sm:w-4/5 animate-slide-fade-in" style={{ maxWidth: '90%', fontFamily: 'Montserrat, sans-serif' }}>
      <h1 className="text-2xl font-bold sm:text-4xl mb-4">{title}</h1>
      <div className="p-4 text-left rounded bg-white">
        {parsedContent.details.map((detail: DetailType, index: number) => (
          <div key={index} className="detail-section">
            <h2 className="text-lg font-semibold">{detail.phase}</h2>
            <br></br>
            <p className="text-base">{detail.description}</p>
            <br></br>
            <br></br>
          </div>
        ))}
      </div>
    </article>
  );
};

export default PostContent;
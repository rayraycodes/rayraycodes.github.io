import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface PostContentProps {
  title: string;
  content: string;
}

interface LinkType {
  text: string;
  url: string;
}

interface ImageType {
  src: string;
  alt: string;
  caption: string;
}

interface DetailType {
  phase: string;
  description: string;
  image?: ImageType;
  links?: LinkType[];
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
            {detail.image && (
              <div>
                <br></br>
                <img src={detail.image.src} alt={detail.image.alt} className="rounded"/>
                <br></br>
                <p>Caption: {detail.image.caption}</p>
              </div>
            )}
            {detail.links && detail.links.map((link: LinkType, linkIndex: number) => (
              <a
                key={linkIndex}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 underline my-2 block"
              >
                {link.text}
              </a>
            ))}
            <br></br>
            <br></br>
          </div>
        ))}
      </div>
    </article>
  );
};

export default PostContent;
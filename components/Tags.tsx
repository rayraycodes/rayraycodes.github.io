// components/Tags.tsx
import Link from 'next/link';

interface TagsProps {
  pages: {
    path: string;
    label: string;
  }[];
}

export const Tags: React.FC<TagsProps> = ({ pages }) => {
  return (
    <div className="flex flex-wrap animate-slide-fade-in">
      {pages.map((page) => (
        <Link href={page.path} key={page.path}>
          <button className="m-1 px-2 py-1 bg-gray-500 text-white rounded-full">{page.label}</button>
        </Link>
      ))}
    </div>
  );
};
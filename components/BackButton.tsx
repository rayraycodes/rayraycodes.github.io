
import Link from 'next/link';

interface BackButtonProps {
  href: string;
}

const BackButton: React.FC<BackButtonProps> = ({ href }) => {
  return (
    <Link href={href}>
      <button className="mt-4 inline-block bg-nepal-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded animate-slide-fade-in">
        Back
      </button>
    </Link>
  );
};

export default BackButton;
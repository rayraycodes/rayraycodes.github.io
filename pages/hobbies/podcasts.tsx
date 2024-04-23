// pages/learning.tsx
import Table from '../../components/Table';
import BackButton from '../../components/BackButton';
import {Breadcrumb} from '../../components/Breadcrumb';

const items = [
  { name: 'Podcasts I listen', link: 'https://reganmaharjan.notion.site/Notes-From-Podcasts-Books-and-Learnings-in-general-275dd802ce12442b849d13cfd986e3c8' },
  // Add more items here...
];

export default function Podcasts() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black animate-slide-fade-in" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        
        <Breadcrumb links={[
            { href: '/ ', label: 'Regan' },
            { href: '/hobbies', label: 'Hobbies' },
            { href: `/podcasts`, label: 'Podcasts' },
          ]} />

        <div className="w-full sm:w-2/3 md:w-3/4 lg:w-3/4 xl:w-2/3 rounded overflow-x-auto">
        <Table items={items} />
        </div>

        <BackButton href="/hobbies" />

    </div>
  );
}
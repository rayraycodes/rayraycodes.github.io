// pages/learning.tsx
import Table from '../../components/Table';
import BackButton from '../../components/BackButton';
import {Breadcrumb} from '../../components/Breadcrumb';

const items = [
  { name: 'Learning Notes From Notion', link: 'https://reganmaharjan.notion.site/Notes-From-Podcasts-Books-and-Learnings-in-general-275dd802ce12442b849d13cfd986e3c8' },
  // Add more items here...
];

export default function YourPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        
        <Breadcrumb links={[
            { href: '/ ', label: 'Regan' },
            { href: '/hobbies', label: 'Hobbies' },
            { href: `/running`, label: 'Running' },
          ]} />

        <div className="w-1/2 rounded">
          <Table items={items} />
        </div>

        <BackButton href="/hobbies" />

    </div>
  );
}
// pages/learning.tsx
import Table from '../../components/Table';
import BackButton from '../../components/BackButton';
import {Breadcrumb} from '../../components/Breadcrumb';

const items = [
  { name: 'Books I am reading/ planning to read', link: 'https://reganmaharjan.notion.site/0215f2b1cc4b4506b1e808f7284e672a?v=e4f72e4098d74338b810738878a1ede7&pvs=4' },
  // Add more items here...
];

export default function Reading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        
        <Breadcrumb links={[
            { href: '/ ', label: 'Regan' },
            { href: '/hobbies', label: 'Hobbies' },
            { href: `/reading`, label: 'Reading' },
          ]} />

        <div className="w-full sm:w-2/3 md:w-3/4 lg:w-3/4 xl:w-2/3 rounded overflow-x-auto animate-slide-fade-in">
          <Table items={items} />
        </div>

        <BackButton href="/hobbies" />

    </div>
  );
}
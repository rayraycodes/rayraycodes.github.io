import Table from '../../components/Table';
import BackButton from '../../components/BackButton';
import {Breadcrumb} from '../../components/Breadcrumb';

const items = [
  { name: 'Poems that I wrote', link: 'https://reganmaharjan.notion.site/Poems-8a5fdbd93bb24dc6975dee89d7be68c4?pvs=4' },
  // Add more items here...
];

export default function Writing() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        
        <Breadcrumb links={[
            { href: '/ ', label: 'Regan' },
            { href: '/hobbies', label: 'Hobbies' },
            { href: `/writing`, label: 'Writing' },
          ]} />

        <div className="w-full sm:w-2/3 md:w-3/4 lg:w-3/4 xl:w-2/3 rounded overflow-x-auto animate-slide-fade-in">
          <Table items={items} />
        </div>

        <BackButton href="/hobbies" />

    </div>
  );
}
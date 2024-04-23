import BackButton from '../../components/BackButton';
import { Breadcrumb } from '../../components/Breadcrumb';
import Video from '../../components/Video'; // Import the 'Video' component using default import syntax

export default function Travel({ postData }: { postData: any }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Breadcrumb links={[
        { href: '/ ', label: 'Regan' },
        { href: '/hobbies', label: 'Hobbies' },
        { href: `/travel`, label: 'Travel' },
      ]} />
      <div className='grid grid-cols-2 gap-4 justify-items-center gap-4 mt-4'>
        <Video src="https://www.youtube.com/embed/TGecJEf885g" />
        <Video src="https://www.youtube.com/embed/-nj5eWDcaWI?si=UlD-BY2F8hDy_KSL" />
      </div>
      <BackButton href="/hobbies" />

    </div>

  );
}

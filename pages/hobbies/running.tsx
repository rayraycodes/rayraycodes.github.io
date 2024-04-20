import BackButton from '../../components/BackButton';
import {Breadcrumb} from '../../components/Breadcrumb';
import Video from '../../components/Video'; // Import the 'Video' component using default import syntax

export default function Running({ postData }: { postData: any }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Breadcrumb links={[
            { href: '/ ', label: 'Regan' },
            { href: '/hobbies', label: 'Hobbies' },
            { href: `/learning`, label: 'Learning' },
          ]} />
      <div className='flex flex-wrap justify-center'>
        <Video src="https://www.youtube.com/embed/BnUoyjFkb5s" />
        <Video src="https://www.youtube.com/embed/diMzfsqoTiQ" />
        <Video src="https://www.youtube.com/embed/8G9Ys3vSnd0" />
      </div>
      <BackButton href="/hobbies" />
    </div>

  );
}
import BackButton from '../../components/BackButton';
import {Breadcrumb} from '../../components/Breadcrumb';
import Video from '../../components/Video'; // Import the 'Video' component using default import syntax
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Youtubing({ postData }: { postData: any }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Breadcrumb links={[
            { href: '/ ', label: 'Regan' },
            { href: '/hobbies', label: 'Hobbies' },
            { href: `/youtubing`, label: 'Youtubing' },
          ]} />

        <a href="https://www.youtube.com/channel/UCB0kA-mXDNjMEpBy7k8Gktg" target="_blank" rel="noopener noreferrer" className="mt-4 gap-4 inline-block bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded flex items-center animate-slide-fade-in">
        <FontAwesomeIcon icon={faYoutube} className="mr-2" />
        Visit my channel
        </a>
      <div className='grid grid-cols-3 gap-4 justify-items-center mt-4 animate-slide-fade-in'>
        <Video src="https://www.youtube.com/embed/BnUoyjFkb5s" />
        <Video src="https://www.youtube.com/embed/diMzfsqoTiQ" />
        <Video src="https://www.youtube.com/embed/8G9Ys3vSnd0" />
      </div>
      <BackButton href="/hobbies" />
    </div>
  );
}
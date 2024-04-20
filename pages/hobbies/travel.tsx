import BackButton from '../../components/BackButton';
import {Breadcrumb} from '../../components/Breadcrumb';

export default function Travel({ postData }: { postData: any }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-black" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Breadcrumb links={[
            { href: '/ ', label: 'Regan' },
            { href: '/hobbies', label: 'Hobbies' },
            { href: `/travel`, label: 'Travel' },
          ]} />
      <iframe width="560" height="315" src="https://www.youtube.com/embed/TGecJEf885g?si=XxGb6FDcess5EuxK" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <BackButton href="/hobbies" />
      
    </div>

  );
}

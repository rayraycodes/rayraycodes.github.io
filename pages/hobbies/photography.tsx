import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import '../../app/globals.css';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';
// import Gallery from 'react-photo-gallery';
export default function Hobbies({ imagePaths }: { imagePaths: string[] }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-white" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Breadcrumb links={[
          { href: '/ ', label: ' Regan' },
          { href: '/hobbies', label: ' Hobbies' },
          { href: '/phtography', label: ' Photography' },
        ]} />
      <Head>
        <title>Photography</title>
      </Head>
     
      <h1 className="text-4xl mb-4">Photography</h1>

      <div className="grid grid-cols-2 gap-4">
        {imagePaths.map((src, index) => (
          <img key={index} src={src} alt="" className="object-cover h-64 w-full" />
        ))}
      </div>

      <Link href="/">
        <button className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Back
        </button>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  const directory = path.join(process.cwd(), 'public', 'images', 'photography');
  let fileNames = fs.readdirSync(directory);
  
  // Filter out hidden files
  fileNames = fileNames.filter(fileName => !fileName.startsWith('.'));
  
  const imagePaths = fileNames.map(fileName => `/images/photography/${fileName}`);

  return {
    props: {
      imagePaths,
    },
  };
}
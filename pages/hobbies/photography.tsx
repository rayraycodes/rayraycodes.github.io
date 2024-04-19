import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import '../../app/globals.css';
import Link from 'next/link';
import { Breadcrumb } from '../../components/Breadcrumb';
import Gallery from 'react-photo-gallery';

export default function Hobbies({ imagePaths }: { imagePaths: string[] }) {
  // Convert image paths to the format expected by Gallery
  const images = imagePaths.map(src => ({
    src,
    width: 4,
    height: 3,
  }));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-white" 
    style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Head>
        <title>Photography</title>
      </Head>
      <Breadcrumb links={[
          { href: '/ ', label: ' Regan' },
          { href: '/hobbies', label: ' Hobbies' },
          { href: '/phtography', label: ' Photography' },
        ]} />
      <h1 className="text-4xl mb-4">Photography</h1>

      <Gallery photos={images} />

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
    console.log(directory); // Add this line
    const fileNames = fs.readdirSync(directory);
    const imagePaths = fileNames.map(fileName => `/images/photography/${fileName}`);
  
    return {
      props: {
        imagePaths,
      },
    };
}
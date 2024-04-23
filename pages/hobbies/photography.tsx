import React, { useState } from 'react';
import Modal from 'react-modal';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import BackButton from '../../components/BackButton';
import { Breadcrumb } from '../../components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('#__next')

export default function Hobbies({ imagePaths }: { imagePaths: string[] }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (src: string) => {
    setSelectedImage(src);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-white"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Breadcrumb links={[
        { href: '/ ', label: ' Regan' },
        { href: '/hobbies', label: ' Hobbies' },
        { href: '/photography', label: ' Photography' },
      ]} />
      <Head>
        <title>Photography</title>
      </Head>

      <div className="grid grid-cols-2 gap-4 animate-slide-fade-in">
        {imagePaths.map((src, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-2 bg-white cursor-pointer" onClick={() => openModal(src)}>
            <img className="w-full h-full" src={src} alt="" />
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="Modal w-full h-full"
        overlayClassName="Overlay"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          },
          content: {
            position: 'absolute',
            width: '80%',
            height: '80%',
            margin: 'auto',
            top:'5%',
            animation: 'slide-fade-in 0.5s ease-in-out',
          }
        }}
      >
        <button onClick={closeModal} className="absolute top-0 right-0 m-4">
          <FontAwesomeIcon icon={faTimes} /> {/* Add the FontAwesome cross icon */}
        </button>
        <img src={selectedImage} alt="" className="w-full h-full object-contain" />
      </Modal>

      <BackButton href="/hobbies" />

    </div>
  );
}

export async function getStaticProps() {
  const directory = path.join(process.cwd(), 'public', 'images', 'photography');
  let fileNames = fs.readdirSync(directory);

  // Filter out hidden files
  fileNames = fileNames.filter(fileName => !fileName.startsWith('.'));

  // Map file names to file paths
  const imagePaths = fileNames.map(fileName => path.join('/images', 'photography', fileName));

  return {
    props: {
      imagePaths,
    },
  };
}
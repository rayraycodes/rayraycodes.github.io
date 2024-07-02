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
    window.scrollTo(0, 0);
    // document.body.style.overflow = 'hidden';
    document.body.style.top = '0';
    document.body.style.left = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    const modalOpenElement = document.querySelector('.modal-open') as HTMLElement;
    if (modalOpenElement) {
      modalOpenElement.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    }
    document.body.style.pointerEvents = 'none';
    document.body.style.zIndex = '9999';
  };

  const closeModal = () => {
    setModalIsOpen(false);
    document.body.classList.remove('modal-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    document.body.style.height = '';
    document.body.style.backgroundColor = '';
    document.body.style.pointerEvents = '';
    document.body.style.zIndex = '';
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 pt-20 text-white modal-open"
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Breadcrumb links={[
        { href: '/ ', label: ' Regan' },
        { href: '/hobbies', label: ' Hobbies' },
        { href: '/photography', label: ' Photography' },
      ]} />
      <Head>
        <title>Photography</title>
      </Head>

      <div className="grid grid-cols-2 gap-4 animate-slide-fade-in grid grid-cols-3 gap-4">
        {imagePaths.map((src, index) => (
          <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-2 bg-white cursor-pointer transform hover:scale-105" onClick={() => openModal(src)}
            onContextMenu={(event) => event.preventDefault()}>
            <img className="w-full h-full object-cover" src={src} alt="" />
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="Modal w-full h-full rounded"
        overlayClassName="Overlay"
        style={{
          overlay: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            padding: '2rem',
            backgroundColor: 'rgba(0, 0, 0, 0.9)', // This line makes the overlay darker
            pointerEvents: 'none', // This line makes the overlay unclickable
          },
          content: {
            position: 'absolute',
            width: '80%',
            height: '80%',
            margin: 'auto',
            top: '5%',
            animation: 'slide-fade-in 0.5s ease-in-out',
            border: 'none',
          }
        }}
      >
        <div style={{ position: 'relative' }}>
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              margin: '1rem',
              background: 'transparent',
              border: 'none',
              pointerEvents: 'auto', // This line makes the button clickable
            }}
          >
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </button>
          <img src={selectedImage} alt="" className="w-full h-full object-contain" onContextMenu={(event) => event.preventDefault()} />
        </div>
      </Modal>

      <BackButton href="/hobbies" />

    </div>
  );
}

export async function getStaticProps() {
  const directory = path.join(process.cwd(), 'public', 'images', 'photography', 'instagram');
  let fileNames = fs.readdirSync(directory);

  // Filter out hidden files
  fileNames = fileNames.filter(fileName => !fileName.startsWith('.'));

  // Map file names to file paths
  const imagePaths = fileNames.map(fileName => path.join('/images/', 'photography', 'instagram', fileName));

  return {
    props: {
      imagePaths,
    },
  };
}
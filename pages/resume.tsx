// pages/resume.tsx
import { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { FaStar } from 'react-icons/fa';

export default function Resume() {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-4 text-whie"
      style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Breadcrumb links={[
        { href: '/ ', label: 'Regan' },
        { href: '/ Education', label: 'Education' },
      ]} />

      {/* resume starts */}
      <div className="max-w-7.5xl mx-auto bg-white p-8 shadow-lg animate-slide-fade-in">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Regan Maharjan</h1>
          <p className="text-md text-gray-600">Detroit, Michigan | 313-247-8794 | <a href="mailto:imregan@umich.edu" target="_blank" className="text-gray-500 hover:text-gray-700">imregan@umich.edu</a> | <a href="https://www.linkedin.com/in/reganmaharjan/" target="_blank" className="text-gray-500 hover:text-gray-700">linkedin.com/reganmaharjan</a> | <a href="https://github.com/reganmaharjan" target="_blank" className="text-gray-500 hover:text-gray-700">github.com/reganmaharjan</a></p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">SUMMARY</h2>
          <p className="mt-2 font-semibold text-gray-600">Namaste!

            I am a creative computer scientist with a knack for innovative solutions and teamwork. </p>
          <p className="text-gray-600 mt-3">I am learning more about software engineering, data management, analytics, and systems software at the University of Michigan. Meanwhile, I am also experimenting more on diverse web technologies and LLMs creating education technologies at Open Learning Exchange. </p>
          <p className="text-gray-600 mt-3">

            Previously, I drove a larger impact project as a Team Lead at Open Learning Exchange (OLE) Nepal, leading a game design team and co-creating EPaath (250+ interactive learning modules aligned with Nepali Curriculum deployed in schools in Nepal - https://epaath.olenepla.org) deployed across 500+ schools in Nepal and beyond. I am working with Open Learning Exchange International, making EPaath more inclusive and scalable. </p>
          <p className="text-gray-600 mt-3">I look forward to contributing my passion and diverse skills while creating meaningful solutions and learning from equally driven team.</p>
          <p className="text-gray-600 mt-3">
            At the heart of my technological journey, I found inspiration in Nepal&apos;s landscapes, leading initiatives that showcased the transformative potential of technology in education. This profound experience fueled my belief in technology&apos;s power to make significant societal impacts, guiding me to collaborate with the MIT Game Lab. There, I immersed myself in exploring how gaming could revolutionize learning, pushing the boundaries of education in math and science.</p>
          <p className="text-gray-600 mt-3">My calling demanded me to the University of Michigan. Here, I am embracing diverse cultures and experiences, all while maintaining a student&apos;s mindset—open, curious, and learning every day. As a student, I&apos;m on a continuous quest to explore the depths of self and the world around me, always inspired by the endless possibilities of technology and driven by the desire to make a difference.</p>
          <p className="text-gray-600 mt-3">
            In sharing my story, I extend a &quot;Namaste&quot; to you—the spirit in me bows to the spirit in you. <br />
            Thank you for taking the time to join me on this journey.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">EDUCATION</h2>
          <p className="mt-2 font-semibold text-gray-700">University of Michigan, Dearborn, MI</p>
          <p className="text-gray-600">Masters of Science in Computer Information Science; Dec 2024; GPA: 3.95</p>
          <p className="text-gray-600">Relevant Courses: Algorithms, Compiler Design, Advanced AI, Web Technologies, Human-Computer Interaction</p>
          <p className="text-gray-600">Skills: Python, Django, Data Analysis, Data Visualization, Javascript, RestAPI</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">EXPERIENCE</h2>
          <div className="mt-2">
            <h3 className="font-semibold text-gray-700">Open Learning Exchange (OLE), Boston, MA - Software Engineer</h3>
            <p className="text-gray-600 italic">Jan 2024 - Present</p>
            <ul className="list-disc list-inside list-none text-gray-600">
              <li style={{ marginBottom: '20px' }}>Developed and tested the open-source Learning Management System (LMS), Planet, utilizing a stack of JavaScript, HTML5, CSS3, Docker, AngularJS, and Git.</li>
              <li style={{ marginBottom: '20px' }}>Enhanced educational accessibility and equity in rural areas of Guatemala, Nepal, and beyond through strategic technology implementations.</li>
              <li style={{ marginBottom: '20px' }}>Implemented an automation pipeline using the Google Translate API to localize EPaath&apos;s 350 interactive modules into Spanish, significantly increasing accessibility for Spanish-speaking communities in remote locations.</li>
            </ul>

            <h3 className="font-semibold text-gray-700">University of Michigan Information Technology Service, Dearborn, MI - Technology Consultant</h3>
            <p className="text-gray-600 italic">Feb 2023 - Present</p>
            <ul className="list-disc list-inside list-none text-gray-600">
              <li style={{ marginBottom: '20px' }}>Troubleshooting and resolving issues related to multifunctional devices, networks, and software systems leveraging the ticketing system - Teamdynamix for tracking issues.</li>
            </ul>

            <h3 className="font-semibold text-gray-700">Open Learning Exchange(OLE), Kathmandu, Nepal - Senior Web Engineer</h3>
            <p className="text-gray-600 italic">March 2017 - Dec 2022</p>
            <ul className="list-disc list-inside list-none text-gray-600">
              <li style={{ marginBottom: '20px' }}>Enhanced project documentation and status reporting by leveraging Trello, optimizing for increased transparency and stakeholder engagement.</li>
              <li style={{ marginBottom: '20px' }}>Worked with a multidisciplinary team to evolve prototypes into engaging learning experiences, leveraging Figma.</li>
              <li style={{ marginBottom: '20px' }}>Ensured Raspberry Pi and mobile device compatibility, significantly enhancing educational access in low-resourced communities (5000+ devices) through tailored content distribution.</li>
            </ul>
          </div>
        </section>

        <div className="bg-white p-8">
          <h2 className="text-2xl font-bold pb-2 text-gray-600 border-b-2 border-gray-200">PROJECTS & CERTIFICATIONS</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">
                <a href="https://devpost.com/software/eye-nutrifit" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                  EyeNutrifit Hackathon Winning Team Project
                </a>
              </h3>
              <p className="mt-1 text-black italic">Oct 2023</p>
              <ul className="list-disc list-inside list-none text-gray-600">
                <li><FaStar className="inline-block mr-2" />Implemented a full-stack web app, integrating FDA REST APIs with an ML model using Flask, HTML, CSS, and Python for accurate food nutritional analysis in less than 24 hours.</li>
              </ul>
            </div>

            <div>
              <a href="https://epaath.olenepal.org/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                <h3 className="font-semibold text-lg ">EPaath Elearning Modules Developed at OLE Nepal</h3>
              </a>
              <p className="mt-1 text-black italic">Nov 2022 - Present</p>
              <ul className="list-disc list-inside list-none text-gray-600">
                <li><FaStar className="inline-block mr-2" />Led the development of interactive learning modules for 300,000+ users in Nepal, enhancing team efficiency by 50% with HTML, CSS, jQuery, HandlebarsJS, JSON, and XML while mentoring developers through code reviews.</li>
              </ul>
            </div>

            <div>
              <a href="https://pustakalaya.org/en/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                <h3 className="font-semibold text-lg">E-Pustakalaya Free and Open Digital Library at OLE Nepal</h3>
              </a>
              <p className="mt-1 text-black italic">Nov 2022 - March 2023</p>
              <ul className="list-disc list-inside list-none text-gray-600">
                <li><FaStar className="inline-block mr-2" />Established an ML team to develop an intelligent OCR system, enabling the creation of accessible content by transforming scanned documents into editable text.</li>
              </ul>
            </div>

            <div>
              <a href="https://katha.olenepal.org/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                <h3 className="font-semibold text-lg">Interactive Learning Stories at OLE Nepal</h3>
              </a>
              <p className="mt-1 text-black italic">Feb 2021 – May 2021</p>
              <ul className="list-disc list-inside list-none text-gray-600">
                <li><FaStar className="inline-block mr-2" />Architected a ReactJS framework to develop interactive stories, enhancing engagement through dynamic content.</li>
              </ul>
            </div>

            <div>
              <a href="https://olenepal.org/our-stories/philip-tans-class-on-game-design-during-summer-2020/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800">
                <h3 className="font-semibold text-lg">Prototyping and Designing Games/Interaction Design for Learning with MIT</h3>
              </a>
              <p className="mt-1 text-black italic">Feb 2021 – May 2021</p>
              <ul className="list-disc list-inside list-none text-gray-600">
                <li><FaStar className="inline-block mr-2" />Co-created interactive learning games, covering the full game design lifecycle with Professor Philip Tan.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* resume ends */}

      <a href="/pdfs/resume.pdf" download="Regan's Resume" className="mt-4 inline-block bg-nepal-blue hover:bg-blue-800 text-white font-bold py-2 px-4 rounded animate-slide-fade-in transform hover:scale-105">
        Download Regan&apos;s Resume
      </a>

      <a href="/" className="mt-4 inline-block bg-nepal-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded animate-slide-fade-in transform hover:scale-105">
        Back
      </a>

    </div>
  )
}
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
    <div className="min-h-screen flex flex-col justify-center items-center p-4 text-whie"
      style={{ backgroundImage: `url(/images/ray.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Breadcrumb links={[
        { href: '/ ', label: 'Regan' },
        { href: '/ Education', label: 'Education' },
      ]} />

      {/* resume starts */}
      <div className="container mx-auto p-4 bg-white">
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Regan Maharjan</h1>
        <p className="text-gray-600">+1 (313) 247-8794 | reganmaharjann@gmail.com | <a href="https://linkedin.com/in/reganmaharjan" className="text-blue-500">linkedin.com/in/reganmaharjan</a> | <a href="https://github.com/reganmaharjan" className="text-blue-500">github.com/reganmaharjan</a></p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">Summary</h2>
        <p className="text-gray-600 mt-3">Experienced Software Engineer with 7 years of expertise in designing and developing scalable, user-centric solutions in education technology, driving meaningful impact for millions of users.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">Skills & Abilities</h2>
        <p className="text-gray-600 mt-3"><strong>Programming Languages:</strong> JavaScript, TypeScript, Python, C#, C++, PHP, SQL, HTML, CSS</p>
        <p className="text-gray-600 mt-3"><strong>Technologies and Tools:</strong> React, Hanldebars, jQuery, AWS, Git, Docker, Node.js, Angular, MongoDB, PostgreSQL</p>
        <p className="text-gray-600 mt-3"><strong>Development Practices:</strong> Object-Oriented Programming, Scalable application architecture, RESTful APIs, Performance Optimization, Agile/Scrum, Human-centered design, Responsive Frameworks</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">Experience</h2>
        <div className="mt-2">
          <h3 className="font-semibold text-gray-700">Open Learning Exchange (OLE)</h3>
          <p className="text-gray-600 italic">Senior Software Engineer – Kathmandu, Nepal | Mar 2017 – Dec 2022</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Designed and implemented scalable interactive learning modules, enhancing accessibility for over 300,000 students and increasing user retention by 30%</li>
            <li>Led a team of six to develop fourteen Unity-based learning games for middle school math and science, improving engagement and comprehension in 500+ schools</li>
            <li>Developed an OCR solution, converting over 10,000 documents to improve access to educational materials</li>
            <li>Created and implemented accessible educational content aligned with Web Content Accessibility Guidelines (WCAG), ensuring usability for a wide range of learners, including individuals with disabilities</li>
            <li>Spearheaded the deployment of interactive learning modules to 500+ government schools, enabling offline access and improving digital education reach in underserved regions</li>
          </ul>

          <h3 className="font-semibold text-gray-700 mt-4">Software Engineer – Cambridge, MA | Jan 2024 – Apr 2024</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Built and tested the Planet LMS platform, supporting over 50,000 students, using Docker, AngularJS, and GitHub</li>
            <li>Automated translation for 200+ e-learning modules using Google Translate API, increasing platform reach</li>
            <li>Improved CI/CD processes with GitHub Actions, boosting deployment efficiency by 40%</li>
          </ul>

          <h3 className="font-semibold text-gray-700 mt-4">University of Michigan Information Technology Services</h3>
          <p className="text-gray-600 italic">Software Developer Intern – Ann Arbor, MI | May 2024 – Aug 2024</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Automated the migration of 160+ Google Docs into accessible, user-friendly TeamDynamix articles, improving usability and streamlining information dissemination</li>
            <li>Conducted requirements analysis and designed the CRM team’s website using Figma, enabling structured access to 150+ resources through user-centric design</li>
          </ul>

          <p className="text-gray-600 italic mt-4">Software Developer/ Business Analyst – Dearborn, MI | Oct 2024 - Present</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Developed 10+ Drupal web pages for the CRM Team, streamlining resources and projecting a 25% engagement boost</li>
            <li>Analyzed 7,000+ CRM TeamDynamix tickets, identifying patterns and optimizing service delivery processes</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">Projects</h2>
        <div className="mt-2">
          <h3 className="font-semibold text-gray-700">Learning Games with Massachusetts Institute of Technology (MIT)</h3>
          <p className="text-gray-600 italic">Technologies used: C#, Unity | Mar 2022</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Developed Unity-based scalable games, showcasing cutting-edge gamification techniques at MIT J-WEL</li>
          </ul>

          <h3 className="font-semibold text-gray-700 mt-4">EyeNutrifit: Hackathon Winning Team Project</h3>
          <p className="text-gray-600 italic">Technologies used: Flask, Python, Javascript, RESTful APIs | Oct 2023</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Built a full-stack nutrition analysis app in 24 hours, integrating FDA APIs and an ML model for real-time insights</li>
          </ul>

          <h3 className="font-semibold text-gray-700 mt-4">EPaath: Interactive E-learning Modules</h3>
          <p className="text-gray-600 italic">Technologies used: jQuery, Javascript, Handlebars, Git, JSON, XML | Dec 2022</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Led the development of e-learning modules for 300,000+ users, improving team productivity by 50% through mentorship and streamlined code reviews</li>
          </ul>

          <h3 className="font-semibold text-gray-700 mt-4">Interactive Learning Stories</h3>
          <p className="text-gray-600 italic">Technologies used: React, JS | Dec 2022</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Developed an interactive storytelling framework using ReactJS, enabling dynamic content delivery to boost user engagement</li>
          </ul>

          <h3 className="font-semibold text-gray-700 mt-4">E-Pustakalaya: Free and open digital library</h3>
          <p className="text-gray-600 italic">Technologies used: Python, Django | Mar 2022</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Implemented new UI/ UX designs using jQuery, Django, and ElasticSearch, and established a machine learning team to develop an intelligent OCR system, converting 1,000+ scanned documents into accessible, editable text</li>
            <li>Collaborated with cross-functional teams to implement efficient, scalable, and maintainable front-end solutions, ensuring seamless integration with back-end systems</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-gray-200 pb-2">Education</h2>
        <p className="mt-2 font-semibold text-gray-700">University of Michigan, Dearborn, MI</p>
        <p className="text-gray-600">Master of Science in Computer and Information Science - GPA: 3.94 | Jan 2023 - Dec 2024</p>
        <p className="text-gray-600">Related Coursework: Human-Computer Interaction, Algorithm Analysis & Design, Advanced AI, Data Analytics in Software Engineering, Privacy and Security in Cloud Computing</p>
      </section>
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
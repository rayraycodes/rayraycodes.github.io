import { useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from '../components/Breadcrumb';
const detailed_projects = [
  {
    title: "Organizational Website Design & Revamp – Showcasing the Mission Through Web Storytelling",
    description: "OLE Nepal is a nonprofit organization dedicated to expanding access to quality education through technology integration in classrooms across Nepal. The website serves as the organization’s digital front door, showcasing its mission, programs, and impact to a diverse audience including donors, educators, and policymakers.",
    my_role: "As Lead Developer, I maintained and customized the WordPress site, designing themes and implementing plugins to tell the organization’s story effectively. I advised and oversaw a full redesign and migration to Wagtail, a Python-based CMS. The revamp improved storytelling clarity and enabled easier content management for non-technical staff.",
    process: "Focused on clean design, accessibility, and intuitive structure to align with the nonprofit’s evolving goals.",
    rationale: "We wanted visitors to quickly grasp OLE Nepal’s mission and impact while making it easier for internal teams to share their ongoing work. So we focused the design on clarity, accessibility, and storytelling, creating a platform that not only invites exploration but also evolves with the organization and the communities it serves.",
    links: {
      landing_page: "https://olenepal.org/",
    },
    image: "/images/ole.png",
    samples: [],
  },
  {
    title: "E-Paath – Interactive Digital Curriculum",
    description: "E-Paath is a free, interactive digital learning platform aligned with Nepal’s national curriculum, featuring over 500 modules across grades 1 to 8. Available in Nepali, English, and Nepali Sign Language, it supports accessible learning on web and mobile devices, online and offline, through OLE Nepal’s digital library, E-Pustakalaya.",
    my_role: "As Lead Developer, I led cross-functional teams to design and build over 200 interactive learning modules, translating curriculum content into narrative-driven digital experiences using HTML, CSS, JavaScript, jQuery, and tools like Adobe XD and After Effects. I also ensured compatibility with low-cost devices like Raspberry Pi and managed technical documentation and platform maintenance.",
    process: "Translated textbooks into narrative-based digital lessons with animations and local storytelling.",
    rationale: "To meet learners where they are by combining curriculum goals with engaging, intuitive visuals.",
    links: {
      landing_page: "https://epaath.olenepal.org/index.html",
      info_page: "https://olenepal.org/digital-learning-solutions/e-paath/",
    },
    image: "/images/epaath.png",
    samples: [
      { title: "Grade 3 Math – Fractions", link: "https://epaath.olenepal.org/activity.html?id=matfrc01&lang=en&grade=3", image: "/images/fraction.png" },
      { title: "Grade 6 English – Narmada", link: "https://epaath.olenepal.org/activity.html?id=engnma01&lang=en&grade=6", image: "/images/namrada.png" },
    ],
  },
  {
    title: "E-Pustakalaya – Redesigning a National Digital Library",
    description: "Redeveloped Nepal’s leading digital library to improve UX and ensure access in low-connectivity areas.",
    my_role: "I led the front-end redevelopment of the platform using HTML, CSS, and Django, collaborating with UX designers, back-end engineers, and system admins to deliver a more intuitive, multilingual user experience. I also oversaw ongoing platform maintenance and performance.",
    process: "Applied full UX lifecycle: user research, wireframing, prototyping, multilingual support.",
    rationale: "To make the rich educational resources easier to navigate for diverse learners.",
    links: {
      landing_page: "https://pustakalaya.org/en/",
      lean_more_about_the_process: "https://olenepal.org/digital-learning-solutions/e-pustakalaya/",
    },
    image: "/images/pustakalya.png",
    samples: [],
  },
  {
    title: "CRM Services Webpage & Dashboard – UX and Data Storytelling",
    description: "Created a clear, approachable service webpage and data dashboard for campus stakeholders.",
    my_role: "As a UX Researcher, I analyzed support data, designed Figma prototypes, and built a Power BI dashboard to uncover patterns and shape a more intuitive experience. I worked with the Web Team to ensure the final Drupal-based implementation aligned with U-M’s branding and accessibility standards.",
    process: "Analyzed support data and designed a user-centric interface that explained CRM services simply.",
    rationale: "To turn scattered service data into a cohesive and discoverable experience.",
    links: {
      prototype: "https://www.figma.com/proto/PlWEtSrk32wrupCUK4puht/CRM?page-id=0%3A1&node-id=10-28&viewport=254%2C510%2C0.45&t=tDitSzEcPe6N2x8R-1&scaling=min-zoom&starting-point-node-id=1%3A171",
    },
    image: "/images/crm.png",
    samples: [],
  },
  {
    title: "An Interactive Self – Building My Digital Twin Portfolio",
    description: "This is an interactive, AI-powered portfolio designed to share my work, story, and design philosophy through an engaging digital experience, where visitors can explore content traditionally or chat with my digital twin trained on my writing.",
    my_role: "I designed and developed the site end-to-end using TypeScript, Supabase, and GitHub Pages, crafting both the interface and the conversational AI experience. The site is fully responsive and UX-driven, blending design, development, and narrative to reflect my creative and technical identity.",
    process: "Built a responsive, UX-focused site blending narrative, design, and interactivity.",
    rationale: "To make my portfolio dynamic and reflective of my personality and process.",
    links: {
      landing_page: "https://rayraycodes.github.io/",
    },
    image: "/images/personal.png",
    samples: [],
  },
  {
    title: "Game Design with MIT – Playable Narratives for STEM Learning",
    description: "These interactive Math and Science Games for grades 6–10 were created to make complex STEM concepts more accessible and engaging through gameplay. Developed by OLE Nepal in collaboration with MIT J-WEL, the games blend curriculum content with storytelling-driven mechanics to foster curiosity and critical thinking.",
    my_role: "I worked closely with MIT interns, educators, and designers to shape the game experience, from mechanics and visuals to narrative flow, ensuring each game told a clear educational story that students could connect with and learn from.",
    process: "Used narrative frameworks, iterative prototyping, and visual design to create engaging games.",
    rationale: "To help students connect emotionally with STEM topics through play.",
    links: {
      landing_page: "https://games.olenepal.org/",
      info_page: "https://olenepal.org/digital-learning-solutions/math-and-science-games/",
    },
    image: "/images/game1.png",
    samples: [
      { title: "Simple Machine", link: "https://games.olenepal.org/games/simplemachine/index.html", image: "/images/game2.png" },
      { title: "Space Explorer", link: "https://games.olenepal.org/games/spaceexplorer/index.html", image: "/images/game3.png" },
    ],
  },
  {
    title: "Hamro Ramailo Kathaharu(HRK) – Culturally Rooted Early Literacy Platform",
    description: "HRK is a collection of animated local stories and interactive language games designed to foster early literacy, creativity, and cultural connection in young learners. Available in Nepali and adaptable to other languages, the platform blends storytelling, illustration, and playful learning to make reading and writing engaging and accessible.",
    my_role: "As Technical Lead, I oversaw the selection and implementation of technologies that transformed indigenous stories into interactive digital experiences. I collaborated with educators, designers, and illustrators to create a responsive, intuitive platform, using diverse illustration styles to match the tone and origin of each story and ensure cultural resonance.",
    process: "Digitized and animated local tales with interactive elements in multiple languages.",
    rationale: "To foster cultural pride and foundational literacy through joyful, accessible learning.",
    links: {
      landing_page: "https://katha.olenepal.org/",
      info_page: "https://olenepal.org/digital-learning-solutions/hamro-ramailo-kathaharu/",
    },
    image: "/images/egr.png",
    samples: [
      { title: "Charlie Chamero", link: "https://katha.olenepal.org/story/charlie-chamero/start"},
      { title: "Meejan", link: "https://katha.olenepal.org/story/meezan/start" },
      { title: "Shabda Banauu", link: "https://katha.olenepal.org/play/match-the-word?level=easy" },
    ],
  },
];

const PortfolioProject = () => {
  const [activeProject, setActiveProject] = useState(detailed_projects[0]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center p-6 pt-24 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/images/ray.jpeg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Breadcrumb
        links={[
          { href: '/', label: 'Regan' },
          { href: '/portfolio', label: 'Portfolio' },
        ]}
      />
      <div className="w-full max-w-6xl bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <Link href="/" className="text-blue-400 hover:underline text-lg">
            &larr; Back
          </Link>
        </div>
        <h1 className="text-5xl font-bold mb-8">Portfolio Projects</h1>

        {/* Download PDF Link */}
        <div className="mb-8">
          <a
            href="/pdfs/regansample.pdf" // Replace with the actual path to your PDF file
            download
            className="text-blue-400 hover:underline text-lg"
          >
            Please download in PDF format
          </a>
        </div>

        <div className="tabs flex flex-wrap gap-4 mb-8 justify-center">
          {detailed_projects.map((project, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* <span className="text-sm text-gray-400 mb-1">{project.label}</span> */}
              <button
                className={`relative w-16 h-16 flex items-center justify-center text-lg font-bold rounded-md transition-all duration-300 transform ${
                  activeProject.title === project.title
                    ? 'bg-blue-500 text-white scale-110 shadow-lg'
                    : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white hover:scale-105'
                }`}
                onClick={() => setActiveProject(project)}
              >
                {String(index + 1).padStart(2, '0')}
                {activeProject.title === project.title && (
                  <span className="absolute inset-x-0 bottom-0 h-1 bg-white rounded-t"></span>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Rerender tab-content on tab click */}
        <div key={activeProject.title} className="tab-content text-left">
          <h2 className="text-4xl font-bold mb-6 animate-fly-in">{activeProject.title}</h2>
          <img
            src={activeProject.image} // Dynamically fetch project image
            alt={activeProject.title}
            className="w-full max-w-4xl h-auto object-contain rounded-lg mb-6 animate-slide-in-right"
          />
          <p className="text-xl text-gray-300 mb-8 animate-fly-in">{activeProject.description}</p>
          <h3 className="text-3xl font-semibold mb-4 animate-fly-in">My Role</h3>
          <p className="text-lg text-gray-300 mb-8 animate-fly-in">{activeProject.my_role}</p>
          <h3 className="text-3xl font-semibold mb-4 animate-fly-in">Process</h3>
          <p className="text-lg text-gray-300 mb-8 animate-fly-in">{activeProject.process}</p>
          <h3 className="text-3xl font-semibold mb-4 animate-fly-in">Rationale</h3>
          <p className="text-lg text-gray-300 mb-8 animate-fly-in">{activeProject.rationale}</p>
          {activeProject.links && (
            <div className="mb-8">
              <h3 className="text-3xl font-semibold mb-4 animate-fly-in">Links</h3>
              {Object.entries(activeProject.links).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-400 hover:underline text-lg animate-fly-in"
                >
                  {key.replace('_', ' ')}
                </a>
              ))}
            </div>
          )}
          {activeProject.samples.length > 0 && (
            <div>
              <h3 className="text-3xl font-semibold mb-4 animate-fly-in">Samples</h3>
              <ul className="list-disc list-inside text-lg text-gray-300">
                {activeProject.samples.map((sample, index) => (
                    <li key={index} className="animate-fly-in mb-4">
                    <a
                      href={sample.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {sample.title}
                    </a>
                    {'image' in sample && sample.image && (
                      <img
                      src={sample.image}
                      alt={sample.title}
                      className="w-full max-w-2xl h-auto object-contain rounded-lg mt-2 animate-slide-in-right"
                      />
                    )}
                    </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioProject;
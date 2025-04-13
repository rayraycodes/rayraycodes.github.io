import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Organizational Website Design & Revamp – Showcasing the Mission Through Web Storytelling',
    description: 'Redesigning OLE Nepal’s website, I led the transition from WordPress to Wagtail to create a more accessible, story-driven platform that clearly communicates the organization’s impact while empowering non-technical staff to manage content with ease.',
    tag: 'Web Development, Web Design, Leadership',
    image: '/images/ray.jpeg',
    link: '/projects/olenepalpage',
  },
  {
    id: 2,
    title: 'E-Paath – Interactive Digital Curriculum',
    description: 'Led the development of 200+ curriculum-aligned digital modules using storytelling and animation to make learning intuitive and engaging for students in rural Nepal.',
    tag: 'EdTech, Game-Based Learning, Front-End Development',
    image: '/images/ray.jpeg',
    link: '/projects/epaath',
  },
  {
    id: 3,
    title: 'E-Pustakalaya – Redesigning a National Digital Library',
    description: 'Revamped Nepal’s leading digital library to enhance multilingual access, performance, and content discoverability, especially in low-bandwidth environments.',
    tag: 'Web Design, UX, Front-End Development',
    image: '/images/ray.jpeg',
    link: '/projects/pustakalaya',
  },
  {
    id: 4,
    title: 'CRM Services Webpage & Dashboard – UX and Data Storytelling',
    description: 'Designed a service-focused webpage and data dashboard to make the CRM team’s role more understandable and accessible using research, prototyping, and Power BI.',
    tag: 'UX Research, Web Design, Data Visualization',
    image: '/images/ray.jpeg',
    link: '/projects/crmwebpage',
  },
  {
    id: 5,
    title: 'An Interactive Self – Building My Digital Twin Portfolio',
    description: 'Developed an AI-powered portfolio that lets visitors explore my projects and story by chatting with a digital twin trained on my writing and creative journey.',
    tag: 'Full Stack, AI, Personal Branding',
    image: '/images/ray.jpeg',
    link: '/projects/digitaltwin',
  },
  {
    id: 6,
    title: 'Game Design with MIT – Playable Narratives for STEM Learning',
    description: 'Collaborated with MIT to design interactive STEM games for grades 6–10, transforming complex concepts into playful, story-driven learning experiences.',
    tag: 'Game Design, STEM Education, Collaboration',
    image: '/images/ray.jpeg',
    link: '/projects/mitgames',
  },
  {
    id: 7,
    title: 'Hamro Ramailo Kathaharu – Culturally Rooted Early Literacy Platform',
    description: 'Led technical development of an interactive storybook platform promoting early literacy through local storytelling, illustration, and playful language games.',
    tag: 'Early Literacy, Storytelling, Platform Development',
    image: '/images/ray.jpeg',
    link: '/projects/hrk',
  },
];


const ThumbnailProject: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="w-full sm:w-1/2 lg:w-1/3 bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-2 left-2 flex flex-wrap gap-2">
              {project.tag.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="bg-transparent border border-white text-white text-xs px-3 py-1 rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <a
              href={project.link}
              className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Read More
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThumbnailProject;
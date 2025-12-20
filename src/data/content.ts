// Centralized content data for the portfolio website
// Edit this file directly to update content across all pages

/**
 * Modular schema helper for Challenge → Solution → Outcome narrative structure
 * Use this template when creating new projects with narrative-driven descriptions
 * 
 * @param challenge - The problem or challenge being addressed (maps to "problem" field)
 * @param solution - The technical solution and approach (maps to both "approach" and "solution" fields)
 * @param outcome - The result and impact achieved (maps to "result" field)
 * 
 * @example
 * const narrative = createProjectNarrative(
 *   "Accessibility is often treated as an afterthought",
 *   "Built an interactive learning platform that reframes accessibility as creative design",
 *   "Developers now understand the 'why' behind accessibility guidelines"
 * );
 */
export const createProjectNarrative = (
  challenge: string,
  solution: string,
  outcome: string
) => ({
  problem: challenge,
  approach: solution, // Maps to "Solution" in Challenge → Solution → Outcome
  solution: solution, // Technical implementation details (can be expanded separately)
  result: outcome,
});

/**
 * Type definition for project links (optional field)
 * Use null for projects without links
 */
export type ProjectLinks = {
  live?: string;
  github?: string;
  docs?: string;
  demo?: string;
  repo?: string;
} | null;

const contentData = {
  "navigation": {
    "siteName": "Regan Maharjan",
    "links": [
      {
        "path": "/",
        "label": "Home"
      },
      {
        "path": "/about",
        "label": "About"
      },
      {
        "path": "/experience",
        "label": "Experience"
      },
      {
        "path": "/projects",
        "label": "Projects"
      },
      {
        "path": "/impact",
        "label": "Stories of Impact"
      },
      {
        "path": "/accessibility",
        "label": "Accessibility"
      },
      {
        "path": "/contact",
        "label": "Contact"
      },
      {
        "path": "/photography",
        "label": "Photography"
      },
      {
        "path": "/storiesofadventure",
        "label": "Stories of Adventure"
      }
    ]
  },
  "home": {
    "hero": {
      "title": "Building accessible,\nintelligent systems",
      "subtitle": "Computer scientist and Application Systems Analyst Senior bridging technology, education, and human-centered design to advance accessibility, data equity, and academic innovation",
      "ctaPrimary": "View My Work",
      "ctaSecondary": "Get in Touch",
      "scrollIndicator": "Scroll to explore"
    },
    "highlights": {
      "title": "Impact across domains",
      "subtitle": "Eight years of building platforms, tools, and experiences that matter",
      "items": [
        {
          "title": "Accessibility",
          "description": "WCAG 2.1 AA compliance, alt text automation, inclusive design",
          "icon": "♿"
        },
        {
          "title": "Education Tech",
          "description": "Offline-first platforms, 700+ modules, rural school impact",
          "icon": "📚"
        },
        {
          "title": "AI and Autonomous Design",
          "description": "AI systems for auditing, fixing, and improving content and design",
          "icon": "🤖"
        },
        {
          "title": "Human Impact",
          "description": "Community leadership, global equity, and real world social impact",
          "icon": "🌍"
        }
      ]
    },
    "featured": {
      "title": "Creating inclusive digital experiences",
      "description": "Leading accessibility initiatives at University of Michigan, building AI-powered tools, and designing offline-first education platforms for digital equity.",
      "cta": "Explore Accessibility Work"
    }
  },
  "about": {
    "hero": {
      "title": "Meet Regan",
      "description": [
        "I'm a software engineer, data specialist, and accessibility-focused technologist with eight years of experience building platforms and tools for education, digital equity, AI systems, and large-scale web applications.",
        "I blend technical engineering, UX storytelling, and research-driven thinking to create solutions that improve access, performance, and user experience.",
        "Based in Michigan, I'm a curious engineer who also enjoys writing poems, singing, and running."
      ]
    },
    "strengths": {
      "title": "Core Strengths",
      "subtitle": "A unique blend of technical depth and human-centered design",
      "items": [
        {
          "title": "Full-Stack Engineering",
          "description": "Backend, frontend, and data systems across modern tech stacks"
        },
        {
          "title": "Digital Accessibility",
          "description": "WCAG 2.1 AA, inclusive design, automation workflows"
        },
        {
          "title": "AI-Powered Automation",
          "description": "Agents, LLMs, content intelligence, multilingual systems"
        },
        {
          "title": "Data Engineering",
          "description": "ETL pipelines, analytics, cloud infrastructure"
        },
        {
          "title": "UX Storytelling",
          "description": "Content strategy, user-centered design thinking"
        },
        {
          "title": "Systems Integration",
          "description": "Performance optimization, offline-first architecture"
        }
      ]
    },
    "timeline": {
      "title": "Journey",
      "subtitle": "Building solutions that matter, one project at a time",
      "items": [
        {
          "year": "Sep 2025-Present",
          "title": "Application Systems Analyst Senior",
          "org": "University of Michigan",
          "description": "Leading accessibility for LSA (1600+ web systems), ensuring WCAG 2.1 AA compliance, building AI-powered tools"
        },
        {
          "year": "Feb 2025-Present",
          "title": "Business Fellow",
          "org": "Perplexity",
          "description": "Application-based fellowship for aspiring AI professionals driving innovation"
        },
        {
          "year": "Feb 2023-September 2025",
          "title": "Technology Data Analyst",
          "org": "University of Michigan",
          "description": "Analyzing CRM data, building dashboards with Python and Power BI, developing web solutions"
        },
        {
          "year": "Mar 2017-April 2024",
          "title": "Sr. Software Engineer / Advisor",
          "org": "OLE Nepal/ OLE International",
          "description": "Built learning systems reaching 300,000+ students, offline-first platforms, educational games with MIT"
        }
      ]
    },
    "values": {
      "title": "Values & Philosophy",
      "subtitle": "Principles that guide my work and approach",
      "items": [
        {
          "title": "Digital Equity",
          "description": "Technology should be accessible to everyone, regardless of ability or location"
        },
        {
          "title": "Intentional Design",
          "description": "Every decision matters. Build with clarity, purpose, and empathy"
        },
        {
          "title": "Continuous Learning",
          "description": "Curiosity drives innovation. Stay open, explore, and grow"
        },
        {
          "title": "Collaborative Impact",
          "description": "Great work happens when diverse minds come together"
        }
      ]
    },
    "interests": {
      "title": "Beyond the Code",
      "subtitle": "When I'm not engineering solutions, you'll find me exploring creative and intellectual pursuits.",
      "items": [
        "Poetry",
        "Singing",
        "Running",
        "Photography",
        "Videography",
        "Fitness",
        "Creative Writing",
        "Reading",
        "Playing Ukelele",
        "Cycling",
        "Hiking"
      ]
    }
  },
  "experience": {
    "hero": {
      "title": "Experience",
      "subtitle": "Eight years of building platforms, tools, and experiences across accessibility, education, AI, and data engineering"
    },
    "experiences": [
      {
        "company": "University of Michigan",
        "role": "Application Systems Analyst Senior",
        "period": "September 2025 - Present",
        "location": "College of Literature, Science, and the Arts",
        "description": "Leading accessibility for LSA, the largest school (1600+ web systems) at the University of Michigan, supporting teaching, research, and public-facing digital experiences.",
        "highlights": [
          "Ensure conformance with WCAG 2.1 AA, ADA, Section 508, and related federal and state compliance requirements",
          "Conduct accessibility audits with manual and assistive technology testing",
          "Integrate accessibility into the software development lifecycle through design reviews and code reviews",
          "Develop and maintain standards, reusable components, and checklists for consistent, compliant patterns",
          "Deliver training and office hours on semantic HTML, ARIA, keyboard navigation, and color contrast",
          "Provide clear remediation guidance to engineering, design, and content teams",
          "Building an accessibility-first culture and establishing institutional standards",
          "Prioritize issues and establish release gates for digital accessibility compliance"
        ],
        "skills": [
          "WCAG 2.1 AA",
          "ADA Compliance",
          "Section 508",
          "ARIA",
          "Semantic HTML",
          "Assistive Technology",
          "Siteimprove",
          "TeamDynamix"
        ],
        "theme": "blue"
      },
      {
        "company": "Open Learning Exchange Nepal",
        "role": "Sr. Software Engineer / Advisor",
        "period": "March 2017 - April 2024",
        "location": "OLE Nepal/ International",
        "description": "Built data-driven learning systems that reached over 300,000 students in remote areas, crafting pipelines, syncing offline data, and turning real-world impact into code.",
        "highlights": [
          "Led development of EPaath reaching 300,000+ users, improving team productivity by 50%",
          "Developed Unity-based learning games with MIT, presenting at MIT J-WEL Week 2019",
          "Built E-Pustakalaya digital library with jQuery, Django, and ElasticSearch",
          "Automated translation for 200+ e-learning modules for Guatemala using Google Translate API",
          "Built multilingual OCR pipeline using Python and Tesseract for accessible content",
          "Led development of Sanketik Sikai, a national digital platform for Nepalese Sign Language",
          "Developed E-Paath mobile apps (offline-first and Play Store versions) reaching 100,000+ students during COVID-19",
          "Led Robotics and Programming initiative empowering 300+ students across 10+ schools"
        ],
        "skills": [
          "React",
          "Django",
          "Python",
          "Unity",
          "jQuery",
          "ElasticSearch",
          "Google Translate API",
          "Cordova",
          "Android",
          "Tesseract OCR"
        ],
        "theme": "green"
      },
      {
        "company": "University of Michigan",
        "role": "Technology Data Analyst",
        "period": "February 2023 - September 2025",
        "location": "LSA Technology Services",
        "description": "Analyzing CRM data, building dashboards, and developing web solutions to improve service delivery and stakeholder reporting.",
        "highlights": [
          "Analyzed 7,000+ TeamDynamix tickets using Python (pandas, matplotlib) to uncover service trends",
          "Designed interactive dashboards with Python and Power BI to visualize ticket trends and resolution SLAs",
          "Automated migration of 160+ Google Docs into accessible TeamDynamix articles",
          "Conducted requirements analysis and designed CRM team website using Figma",
          "Led development of 10+ Drupal web pages for the CRM Team",
          "Primary point of contact for triaging technical issues through Team Dynamix ticketing system",
          "Analyzed support trends to identify recurring issues and inform proactive improvements"
        ],
        "skills": [
          "Python",
          "pandas",
          "matplotlib",
          "Power BI",
          "Figma",
          "Drupal",
          "TeamDynamix",
          "Data Analysis"
        ],
        "theme": "purple"
      },
      {
        "company": "Perplexity",
        "role": "Business Fellow",
        "period": "February 2025 - Present",
        "location": "Remote",
        "description": "Application-based fellowship for aspiring AI professionals looking to grow their careers, lead in the field, and drive AI innovation.",
        "highlights": [
          "Leading AI innovation initiatives within organizations",
          "Growing career skills in artificial intelligence and machine learning",
          "Driving AI adoption and best practices",
          "Collaborating with AI professionals and industry leaders"
        ],
        "skills": [
          "AI/ML",
          "Leadership",
          "Innovation",
          "Strategic Planning"
        ],
        "theme": "indigo"
      }
    ],
    "impact": {
      "title": "Impact by the Numbers",
      "stats": [
        {
          "value": "8+",
          "label": "Years Experience"
        },
        {
          "value": "700+",
          "label": "Modules Converted"
        },
        {
          "value": "WCAG 2.1",
          "label": "AA Compliance"
        },
        {
          "value": "4",
          "label": "Major Institutions"
        }
      ]
    },
    "labels": {
      "keyContributions": "Key Contributions",
      "technologiesSkills": "Technologies & Skills"
    }
  },
  "projects": {
    "hero": {
      "title": "Selected Projects",
      "subtitle": "16 projects across education technology, accessibility, AI, and data engineering that reached 300,000+ students and transformed digital experiences"
    },
    "projects": [
      {
        "title": "EPaath: Interactive E-learning Modules",
        "category": "Education Technology",
        "description": "Led development of e-learning modules reaching 300,000+ users in remote Nepal, improving team productivity by 50% through mentorship and streamlined code reviews",
        "problem": "Students in remote Nepal lacked access to quality educational content and interactive learning experiences.",
        "approach": "Designed and implemented modular, responsive, and reactive system-wide core features using jQuery, JavaScript, HTML, CSS, JSON, XML, and Handlebars.js.",
        "solution": "Created standardized curriculum metadata using JSON/XML schemas, enabling seamless integration with dashboards, search systems, and adaptive learning pathways.",
        "result": "Reached 300,000+ users with improved content discoverability and team productivity increased by 50%.",
        "metrics": [
          "300,000+ users",
          "50% productivity improvement",
          "Modular architecture"
        ],
        "tags": [
          "jQuery",
          "JavaScript",
          "HTML",
          "CSS",
          "JSON",
          "XML",
          "Handlebars.js"
        ],
        "impact": "Transformed education access for rural students"
      },
      {
        "title": "E-Paath Phone and Tablet Deployment",
        "category": "Education Technology",
        "description": "Mobile transformation of E-Paath into two Android versions during COVID-19, enabling continuity of learning",
        "problem": "COVID-19 school closures left students without access to learning resources. Internet connectivity was limited in rural areas.",
        "approach": "Built an offline-first native app preloaded with 6GB+ of interactive content, and a lightweight wrapper version using Gradle, JavaScript, and Cordova for the Play Store.",
        "solution": "Two distinct Android versions: offline-first for preloaded devices and Play Store version for internet-enabled devices.",
        "result": "Extended educational access to over 100,000 students across Nepal during the pandemic crisis.",
        "metrics": [
          "100,000+ students",
          "6GB+ content",
          "Dual deployment strategy"
        ],
        "tags": [
          "Android",
          "Gradle",
          "JavaScript",
          "Cordova",
          "Offline-First"
        ],
        "impact": "Enabled learning continuity during COVID-19"
      },
      {
        "title": "Learning Games with MIT",
        "category": "Education Technology",
        "description": "Developed Unity-based scalable games with MIT, showcasing cutting-edge gamification techniques for STEM learning",
        "problem": "Middle school students in underserved classrooms needed engaging tools to promote critical thinking and conceptual mastery.",
        "approach": "Collaborated with MIT J-WEL and MIT faculty to develop game-based learning solutions using Unity, focusing on interactive STEM education.",
        "solution": "Created scalable educational games that integrated seamlessly into classroom environments and fostered student engagement.",
        "result": "Presented as speaker at MIT J-WEL Week 2019, pitching to educators from 33 countries.",
        "metrics": [
          "Unity-based",
          "33 countries reached",
          "STEM focused"
        ],
        "tags": [
          "Unity",
          "Game Development",
          "Educational Design",
          "MIT Partnership"
        ],
        "impact": "Global recognition for innovative learning tools"
      },
      {
        "title": "E-Pustakalaya: Digital Library",
        "category": "Education Technology",
        "description": "Free and open digital library providing offline/online access to educational content across Nepal",
        "problem": "Limited access to books and educational resources in rural areas, especially for low-connectivity regions.",
        "approach": "Implemented new UI/UX designs using jQuery, Django, and ElasticSearch to create a modern, searchable digital library.",
        "solution": "Collaborated with cross-functional teams to implement efficient, scalable, and maintainable front-end solutions with seamless back-end integration.",
        "result": "Created accessible library system serving thousands of students and supporting the Ministry of Education mission.",
        "metrics": [
          "Thousands of users",
          "Offline/online capable",
          "Open access"
        ],
        "tags": [
          "jQuery",
          "Django",
          "ElasticSearch",
          "UI/UX"
        ],
        "impact": "Democratized access to educational content"
      },
      {
        "title": "Sanketik Sikai",
        "category": "Accessibility",
        "description": "National-level digital platform teaching Nepalese Sign Language to hearing-impaired children aged 5-15",
        "problem": "Hearing-impaired children in Nepal lacked accessible, self-paced learning tools for Nepalese Sign Language.",
        "approach": "Led development with core accessibility features including gamified modules, level-wise progression, and video-based NSL dictionary.",
        "solution": "Created inclusive, self-paced learning platform aligned with Nepal's primary education outcomes.",
        "result": "Provided accessible language learning tool fostering independence for hearing-impaired students.",
        "metrics": [
          "Ages 5-15",
          "Video-based NSL dictionary",
          "Gamified learning"
        ],
        "tags": [
          "Accessibility",
          "Educational Design",
          "Sign Language",
          "Gamification"
        ],
        "impact": "Empowered hearing-impaired children"
      },
      {
        "title": "EPaath for Guatemala",
        "category": "Education Technology",
        "description": "Automated translation of 200+ e-learning modules using Google Translate API to expand platform reach",
        "problem": "Educational content was only available in Nepali/English, limiting reach to Spanish-speaking regions.",
        "approach": "Automated translation pipeline using Google Translate API and improved CI/CD processes with GitHub Actions.",
        "solution": "Seamless translation workflow enabling rapid localization of educational content for new markets.",
        "result": "Successfully expanded EPaath to Guatemala, serving as key liaison between Nepal and US teams.",
        "metrics": [
          "200+ modules translated",
          "Guatemala expansion",
          "Automated pipeline"
        ],
        "tags": [
          "Google Translate API",
          "GitHub Actions",
          "CI/CD",
          "Localization"
        ],
        "impact": "International expansion of learning platform"
      },
      {
        "title": "Nepali Intelligent OCR",
        "category": "Accessibility",
        "description": "Multilingual OCR pipeline using Python and Tesseract for converting scanned Nepali/English documents into accessible formats",
        "problem": "Historical and educational texts in Nepali were inaccessible to visually impaired users and difficult to digitize.",
        "approach": "Built OCR pipeline with custom-trained models for Nepali script recognition, improving character accuracy for screen-reader compatibility.",
        "solution": "Automated conversion of scanned documents into structured, accessible formats supporting assistive technologies.",
        "result": "Improved access to historical and educational texts for visually impaired users.",
        "metrics": [
          "Python + Tesseract",
          "Nepali/English support",
          "Screen-reader compatible"
        ],
        "tags": [
          "Python",
          "Tesseract",
          "OCR",
          "Accessibility",
          "Machine Learning"
        ],
        "impact": "Bridged accessibility gap for Nepali content"
      },
      {
        "title": "Robotics and Programming Initiative",
        "category": "Education Technology",
        "description": "End-to-end development of robotics education framework empowering 300+ students and teachers across 10+ schools",
        "problem": "Public schools in Nepal lacked STEM learning resources and practical programming education.",
        "approach": "Designed STEM learning modules and scalable training systems inspired by Miyagi University collaboration, adapted for Nepal's classroom realities.",
        "solution": "Implemented framework including visual coding, Raspberry Pi integration, and inter-school robotics challenges.",
        "result": "Empowered 300+ students and teachers across 10+ schools with hands-on STEM education.",
        "metrics": [
          "300+ students/teachers",
          "10+ schools",
          "Raspberry Pi based"
        ],
        "tags": [
          "Robotics",
          "Raspberry Pi",
          "Visual Coding",
          "STEM Education"
        ],
        "impact": "Pioneered robotics education in Nepal"
      },
      {
        "title": "Interactive Learning Stories",
        "category": "Education Technology",
        "description": "Free animated children's stories and language games using ReactJS for dynamic content delivery",
        "problem": "Children in rural Nepal needed engaging, accessible storytelling resources for language development.",
        "approach": "Developed interactive storytelling framework using ReactJS enabling dynamic, animated content delivery.",
        "solution": "Created library of animated stories and language games that work offline and engage young learners.",
        "result": "Provided accessible, engaging learning content for children's literacy development.",
        "metrics": [
          "ReactJS framework",
          "Animated stories",
          "Language games"
        ],
        "tags": [
          "ReactJS",
          "Animation",
          "Educational Content",
          "Language Learning"
        ],
        "impact": "Enhanced literacy for young learners"
      },
      {
        "title": "Seepalaya",
        "category": "Education Technology",
        "description": "Personalized learning platform for concept-based math and science education for Grades 4-5",
        "problem": "Students needed personalized, self-paced learning tools for foundational math and science concepts.",
        "approach": "Initiated and led early-stage development, recruiting core team and guiding prototype design for progress tracking and self-paced learning.",
        "solution": "Created foundation for scalable platform supporting concept-based education and lifelong learning goals.",
        "result": "Established platform architecture and team for future scalability.",
        "metrics": [
          "Grades 4-5 focus",
          "Concept-based",
          "Self-paced learning"
        ],
        "tags": [
          "Educational Design",
          "Personalized Learning",
          "Math",
          "Science"
        ],
        "impact": "Foundation for personalized education"
      },
      {
        "title": "CRM Team Data Analysis",
        "category": "Data Analytics",
        "description": "Analyzed 7,000+ TeamDynamix tickets using Python to uncover service trends and improve resolution times",
        "problem": "CRM team lacked visibility into service trends, ticket patterns, and resolution performance.",
        "approach": "Used Python (pandas, matplotlib) for data analysis and designed interactive dashboards with Power BI to visualize trends.",
        "solution": "Created comprehensive analytics revealing bottlenecks, request types, and SLA performance.",
        "result": "Reduced average ticket resolution time and improved stakeholder reporting capabilities.",
        "metrics": [
          "7,000+ tickets analyzed",
          "Python + Power BI",
          "SLA tracking"
        ],
        "tags": [
          "Python",
          "pandas",
          "matplotlib",
          "Power BI",
          "Data Analysis"
        ],
        "impact": "Data-driven service improvements"
      },
      {
        "title": "CRM Team Website",
        "category": "Web Development",
        "description": "Requirements analysis and design of CRM team website using Figma, providing structured access to 150+ resources",
        "problem": "CRM team resources were scattered across 160+ Google Docs, making information difficult to find.",
        "approach": "Conducted requirements analysis, designed website in Figma, and led development of 10+ Drupal web pages.",
        "solution": "Centralized resource hub with user-centric design and automated migration of documentation into accessible TeamDynamix articles.",
        "result": "Streamlined resource access projecting 25% engagement boost.",
        "metrics": [
          "150+ resources",
          "10+ Drupal pages",
          "160+ docs migrated"
        ],
        "tags": [
          "Figma",
          "Drupal",
          "UX Design",
          "TeamDynamix"
        ],
        "impact": "Improved team information architecture"
      },
      {
        "title": "AI-Powered Alt Text Generator",
        "category": "Accessibility",
        "description": "Automated alt text generation system using GPT-4 Vision for institutional digital content",
        "problem": "Thousands of images across university websites lacked proper alt text, creating accessibility barriers.",
        "approach": "Integrated GPT-4 Vision API with content management systems, built review workflow, and created quality assurance pipeline.",
        "solution": "Automated generation with human review, batch processing capabilities, and WCAG 2.1 AA compliance validation.",
        "result": "Dramatically accelerated accessibility remediation across university digital properties.",
        "metrics": [
          "10x faster remediation",
          "95% approval rate",
          "GPT-4 Vision"
        ],
        "tags": [
          "OpenAI",
          "GPT-4 Vision",
          "Accessibility",
          "Python",
          "WCAG"
        ],
        "impact": "Scaled accessibility through AI"
      },
      {
        "title": "Design for All",
        "category": "Accessibility",
        "description": "Interactive learning platform that reframes accessibility as a creative design constraint, teaching developers the 'why' behind accessibility guidelines",
        "longDescription": "Design for All transforms how developers learn about accessibility. Instead of presenting WCAG guidelines as a dry checklist, the platform reframes accessibility as a creative design challenge. Through interactive 'Amateur vs. Pro' comparison cards, developers see firsthand how semantic HTML and accessible patterns don't just meet compliance—they create cleaner, more robust interfaces. The platform covers 12 comprehensive sections from Semantics to Cognitive Load, each teaching the 'why' behind the guidelines through visual examples and interactive demonstrations. This approach shifts accessibility from a compliance burden to an opportunity for better design.",
        "problem": "Accessibility is often treated as a boring checklist or an afterthought, leading to clunky UIs that developers resist implementing.",
        "approach": "Built an interactive learning platform that reframes accessibility as a creative design constraint. Features 'Amateur vs. Pro' comparison cards to visually demonstrate how semantic HTML and accessible patterns create cleaner, more robust interfaces.",
        "solution": "Created a comprehensive resource covering 12 sections (from Semantics to Cognitive Load) that teaches developers the 'why' behind the guidelines through interactive examples and visual comparisons.",
        "result": "Developers now have a comprehensive, interactive resource that transforms accessibility from a compliance burden into an opportunity for better design. The platform demonstrates that accessible patterns create cleaner, more robust interfaces.",
        "metrics": [
          "12 comprehensive sections",
          "Interactive learning platform",
          "Visual comparison cards"
        ],
        "tags": [
          "Vite",
          "React 19",
          "TypeScript",
          "Tailwind CSS v4",
          "Framer Motion",
          "Accessibility Education"
        ],
        "impact": "Transformed accessibility from checklist to creative design practice",
        "links": {
          "live": "https://rayraycodes.github.io/designforall/",
          "github": "https://github.com/rayraycodes/designforall"
        }
      },
      {
        "title": "Rails Accessibility Testing",
        "category": "Developer Tools",
        "description": "Zero-configuration Rails gem that integrates WCAG 2.1 AA checks directly into TDD workflow, catching accessibility violations in real-time",
        "longDescription": "Rails Accessibility Testing is a zero-configuration gem that brings accessibility testing into the TDD workflow, just like RSpec for unit tests or RuboCop for code style. The gem integrates WCAG 2.1 AA checks directly into your test suite, catching violations in real-time through both static file scanning and live browser testing. Instead of discovering accessibility issues during manual audits or after deployment—when fixes are expensive and time-consuming—developers get immediate feedback during development. The gem runs alongside existing test suites without disrupting workflow, providing clear remediation guidance for each violation. Version 1.5.5 enables teams to ship accessible code from day one, shifting accessibility left in the development process.",
        "problem": "Accessibility bugs usually aren't caught until after deployment (or during manual audits), making them expensive to fix and creating barriers for users.",
        "approach": "Developed a 'Zero Configuration' gem that acts like the RSpec/RuboCop of accessibility. It integrates WCAG 2.1 AA checks directly into the TDD workflow, catching violations in real-time via a static file scanner and live browser scanner.",
        "solution": "Automated accessibility testing that runs alongside existing test suites, providing immediate feedback during development without disrupting workflow. The gem includes comprehensive WCAG 2.1 AA checks and clear remediation guidance.",
        "result": "Version 1.5.5 is now live, enabling developers to ship accessible code from day one without disrupting their testing workflow.",
        "metrics": [
          "Version 1.5.5",
          "Zero configuration",
          "Real-time violation detection"
        ],
        "tags": [
          "Ruby",
          "Rails",
          "Selenium",
          "Capybara",
          "RSpec",
          "WCAG 2.1 AA",
          "Testing"
        ],
        "impact": "Shifted accessibility left, preventing issues before production",
        "links": {
          "docs": "https://rayraycodes.github.io/rails-accessibility-testing/",
          "live": "https://rayraycodes.github.io/rails-accessibility-testing/"
        }
      },
      {
        "title": "Trip Planner (AI Multi-Agent System)",
        "category": "AI & Full-Stack",
        "description": "Multi-agent AI system that orchestrates specialized agents concurrently to gather and synthesize trip planning data, reducing research time by 70%",
        "longDescription": "Trip Planner revolutionizes travel planning through a sophisticated multi-agent AI architecture. Instead of spending hours cross-referencing hotels, weather forecasts, and travel blogs across multiple websites, specialized AI agents (Wikipedia, Weather, Transport) work concurrently to gather information in parallel. The backend, built with FastAPI and async Python, orchestrates these agents efficiently, aggregating real-time data that an LLM then synthesizes into comprehensive trip plans. The frontend features an Apple-inspired glassmorphic UI with real-time progress tracking, handling complex state management for a production-quality experience. By executing agents concurrently rather than sequentially, the system reduces data gathering time by 70%, transforming trip planning from hours of manual research to minutes of automated synthesis.",
        "problem": "Traditional trip planning involves hours of cross-referencing hotels, weather forecasts, and travel blogs across multiple websites and sources.",
        "approach": "Engineered a Multi-Agent system where specialized AI agents (Wikipedia, Weather, Transport) run concurrently rather than sequentially. The backend uses Async Python to orchestrate these agents, aggregating real-time data for an LLM to synthesize into comprehensive trip plans.",
        "solution": "Parallel execution architecture using FastAPI and async Python enables multiple agents to gather data simultaneously. The frontend features an Apple-inspired glassmorphic UI with real-time progress tracking, handling complex state management for a production-quality experience.",
        "result": "Reduced data gathering time by 70% through parallel execution. Users can now generate comprehensive trip plans in minutes instead of hours, with all information synthesized and ready to use.",
        "metrics": [
          "70% time reduction",
          "Concurrent agent execution",
          "Production-quality UI"
        ],
        "tags": [
          "FastAPI",
          "Async Python",
          "React",
          "Framer Motion",
          "LLMs",
          "OpenAI",
          "Ollama",
          "AI Agents",
          "Multi-Agent Systems"
        ],
        "impact": "Transformed trip planning from hours of research to minutes of automated synthesis",
        "links": null
      }
    ],
    "labels": {
      "impact": "Impact",
      "problem": "Problem",
      "approach": "Approach",
      "solution": "Solution",
      "result": "Result",
      "keyMetrics": "Key Metrics",
      "technologies": "Technologies",
      "close": "Close"
    }
  },
  "impact": {
    "hero": {
      "title": "Stories of Impact",
      "subtitle": "A collection of stories "
    },
    "stories": [
      {
        "id": "building-technology",
        "title": "Building Technology for Learning and Equity in Nepal",
        "excerpt": "A personal story about impact, design, and community. When I look back at my years with OLE Nepal, I see more than software and servers.",
        "date": "2024",
        "icon": "Globe",
        "theme": "blue",
        "content": {
          "description": "When I look back at my years with OLE Nepal, I see more than software and servers. I see classrooms that once depended on printed textbooks learning to use interactive lessons for the first time. I see children in remote mountain schools reading digital stories without needing the internet. I see teachers discovering that technology could actually make learning easier, not harder. And I see the slow, steady work required to build systems that survive real constraints, from low bandwidth to limited power. This is the story of the platforms, tools, and experiences I helped build, and the value they continue to create today.",
          "work": [
            "Built platforms that work in low-bandwidth, low-power environments",
            "Designed for real-world constraints: dust, unstable electricity, limited connectivity",
            "Created systems that continue to serve communities years later",
            "Combined technical excellence with human-centered design"
          ],
          "impact": "These systems became more than products. They became pillars of Nepal's digital learning ecosystem, serving hundreds of thousands of students and continuing to evolve today.",
          "hasStats": true,
          "stats": [
            {
              "value": "300,000+",
              "label": "Students Reached"
            },
            {
              "value": "700+",
              "label": "Modules Converted"
            },
            {
              "value": "200+",
              "label": "Schools Served"
            },
            {
              "value": "7 Years",
              "label": "Building in Nepal"
            }
          ]
        }
      },
      {
        "id": "rotaract-rotary-impact",
        "title": "Community Leadership and Accessible Learning through Rotaract and Rotary",
        "excerpt": "How a youth-led service movement shaped my approach to technology, accessibility, and impact.",
        "date": "2024",
        "icon": "Users",
        "theme": "indigo",
        "content": {
          "description": "My years with Rotaract and Rotary grounded me in community, service, and the belief that technology should lift people from where they are. Long before I built large-scale learning platforms, I worked with volunteers, educators, and local leaders to solve real problems on the ground. This work taught me how to mobilize teams, navigate constraints, and design solutions with empathy. One of the most meaningful projects was creating accessible audiobooks for students with limited reading materials, coordinating volunteers to record, edit, and distribute free audio content to rural schools. These experiences shaped my understanding of accessibility years before I formally entered the field.",
          "work": [
            "Led youth-centered education and accessibility initiatives",
            "Coordinated volunteer teams across districts to deliver community projects",
            "Built early accessible audiobook workflows for students with limited access to reading materials",
            "Partnered with Rotary leaders, schools, and local communities to create sustainable impact"
          ],
          "impact": "These efforts helped build a culture of service-focused innovation, contributing to accessible learning resources for underserved students while strengthening community networks across Nepal.",
          "hasStats": true,
          "stats": [
            {
              "value": "100+",
              "label": "Audiobooks Produced"
            },
            {
              "value": "50+",
              "label": "Volunteer Contributors"
            },
            {
              "value": "20+",
              "label": "Community Projects Supported"
            },
            {
              "value": "5 Years",
              "label": "Rotaract and Rotary Engagement"
            }
          ]
        }
      },
      {
        "id": "e-pustakalaya",
        "title": "E-Pustakalaya: National Digital Library",
        "excerpt": "Modernized Nepal's digital library to serve learners in both Kathmandu and remote districts.",
        "date": "2017-2020",
        "icon": "Globe",
        "theme": "blue",
        "content": {
          "description": "Modernized Nepal's digital library to serve learners in both Kathmandu and remote districts. This project transformed how educational content was distributed across the country.",
          "work": [
            "Reworked content architecture for offline distribution",
            "Optimized search with Elasticsearch",
            "Cleaned up legacy code for stability and speed",
            "Enabled offline mirrors across the country"
          ],
          "impact": "Still active today, serving rural schools and ministries with offline mirrors running across the country. E-Pustakalaya continues to grow, becoming part of national digital learning strategies."
        }
      },
      {
        "id": "offline-learning",
        "title": "Offline Learning During COVID-19",
        "excerpt": "Led large-scale offline conversion project transforming 700+ interactive web modules into lightweight offline packages.",
        "date": "2020-2021",
        "icon": "BookOpen",
        "theme": "green",
        "content": {
          "description": "Led large-scale offline conversion project transforming 700+ interactive web modules into lightweight offline packages. This was a critical response to school closures during the pandemic.",
          "work": [
            "Converted 700+ online modules to offline packages",
            "Rethought asset loading and local data storage",
            "Deployed to 200+ schools during lockdown",
            "Enabled continuity of education when schools closed"
          ],
          "impact": "These offline modules remain the backbone of many rural learning centers in mountainous and hard-to-reach regions. They are used not only in rural schools but also in community learning centers."
        }
      },
      {
        "id": "ocr-tts",
        "title": "OCR + TTS for Visually Impaired Students",
        "excerpt": "Built Nepal's first OCR and text-to-speech system to give blind students access to Nepali textbooks.",
        "date": "2018-2019",
        "icon": "Heart",
        "theme": "purple",
        "content": {
          "description": "Built Nepal's first OCR and text-to-speech system to give blind students access to Nepali textbooks. This project opened up educational opportunities for visually impaired learners.",
          "work": [
            "Built first Nepali OCR system with MIT intern Kartikesh",
            "Integrated text-to-speech for audio textbooks",
            "Converted scanned textbooks to accessible formats",
            "Created independence for visually impaired learners"
          ],
          "impact": "Expanded into a larger accessible content pipeline, with NGOs and schools using it to convert textbooks and children's literature. OCR and TTS tools inspired further investment in accessible education solutions."
        }
      },
      {
        "id": "e-paath",
        "title": "E-Paath Interactive Learning",
        "excerpt": "Nepal's first digital learning platform for grades 1-8, teaching through animations and interactive stories.",
        "date": "2016-2020",
        "icon": "Laptop",
        "theme": "indigo",
        "content": {
          "description": "Nepal's first digital learning platform for grades 1-8, teaching through animations and interactive stories. This platform made learning engaging and accessible for rural students.",
          "work": [
            "Optimized modules for low-power devices",
            "Fixed cross-device bugs and improved game logic",
            "Built interactive math, science, and reading activities",
            "Made learning engaging for rural students"
          ],
          "impact": "Still one of the most widely used digital education tools in public schools, with new versions building on this foundation. E-Paath remains a flagship program with ongoing updates."
        }
      },
      {
        "id": "technical-infrastructure",
        "title": "Technical Infrastructure for Rural Schools",
        "excerpt": "Built reliable systems that work in real conditions: dust, unstable electricity, and low bandwidth.",
        "date": "2015-2020",
        "icon": "Zap",
        "theme": "teal",
        "content": {
          "description": "Built reliable systems that work in real conditions: dust, unstable electricity, and low bandwidth. This infrastructure work ensured that technology could actually function in rural environments.",
          "work": [
            "Tuned school servers with Apache and Squid",
            "Improved caching for slow networks",
            "Created reliable system images for XO laptops",
            "Fixed field issues from real-world usage"
          ],
          "impact": "Many school servers set up during those years are still running, delivering thousands of books and lessons daily. School servers and device programs continue expanding to new districts."
        }
      },
      {
        "id": "teacher-training",
        "title": "Teacher Training & Human-Centered Design",
        "excerpt": "Supported teacher trainings across districts, helping educators adopt digital tools effectively.",
        "date": "2016-2021",
        "icon": "Users",
        "theme": "orange",
        "content": {
          "description": "Supported teacher trainings across districts, helping educators adopt digital tools effectively. This work ensured that technology didn't just exist but actually got used in classrooms.",
          "work": [
            "Led teacher trainings across rural districts",
            "Made products more usable and intuitive",
            "Brought field insights back to engineering",
            "Ensured technology actually gets used"
          ],
          "impact": "The training model continues as core part of OLE Nepal's deployment strategy, ensuring technology doesn't just exist but gets used. This human-centered approach became foundational to all our work."
        }
      }
    ],
    "labels": {
      "backToStories": "Back to Stories",
      "whatIBuilt": "What I Built",
      "impactToday": "Impact Today",
      "impactByNumbers": "Impact by the Numbers",
      "readMore": "Read more →"
    }
  },
  "storiesOfAdventure": {
    "hero": {
      "title": "Stories of Adventure",
      "subtitle": "A collection of stories about exploring mountains, trails, and the world beyond the screen"
    },
    "stories": [
      {
        "id": "running-reflection",
        "title": "Running and the Rhythm of Life",
        "excerpt": "A personal reflection on how running has shaped my perspective on challenge, resilience, and self discovery.",
        "date": "2022",
        "icon": "Footprints",
        "theme": "red",
        "content": {
          "description": "Running has been a constant in my life. I cannot remember a time when I was not running, learning, or discovering something about myself through movement. Over the years, running has become more than a physical activity. It has evolved into a way of understanding the world, interpreting challenges, and reconnecting with my own thoughts. The lessons I have gathered on the road and in the mountains mirror many of the lessons life teaches us: the value of staying present, trusting the journey, and embracing discomfort as a path to growth.",
          "work": [
            "Explored the parallels between running and life’s choices",
            "Reflected on the importance of community and companionship",
            "Learned to let go of emotional and mental burdens",
            "Turned moments of being lost into opportunities for discovery",
            "Embraced running as a form of meditation and self awareness"
          ],
          "impact": "Running has helped me cultivate discipline, clarity, and emotional resilience. It has taught me to move forward even when the path ahead is unclear, to value the people who run beside me, and to appreciate both the struggle and the beauty of the process. These reflections influence not only my personal wellbeing but also how I show up in my work, my relationships, and my creative pursuits.",
          "images": [
            {
              "url": "/assets/rayrunning.png",
              "alt": "A runner in motion on a trail, capturing the rhythm and flow of running",
              "caption": "Finding rhythm in movement"
            },
            {
              "url": "/assets/rayinmountains.png",
              "alt": "A runner standing in the mountains, surrounded by vast natural landscapes",
              "caption": "Where the trail meets the sky"
            }
          ]
        }
      },      
      {
        "id": "himalayan-trek",
        "title": "Trekking Through the Himalayas",
        "excerpt": "A journey through the Annapurna region, where every step brought new perspectives and the mountains taught lessons in humility and perseverance.",
        "date": "2022",
        "icon": "Globe",
        "theme": "blue",
        "content": {
          "description": "The Himalayas have always called to me. In 2022, I set out on a trek through the Annapurna region, carrying everything I needed on my back. The journey wasn't just about reaching peaks—it was about the conversations with fellow trekkers, the quiet mornings watching sunrise over snow-capped mountains, and the moments when the only sound was my own breathing at high altitude.",
          "work": [
            "Trekked through Annapurna Sanctuary and Langtang regions",
            "Documented the journey through photography and writing",
            "Connected with local guides and fellow adventurers",
            "Experienced the raw beauty of Nepal's mountain landscapes"
          ],
          "impact": "This adventure reminded me why I love building technology for education—because it enables people to explore, learn, and connect, whether they're in a classroom or on a mountain trail. The discipline and focus I developed on the trail translated directly to my work back home.",
          "images": [
            {
              "url": "/assets/annapurna.png",
              "alt": "Trekkers walking along golden hillside beneath snowy Annapurna mountains in Nepal",
              "caption": "Golden trails beneath Annapurna"
            },
            {
              "url": "/assets/macha.jpg",
              "alt": "A lone trekker standing before towering Himalayan peaks in Machhapuchhre region",
              "caption": "Dwarfed by giants"
            },
            {
              "url": "/assets/lantang.png",
              "alt": "Sharp Himalayan ridges leading toward a massive snow peak in Langtang region",
              "caption": "Ancient rock, endless sky"
            }
          ]
        }
      },
      {
        "id": "yosemite-exploration",
        "title": "Exploring Yosemite's Granite Giants",
        "excerpt": "From Half Dome to El Capitan, discovering the magic of Yosemite Valley through photography and hiking.",
        "date": "2023-2024",
        "icon": "Zap",
        "theme": "green",
        "content": {
          "description": "Yosemite National Park became my escape and inspiration. Over multiple trips, I explored the valley's iconic granite formations, captured the changing light on Half Dome, and hiked trails that offered new perspectives on familiar landmarks. Each visit revealed something new—whether it was the way fog settled in the valley at dawn or how the same mountain looked completely different in different seasons.",
          "work": [
            "Photographed iconic landmarks like Half Dome and El Capitan",
            "Hiked trails including Yosemite Falls, Glacier Point, and Mist Trail",
            "Captured seasonal changes from spring waterfalls to autumn colors",
            "Documented the park's natural beauty through photography"
          ],
          "impact": "These trips to Yosemite taught me the importance of stepping away from screens and code to recharge. The creative problem-solving I do in nature directly fuels my work in technology and design.",
          "images": [
            {
              "url": "/assets/yose.jpg",
              "alt": "A panoramic view across Yosemite Valley with granite formations",
              "caption": "Valley of giants"
            },
            {
              "url": "/assets/2024-07-06_10-46-05_797.jpeg",
              "alt": "Golden morning light falling on Half Dome in Yosemite National Park",
              "caption": "Half Dome at sunrise"
            }
          ]
        }
      },
      {
        "id": "lake-tahoe-adventures",
        "title": "Lake Tahoe: Mountains and Water",
        "excerpt": "Discovering the crystal-clear waters and alpine beauty of Lake Tahoe through hiking, photography, and quiet reflection.",
        "date": "2023",
        "icon": "Heart",
        "theme": "purple",
        "content": {
          "description": "Lake Tahoe's combination of alpine peaks and crystal-clear water created the perfect setting for adventure and reflection. I spent days hiking trails that offered panoramic views, photographing the lake's ever-changing moods, and simply sitting by the water to think. The contrast between the rugged mountains and the serene lake taught me about balance—in nature and in life.",
          "work": [
            "Hiked trails around the lake offering stunning vistas",
            "Photographed the lake's changing colors and moods",
            "Explored both California and Nevada sides of the lake",
            "Captured the beauty of alpine landscapes and water"
          ],
          "impact": "Time at Lake Tahoe reinforced my belief that the best ideas come when we give ourselves space to think. Many of my most creative solutions to technical problems have come to me while walking trails or sitting by water.",
          "images": [
            {
              "url": "/assets/ZVE02104.jpg",
              "alt": "A lakeside scene beneath snow capped mountains at Lake Tahoe",
              "caption": "Blue horizon meets white peaks"
            },
            {
              "url": "/assets/ZVE02111.jpg",
              "alt": "A peaceful blue cove framed by pines and rocky shoreline at Lake Tahoe",
              "caption": "Hidden cove, quiet waters"
            },
            {
              "url": "/assets/2023-11-19_02-55-09_562.jpeg",
              "alt": "A wooden trail winding beside a vibrant blue lake at Lake Tahoe",
              "caption": "Path to turquoise"
            }
          ]
        }
      },
      {
        "id": "redwood-forests",
        "title": "Walking Among Giants: Redwood Forests",
        "excerpt": "Standing among ancient redwoods, feeling small and connected to something much larger than myself.",
        "date": "2024",
        "icon": "BookOpen",
        "theme": "indigo",
        "content": {
          "description": "There's something humbling about standing next to a tree that's been alive for over a thousand years. In the redwood forests of California, I walked among these giants, photographing the way light filtered through their massive trunks and feeling the quiet wisdom of a forest that has seen centuries pass. These trees reminded me that the work we do today is part of a longer story.",
          "work": [
            "Explored Redwood National and State Parks",
            "Photographed the interplay of light and ancient trees",
            "Hiked trails through old-growth forests",
            "Documented the scale and beauty of these natural wonders"
          ],
          "impact": "The redwoods taught me about patience and long-term thinking. Just as these trees grow slowly but steadily, meaningful work in technology and education requires the same kind of patient, persistent effort.",
          "images": [
            {
              "url": "/assets/2024-06-29_00-29-58_012.jpeg",
              "alt": "Ancient redwood trunks glowing under filtered sunlight in Redwood National Park",
              "caption": "Light through ancient giants"
            }
          ]
        }
      },
      {
        "id": "michigan-seasons",
        "title": "Four Seasons in Michigan",
        "excerpt": "Discovering the beauty of Michigan's changing seasons through photography, from autumn colors to winter stillness.",
        "date": "2023-2024",
        "icon": "Laptop",
        "theme": "teal",
        "content": {
          "description": "Living in Michigan has given me the opportunity to experience and document all four seasons through photography. From the vibrant fall colors that paint the landscape in reds and golds, to the quiet stillness of winter when everything is covered in snow, each season offers its own beauty and lessons. These local adventures have become a regular practice of noticing and appreciating the world around me.",
          "work": [
            "Photographed seasonal changes throughout the year",
            "Explored local parks and natural areas",
            "Captured autumn colors, winter scenes, and spring blooms",
            "Documented the beauty of everyday natural spaces"
          ],
          "impact": "These local adventures have taught me that adventure doesn't always require traveling far. Some of the most meaningful moments come from paying attention to the beauty right where you are.",
          "images": [
            {
              "url": "/assets/2023-10-16_04-43-42_417.jpeg",
              "alt": "A serene moment of stillness surrounded by fall colors in Michigan",
              "caption": "Breath of autumn"
            },
            {
              "url": "/assets/ZVE00854.jpg",
              "alt": "Fall colors mirrored in a calm lake in Michigan",
              "caption": "Autumn reflections"
            }
          ]
        }
      },
      {
        "id": "cycling-journeys",
        "title": "Cycling Through Landscapes",
        "excerpt": "Exploring new places on two wheels, where the pace is just right for noticing details and feeling connected to the landscape.",
        "date": "2023-2024",
        "icon": "Users",
        "theme": "orange",
        "content": {
          "description": "Cycling has become one of my favorite ways to explore. There's something about the pace of a bicycle—fast enough to cover ground, slow enough to notice details—that makes it perfect for adventure. Whether it's riding through Michigan's countryside, exploring trails, or simply commuting and discovering new routes, cycling connects me to places in a way that driving never could.",
          "work": [
            "Explored local and regional cycling routes",
            "Combined cycling with photography adventures",
            "Discovered new perspectives on familiar landscapes",
            "Used cycling as both exercise and exploration"
          ],
          "impact": "Cycling has taught me about sustainable exploration and the joy of the journey itself, not just the destination. This mindset has influenced how I approach both personal adventures and professional projects.",
          "images": [
            {
              "url": "/assets/cycling.png",
              "alt": "A mountain bike inside a cable car cabin overlooking a mountainous landscape with a city in the valley",
              "caption": "Elevated perspective"
            }
          ]
        }
      },
      {
        "id": "mustang-to-rockies",
        "title": "From The Himalayas to the Rocky Mountains",
        "excerpt": "Some dreams begin quietly over conversations, borrowed imaginations, and the courage of someone who goes first.",
        "date": "Dec 2025",
        "icon": "Heart",
        "theme": "green",
        "content": {
          "description": [
            "Some dreams begin quietly over conversations. They come from borrowed imaginations and the courage of someone who goes first.",
            "My sister Monika Maharjan came from Nepal. She carried stories of faraway places and possibilities that once felt distant to me.",
            "Long before visas, degrees, or continents entered our lives, we shared a simple dream. We wanted to travel. We wanted to explore beautiful places. We wanted to see the world beyond what we knew.",
            "When she visited from Japan, she took me to Mustang. She was pursuing her PhD in Tokyo at the time. Mustang is the dry, dramatic mountains of the Nepali Himalayas.",
            "Surrounded by wind-carved cliffs and endless skies, something shifted in me. Mustang wasn't just a destination. It was a reminder that the world was vast. Dreaming was only the beginning.",
            "That journey quietly set my compass.",
            "Since then, I've worked on my own terms to pursue my master's degree in the United States. I was inspired by the path she was carving across borders.",
            "Our lives moved in parallel lines. Hers moved through academia and research, first in Japan, then the UK, and eventually the US. Mine moved through persistence, patience, and belief that I could build a life shaped by curiosity and movement.",
            "Years later, life brought us together again, this time in Denver. She had a work trip, and I flew out to meet her.",
            "Standing together in the Rocky Mountains, I felt the same quiet awe I had felt in Mustang. Different mountains, different country, but the same shared wonder.",
            "From the dry Himalayan landscapes of Nepal to the rugged peaks of Colorado, our journey has never really been about geography. It's been about growth, courage, and the invisible thread of shared dreams that stretches across time and continents.",
            "Some dreams travel with you. Others wait patiently until the moment you're standing in the mountains again, realizing how far you've come."
          ],
          "work": [
            "Traveled to Mustang, Nepal with my sister, experiencing the dramatic Himalayan landscapes",
            "Pursued my master's degree in the United States, inspired by her academic journey",
            "Met in Denver and explored the Rocky Mountains together",
            "Documented the journey through photography and reflection",
            "Connected across continents, celebrating shared dreams and growth"
          ],
          "impact": [
            "This story is about more than geography. It's about the power of shared dreams. It's about the courage to pursue them. It's about the invisible threads that connect us across borders and time.",
            "From Mustang to the Rockies, these mountains have been witnesses to our growth. They are reminders of how far we've come. They are symbols of the dreams that continue to guide us forward."
          ],
          "images": [
            {
              "url": "/assets/colorado/DSC00500-min.JPG",
              "alt": "Rocky Mountain landscape with dramatic peaks and valleys",
              "caption": "Ancient red rock formations"
            },
            {
              "url": "/assets/colorado/DSC00505-min.JPG",
              "alt": "Mountain peaks reaching toward the sky in Colorado",
              "caption": "Mountain peaks reaching for the sky"
            },
            {
              "url": "/assets/colorado/DSC00507-min.JPG",
              "alt": "Scenic mountain view in the Rocky Mountains",
              "caption": "Alpine reflections"
            },
            {
              "url": "/assets/colorado/DSC00512-min.JPG",
              "alt": "Beautiful Colorado mountain landscape",
              "caption": "Towering sandstone spires"
            },
            {
              "url": "/assets/colorado/DSC00537-min.JPG",
              "alt": "Expansive mountain views in the Rockies",
              "caption": "Ancient red rock formations"
            },
            {
              "url": "/assets/colorado/DSC00563-min.JPG",
              "alt": "Mountain trail winding through Colorado landscape",
              "caption": "Trail through rock formations"
            },
            {
              "url": "/assets/colorado/DSC00604-min.JPG",
              "alt": "Dramatic Rocky Mountain scenery",
              "caption": "Dramatic rock formations"
            },
            {
              "url": "/assets/colorado/DSC00609-min.JPG",
              "alt": "Stunning Colorado mountain peaks",
              "caption": "Snow-capped peaks in the distance"
            },
            {
              "url": "/assets/colorado/DSC00628-min.JPG",
              "alt": "Panoramic view of Rocky Mountain landscape",
              "caption": "Panoramic mountain views"
            },
            {
              "url": "/assets/colorado/DSC00692-min.JPG",
              "alt": "Mountain landscape with dramatic lighting",
              "caption": "Light and shadow on red rocks"
            },
            {
              "url": "/assets/colorado/DSC00699-min.JPG",
              "alt": "Beautiful Colorado mountain scene",
              "caption": "Mountain town charm"
            },
            {
              "url": "/assets/colorado/DSC00720-min.JPG",
              "alt": "Rocky Mountain peaks against the sky",
              "caption": "Peaks mirrored in still waters"
            },
            {
              "url": "/assets/colorado/DSC00725-min.JPG",
              "alt": "Scenic Colorado mountain view",
              "caption": "Majestic rock formations"
            },
            {
              "url": "/assets/colorado/DSC00754-min.JPG",
              "alt": "Expansive Rocky Mountain landscape",
              "caption": "Vast mountain horizons"
            },
            {
              "url": "/assets/colorado/DSC00781-min.JPG",
              "alt": "Dramatic mountain scenery in Colorado",
              "caption": "Dramatic alpine scenery"
            },
            {
              "url": "/assets/colorado/DSC00794-min.JPG",
              "alt": "Beautiful mountain peaks in the Rockies",
              "caption": "Natural sculptures"
            },
            {
              "url": "/assets/colorado/DSC00796-min.JPG",
              "alt": "Stunning Colorado mountain vista",
              "caption": "Mountain vistas from above"
            },
            {
              "url": "/assets/colorado/DSC00832-min.JPG",
              "alt": "Panoramic Rocky Mountain view",
              "caption": "Panoramic alpine beauty"
            },
            {
              "url": "/assets/colorado/DSC00863-min.JPG",
              "alt": "Mountain landscape with dramatic formations",
              "caption": "Wind-carved formations"
            },
            {
              "url": "/assets/colorado/DSC00880-min.JPG",
              "alt": "Beautiful Colorado mountain scenery",
              "caption": "Mountain beauty"
            },
            {
              "url": "/assets/colorado/DSC00945-min.JPG",
              "alt": "Final view of Rocky Mountain peaks",
              "caption": "Memories in the mountains"
            }
          ]
        }
      }
    ],
    "labels": {
      "backToStories": "Back to Stories",
      "whatIDid": "How I Spent the Journey",
      "reflection": "Reflection",
      "adventureByNumbers": "Adventure by the Numbers",
      "readMore": "Read more →"
    }
  },
  "contact": {
    "hero": {
      "title": "Let's Connect",
      "subtitle": "Interested in collaboration, accessibility consulting, or just want to say hi? I'd love to hear from you."
    },
    "form": {
      "title": "Send a Message",
      "fields": {
        "name": {
          "label": "Name",
          "placeholder": "Your name"
        },
        "email": {
          "label": "Email",
          "placeholder": "your.email@example.com"
        },
        "message": {
          "label": "Message",
          "placeholder": "Tell me about your project or inquiry..."
        }
      },
      "submit": "Send Message"
    },
    "social": {
      "title": "Connect Online",
      "subtitle": "Find me on these platforms or reach out directly via email.",
      "links": [
        {
          "label": "Email",
          "href": "mailto:reganmaharjann@gmail.com",
          "handle": "reganmaharjann@gmail.com"
        },
        {
          "label": "LinkedIn",
          "href": "https://www.linkedin.com/in/imregan/",
          "handle": "linkedin.com/in/imregan"
        },
        {
          "label": "GitHub",
          "href": "https://github.com/reganmaharjan",
          "handle": "github.com/reganmaharjan"
        },
        {
          "label": "Twitter",
          "href": "https://twitter.com/reganmaharjan",
          "handle": "@reganmaharjan"
        }
      ]
    },
    "opportunities": {
      "title": "What I'm Open To",
      "items": [
        "Accessibility consulting and audits",
        "Full-stack development projects",
        "AI and data engineering roles",
        "Speaking opportunities",
        "Open source collaboration",
        "Educational technology initiatives"
      ]
    },
    "cta": {
      "title": "Let's build something accessible",
      "subtitle": "Whether you're looking for an accessibility expert, a full-stack engineer, or an AI builder, I'm here to help create inclusive digital experiences.",
      "primary": "Send an Email",
      "secondary": "Connect on LinkedIn"
    }
  },
  "accessibility": {
    "hero": {
      "title": "Accessibility Work",
      "subtitle": "Building inclusive digital experiences through WCAG compliance, AI automation, and developer-friendly tools"
    },
    "philosophy": {
      "title": "Accessibility Philosophy",
      "subtitle": "Guiding principles that shape my approach to inclusive design",
      "principles": [
        {
          "title": "Inclusive by Design",
          "description": "Accessibility is not a feature—it's a fundamental right and design principle from day one."
        },
        {
          "title": "Human-Centered",
          "description": "Real people with diverse abilities deserve experiences that work for them, not despite them."
        },
        {
          "title": "Developer-Friendly",
          "description": "Accessibility should be easy to implement, test, and maintain through clear tools and workflows."
        },
        {
          "title": "AI-Augmented",
          "description": "Leverage AI to accelerate accessibility work while maintaining human judgment and quality."
        }
      ]
    },
    "wcag": {
      "title": "WCAG 2.1 AA Expertise",
      "subtitle": "Comprehensive knowledge across all four WCAG principles",
      "categories": [
        {
          "category": "Perceivable",
          "items": [
            "Alt Text",
            "Color Contrast",
            "Text Alternatives",
            "Captions",
            "Adaptable Content"
          ]
        },
        {
          "category": "Operable",
          "items": [
            "Keyboard Navigation",
            "Focus Management",
            "Skip Links",
            "Timing Controls"
          ]
        },
        {
          "category": "Understandable",
          "items": [
            "Clear Language",
            "Predictable Navigation",
            "Error Prevention",
            "Input Assistance"
          ]
        },
        {
          "category": "Robust",
          "items": [
            "Semantic HTML",
            "ARIA Labels",
            "Screen Reader Testing",
            "Cross-Platform Compatibility"
          ]
        }
      ]
    },
    "tools": {
      "title": "Tools & Systems",
      "subtitle": "Building and deploying accessibility infrastructure",
      "items": [
        {
          "name": "Siteimprove",
          "role": "Institutional Rollout & Auditing",
          "description": "Led comprehensive deployment, tagging strategy, and ongoing audits across university properties."
        },
        {
          "name": "Alt Text Automation",
          "role": "AI-Powered Generation",
          "description": "GPT-4 Vision integration for automated alt text with human review workflow."
        },
        {
          "name": "Developer Checklists",
          "role": "Shift-Left Testing",
          "description": "Created comprehensive accessibility checklists integrated into development workflows."
        },
        {
          "name": "Rails A11y Gem",
          "role": "Automated Testing",
          "description": "Open source gem providing automated accessibility tests and remediation guidance."
        }
      ]
    },
    "transformation": {
      "title": "Transformation Impact",
      "subtitle": "How accessibility practices evolved through systematic improvements",
      "beforeLabel": "Before",
      "afterLabel": "After",
      "items": [
        {
          "before": "Manual alt text for thousands of images",
          "after": "AI-assisted generation with 95% approval rate",
          "impact": "10x faster"
        },
        {
          "before": "Accessibility issues found in production",
          "after": "Issues caught during development",
          "impact": "80% prevention"
        },
        {
          "before": "Fragmented accessibility knowledge",
          "after": "Centralized standards and training",
          "impact": "Institution-wide"
        },
        {
          "before": "Reactive remediation approach",
          "after": "Proactive accessibility culture",
          "impact": "Systemic change"
        }
      ]
    },
    "ai": {
      "title": "AI-Powered Accessibility",
      "description": [
        "Combining artificial intelligence with human expertise to scale accessibility work without compromising quality.",
        "From GPT-4 Vision for alt text generation to automated WCAG testing, AI accelerates the path to inclusive digital experiences."
      ],
      "technologies": [
        "GPT-4 Vision",
        "OCR",
        "TTS",
        "Automated Testing",
        "LLM Workflows",
        "Quality Assurance"
      ]
    },
    "impact": {
      "title": "Institutional Impact",
      "stats": [
        {
          "value": "WCAG 2.1 AA",
          "label": "Compliance Standard"
        },
        {
          "value": "1600+",
          "label": "Web Systems (LSA)"
        },
        {
          "value": "300K+",
          "label": "Students Reached"
        },
        {
          "value": "100+",
          "label": "Developers Trained"
        }
      ]
    }
  },
  "assets": {
    "images": {
      "home": {
        "hero": "https://regan.figma.site/_assets/v11/cc03d6b7b9b6c0b127b5885a899b19b8d05b9f15.png",
        "featured": "https://images.unsplash.com/photo-1611926653670-e18689373857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmlsaXR5JTIwaW5jbHVzaXZlJTIwZGVzaWdufGVufDF8fHx8MTc2MzAzMDU4MHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      "about": {
        "profile": "src/assets/mitregan.png"
      },
      "projects": [
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
        "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=800",
        "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
        "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        "https://images.unsplash.com/photo-1611926653670-e18689373857?w=800",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800"
      ],
      "impact": {
        "ruralSchool": "https://regan.figma.site/_assets/v11/cc03d6b7b9b6c0b127b5885a899b19b8d05b9f15.png",
        "mountainVillage": "https://regan.figma.site/_assets/v11/eb2091338e5a526e6c52dbe7891867bad0365a67.png"
      },
      "accessibility": {
        "aiAccessibility": "https://images.unsplash.com/photo-1611926653670-e18689373857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY2Nlc3NpYmlsaXR5JTIwaW5jbHVzaXZlJTIwZGVzaWdufGVufDF8fHx8MTc2MzAzMDU4MHww&ixlib=rb-4.1.0&q=80&w=1080"
      }
    },
    "links": {
      "email": "mailto:imregan@umich.edu",
      "linkedin": "https://www.linkedin.com/in/imregan/",
      "instagram": "https://www.instagram.com/rayheyheygun/",
      "github": "https://github.com/reganmaharjan",
      "twitter": "https://twitter.com/reganmaharjan"
    }
  },
  "photography": {
    "hero": {
      "title": "Photography",
      "subtitle": "Capturing moments, stories, and perspectives through the lens"
    },
    "categories": [
      "All",
      "Nature",
      "Portraits",
      "Urban",
      "Travel",
      "Abstract",
      "Nepal"
    ],
    "images": [
      {
        "id": 1,
        "url": "/assets/2023-10-16_04-43-42_417.jpeg",
        "title": "Breath of Autumn",
        "category": [
          "Portraits",
          "Nature"
        ],
        "description": "A serene moment of stillness surrounded by fall colors",
        "date": "2023",
        "location": "Dearborn, Michigan",
        "story": "This portrait captures a quiet, freeing moment in a wide open meadow framed by autumn trees. With arms stretched wide and eyes lifted, the figure reflects gratitude, presence, and connection to nature. The surrounding greens and yellows add softness to the mood, creating a peaceful emotional landscape."
      },
      {
        "id": 2,
        "url": "/assets/2023-11-19_02-55-09_562.jpeg",
        "title": "Lakeside Pathway",
        "category": "Travel",
        "description": "A wooden trail winding beside a vibrant blue lake",
        "date": "2023",
        "location": "Lake Tahoe, California",
        "story": "This photograph follows a sunlit boardwalk leading toward towering mountains. The bright turquoise water contrasts beautifully with the evergreen forest, creating a scene that feels both adventurous and calm. It reflects the pull of wanderlust and the grounding simplicity of natural paths."
      },
      {
        "id": 3,
        "url": "/assets/2023-11-19_04-58-06_481.jpeg",
        "title": "Frozen Highway",
        "category": "Nature",
        "description": "A winding road cutting through tall pines and snowy cliffs",
        "date": "2023",
        "location": "Sierra Nevada, California",
        "story": "Driving through the shadows of giant evergreens, this scene captures the quiet tension before winter fully sets in. The icy road bends toward a rugged mountain face lit faintly by the cold sun. It is a moment that blends isolation, beauty, and the sense of moving deeper into wilderness."
      },
      {
        "id": 4,
        "url": "/assets/2024-06-29_00-29-58_012.jpeg",
        "title": "Redwood Sanctuary",
        "category": "Nature",
        "description": "Ancient redwood trunks glowing under filtered sunlight",
        "date": "2024",
        "location": "Redwood National and State Parks",
        "story": "Captured among towering giants, this photograph celebrates the quiet majesty of the redwoods. Light slips through dense branches, illuminating the trunks like pillars in a natural temple. The forest feels timeless, and standing here is a humbling reminder of how small we are compared to these ancient beings."
      },
      {
        "id": 5,
        "url": "/assets/2024-07-06_10-46-05_797.jpeg",
        "title": "Half Dome Sunrise",
        "category": "Travel",
        "description": "Golden morning light falling on Half Dome",
        "date": "2024",
        "location": "Yosemite National Park",
        "story": "This scene captures the iconic curve of the road leading toward Half Dome as the first rays of sunrise paint the granite face with warm tones. The soft pastel sky and sweeping perspective give the moment a feeling of clarity and renewal, as if guiding the viewer toward something new."
      },
      {
        "id": 6,
        "url": "/assets/macha.jpg",
        "title": "Alpine Majesty",
        "category": [
          "Travel",
          "Nepal"
        ],
        "description": "A lone trekker standing before towering Himalayan peaks",
        "date": "2022",
        "location": "Machhapuchhre Region, Nepal",
        "story": "Clouds curled around the base of the giant snow covered peaks as we trekked toward Macchapuchre. My friend stood still for a moment, completely dwarfed by the landscape. The silence, the cold air, and the sheer scale of the Himalayas made everything else feel small. It was one of those rare moments when nature shows you its power and reminds you how wide the world is."
      },
      {
        "id": 7,
        "url": "/assets/taksindu.jpg",
        "title": "Glacial Walls",
        "category": "Nature",
        "description": "Sheer snowy cliffs rising above a frozen valley",
        "date": "2022",
        "location": "Taksindu Region, Nepal",
        "story": "The dramatic tilt of the mountain face against the open sky intensifies the feeling of being enclosed within a massive frozen world. Glacial textures, deep shadows, and untouched snow create a stark but beautiful environment that feels both challenging and sacred."
      },
      {
        "id": 8,
        "url": "/assets/yose.jpg",
        "title": "Valley View",
        "category": "Nature",
        "description": "A panoramic look across Yosemite Valley",
        "date": "2023",
        "location": "Yosemite National Park",
        "story": "A clear blue sky stretches endlessly above the granite giants of Yosemite Valley. The composition highlights the contrast between rugged rock formations and the soft textures of the forest below. It is a classic view that never loses its sense of wonder, no matter how many times it is seen."
      },
      {
        "id": 9,
        "url": "/assets/ZVE00854.jpg",
        "title": "Autumn Reflections",
        "category": "Nature",
        "description": "Fall colors mirrored in a calm lake",
        "date": "2023",
        "location": "Michigan, USA",
        "story": "The vibrant reds, oranges, and greens of autumn trees blend seamlessly into the still water, creating an almost painterly reflection. The quiet ducks gliding across the surface add life to the scene while keeping its peaceful energy intact. This moment feels like nature pausing to admire itself."
      },
      {
        "id": 10,
        "url": "/assets/ZVE02104.jpg",
        "title": "Blue Horizon",
        "category": "Travel",
        "description": "A lakeside scene beneath snow capped mountains",
        "date": "2023",
        "location": "Lake Tahoe, California",
        "story": "Crystal blue water meets a rugged shoreline of giant boulders and evergreen trees. In the distance, snow covered peaks create a dramatic backdrop. The image captures the peaceful rhythm of the lake and the raw beauty of high altitude landscapes shaped by time and weather."
      },
      {
        "id": 11,
        "url": "/assets/hawkhill.png",
        "title": "Hawk Hill Horizon",
        "category": "Nature",
        "description": "A calm pastel sunrise above the ocean",
        "date": "2023",
        "location": "Hawk Hill, California",
        "story": "The sky fades from deep blue to warm gold as the sun rises beyond the curve of the ocean. This moment captures the quiet stillness before the day begins, with the coastline silhouetted gently against the morning light. It feels like standing at the edge of a new beginning."
      },
      {
        "id": 12,
        "url": "/assets/lantang.png",
        "title": "Langtang Ridge",
        "category": "Travel",
        "description": "Sharp Himalayan ridges leading toward a massive snow peak",
        "date": "2022",
        "location": "Langtang Region, Nepal",
        "story": "High in the Himalayas, ancient rock layers rise toward a towering snow covered summit. The dramatic contrast between rugged brown ridges and the bright white peak reveals the raw power of mountain formation. This landscape embodies both harshness and overwhelming beauty."
      },
      {
        "id": 13,
        "url": "/assets/annapurna.png",
        "title": "Annapurna Trail",
        "category": "Travel",
        "description": "Trekkers walking along a golden hillside beneath snowy mountains",
        "date": "2022",
        "location": "Annapurna Sanctuary, Nepal",
        "story": "A group of trekkers moves steadily through golden grasses, dwarfed by the enormous silver walls of Annapurna. The vastness of the scene emphasizes the humility and determination of human exploration. This image captures the soul of Himalayan trekking: challenge, companionship, and awe."
      },
      {
        "id": 14,
        "url": "/assets/tshorolpa.png",
        "title": "Tsho Rolpa Glacier Lake",
        "category": "Nature",
        "description": "A frozen glacial lake surrounded by sharp snow covered mountains",
        "date": "2022",
        "location": "Tsho Rolpa, Nepal",
        "story": "Cold air hangs still above the massive glacier lake as ridges of ice and rock stretch toward the horizon. The landscape feels untouched and imposing, sculpted by centuries of snow and wind. A boot resting in the foreground reminds us of the human presence in this high altitude world."
      },
      {
        "id": 15,
        "url": "/assets/ZVE02111.jpg",
        "title": "Hidden Cove",
        "category": "Nature",
        "description": "A peaceful blue cove framed by pines and rocky shoreline",
        "date": "2023",
        "location": "Lake Tahoe, California",
        "story": "Crystal clear water washes gently into a small cove shaded by tall pines. Beyond the rocks, distant snowy mountains rise above the lake. The combination of blue, green, and granite tones makes this scene feel like a quiet escape on a perfect alpine day."
      }
    ]
  }
};

export default contentData;

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  return (
    <>
      <Head>
        <title>Regan Maharjan</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </Head>
      <header>
        <div id="mobile-menu-open" className="shadow-large">
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <nav>
          <div id="mobile-menu-close">
            <span>Close</span> <i className="fa fa-times" aria-hidden="true"></i>
          </div>
          <ul id="menu" className="shadow">
            <li><Link href="#about">About</Link></li>
            <li><Link href="#experience">Experiences</Link></li>
            <li><Link href="#education">Education</Link></li>
            <li><Link href="#projects">Projects</Link></li>
            <li><Link href="#skills">Skills</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="lead">
          <div id="lead-content">
            <h1>Regan Maharjan</h1>
            <h2>Software Engineer</h2>
            <a href="./regan_maharjan_resume.pdf" className="btn-rounded-white">Download Resume</a>
          </div>
          <div id="lead-overlay"></div>
          <div id="lead-down">
            <span>
              <i className="fa fa-chevron-down" aria-hidden="true"></i>
            </span>
          </div>
        </section>

        <section id="about">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h2 className="heading">About Me</h2>
              </div>
              <div className="col-md-8">
                <p>
                  I am a Member Engagement Lead at UMDSAB and a Computer Consultant at the University of Michigan...
                  {/* Truncated for brevity */}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="background-alt">
          <h2 className="heading">Experience</h2>
          <div id="experience-timeline">
            <div data-date="Jan 2024 – Present">
              <h3>Open Learning Exchange (OLE), Boston, MA</h3>
              <h4>Software Engineer Intern</h4>
              <ul>
                <li>
                  Developed and tested the open-source Learning Management System (LMS)...
                </li>
                <li>
                  Implemented an automation pipeline leveraging the Google Translate API...
                </li>
              </ul>
            </div>
            {/* Add more experience entries as needed */}
          </div>
        </section>

        <section id="education">
          <h2 className="heading">Education</h2>
          <div className="education-block">
            <h3>University of Michigan- Dearborn</h3>
            <span className="education-date">Graduating Dec 2024</span>
            <h4>Masters of Sciences in Computer and Information Sciences</h4>
            <p>
              Activities and societies: GDSU - UMD, Students Activities Board...
            </p>
          </div>
          {/* Add more education blocks as needed */}
        </section>

        <section id="projects" className="background-alt">
          <h2 className="heading">Projects</h2>
          <div className="container">
            <div className="row">
              <div className="project shadow-large">
                <Image src="/images/epaath.png" alt="EPaath" width={500} height={300} />
                <div className="project-info">
                  <h3>EPaath - E-learning for Kids</h3>
                  <p>
                    E-Paath is a collection of digital interactive learning activities...
                  </p>
                  <Link href="http://epaath.olenepal.org/">View Project</Link>
                </div>
              </div>
              {/* Add more project entries as needed */}
            </div>
          </div>
        </section>

        <section id="skills">
          <h2 className="heading">Skills</h2>
          <ul>
            <li>JavaScript</li>
            <li>ReactJS</li>
            <li>Unity</li>
            <li>C#</li>
            <li>HTML</li>
            <li>CSS</li>
            <li>Git</li>
          </ul>
        </section>

        <section id="contact">
          <h2>Get in Touch</h2>
          <form method="POST" action="https://formspree.io/f/{your_form_id}">
            <input
              type="email"
              name="_replyto"
              placeholder="Your email"
              required
            />
            <textarea
              name="message"
              placeholder="Your message"
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-5 copyright">
              <p>Copyright &copy; 2024 Regan Maharjan</p>
            </div>
            <div className="col-sm-5 social">
              <ul>
                <li>
                  <Link href="https://github.com/reganmaharjan">
                    <i className="fa fa-github" aria-hidden="true"></i>
                  </Link>
                </li>
                {/* Add more social links */}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;

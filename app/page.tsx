"use client";

import { FormEvent, useState } from "react";

const A = "/assets/";

const principles = [
  ["developer.webp", "Learning & Development"],
  ["direction.webp", "Mindful Personal Guidance"],
  ["thumb.webp", "Constructive Feedback"],
  ["flag.webp", "Inclusive & Open-Culture"],
  ["guarantee.webp", "Innovation & Quality First"],
  ["rocket.webp", "Proactive Implementation"],
  ["handshake.svg", "Best & Global Opportunities"],
  ["technology.webp", "Work with Latest Technology"],
];

const delivery = [
  ["Dedicated teams", "You are given a Product Manager, Tech Lead, Developers and a UX Specialist."],
  ["Daily communication", "Our Delivery system ensures proactive updates, which means you are never in the dark."],
  ["Rapid executions", "Our weekly sprints help in prioritizing tasks and focus on building the MVP fast."],
  ["Predictable ROI", "Our process management gives you predictable measures to plan a solid product launch."],
];

const portfolio = [
  {
    name: "TalentHub",
    logo: "talent-hub-colored.webp",
    image: "talenthub.dcfd5067.webp",
    header: "TalentHub is a global talent search tool for IT recruitment that helps businesses reduce recruitment costs and find the perfect expertise.",
    body: "It offers an AI-powered talent search engine that sources, filters, and connects highly-qualified engineers, and helps recruiters generate a talent pool efficiently. TalentHub also helps recruiters find the right contact details for candidates and create lists of ideal candidates that can be exported easily.",
    tech: ["React", "Node.js", "MongoDB", "UI Development", "UI Design", "Javascript", "HTML", "CSS", "ExpressJS", "Next.js", "AWS Lambda", "AWS"],
    url: "https://talenthub.avena.co/",
  },
  {
    name: "intime",
    logo: "intime.svg",
    image: "intime.18ec6b74.jpg",
    header: "Easy to use employee time tracking software with built-in invoicing and powerful analytics.",
    body: "This app simplifies project management by tracking time, costs, and invoices. Its user-friendly interface allows for easy logging of hours and costs, viewing of employee hours, and creating professional-looking invoices. You can also track unpaid invoices for timely payments.",
    tech: ["Node.js", "MongoDB", "React", "Web Front-end Development", "Web Back-end Development", "UI Development", "Javascript", "HTML", "CSS", "ExpressJS"],
    url: "https://intimeapp.io/",
  },
  {
    name: "Retrace",
    logo: "retrace.svg",
    image: "retrace.40e0530a.jpg",
    header: "How Retrace filled the oral care system gap with an AI solution",
    body: "Retrace is an AI and cloud-based implementation that offers oral health care providers a precise payment, complete billing and office solution that connects entire practices.",
    tech: ["Node.js", "React.js", "MongoDB", "AWS S3", "AWS Lambda", "Flask", "Kubernetes", "Amazon EKS", "Python", "Data Science", "Deep Learning", "C#", "QA Testing"],
  },
  {
    name: "Raxar",
    logo: "raxar.svg",
    image: "raxar.80fe41c2.jpg",
    header: "How Raxar built an organization management solution for multi-functioned companies",
    body: "Raxar provides a multi-content management tool to help organizations operate, plan, design, assign and share different components of an organization.",
    tech: ["QA Testing", "React", "PHP", "HTML", "Laravel", "Swift", "Objective-C", "Web Front-end Development", "Mobile App Development", "Node.js", "Javascript", "AWS Lambda"],
  },
  {
    name: "Arabic Quran",
    logo: "arabic.svg",
    image: "arabic.61cfb903.jpg",
    header: "The Arabic Quran project is an application for learning the Arabic language through the Quran.",
    body: "The application is designed to help users improve their Arabic language skills by reading and understanding the Quran, in addition to providing the features of a typical Quran application, such as searching for specific verses and marking favorite passages.",
    tech: ["React Native", "Mobile Development", "Front-end Development", "Javascript", "Firebase", "Android App", "iOS App"],
  },
  {
    name: "Duzeyligi",
    logo: "duzey_ligi.svg",
    image: "duzey_ligi.324bf7c4.jpg",
    header: "Boost Your Business with Duzeyligi: The User-Friendly App for Setting Sales Goals and Tracking Performance",
    body: "Duzeyligi is a mobile app that helps market sellers track sales, compare performance with others, and earn rewards. It lets sellers set goals, track progress, and compete for cash prizes.",
    tech: ["React Native", "Firebase", "Mobile Development", "Javascript", "Node.js", "Android App", "iOS App"],
  },
  {
    name: "Raxar App",
    logo: "raxar-app.svg",
    image: "raxar-app.ae5b03e8.jpg",
    header: "Raxar helps enterprise organizations’ operations teams eliminate paper and Excel-based workflows.",
    body: "The platform gives field and operations teams a connected, mobile-first way to capture, manage and act on organizational data.",
    tech: ["QA Testing", "PHP", "Laravel", "Swift", "Objective-C", "Mobile App Development", "Web Back-end Development", "Node.js", "Javascript", "AWS Lambda"],
  },
];

const services = [
  ["Custom Enterprise Application", "Development", "AVENA has extensive experience developing custom enterprise applications for companies across industries. We develop tailored custom software solutions to fit your specific requirements, so you'll get the best software possible."],
  ["Software Product", "Development", "Let's begin a conversation about your new ideas or ongoing projects that need the fresh and innovative touch of our expert developers."],
  ["Custom Web Application", "Development", "AVENA provides custom web application development services to build cost-effective web applications that are secure, scalable, accessible, and maintainable."],
  ["Custom Mobile App", "Development", "We create high-performance apps for iOS and Android. Our developers build native, hybrid, and cross-platform products."],
  ["Software Enhancement and", "Modernization, Project Recovery", "We use modern technologies to lengthen the life of legacy systems and help finish troubled projects before deadlines."],
];

const expertise = [
  ["expertise_1.webp", "#e7f8ee", "Web Application", "Development", "AVENA is a web application development company you can trust with the engineering of impactful, efficient, and easy-to-use corporate and customer-facing websites, web apps, and web portals.", "Our product delivery expertise includes Consumer and Enterprise Web Apps, Web Portals, Customer-Facing Apps, Online Stores, Healthcare & Facility Management Apps."],
  ["expertise_2.webp", "#fdf1f1", "Mobile Application", "Development", "Mobile app development services are aimed at building iOS & Android applications that effectively complement or substitute web solutions. AVENA ensures app success by delivering striking UI, secure app code, and resilient back ends.", "Our expertise includes Mobile Consulting, Mobile UI/UX, Frontend and Backend Development, and App Integration."],
  ["expertise_3.webp", "#ebf6fd", "Artificial Intelligence (AI)", "Development", "We develop custom AI applications using machine learning, natural language processing, and computer vision, and integrate AI into existing systems and processes.", "Our AI expertise includes Optimization, Classification & Clustering, Computer Vision and Predictive Modeling."],
  ["expertise_4.webp", "#e9eafa", "User Experience", "and Design", "UI/UX design maximizes user satisfaction by improving usability and accessibility. A well-designed product looks great, has intuitive navigation, and provides a smooth and efficient experience.", "Our expertise includes web and mobile UI, UX research, user flows, wireframes and prototypes."],
];

const gettingStarted = [
  ["Tell Us About Your Project", "Our senior technology consultants will help you define your goals and objectives, find out if we're a good fit, and discuss the budget and timeline."],
  ["Get a Quote", "Once you know what you want, we'll provide a quote to complete your project with the best possible value for your budget."],
  ["Meet Your Development Team", "Meet the specialists who will bring your product to life and establish the rhythm of communication."],
  ["Start the Project", "We keep the lines of communication open with day-to-day updates and transparent delivery."],
  ["Successful Delivery", "You've hit the finish line. We help implement your customized software and provide support after launch."],
];

const howWeWork = [
  ["Understanding Your Business", "Tell us your needs, desired functionality, and business methods. We build scalable and flexible software you can adapt down the road."],
  ["In-depth Discussion", "We begin every relationship with an in-depth discussion about the short and long-term desires for your project."],
  ["Scrum", "We use the Scrum framework so everyone works together innovatively and productively to solve complex problems with a transparent process."],
  ["Requirement Analysis", "Our engineers review hidden requirements and your existing codebase to understand your goals and ensure a smooth development stage."],
  ["Create an Effective Action Plan", "We work with you to create a development plan that aligns with your goals, timeline, and operating budget."],
  ["IPR Protection", "AVENA keeps your information, data, and business processes secure and protects your intellectual property rights."],
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a className={`logo ${light ? "logo-light" : ""}`} href="#top" aria-label="Avena home">
      <span className="logo-mark">A</span><span>vena</span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top">
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
          <nav className={menuOpen ? "nav-open" : ""} aria-label="Primary navigation">
            <a href="#about-us" onClick={closeMenu}>About Us</a>
            <a href="#methodology" onClick={closeMenu}>Our Methodology</a>
            <a href="#portfolio" onClick={closeMenu}>Portfolio</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#our-expertise" onClick={closeMenu}>Our Expertise</a>
            <a href="#how-to-get-started" onClick={closeMenu}>How To Get Started</a>
            <a href="#how-we-do-it" onClick={closeMenu}>How We Do It</a>
          </nav>
          <a className="button header-cta" href="#contact-us">Contact Us</a>
        </div>
      </header>

      <section className="hero shell">
        <picture>
          <source media="(max-width: 767px)" srcSet={`${A}landing-background-mobile.webp`} />
          <img src={`${A}landing-background.webp`} alt="Digital software products by Avena" />
        </picture>
        <div className="hero-copy">
          <h1>Unleash the Power of Digital Transformation with AVENA</h1>
          <p>Contact Us Today to Transform Your Business with Custom Software Solutions</p>
        </div>
      </section>

      <section className="product-banners shell" aria-label="Avena products">
        <article className="product-banner talent">
          <img className="product-bg" src={`${A}banner-background-1.bf09f20f.webp`} alt="" />
          <div className="product-content"><img src={`${A}talent-hub-white.webp`} alt="TalentHub" /><h2>Find your next great hire.</h2><p>Search what you are looking for and get the best-matches.</p><a className="button light-button" href="https://talenthub.avena.co/" target="_blank" rel="noreferrer">Visit TalentHub →</a></div>
        </article>
        <article className="product-banner intime">
          <img className="product-bg" src={`${A}banner-background-3.28c28050.webp`} alt="" />
          <div className="product-content"><img className="intime-logo" src={`${A}intime.webp`} alt="intime" /><h2>Get Paid Faster</h2><p>Easy to use employee time tracking software with built-in invoicing and powerful analytics.</p><a className="button light-button" href="https://intimeapp.io/" target="_blank" rel="noreferrer">Visit intime →</a></div>
        </article>
      </section>

      <section className="about shell" id="about-us">
        <div className="about-copy"><p className="eyebrow">About Us</p><h2>Technology with a human point of view.</h2><p>AVENA is a custom software development company that delivers customized solutions for businesses. Our experienced team of senior consultants assists in digital transformation, providing progressive and innovative technology solutions that can change lives and improve businesses.</p><a className="button outline-button" href="#contact-us">Learn more</a></div>
        <div className="principles"><h3>Principles</h3><div className="principles-grid">{principles.map(([image, title]) => <div className="principle" key={title}><img src={`${A}${image}`} alt="" /><span>{title}</span></div>)}</div></div>
      </section>

      <section className="methodology shell" id="methodology">
        <div><p className="eyebrow light-text">Our Methogology</p><p>At AVENA, we agile your products to success. After a definite period of time, through the agile way, you don’t just get one, but multiple functionalities of your product. Developers, Designers, and Testers work simultaneously and co-dependently.</p><p>We start by breaking the app development cycle into tasks and subtasks, each performed simultaneously after being assigned to our teams.</p><a className="button light-button" href="#how-we-do-it">Learn More</a></div>
        <img src={`${A}handshake-2.webp`} alt="Avena partnership" />
      </section>

      <section className="delivery shell">
        <h2>At Avena, we don’t just talk about great products. We make them with our clients.</h2>
        <div className="delivery-grid">{delivery.map(([title, body]) => <article key={title}><span className="check"><img src={`${A}checkmark.svg`} alt="" /></span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
      </section>

      <section className="portfolio" id="portfolio">
        <div className="shell"><h2 className="section-title">Portfolio</h2>{portfolio.map((project, index) => <article className="portfolio-item" key={project.name}><div className="project-copy"><div className="project-logo"><img src={`${A}${project.logo}`} alt={project.name} /></div><h3>{project.header}</h3><p>{project.body}</p><hr /><h4>Technologies</h4><div className="tags">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>{project.url && <a className="button outline-button" href={project.url} target="_blank" rel="noreferrer">Visit site →</a>}</div><div className="project-image"><img src={`${A}${project.image}`} alt={`${project.name} project sample`} loading={index > 1 ? "lazy" : "eager"} /></div></article>)}</div>
      </section>

      <section className="services shell" id="services">
        <div className="section-intro"><h2 className="section-title">Services</h2><p>We provide high-quality, cost-effective, reliable, full-cycle bespoke software development that matches your specific needs, budget, and timeframe. Increase your competitive advantage with a custom solution.</p></div>
        <div className="services-description"><p>Custom software development is the process of designing, implementing, testing, and deploying software custom built to fit your organization’s requirements.</p><p>We can create new custom software solutions, improve existing solutions, modernize legacy systems, and integrate new systems with existing ones.</p></div>
        <div className="service-grid">{services.map(([part1, part2, text], index) => <article className="service-card" key={part1}><img className="service-art" src={`${A}options_${index + 1}.webp`} alt="" /><div><img className="service-icon" src={`${A}service_icon_${index + 1}.webp`} alt="" /><h3>{part1}<br />{part2}</h3><p>{text}</p></div></article>)}<a className="get-in-touch" href="#contact-us">Get in Touch<br />With Us <span>→</span></a></div>
      </section>

      <section className="expertise" id="our-expertise">
        <div className="shell"><h2 className="section-title">Our Expertise</h2><div className="expertise-grid">{expertise.map(([image, color, title1, title2, body1, body2]) => <article className="expertise-card" key={title1}><div className="expertise-image" style={{ backgroundColor: color }}><img src={`${A}${image}`} alt="" /></div><div className="expertise-body"><h3>{title1}<br />{title2}</h3><p>{body1}</p><p>{body2}</p></div></article>)}</div></div>
      </section>

      <section className="getting-started shell" id="how-to-get-started">
        <h2 className="section-title">How To Get Started</h2>
        <div className="steps-list">{gettingStarted.map(([title, body], index) => <article key={title}><span>{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className="how-we-work" id="how-we-do-it">
        <div className="shell"><h2 className="section-title">How We Do It</h2><div className="work-grid">{howWeWork.map(([title, body], index) => <article key={title}><span>{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div>
      </section>

      <section className="contact shell" id="contact-us">
        <div className="contact-heading"><p>Get in Touch</p><h2>Let’s discuss<br />your project</h2><a href="mailto:info@avena.co">info@avena.co</a></div>
        <form onSubmit={submitContact}><label><span>Name</span><input name="name" autoComplete="name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label><label className="message-field"><span>Tell us about your project</span><textarea name="message" rows={4} required /></label><button className="button" type="submit">Send message →</button>{sent && <p className="form-success" role="status">Thank you. Your message is ready for our team.</p>}</form>
      </section>

      <footer>
        <div className="footer-inner shell"><div className="footer-brand"><Logo light /><a href="mailto:info@avena.co">info@avena.co</a><p>Dubai Silicon Oasis, DDP, Building A2,<br />Unit 101, Dubai, UAE</p></div><div><h3>Learn More</h3><a href="#about-us">About Us</a><a href="#methodology">Our Methodology</a><a href="#portfolio">Portfolio</a><a href="#services">Services</a></div><div><h3>Our Expertise</h3><a href="#our-expertise">Web Application Development</a><a href="#our-expertise">Mobile Application Development</a><a href="#our-expertise">Artificial Intelligence Development</a><a href="#our-expertise">User Experience and Design</a></div><div><h3>Connect</h3><a href="https://www.linkedin.com/company/avena-co/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div>
        <div className="copyright shell">Copyright © 2026 AVENA. All rights reserved.</div>
      </footer>
    </main>
  );
}

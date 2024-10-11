import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Nda David Yao",
  initials: "DV",
  url: "https://dillion.io",
  location: "USA",
  locationLink: "https://www.google.com/maps/place/sanfrancisco",
  description:
    "Software Engineer and Teacher. I love building things and teaching people. Why? Because the best way to learn is to teach.",
  summary:
    "Senior Software Engineer with 8 years of experience designing and developing business applications. Skilled in TypeScript, React, and Java. Strong understanding of software principles, OOP, and data structures.",
  avatarUrl:
    "https://github.com/daviidy/daviidy/raw/master/0-removebg-preview.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Ruby",
    "Java",
    "Postgres",
    "Docker",
    "Kubernetes",
    "Java",
    "Spring Boot",
    "Laravel",
    "Netflix Eureka",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "nda.yao94@gmail.com",
    tel: "+1 641-451-4016",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/daviidy",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/nda-yao/",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/davidyao_dev",
        icon: Icons.x,

        navbar: true,
      },
      Youtube: {
        name: "Youtube",
        url: "https://www.youtube.com/@davidyao_dev",
        icon: Icons.youtube,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  work: [
    {
      company: "TecPatri",
      href: "https://www.youtube.com/@TecPatri",
      badges: [],
      location: "Remote",
      title: "Podcast Host",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/D560BAQFfYX0LwWhdhQ/company-logo_100_100/company-logo_100_100/0/1725892648860?e=1735776000&v=beta&t=weeVwu4s_3r4f2v8nfyhJrDDmlmzx5MPDKuGwrrVbZs",
      start: "Mar 2024",
      end: "Present",
      description:
        "Host of a popular tech industry podcast, featuring expert guests from various sectors, providing valuable insights on their professional journeys. Garnered thousands of views on YouTube, with audience growth of 30% quarter-over-quarter.",
    },
    {
      company: "Maagot",
      badges: [],
      href: "https://maagot.com/",
      location: "Remote",
      title: "CTO & Co-Founder",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/D4E0BAQFCwLIReDxBlg/company-logo_100_100/company-logo_100_100/0/1725627214586/maagot_logo?e=1735776000&v=beta&t=hgOcGeNn3XuooOv95qyLIUcie3XqkCy4we7KZEMIeAU",
      start: "Mar 2024",
      end: "Aug 2024",
      description:
        "Spearheaded the development of a seamless online transaction platform, leveraging Spring Boot, API Gateway, EC2, and Heroku. Reduced transaction processing time by 40% and ensured 99.95% platform uptime, handling cross-network transactions with a volume increase of 300% within the first 6 months.",
    },
    {
      company: "Oschool",
      href: "https://oschooluniversity.com/",
      badges: [],
      location: "Abidjan, Ivory Coast",
      title: "Senior Software Engineer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQG6vM59bmFm1g/company-logo_100_100/company-logo_100_100/0/1631307261030?e=1735776000&v=beta&t=-7rUAVaBWMnXyY6JJgt8JsnxHAsipYUWqLHQLx6o9SM",
      start: "Oct 2023",
      end: "Aug 2024",
      description:
        "Implemented 5 features in a microservices architecture in Spring Boot to reduce churn rate by 7%",
    },
    {
      company: "LTSE",
      href: "https://ltse.com",
      badges: [],
      location: "San Francisco, CA",
      title: "Senior Software Engineer III",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/D560BAQGzZay-icPaGQ/company-logo_100_100/company-logo_100_100/0/1692214213101/ltse_logo?e=1735776000&v=beta&t=eyMNW3EfxhS1sby9-Kb8g9D1FGDS35M-0uZHANi7yrA",
      start: "July 2022",
      end: "July 2023",
      description:
        "Conducted 12 pair programming sessions to help 2 engineers deliver and monitor successfully their project in 30 days.",
    },
    {
      company: "My Opinion",
      href: "https://www.linkedin.com/company/myopinion.ci",
      badges: [],
      location: "Abidjan, Ivory Coast",
      title: "Lead Software Engineer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQEuzENnNDUPmQ/company-logo_100_100/company-logo_100_100/0/1660049083955?e=1735776000&v=beta&t=o7P3KpN-Rr2RUHQlCgVzwVtuKWnPWYAExdVkkmmHPbA",
      start: "Aug 2021",
      end: "June 2022",
      description:
        "Led the development of a robust backend API from scratch, utilizing Ruby on Rails, Spring Boot, AWS, and React Native, resulting in a highly scalable infrastructure that reduced backend latency by 30% and improved data processing speeds by 25%, supporting early user adoption and engagement.",
    },
    {
      company: "Book Medial",
      href: "https://www.linkedin.com/company/myopinion.ci",
      badges: [],
      location: "Abidjan, Ivory Coast",
      title: "Lead Software Engineer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQFfaTgKh8gTCw/company-logo_100_100/company-logo_100_100/0/1630615031022?e=1735776000&v=beta&t=pWScfJFmVtTl4rAqm7Fiulb1442E9KYh4ev6K928vJE",
      start: "Dec 2020",
      end: "Feb 2022",
      description:
        "Developed 35 REST APIs using Java/Spring Boot, Kafka, and SQL that increased data access efficiency by 30% for thousands of users across networks.",
    },
    {
      company: "Microverse",
      href: "https://www.linkedin.com/company/myopinion.ci",
      badges: [],
      location: "San Francisco, CA",
      title: "Student Project Reviewer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C560BAQHr8P7gQ95yCQ/company-logo_100_100/company-logo_100_100/0/1630603594760/microverseinc_logo?e=1735776000&v=beta&t=BUNglCIbgKwZmc1TBT55cw6E1PSF2_WhZ0KTh83YCHk",
      start: "Dec 2020",
      end: "Oct 2021",
      description:
        "Led development of company projects and facilitated academic graduation projects for students in 100+ countries through an off-shore model from Abidjan, Ivory Coast.",
    },
    {
      company: "Elavoo",
      href: "https://www.linkedin.com/company/myopinion.ci",
      badges: [],
      location: "Abidjan, Ivory Coast",
      title: "Senior Software Engineer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQEuzENnNDUPmQ/company-logo_100_100/company-logo_100_100/0/1660049083955?e=1735776000&v=beta&t=o7P3KpN-Rr2RUHQlCgVzwVtuKWnPWYAExdVkkmmHPbA",
      start: "Jun 2018",
      end: "Jun 2020",
      description:
        "Improved code quality by achieving an average of 45% increase in test coverage through TDD",
    },
    {
      company: "Open Classrooms",
      href: "https://openclassrooms.com",
      badges: [],
      location: "Abidjan, Ivory Coast",
      title: "Software Engineer Mentor",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/D4E0BAQGGjlGUHa2png/company-logo_100_100/company-logo_100_100/0/1665412802239/openclassrooms_logo?e=1735776000&v=beta&t=4o2UKma4rzer-vthAeoeVlo9h79fCf9Vxs6JJ9LizF4",
      start: "Aug 2021",
      end: "Jun 2022",
      description:
        "Spent more than 40 hours per month following several students in order to help them validate their training path at openclassrooms.com",
    },
    {
      company: "Oschool",
      href: "https://oschooluniversity.com/",
      badges: [],
      location: "Abidjan, Ivory Coast",
      title: "Software Engineer",
      logoUrl:
        "https://media.licdn.com/dms/image/v2/C4E0BAQG6vM59bmFm1g/company-logo_100_100/company-logo_100_100/0/1631307261030?e=1735776000&v=beta&t=-7rUAVaBWMnXyY6JJgt8JsnxHAsipYUWqLHQLx6o9SM",
      start: "Oct 2015",
      end: "Apr 2018",
      description:
        "Delivered 13 features on time by creating hundreds of milestones and user stories with Scrum methodology.",
    },
  ],
  education: [
    {
      school: "Maharishi International University",
      href: "https://www.miu.edu/",
      degree: "Master's degree in Computer Science",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/en/1/14/Maharishi_International_University_logo_1.png",
      start: "2021",
      end: "2024",
    },
    {
      school: "ESATIC",
      href: "https://esatic.ci",
      degree: "Bachelor's Degree in Network Telecommunications",
      logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNNq__NJypljRSOPGpSlekdwS_RDSsjMRGlQ&s",
      start: "2012",
      end: "2015",
    },
  ],
  projects: [
    {
      title: "Redis server",
      href: "https://github.com/daviidy/redis-server",
      dates: "Apr 2024",
      active: true,
      description:
        "Redis is an in-memory data structure store often used as a database, cache, message broker and streaming engine. In this challenge I built my own Redis server",
      technologies: ["Ruby", "Shell"],
      links: [
        {
          type: "Source",
          href: "https://github.com/daviidy/redis-server",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image:
        "https://www.tothenew.com/blog/wp-ttn-blog/uploads/2023/09/redis_logo-1.png",
      video: "",
    },
    {
      title: "HTTP server",
      href: "https://github.com/daviidy/codecrafters-http-server-java",
      dates: "Apr 2024",
      active: true,
      description:
        "HTTP is the protocol that powers the web. In this challenge, I buildta HTTP server that's capable of handling simple GET/POST requests, serving files and handling multiple concurrent connections. Along the way, I learnt about TCP connections, HTTP headers, HTTP verbs, handling multiple connections and more.",
      technologies: ["Java", "Shell"],
      links: [
        {
          type: "Website",
          href: "https://github.com/daviidy/codecrafters-http-server-java",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/daviidy/codecrafters-http-server-java",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image:
        "https://assets.gcore.pro/blog_containerizing_prod/uploads/2023/02/lg-2.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Real-Time Polling App with MERN Stack",
      dates: "2024",
      location: "USA",
      description:
        "Built a real-time polling app using the MERN stack and Chart.js",
      image:
        "https://www.educative.io/cdn-cgi/image/format=auto,width=384,quality=75/v2api/collection/6586453712175104/5960158518837248/image/4746684446146560",
      links: [
        {
          title: "Github",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/cryptotrends/cryptotrends",
        },
      ],
    },
    // {
    //   title: "Hack The North",
    //   dates: "September 14th - 16th, 2018",
    //   location: "Waterloo, Ontario",
    //   description:
    //     "Developed a mobile application which delivers university campus wide events in real time to all students.",
    //   image:
    //     "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-the-north.png",
    //   mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
    //   links: [],
    // },
  ],
} as const;

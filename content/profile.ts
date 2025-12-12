export type ProfileLink = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  company: string;
  title: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const profile = {
  name: "Harel Coman",
  title: "Staff Engineer & AI Lead",
  location: "Tel Aviv District, Israel",
  yearsExperience: "10+ years",
  tagline:
    "Staff-level front-end leader who still ships hands-on — building scalable UI infrastructure, raising quality bars (performance/a11y), and scaling developer leverage with an AI-first approach.",
  bio: [
    "I’m a Staff Engineer & AI Lead at Verbit.ai, with over 10 years of experience building and scaling modern web and mobile applications.",
    "I lead UI infrastructure, architecture, and front-end strategy across multiple products — focusing on performance, accessibility, CI/CD automation, and an AI-first approach to development.",
    "I’m passionate about mentoring engineers, improving developer experience, and driving cross-team alignment between product, design, and architecture.",
  ],
  highlights: [
    "UI architecture & infrastructure across multiple products",
    "Performance and accessibility (a11y) as default standards",
    "CI/CD automation and developer experience (DX)",
    "AI-first engineering workflows and enablement",
    "Hands-on delivery on high-leverage initiatives",
    "Mentoring, hiring, and raising FE quality bars",
  ],
  links: [
    { label: "Email", href: "mailto:haco29@gmail.com" },
    { label: "GitHub", href: "https://github.com/haco29" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/harel-coman-16703289/" },
    { label: "DEV.to", href: "https://dev.to/haco29/series/34035" },
  ] satisfies ProfileLink[],
  experience: [
    {
      company: "Verbit.ai",
      title: "Staff Engineer & AI Lead",
      start: "Dec 2025",
      end: "Present",
      bullets: [
        "Acts as a senior technical leader shaping front-end architecture, system quality, and long-term technical strategy across products.",
        "Leads and executes cross-team initiatives (shared UI components, platform gaps, infra improvements, and DX enhancements) while staying ~50% hands-on in code.",
        "Drives standards for performance, accessibility, testing, and maintainability — with practical guardrails that scale across teams.",
        "Owns the strategy and implementation of AI-driven developer experience (DX) improvements across engineering.",
        "Evaluates and deploys AI coding assistants and AI-powered workflows, and trains engineers to use them effectively for real daily leverage.",
        "Defines safe, compliant AI practices (privacy, data handling, security) and builds internal AI integrations to streamline CI/CD, debugging, documentation, and code review.",
      ],
    },
    {
      company: "Verbit.ai",
      title: "Frontend Tech Lead",
      start: "Mar 2024",
      end: "Dec 2025",
      bullets: [
        "Led front-end architecture, infrastructure, and cross-app UI initiatives.",
        "Collaborated with VP Architecture, VP R&D, and CTO on strategic FE decisions.",
        "Built and scaled the front-end team — hiring, onboarding, and mentoring engineers.",
        "Drove accessibility, testing, and responsive design standards across products.",
        "Improved CI/CD pipelines with Slack automation, library versioning, and a11y tools.",
        "Acted as the focal point for design and Figma approvals.",
        "Championed an AI-driven engineering mindset across product development.",
      ],
    },
    {
      company: "Verbit.ai",
      title: "Senior Frontend Developer",
      start: "Jun 2023",
      end: "Mar 2024",
      bullets: [],
    },
    {
      company: "Gloat",
      title: "Mobile Team Lead",
      start: "Sep 2021",
      end: "Jun 2023",
      bullets: [
        "Led the mobile development team using React Native.",
        "Delivered high-impact features and managed releases to app stores.",
        "Contributed to large-scale web apps using React, Redux, Styled Components, and Storybook.",
      ],
    },
    {
      company: "Gloat",
      title: "Senior Frontend Developer",
      start: "Jan 2021",
      end: "Sep 2021",
      bullets: [],
    },
    {
      company: "Edea AMC Ltd",
      title: "Frontend Team Lead",
      start: "Jul 2020",
      end: "Jan 2021",
      bullets: [
        "Developed a complex ERP system using React and .NET Core.",
        "Established workflows and team practices around Scrum and Atlassian tools.",
        "Collaborated closely with design, QA, and backend teams for smooth delivery.",
      ],
    },
    {
      company: "Elbit Systems Ltd",
      title: "Full Stack Team Lead",
      start: "Sep 2016",
      end: "Dec 2019",
      bullets: [
        "Designed and delivered full web applications for defense clients worldwide.",
        "Migrated legacy ASP.NET systems to .NET Core and Angular.",
        "Built CI/CD pipelines using Jenkins and Python.",
        "Served as Scrum Master and coordinated development, QA, and client delivery.",
      ],
    },
  ] satisfies ExperienceItem[],
  skills: [
    {
      label: "Frontend",
      items: [
        "React",
        "TypeScript",
        "React Query",
        "Redux",
        "HTML",
        "CSS",
        "Accessibility (a11y)",
        "Performance optimization",
      ],
    },
    {
      label: "Mobile",
      items: ["React Native"],
    },
    {
      label: "Backend",
      items: ["Python", "C#", ".NET Core", "REST", "SQL"],
    },
    {
      label: "Tooling & CI/CD",
      items: ["Vite", "Webpack", "CircleCI", "Jenkins", "Git"],
    },
    {
      label: "Methodologies",
      items: ["Agile", "Scrum", "UI architecture", "Mentoring & leadership"],
    },
  ] satisfies SkillGroup[],
  education: [
    {
      school: "Tel Aviv University",
      degree: "B.Sc. Computer Science",
    },
  ],
} as const;

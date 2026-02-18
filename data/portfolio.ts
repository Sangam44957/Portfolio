import {
  SiReact, SiNodedotjs, SiExpress, SiPostgresql, SiMongodb,
  SiJavascript, SiCplusplus, SiPython, SiHtml5, SiCss3,
  SiTailwindcss, SiBootstrap, SiGit, SiDocker, SiLinux, SiVercel
} from "react-icons/si";

export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
  category: "frontend" | "backend" | "tools" | "languages";
  level: number;
}

export const personalInfo = {
  name: "Sangam",
  lastName: "Mehta",
  title: "Backend Developer",
  tagline: "Backend Engineer | Building Scalable APIs & Microservices",
  description: "Passionate backend developer specializing in Node.js, Express.js, and database optimization. Experienced in building RESTful APIs, implementing authentication systems, and architecting scalable microservices. Strong problem-solver with 250+ DSA problems solved and a 5-star rating in C++ on HackerRank.",
  email: "sangammehta44@gmail.com",
  phone: "+91 7015052100",
  location: "Phagwara, Punjab",
  resumeUrl: "/CV_202602131446017612_12323651.pdf",
  avatarUrl: "/avatar.jpg",
  availability: true,
  socials: {
    github: "https://github.com/Sangam44957",
    linkedin: "https://linkedin.com/in/mehtasangam77",
    twitter: "https://x.com/Sangam6931",
    instagram: "https://www.instagram.com/sangam.mehta.104/",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { label: "Projects Built", value: 3, suffix: "+" },
  { label: "DSA Solved", value: 250, suffix: "+" },
  { label: "Experience", value: 1, suffix: "y" },
  { label: "Technologies", value: 15, suffix: "+" },
];

export const skills: Skill[] = [
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "backend", level: 90 },
  { name: "Express.js", icon: SiExpress, color: "#ffffff", category: "backend", level: 88 },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "backend", level: 85 },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "backend", level: 82 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "languages", level: 92 },
  { name: "C++", icon: SiCplusplus, color: "#00599C", category: "languages", level: 90 },
  { name: "Python", icon: SiPython, color: "#3776AB", category: "languages", level: 85 },
  { name: "React.js", icon: SiReact, color: "#61DAFB", category: "frontend", level: 88 },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", category: "frontend", level: 95 },
  { name: "CSS3", icon: SiCss3, color: "#1572B6", category: "frontend", level: 90 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "frontend", level: 92 },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", category: "frontend", level: 85 },
  { name: "Git", icon: SiGit, color: "#F05032", category: "tools", level: 88 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", category: "tools", level: 75 },
  { name: "Linux", icon: SiLinux, color: "#FCC624", category: "tools", level: 80 },
  { name: "Vercel", icon: SiVercel, color: "#ffffff", category: "tools", level: 85 },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: "fullstack" | "ai" | "backend";
  year: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: "focusflow",
    title: "FocusFlow",
    description: "Task Management SaaS built with PERN Stack",
    longDescription: "Architected modular Node.js/Express.js backend with request validation and error handling. Implemented Google OAuth 2.0 and JWT session management with RBAC. Optimized PostgreSQL queries and indexing, reducing load latency by 30%.",
    image: "/projects/focusflow.jpg",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "React", "JWT", "OAuth 2.0"],
    liveUrl: "https://focusflow-drab.vercel.app/",
    githubUrl: "https://github.com/Sangam44957",
    featured: true,
    category: "fullstack",
    year: "2025",
    color: "#00f0ff",
  },
  {
    id: "ai-fashion",
    title: "AI Fashion Analyzer",
    description: "Backend API Service with Gemini API",
    longDescription: "Developed Flask backend with RESTful endpoints for image uploads and AI predictions. Integrated Gemini API with error handling, input validation, and response formatting. Implemented async processing for API calls, achieving 85% accuracy with fast response.",
    image: "/projects/ai-fashion.jpg",
    techStack: ["Python", "Flask", "Gemini API", "REST API", "Async Processing"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sangam44957",
    featured: true,
    category: "ai",
    year: "2025",
    color: "#7b61ff",
  },
  {
    id: "agroinnovate",
    title: "AgroInnovate",
    description: "Farmer Support Platform",
    longDescription: "Engineered backend services for real-time data aggregation from government APIs. Implemented API caching and optimized data-fetching logic, improving efficiency by 30%. Developed async JavaScript patterns for non-blocking calls, reducing response time by 20%.",
    image: "/projects/agroinnovate.jpg",
    techStack: ["PHP", "JavaScript", "REST API", "Caching", "Async Patterns"],
    liveUrl: "#",
    githubUrl: "https://github.com/Sangam44957",
    featured: false,
    category: "backend",
    year: "2025",
    color: "#00ff88",
  },
];

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl: string;
  duration: string;
  description: string[];
  techUsed: string[];
  type: "work" | "education" | "achievement";
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "AI Evaluation Specialist",
    company: "Alignerr",
    companyUrl: "#",
    duration: "Sep 2025 — Dec 2025",
    description: [
      "Built YAML-based evaluation scenarios testing implicit reasoning in AI assistants",
      "Designed test cases identifying reasoning gaps across frontier LLMs like GPT-5, Claude, and Gemini",
      "Validated work through automated QA system, producing multilingual annotations with 95% accuracy",
    ],
    techUsed: ["YAML", "AI Testing", "LLM Evaluation", "QA Systems"],
    type: "work",
  },
  {
    id: "exp-2",
    role: "AI Trainer",
    company: "Outlier",
    companyUrl: "#",
    duration: "Aug 2024 — Aug 2025",
    description: [
      "Evaluated AI-generated responses to enhance reasoning quality, factual accuracy, and alignment",
      "Completed multiple AI training and evaluation modules focused on model performance benchmarking",
      "Identified low-quality outputs through comparative analysis, providing structured feedback for improvement",
    ],
    techUsed: ["AI Training", "Model Evaluation", "Performance Benchmarking"],
    type: "work",
  },
  {
    id: "exp-3",
    role: "Bachelor of Technology in Computer Science",
    company: "Lovely Professional University",
    companyUrl: "#",
    duration: "Aug 2023 — Present",
    description: [
      "CGPA: 7.71",
      "Achieved 5-Star rating in C++ on HackerRank",
      "Solved 250+ DSA problems across LeetCode & GeeksforGeeks",
      "Completed certifications in Cloud Computing (NPTEL) and Web Development (IBM)",
    ],
    techUsed: ["DSA", "C++", "Problem Solving", "Cloud Computing"],
    type: "education",
  },
];

export const terminalCommands: Record<string, string> = {
  help: `
Available commands:
  about       — Learn about me
  skills      — View my tech stack
  projects    — List my projects
  contact     — Get my contact info
  experience  — View my work history
  resume      — Download my resume
  socials     — My social media links
  clear       — Clear terminal
  `,
  about: `
╔══════════════════════════════════════╗
║  👨💻 Sangam Mehta                   ║
║  Backend Developer                  ║
║  📍 Phagwara, Punjab                ║
║                                      ║
║  Building scalable backend systems  ║
╚══════════════════════════════════════╝
  `,
  skills: `
Backend:   Node.js ██████████░░ 90%
           Express ████████░░░░ 88%
Database:  PostgreSQL ████████░░░░ 85%
           MongoDB ████████░░░░ 82%
Languages: JavaScript ██████████░░ 92%
           C++ ██████████░░ 90%
  `,
  projects: `
[1] 🚀 FocusFlow        — Task Management SaaS
[2] 🤖 AI Fashion       — AI-powered fashion analyzer
[3] 🌾 AgroInnovate     — Farmer support platform
  `,
  contact: `
📧 Email:    sangammehta44@gmail.com
📱 Phone:    +91 7015052100
🐙 GitHub:   github.com/Sangam44957
💼 LinkedIn: linkedin.com/in/mehtasangam77
  `,
  experience: `
[2025]      AI Evaluation Specialist @ Alignerr
[2024-2025] AI Trainer @ Outlier
[2023-Now]  B.Tech CS @ LPU (CGPA: 7.71)
  `,
  resume: `📄 Downloading resume... ✅ Opening in new tab!`,
  socials: `
🐙 GitHub:    github.com/Sangam44957
💼 LinkedIn:  linkedin.com/in/mehtasangam77
  `,
};

export const testimonials = [
  {
    name: "Sangam Mehta",
    role: "Backend Developer",
    content: "Passionate about building scalable backend systems and solving complex problems."
  }
];

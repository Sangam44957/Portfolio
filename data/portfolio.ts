import type { IconType } from "react-icons";
import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiPython,
  SiFigma,
  SiRedis,
  SiPrisma,
  SiGraphql,
  SiFirebase,
  SiAmazon,
  SiLinux,
  SiCplusplus,
} from "react-icons/si";

/* ────────────────────────────────────
   Types
   ──────────────────────────────────── */

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
  level: number;
  category: "frontend" | "backend" | "languages" | "tools";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  category: "fullstack" | "ai" | "backend" | "mobile" | "3d";
  color: string;
  year: string;
  featured: boolean;
  image?: string;
}

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

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  verifyUrl: string;
  techLearned?: string[];
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  icon: string;
  link?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

/* ────────────────────────────────────
   Personal Info
   ──────────────────────────────────── */

export const personalInfo = {
  name: "Sangam",
  lastName: "Mehta",
  email: "sangammehta44@gmail.com",
  phone: "+91 7015052100",
  whatsapp: "+917015052100",
  location: "Phagwara, Punjab",
  tagline:
    "I craft robust backend systems and elegant APIs that scale — turning complex problems into simple, reliable solutions.",
  description:
    "I'm a backend-focused developer with a passion for building scalable, high-performance applications. With expertise in Node.js, Express, and databases like PostgreSQL, I specialize in designing clean APIs, optimizing queries, and architecting systems that handle real-world load.",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/avatar.jpg",
  socials: {
    github: "https://github.com/Sangam44957",
    linkedin: "https://linkedin.com/in/mehtasangam77",
    twitter: "https://x.com/Sangam6931",
    instagram: "https://www.instagram.com/sangam.mehta.104/",
    leetcode: "https://leetcode.com/u/SangamMehta/",
    hackerrank: "https://www.hackerrank.com/profile/sangammehta44",
    geeksforgeeks: "https://www.geeksforgeeks.org/profile/sangammxm4nh",
  },
} as const;

/* ────────────────────────────────────
   Navigation
   ──────────────────────────────────── */

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

/* ────────────────────────────────────
   Stats
   ──────────────────────────────────── */

export const stats: Stat[] = [
  { label: "Projects Completed", value: 5, suffix: "+" },
  { label: "DSA Problems", value: 250, suffix: "+" },
  { label: "HackerRank Rating", value: 5, suffix: "⭐" },
  { label: "CGPA", value: 7.71, suffix: "/10" },
];

/* ────────────────────────────────────
   Skills
   ──────────────────────────────────── */

export const skills: Skill[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: 90, category: "languages" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: 95, category: "languages" },
  { name: "Python", icon: SiPython, color: "#3776AB", level: 70, category: "languages" },
  { name: "C++", icon: SiCplusplus, color: "#00599C", level: 85, category: "languages" },
  { name: "React", icon: SiReact, color: "#61DAFB", level: 88, category: "frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", level: 85, category: "frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", level: 90, category: "frontend" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", level: 92, category: "backend" },
  { name: "Express.js", icon: SiExpress, color: "#ffffff", level: 90, category: "backend" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", level: 82, category: "backend" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: 80, category: "backend" },
  { name: "Redis", icon: SiRedis, color: "#DC382D", level: 70, category: "backend" },
  { name: "Prisma", icon: SiPrisma, color: "#2D3748", level: 78, category: "backend" },
  { name: "GraphQL", icon: SiGraphql, color: "#E10098", level: 72, category: "backend" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", level: 75, category: "tools" },
  { name: "Git", icon: SiGit, color: "#F05032", level: 88, category: "tools" },
  { name: "AWS", icon: SiAmazon, color: "#FF9900", level: 65, category: "tools" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", level: 72, category: "tools" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E", level: 60, category: "tools" },
  { name: "Linux", icon: SiLinux, color: "#FCC624", level: 75, category: "tools" },
];

// Note: Blender skill would need SiBlender icon imported from react-icons/si

/* ────────────────────────────────────
   Projects
   ──────────────────────────────────── */

export const projects: Project[] = [
  {
    id: "codroom",
    title: "CodRoom",
    description:
      "Real-time technical interview platform where interviewers and candidates collaborate in a live coding environment. Uses WebSockets for instant code sync and AI to evaluate code and generate hiring reports.",
    techStack: ["Next.js", "Node.js", "Express.js", "WebSockets", "PostgreSQL", "JWT", "AI APIs"],
    liveUrl: "https://github.com/Sangam44957/CodRoom",
    githubUrl: "https://github.com/Sangam44957/CodRoom",
    category: "fullstack",
    color: "#00f5a0",
    year: "2025",
    featured: true,
    image: "/CodRoom.png",
  },
  {
    id: "focusflow",
    title: "FocusFlow",
    description:
      "Task Management SaaS built with PERN stack featuring Google OAuth 2.0, JWT authentication, and optimized PostgreSQL queries reducing load latency by 30%.",
    techStack: ["Node.js", "Express.js", "PostgreSQL", "React", "JWT", "OAuth 2.0"],
    liveUrl: "https://focusflow-drab.vercel.app/",
    githubUrl: "https://github.com/Sangam44957/focusflow",
    category: "fullstack",
    color: "#00f0ff",
    year: "Oct 2025 – Dec 2025",
    featured: true,
    image: "/Focusflow.png",
  },
  {
    id: "ai-fashion-analyzer",
    title: "AI Fashion Analyzer",
    description:
      "Backend API service using Flask and Gemini API for image uploads and AI predictions with async processing achieving 85% accuracy.",
    techStack: ["Python", "Flask", "Gemini API", "REST API"],
    liveUrl: "https://github.com/Sangam44957/AI-Trend-Analyzer",
    githubUrl: "https://github.com/Sangam44957/AI-Trend-Analyzer",
    category: "ai",
    color: "#7b61ff",
    year: "Mar 2025 – Apr 2025",
    featured: true,
    image: "/Ai analyzer.png",
  },
  {
    id: "agroinnovate",
    title: "AgroInnovate",
    description:
      "Farmer Support Platform with real-time data aggregation from government APIs, API caching, and async JavaScript patterns reducing response time by 20%.",
    techStack: ["PHP", "JavaScript", "REST API", "Async Processing"],
    liveUrl: "https://github.com/Sangam44957/AgroInnovate-1",
    githubUrl: "https://github.com/Sangam44957/AgroInnovate-1",
    category: "backend",
    color: "#ff006e",
    year: "Feb 2025 – Mar 2025",
    featured: true,
    image: "/Aggroinnovate.png",
  },
  {
    id: "blender-animation",
    title: "Stylized Character Walk Animation",
    description:
      "3D character animation in Blender featuring a walk cycle on a miniature planet with armature-based keyframe animation and optimized rendering.",
    techStack: ["Blender", "3D Animation", "Keyframe Animation", "Eevee/Cycles"],
    liveUrl: "https://drive.google.com/drive/folders/10EGZdVVf8ZKDKtnZT3cnXHma48o0Pl03",
    githubUrl: "https://github.com/Sangam44957/stylized-character-walk-animation-blender",
    category: "3d",
    color: "#ff8c00",
    year: "2025",
    featured: false,
    image: "/Stylished Character.png",
  },
];

/* ────────────────────────────────────
   Experiences
   ──────────────────────────────────── */

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "B.Tech Computer Science",
    company: "Lovely Professional University",
    companyUrl: "https://lpu.in",
    duration: "Aug 2023 – Present",
    description: [
      "CGPA: 7.71 - Specializing in backend engineering and system design",
      "Solved 250+ DSA problems on LeetCode and GeeksforGeeks (Since Jan 2026)",
      "Achieved 5-Star rating in C++ on HackerRank (Since Jan 2026)",
    ],
    techUsed: ["C++", "Python", "JavaScript", "Data Structures", "Algorithms"],
    type: "education",
  },
  {
    id: "exp-2",
    role: "AI Evaluation Specialist",
    company: "Alignerr",
    companyUrl: "https://alignerr.com",
    duration: "Sep 2025 – Dec 2025",
    description: [
      "Built YAML-based evaluation scenarios testing implicit reasoning in AI assistants",
      "Designed test cases identifying reasoning gaps across frontier LLMs like GPT-5, Claude, and Gemini",
      "Validated work through automated QA system with 95% accuracy",
    ],
    techUsed: ["YAML", "AI Testing", "LLM Evaluation"],
    type: "work",
  },
  {
    id: "exp-3",
    role: "AI Trainer",
    company: "Outlier",
    companyUrl: "https://outlier.ai",
    duration: "Aug 2024 – Aug 2025",
    description: [
      "Evaluated AI-generated responses to enhance reasoning quality and factual accuracy",
      "Completed multiple AI training modules focused on model performance benchmarking",
      "Identified low-quality outputs through comparative analysis with structured feedback",
    ],
    techUsed: ["AI Evaluation", "Model Training", "Quality Analysis"],
    type: "work",
  },
];

/* ────────────────────────────────────
   Certifications
   ──────────────────────────────────── */

export const certifications: Certification[] = [
  {
    name: "Introduction to HTML, CSS & JavaScript",
    issuer: "IBM & Coursera",
    date: "Nov 2025",
    verifyUrl: "https://www.coursera.org/account/accomplishments/verify/KNFYCEQ10457",
    techLearned: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  },
  {
    name: "Cloud Computing",
    issuer: "NPTEL",
    date: "July 2025",
    verifyUrl: "https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs107/Course/NPTEL25CS107S135870001910815629.pdf",
    techLearned: ["AWS", "Cloud Architecture", "Virtualization", "Docker"],
  },
  {
    name: "Mastering DSA with C++",
    issuer: "Fifth Force (Industry Partner: Utopia Desk)",
    date: "Jun 2025 – Jul 2025",
    verifyUrl: "https://drive.google.com/file/d/1kcilnbsEcfI5OMDWE70_Q59fIjBpbEZK/view?usp=sharing",
    techLearned: ["C++", "Data Structures", "Algorithms", "Dynamic Programming", "Graphs"],
  },
];

/* ────────────────────────────────────
   Achievements
   ──────────────────────────────────── */

export const achievements: Achievement[] = [
  {
    title: "5-Star C++ Rating on HackerRank",
    description: "Achieved 5-Star rating in C++ on HackerRank, demonstrating strong language proficiency",
    date: "Since Jan 2026",
    icon: "⭐",
    link: "https://www.hackerrank.com/profile/sangammehta44",
  },
  {
    title: "250+ DSA Problems Solved",
    description: "Solved 250+ Data Structures & Algorithms problems across LeetCode & GeeksforGeeks",
    date: "Since Jan 2026",
    icon: "🏆",
    link: "https://leetcode.com/u/SangamMehta/",
  },
];

/* ────────────────────────────────────
   Testimonials
   ──────────────────────────────────── */

export const testimonials: Testimonial[] = [
  {
    name: "Alignerr Team",
    role: "AI Evaluation Platform",
    content:
      "Sangam demonstrated exceptional attention to detail in building YAML-based evaluation scenarios. His work achieved 95% accuracy in our automated QA system.",
  },
  {
    name: "Outlier Platform",
    role: "AI Training Service",
    content:
      "Sangam's comparative analysis and structured feedback significantly improved our model performance benchmarking process.",
  },
  {
    name: "Academic Mentor",
    role: "CS Professor at LPU",
    content:
      "Sangam stands out with his 5-Star C++ rating on HackerRank and 250+ solved DSA problems, showing exceptional problem-solving skills.",
  },
];

/* ────────────────────────────────────
   Terminal Commands
   ──────────────────────────────────── */

export const terminalCommands: Record<string, string> = {
  help: `
Available commands:
  about          — Learn about me
  skills         — View my tech stack
  projects       — See my work
  certifications — My certifications
  achievements   — My achievements
  contact        — Get my contact info
  resume         — Download my resume
  socials        — My social links
  education      — My academic background
  experience     — Work experience
  stats          — Quick stats overview
  clear          — Clear terminal
  matrix         — 🚀 Enter the code matrix
  whoami         — Who are you?
  date           — Current date/time
  quote          — Random dev quote
`,
  about: `
👋 Hi, I'm Sangam Mehta!
A backend developer passionate about building
scalable systems and elegant APIs.
Currently based in Phagwara, Punjab 📍
`,
  skills: `
⚡ Core Skills:
  → Node.js / Express.js / TypeScript
  → PostgreSQL / MongoDB / Redis
  → React / Next.js / Tailwind CSS
  → Docker / AWS / Git
`,
  projects: `
📂 Featured Projects:
  [1] FocusFlow — Task Management SaaS
  [2] AI Fashion Analyzer — Backend API
  [3] AgroInnovate — Farmer Support Platform
  [4] CodRoom — Real-Time Interview Platform
  [5] Stylized Character Walk Animation — Blender

Type a number (1-5) to explore.
`,
  "1": `
📂 FocusFlow
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task Management SaaS built with PERN stack

🔧 Tech Stack:
  → Node.js, Express.js, PostgreSQL, React
  → JWT Authentication, Google OAuth 2.0

✨ Features:
  → Optimized PostgreSQL queries (30% faster)
  → Secure authentication system
  → Real-time task management

🔗 Links:
  Live: https://focusflow-drab.vercel.app/
  Code: https://github.com/Sangam44957/focusflow
`,
  "2": `
📂 AI Fashion Analyzer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Backend API service using Flask and Gemini API

🔧 Tech Stack:
  → Python, Flask, Gemini API
  → REST API, Async Processing

✨ Features:
  → Image upload and AI predictions
  → 85% accuracy in fashion analysis
  → Async processing for performance

🔗 Links:
  Code: https://github.com/Sangam44957/AI-Trend-Analyzer
`,
  "3": `
📂 AgroInnovate
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Farmer Support Platform with real-time data

🔧 Tech Stack:
  → PHP, JavaScript, REST API
  → API Caching, Async Patterns

✨ Features:
  → Real-time government API integration
  → 20% faster response time
  → Efficient data aggregation

🔗 Links:
  Code: https://github.com/Sangam44957/AgroInnovate-1
`,
  "4": `
📂 CodRoom
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Real-Time Technical Interview Platform

🔧 Tech Stack:
  → Next.js, Node.js, Express.js
  → WebSockets, PostgreSQL, JWT, AI APIs

✨ Features:
  → Live collaborative coding environment
  → Instant code sync via WebSockets
  → AI-based code evaluation & hiring reports
  → Scalable multi-session architecture

🔗 Links:
  Code: https://github.com/Sangam44957/CodRoom
`,
  "5": `
📂 Stylized Character Walk Animation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3D character animation in Blender

🔧 Tech Stack:
  → Blender, 3D Animation
  → Keyframe Animation, Eevee/Cycles

✨ Features:
  → Walk cycle on miniature planet
  → Armature-based animation
  → Optimized rendering

🔗 Links:
  Video: https://drive.google.com/drive/folders/10EGZdVVf8ZKDKtnZT3cnXHma48o0Pl03
  Code: https://github.com/Sangam44957/stylized-character-walk-animation-blender
`,
  contact: `
📬 Contact Info:
  Email    → sangammehta44@gmail.com
  Phone    → +91 7015052100
  LinkedIn → linkedin.com/in/mehtasangam77
  GitHub   → github.com/Sangam44957
`,
  resume: "📄 Opening resume in a new tab...",
  socials: `
🌐 Social Links:
  GitHub    → github.com/Sangam44957
  LinkedIn  → linkedin.com/in/mehtasangam77
  Twitter   → x.com/Sangam6931
  Instagram → instagram.com/sangam.mehta.104
`,
  education: `
🎓 B.Tech Computer Science
   Lovely Professional University (Aug 2023 – Present)
   CGPA: 7.71 | Focus: Backend Engineering & System Design
`,
  experience: `
💼 AI Evaluation Specialist @ Alignerr
   Sep 2025 – Dec 2025
   → Built YAML evaluation scenarios, tested LLMs,
     achieved 95% QA accuracy

💼 AI Trainer @ Outlier  
   Aug 2024 – Aug 2025
   → Evaluated AI responses, completed training modules

🎓 B.Tech CS @ LPU
   Aug 2023 – Present | CGPA: 7.71
   → 250+ DSA problems, 5⭐ C++ HackerRank (Since Jan 2026)
`,
  stats: `
📊 Quick Stats Overview
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🎯 Projects Completed      → 5+
  💻 DSA Problems Solved     → 250+
  ⭐ HackerRank C++ Rating   → 5-Star
  🎓 CGPA                    → 7.71/10
  📜 Certifications          → 3
  🏆 Achievements            → 2
  💼 Work Experience         → 2 roles
  🌐 Tech Stack              → 20+ technologies
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`,
  matrix: "🚀 Entering the code matrix...",
  whoami: "You are visitor. Welcome! 🌐",
  date: new Date().toLocaleString(),
  quote: `
💡 "Any fool can write code that a computer can
   understand. Good programmers write code that
   humans can understand." — Martin Fowler
`,
  certifications: `
📜 Certifications:
  [1] Introduction to HTML, CSS & JavaScript
      IBM & Coursera | Nov 2025
  
  [2] Cloud Computing
      NPTEL | July 2025

  [3] Mastering DSA with C++
      Fifth Force (Utopia Desk) | Jun–Jul 2025

Type a number (1-3) to view certificate.
`,
  "cert-1": `
📜 Introduction to HTML, CSS & JavaScript
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Issued by: IBM & Coursera
Date: Nov 2025

🔧 Tech Learned:
  → HTML5, CSS3, JavaScript
  → Responsive Design

🔗 Verify:
  https://www.coursera.org/account/accomplishments/verify/KNFYCEQ10457
`,
  "cert-2": `
📜 Cloud Computing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Issued by: NPTEL
Date: July 2025

🔧 Tech Learned:
  → AWS, Cloud Architecture
  → Virtualization, Docker

🔗 Verify:
  https://archive.nptel.ac.in/content/noc/NOC25/SEM2/Ecertificates/106/noc25-cs107/Course/NPTEL25CS107S135870001910815629.pdf
`,
  "cert-3": `
📜 Mastering DSA with C++
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Issued by: Fifth Force (Industry Partner: Utopia Desk)
Date: Jun 2025 – Jul 2025

🔧 Tech Learned:
  → C++, Data Structures & Algorithms
  → Trees, Graphs, Dynamic Programming
  → Time/Space Complexity Optimization

🔗 Verify:
  https://drive.google.com/file/d/1kcilnbsEcfI5OMDWE70_Q59fIjBpbEZK/view?usp=sharing
`,
  achievements: `
🏆 Achievements:
  [1] 5-Star C++ Rating on HackerRank
      Since Jan 2026
  
  [2] 250+ DSA Problems Solved
      LeetCode & GeeksforGeeks | Since Jan 2026

Type a number (1-2) to view details.
`,
  "achievement-1": `
🏆 5-Star C++ Rating on HackerRank
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Achieved 5-Star rating in C++ on HackerRank,
demonstrating strong language proficiency

📅 Date: Since Jan 2026

🔗 Profile:
  https://www.hackerrank.com/profile/sangammehta44
`,
  "achievement-2": `
🏆 250+ DSA Problems Solved
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Solved 250+ Data Structures & Algorithms problems
across LeetCode & GeeksforGeeks

📅 Date: Since Jan 2026

🔗 Profiles:
  LeetCode: https://leetcode.com/u/SangamMehta/
  GFG: https://www.geeksforgeeks.org/profile/sangammxm4nh
`,
};
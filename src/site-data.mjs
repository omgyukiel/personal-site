export const site = {
  author: "Kenny Levu",
  email: "kennylevu1@gmail.com",
  github: "https://github.com/omgyukiel",
  linkedIn: "https://www.linkedin.com/in/kenny-levu/",
  X: "https://x.com/omgyukiel",
  title: "Kenny Levu",
  description:
    "Kenny Levu's personal site for notes, projects, games, systems, martial arts, and the things he is learning.",
  blogDescription:
    "Notes by Kenny Levu on backend engineering, systems, agents, games, and taste.",
};

export const comments = {
  enabled: true,
  provider: "giscus",
  repo: "omgyukiel/personal-site",
  repoId: "R_kgDOSa01KQ",
  category: "Blog comments",
  categoryId: "DIC_kwDOSa01Kc4C84rT",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "1",
  inputPosition: "bottom",
  theme: "dark_dimmed",
  lang: "en",
};

export const home = {
  eyebrow: "california / coding / games / mongolian throaat singing / life",
  title: "my name kenny. me play game. me write code.",
  lede:
    "This is my website, I write about my thoughts, projects, taste, and whatever I am doing next.",
  professionalPrompt:
    "If you're interested in me professionally, checkout (😉) my profile page!",
  actions: [
    { label: "Patch notes", href: "/blog/" },
    { label: "Open profile", href: "/profile/" },
  ],
  status: [
    {
      label: "now",
      value:
        '<a href="https://github.com/omgyukiel/spireside-together" target="_blank" rel="noopener noreferrer">Slay the Spire 2</a>, Oracle, AI Agents',
    },
    {
      label: "learning",
      value:
        '<a href="https://omscs.gatech.edu/cs-6250-computer-networks" target="_blank" rel="noopener noreferrer">CN</a>, DDIA, Go',
    },
    {
      label: "recent",
      value:
        '<a href="https://omscs.gatech.edu/cs-6200-introduction-operating-systems" target="_blank" rel="noopener noreferrer">Operating Systems</a>',
    },
    { label: "activities", value: "Gym, Rehab" },
    { label: "TODO", value: "Next blog post (MSI)" },
  ],
  about: [
    `I'm 25, I grew up in Fresno, California - and I tend to like doing things with deep skill curves: software, esports, and muay thai. Since I was a kid I always knew I wanted to move out and live on my own. In November 2025 I moved to Culver City to work remotely for Oracle, and ever since achieving my "dream" I've been figuring out life since.`,
    `For now I'm focused on "getting good" and developing taste both as a software "engineer" and a programmer. Outside of that I like spending time with my girlfriend and being consistent with fitness. I don't have any particular long term goals, but I want to keep updating my website along the way :)`,
  ],
  credits:
    'Interface styling uses <a href="https://cs16.samke.me/" target="_blank" rel="noopener noreferrer">cs16.css</a> by Samuel Breznjak. There is also, without shame, extreme and HEAVY use of AI-generated code to create this website. I woudldn\'t have made something as creative otherwise. The theme is obviously inspired by CS 1.6 which holds signfiicance to me as CS:S and CS were one of my first games on PC and Xbox respectively.',
  tags: [
    "games",
    "Muay Thai",
    "backend",
    "OMSCS",
    "pragmatic programming",
    "developing taste",
    "fitness",
    "exisential dread",
    "Fresno",
    "Los Angeles",
    "Vietnamese",
  ],
};

export const profile = {
  player: {
    name: "Kenny Levu",
    summary:
      "Backend engineer building clinical AI agents and specializing in backend systems.",
    meta: [
      "Los Angeles, CA",
      "Member of Technical Staff / Oracle",
      "UC Santa Cruz, B.S. CS",
    ],
  },
  notes: [
    "I'm a software engineer with 2 YOE working on Clinical AI Agents at Oracle. I like solving problems that are interesting under the hood and working deeply towards something impactful is what excites me.",
    "I'm a fundamentalist in that I like to chase first principled understanding for pragmatic outcomes ie. I find satisfaction out of chasing mastery and being surrounded by people who are a lot smarter than me. Feel free to look around!",
  ],
  missions: [
    {
      role: "Software Engineer 2 / Oracle",
      mission: "Clinical AI agents",
      date: "11/25 - Now",
      status: "Active",
      details:
        "Engineering for clinical AI agent integrations and software dev for agent integration platforms.",
    },
    {
      role: "Student / Georgia Institute of Technology",
      mission: "MSCS, Computing Systems",
      date: "01/26 - Now",
      status: "Active",
      details:
        "Online, part-time master's program focused on computing systems. I enrolled in the program partly for fun to learn more about distributed systems and fundamental computer science! Recently got an A in Operating Systems and taking Computer Networks for the summer.",
    },
    {
      role: "Software Engineer / Motorola Solutions",
      mission: "Backend services",
      date: "08/24 - 11/25",
      status: "Cleared",
      details:
        "Worked on service APIs, sync pipelines, OIDC auth, CI/CD, and some critcial reliability fixes for driver bugs.",
    },
    {
      role: "Student / University of California, Santa Cruz",
      mission: "BS Computer Science",
      date: "09/19 - 06/23",
      status: "Cleared",
      details:
        "Undergraduate CS Bachelors, played a lot of games, web dev research assistant, and president of Muay Thai club",
    },
    {
      role: "Personal notes",
      mission: "Journal",
      date: "05/26 - Now",
      status: '<a href="blog/">Open</a>',
      details: "Click on the link to the right to check out my blog!",
    },
  ],
  servers: [
    {
      name: "GitHub",
      map: "de_repos",
      description: "24/7 builds, mods, and experiments",
      ping: "24",
      href: "https://github.com/omgyukiel",
    },
    {
      name: "LinkedIn",
      map: "cs_career",
      description: "18+ professional live action role play",
      ping: "31",
      href: "https://www.linkedin.com/in/kenny-levu/",
    },
    {
      name: "X",
      map: "zm_twitter",
      description: "zombie escape [XP|SHOP|LvL]",
      ping: "12",
      href: "https://x.com/omgyukiel",
    },
    {
      name: "Blog",
      map: "bhop_notes",
      description: "bhop through notes and demos",
      ping: "16",
      href: "/blog/",
    },
    {
      name: "Email",
      map: "cs_inbox",
      description: "kennylevu1@gmail.com",
      ping: "09",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=kennylevu1@gmail.com",
    },
  ],
};

export const posts = [
  {
    title: "Hello, world",
    slug: "hello-world",
    date: "2026-05-11",
    displayDate: "May 11, 2026",
    description: "The first note on Kenny Levu's personal site.",
    excerpt:
      "That one time I wanted to be a react engineer.",
    homeExcerpt:
      "That one time I wanted to be a react engineer.",
    map: "de_hello_world",
    body: "src/posts/hello-world.html",
  },
];

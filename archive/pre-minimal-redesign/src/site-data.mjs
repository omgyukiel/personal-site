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
  title: "my name kenny. me play games. me write code.",
  lede:
    "I'm a developer living in Culver City, CA. I currently work at Oracle and AI Agents!",
  professionalPrompt:
    "If you're interested in me professionally, reachout on LinkedIn and checkout my profile page!",
  actions: [
    { label: "Blog", href: "/blog/" },
    { label: "Open profile", href: "/profile/" },
  ],
  status: [
    {
      label: "now",
      value:
        'Oracle, AI Agents',
    },
    {
      label: "learning",
      value:
        ' DDIA, Go',
    },
    {
      label: "recent",
      value:
        '<a href="https://github.com/omgyukiel/spireside-together" target="_blank" rel="noopener noreferrer">Slay the Spire 2</a>',
    },
    { label: "activities", value: "Gym, Muay Thai" },
    { label: "TODO", value: "Next blog post (MSI)" },
  ],
  about: [
    `I'm 25 y/o developer from Fresno, California. I don't have much going on, but I've always been obsessed with one thing at a time and that used to be esports and muay thai. Now a days I'm focused on coding and being healthier. Since I was a kid I always knew I wanted to move out and live on my own. In November 2025 I moved to Culver City and started working remotely for Oracle. Ever since achieving my "dream" I've been figuring out life since.`,
    `At this point, I'm focused on continuing to grow as a developer and building my own taste. Outside of that I like spending time with my girlfriend and being consistent with fitness. I don't have any particular long term goals, but I want to keep updating my blog with my thoughts and journeys along the way :)`,
  ],
  credits:
    'Interface styling uses <a href="https://cs16.samke.me/" target="_blank" rel="noopener noreferrer">cs16.css</a> by Samuel Breznjak. There is also, without shame, extreme and HEAVY use of AI-generated code to create this website. I woudldn\'t have made something as creative otherwise. The theme is obviously inspired by CS 1.6 which holds signfiicance to me as CS:S and CS were one of my first games on PC and Xbox respectively.',
  tags: [
    "games",
    "Muay Thai",
    "backend",
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

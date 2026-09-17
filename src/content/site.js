import headshot from "../images/ikhyun_headshot.jpeg";

export const profile = {
  name: "Ikhyun An",
  role: "M.S. student in Computer Science",
  institution: "Georgia Institute of Technology",
  location: null,
  avatar: headshot,
  avatarAlt: "Portrait of Ikhyun An",
  bioParagraphs: [
    "I am a master's student in Computer Science at Georgia Tech, focused on systems for artificial intelligence and machine learning. I've specialized in Systems Concentration in the Compute Science major.",
    "I enjoy building practical systems that turn research ideas into useful tools.",
  ],
  researchInterests: ["AI/ML systems", "RL Infra", "and Compilers"],
  links: [
    { label: "GitHub", url: "https://github.com/ikhyunAn" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/ikhyun-an/" },
    { label: "Orcid", url: "https://orcid.org/0009-0003-2851-2147" },
  ],
  email: null,
  cvUrl: null,
};

// Add real entries when you have updates to share. Keep newest entries first.
// Example: { id: "2026-example", date: "2026-01", text: "[Your update]", url: null }
export const news = [
  {
    id: "2026-jobsearch",
    date: "Announcement:",
    text: "Looking for entry-level FTE positions with start date in Jan-Feb 2027!",
    url: null,
  },
  {
    id: "2026-grad",
    date: "December 17th, 2026",
    text: "Master's Degree in CS @ GT",
    url: null,
  },
];

export const achievements = [
  {
    id: "2026-google",
    date: "2026 May-Aug",
    title: "[Google] SWE Intern",
    description: "Worked at Google Core Bulk Inference Team",
    link: "https://www.linkedin.com/posts/ikhyun-an_google-internship-swe-activity-7495750634999291904--5ps?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC5u-4IBMOPpi20dqXfNif8LUh6zhiVWFLI",
  },
  {
    id: "2026-sandhi",
    date: "2025 May-2026 Aug",
    title: "[NEXS Lab @ Georgia Tech] Sandhi accepted to SOSP 2026'",
    description: "'SANDHI: Fine-Grained Merging for Memory Efficient Multi-Model Serving' was accepted and published to SOSP 2026",
    link: "https://github.com/VimaGupta345/sandhi-artifact",
  },
  {
    id: "2026-fasoo",
    date: "2024 May-Aug",
    title: "[Fasoo AI] SWE Intern",
    description: "Worked on agentic system built with Rust",
    link: null,
  },
  {
    id: "2026-samsung",
    date: "2023 May-Jul",
    title: "[Samsung] SWE Intern",
    description: "Built server analytics tool using Elasticsearch",
    link: null,
  },
];

export const publications = [
  {
    id: "sandhi",
    title: "SANDHI: Fine-Grained Merging for Memory Efficient Multi-Model Serving",
    conference: "ACM SOSP 2026",
    description: "Abstract: As autoregressive models become adept at handling various domain-specific tasks, it is necessary to deploy several fine-tuned models concurrently in real-world scenarios. Such deployments are limited by GPU memory, which dictates the cost (ie how many models can be hosted) and their performance (ie latency and throughput). In this paper, we propose model merging as a way to reduce the memory footprint of co-located models. While model merging in a traditional sense---where multiple models are combined to create a single model to instill emergent behaviors---may seem like a natural fit for memory reduction, we show that directly extending it results in unacceptable accuracy drops. We present SANDHI, a system that adaptively merges models, at a component granularity, while adhering to user's accuracy requirements. Our evaluation on 12 models spanning 3 model families across 9 different benchmarks show that SANDHI reduces GPU memory footprint by up to 49.8%, which translates to improvements of up to 2.93xin throughput and up to 2x in cost.",
    link: "https://github.com/VimaGupta345/sandhi-artifact",
  },
];

// Empty collections stay out of the main navigation until content is added.
export const teaching = [
  {
    id: "aos",
    institution: "Georgia Institute of Technology",
    role: "Graduate Teaching Assistant",
    period: "Spring 2026, Fall 2026",
    courses: ["CS 6210: Advanced Operating Systems"],
  },
];

export const projects = [
  {
    id: "unified-llm-eval",
    title: "Unified LLM Eval",
    year: 2026,
    summary:
      "An automated pipeline that centralizes and orchestrates LLM evaluations across programming, math, and Lean 4 theorem-proving benchmarks across multiple different coda environment.",
    contribution:
      "[Research Project]: Implemented and maintained the evaluation pipeline used for Sandhi.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ikhyunAn/unified-llm-eval",
      },
    ],
  },
  {
    id: "investment-portfolio",
    title: "MCP Investment Portfolio",
    year: 2025,
    summary:
      "An MCP server for investment portfolio management and related workflows.",
    contribution:
      "[Personal Project]: Designed portfolio data management through MCP-compatible clients.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ikhyunAn/MCP_InvestmentPortfolio",
      },
    ],
  },
  {
    id: "zamong-text-editor",
    title: "Zamong Text Editor",
    year: 2025,
    summary:
      "A text editor for turning writing into shareable story-card images.",
    contribution:
      "[Tech Lead]: Built for Zamong to simplify the process of formatting text for social publishing.",
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ikhyunAn/zamong_texteditor",
      },
    ],
  },
];

export const siteMeta = {
  title: "Ikhyun An",
  description:
    "Ikhyun An is a computer science master's student focused on AI and machine learning systems.",
};

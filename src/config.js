// Skills icons - https://icon-sets.iconify.design/
import { Icon } from "@iconify/react";

// Navbar Logo image (add your image to the src/images directory and uncomment the line below to import your image)
import newLogo from "./images/ikhyun_headshot.jpeg"

// Hero Images (add your images to the /images directory with the same names)
import HeroLight from "./images/hero-light.jpg";
import HeroDark from "./images/hero-dark.jpg";

// Projects Images (add your images to the images directory and import below)
import zamong_Logo from "./images/zamong.jpg";
import mcp_Logo from "./images/mcp.png";

/* START HERE
 **************************************************************
  Add your GitHub username (string - "YourUsername") below.
*/
export const githubUsername = "ikhyunAn";

// Navbar Logo image
export const navLogo = newLogo;

/* Main
 ************************************************************** 
  Add a custom blog icon or update the hero images for the Main section.
*/
export const Blog = null;

// Hero images (imported above - lines 8-9)
export { HeroLight as Light };
export { HeroDark as Dark };

/* About Me
 **************************************************************
  Add a second paragraph for the about me section.
*/
export const moreInfo =
"Impactful solutions will incrementally improve this world.";

/* Skills
 ************************************************************** 
  Add or remove skills in the SAME format below, choose icons here - https://icon-sets.iconify.design/
*/
export const skillData = [
  {
    id: 1,
    skill: <Icon icon="skill-icons:python-light" className="display-4" />,
    name: "Python",
  },
  {
    id: 2,
    skill: <Icon icon="skill-icons:rust" className="display-4" />,
    name: "Rust",
  },
  {
    id: 3,
    skill: <Icon icon="fa6-brands:js" className="display-4" />,
    name: "JavaScript",
  },
  {
    id: 4,
    skill: <Icon icon="skill-icons:typescript" className="display-4" />,
    name: "Typescript",
  },
  {
    id: 5,
    skill: <Icon icon="mdi:react" className="display-4" />,
    name: "React",
  },
  {
    id: 6,
    skill: <Icon icon="skill-icons:c" className="display-4" />,
    name: "C",
  },
  {
    id: 7,
    skill: <Icon icon="skill-icons:cpp" className="display-4" />,
    name: "C++",
  },
  {
    id: 8,
    skill: <Icon icon="skill-icons:golang" className="display-4" />,
    name: "Golang",
  },
  {
    id: 9,
    skill: <Icon icon="bi:git" className="display-4" />,
    name: "Git",
  },
  {
    id: 10,
    skill: <Icon icon="fa6-brands:square-github" className="display-4" />,
    name: "GitHub",
  },
  {
    id: 11,
    skill: <Icon icon="skill-icons:pytorch-light" className="display-4" />,
    name: "PyTorch",
  },
  {
    id: 12,
    skill: <Icon icon="skill-icons:gcp-light" className="display-4" />,
    name: "GCP",
  },
  {
    id: 13,
    skill: <Icon icon="skill-icons:elasticsearch-light" className="display-4" />,
    name: "ElasticSearch",
  },
];

// Resume link (string - "https://YourResumeUrl") - I am using CloudFront to share my resume (https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
export const resume = null;

/* Projects
 ************************************************************** 
  List the repo names (string - "your-repo-name") you want to include (they will be sorted alphabetically). If empty, only the first 3 will be included.
*/
export const filteredProjects = ["zamong_texteditor", "MCP_InvestmentPortfolio", "example-3"];

// Replace the defualt GitHub image for matching repos below (images imported above - lines 7-8)
export const projectCardImages = [
  {
    name: "zamong_texteditor",
    image: zamong_Logo,
  },
  {
    name: "MCP_InvestmentPortfolio",
    image: mcp_Logo,
  },
];

/* Contact Info
 ************************************************************** 
  Add your formspree endpoint below.
  https://formspree.io/
*/
export const formspreeUrl = "https://formspree.io/f/myznprowt";

// Footer icons theme (light or dark)
export const footerTheme = "dark";

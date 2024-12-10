/**
 * Portfolio projects configuration
 * Defines personal and professional projects
 * @property {string} project - Project name
 * @property {string} githubURL - Link to GitHub repository
 * @property {string} [projectURL] - Optional link to live project
 * @property {string} description - HTML-formatted project description
 * @property {string[]} technologies - List of technologies used
 * @property {boolean} wip - Whether project is work in progress
 */
export const worksContent = [
  {
    project: 'kierancanter.dev',
    githubURL: 'https://github.com/kierancanter/kierancanter.dev',
    projectURL: 'https://kierancanter.dev',
    description: "The website you're viewing. Heavily focused on responsive design, accessibility, and pixel-perfect attention to detail. Roughly designed in Figma. Component prototypes tested in CodePen. Coded and developed in Cursor. Hosted on AWS and deployed with Vercel.",
    technologies: ['TypeScript', 'HTML5/CSS3', 'React', 'Next.js', 'Tailwind CSS'],
    wip: false,
  },
  {
    project: 'FlipReady',
    githubURL: 'https://github.com/kierancanter/flipready',
    projectURL: 'https://bakkesplugins.com/plugins/view/401',
    description: "Actively maintained plugin for the popular Rocket League mod, BakkesMod. Highly customizable text indicator with decaying gauge bar to visualize the status of your air roll/double jump (for training purposes only). Written using the Bakkesmod SDK. Currently amassed 10,116 views and 4,405 downloads.",
    technologies: ['C++'],
    wip: false,
  },
  {
    project: 'UFC Win Factors Model',
    githubURL: 'https://github.com/kierancanter/ufcwinfactors',
    description: "An illustration of the data science pipeline displayed through a Jupyter Notebook, tutorial-style modeling and analysis of scraped UFC fighter and event statistics, used to determine factors most associated with winning fights.",
    technologies: ['Python', 'Pandas', 'Numpy', 'Matplotlib', 'scikit-learn', 'XGBoost', 'Seaborn'],
    wip: false,
  },
  {
    project: 'Simple Blackjack',
    githubURL: 'https://github.com/KieranCanter/SimpleBlackjack',
    description: "Simple, collaborative blackjack mobile application written for Android using Android Studio. Utilizes a Model-View-Controller architectural pattern. Automated builds and dependency management using Gradle.",
    technologies: ['Kotlin'],
    wip: false,
  },
  {
    project: 'RocketOdds',
    githubURL: 'https://github.com/KieranCanter/',
    description: "Plugin for the popular Rocket League mod, BakkesMod. Real-time moneyline win odds. Dynamically calculates win probabilities by analyzing in-game metrics like goals, shots, and possession. Uses historical datasets to predictively model accurate probabilities. Written using the Bakkesmod SDK.",
    technologies: ['C++', 'Python', 'PyTorch', 'Pandas', 'NumPy', 'Matplotlib', 'scikit-learn'],
    wip: true,
  },
];
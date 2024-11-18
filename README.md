<div align="center">
  CHANGE TO COLORED LOGO<img alt="KC Logo" src="https://raw.githubusercontent.com/KieranCanter/kierancanter.dev/3574dd9070477802932f896e80c25df50f688aa7/public/images/logo.svg" width="100" />
</div>
<h1 align="center">
  kierancanter.dev
</h1>
<div align="right">
  <a href="https://github.com/kierancanter/kierancanter.dev/releases" target="_blank">
    <img 
      alt="Deployment Status" 
      src="https://img.shields.io/github/deployments/kierancanter/kierancanter.dev/production?style=flat-square&logo=vercel&logoColor=white&label=vercel"
    />
  </a>
</div>

## Contents
* [Impress](#impress)
* [Design](#design)
* [Development](#development)
* [Optimizations](#optimizations)
* [Technical Challenges & Solutions](#technical-challenges--solutions)
* [Deployment](#deployment)

## Impress

I built my portfolio website to serve as a central hub for presenting myself as a distinct, branded computer scientist. I wanted a place where I could showcase my skills, projects, and professional identity in a minimalist yet polished manner. This site reflects my desire to develop applications to not just function, but to **impress**.

## Design

Driven by a desire to capture a modern, clean aesthetic that still delivers a unique visual, I focused on creating a minimalist yet engaging layout, balancing simplicity with functional elegance. My goal was to prioritize user experience, ensuring intuitive navigation and seamless accessibility across devices. Typography and color schemes were carefully selected to craft a professional and inviting atmosphere that hopefully not only highlights my work but also reflects upon my creativity as a computer scientist. View the entire project from the design perspective on **CHANGE TO PROJECT LINK ONCE FINISHED [Behance](https://behance.net/kierancanter)**

### Inspiration

I derived many innovation ideas, elements, and concepts from various websites that I admire. Below are the authors/links of beautiful sites that I gained inspiration from and revere as exceptionally crafted in one facet or another:
* [Keita Yamada](https://p5aholic.me)
* [Ansub Khan](https://ansubkhan.com)
* [Anthony Fu](https://antfu.me)
* [Embed](https://astolfo.org)
* [Charles Bruyerre](https://itssharl.ee)
* [Brittany Chiang](https://brittanychiang.com)
* [Takuya Matsuyama](https://craftz.dog)
* [Mads Hougesen](https://mhouge.dk)

### Figma Mock-up

The first step of development was visual design. I took to [Figma](https://figma.com) to establish potential color schemes, layouts, spacing, content, etc. [As you can see](https://www.figma.com/design/tP5ITD5rjftAeg27rMoVXG/kierancanter.dev?node-id=0-1&t=z3MOAOBTCVDuCq4r-1), the original design looks almost nothing like the final product, but it laid out the ground work that displayed flaws and eventually allowed me to perform iterations upon iterations of refinements.

### Usability + UI/UX

While visual design is fun and can improve the atmosphere of an application, it's worthless if the usability is garbage. Above all else, I knew I wanted the site to be as operationally simple and obvious. A relatively large chunk of time was spent brainstorming and testing different layouts to determine what would be the best for user experience.

Tony Alicea has a great book entitled [Normal UI](https://tonyalicea.dev/normalui/) that revolves around the concept of _normalization_. Derived from "data normalization," Tony frames this principle as relating to the number of screens/pages a user visits from the start to the end of their goal or task. If the task takes many screens in which each screen has few actions to carry out, he refers to it as more normalized. Conversely, a UI that typically contains many actions across a fewer number of screens is denormalized. There is no global better or worse option; the designer has to choose the better approach based on the tasks that users will complete in the software. Normalized workflows reduce the amount of information that the user is met with at each stage of their objective while denormalized workflows may be more efficient for experienced users to quickly complete tasks.

This notion of normalization was the driving force that convinced me to transition from a single page application (SPA) to a multi-page, compartmentalized application. While there aren't any "objectives" for a user to complete through my site per se, locating and accessing the information can be considered the tasks themselves. With this idea, I split the site up into pages that matched each section. I restricted the page to being unscrollable, and instead would only allow scrolling within the page's content container if it extended past the given height. I like this normalized approach better than the scrolling SPA because it contains and divides the information better than headers and sections would otherwise. Users would know exactly how to locate each section immediately without having to scroll and search through other sections to find what they're looking for.

### Colors

Colors play an extremely important part in how the audience visually perceives your content. Black and white can emit elegance while vibrant colors are more playful. Earth tones come across as more subdued but give off a natural, organic feel. Colors are also important for accessibility purposes. Designs need to ensure that contrast between opposing colors is high enough such that those with color blindness can still detect differences in overlapping colors. Believe it or not, my original color scheme was inspired by [Hyper Shadow](https://sonic.fandom.com/wiki/Super_Shadow) from Sonic. I remember being obsessed with the pale gold + burgundy combo while playing the final stage of Sonic Adventure 2: Battle as a kid, and I have loved the pairing ever since.

While exuberant as part of a videogame character's design, I recognized that this combination would not appear as pleasing if it was plastered on a web page. From the start, I knew I wanted to implement a dark mode, so I decided to split the duo of colors up and use them as the accent/highlight colors for each mode. I'm a sucker for browns and tans, so I played around until I obtained a darker brown/purple that could be used as the background for the dark mode. Using this as a baseline hue, I adjusted the saturation and lightness to obtain a pale purple that I thought would bode well as the light mode background. From here, I assigned the opposite theme's background color as the hard foreground color and chose a slightly more subdued color as the soft foreground color. The hard foreground color is meant to stand out a little more and emphasize certain elements like important words while the soft foreground color is the standard color used for the majority of foreground elements. The accent color is used for links, hover effects, and miscellaneous visual flavor (bullet points, active experience indicator, etc.).

I originally was just going to stick to the light/dark mode themes, but coming across [Mads Hougesen's website](https://mhouge.dk) sparked another idea in my mind. I loved the slight injection of popping colors exhibited in the technology labels and hover effects, as well as the functional change in color on every hover of the word "Hi." I thought "how bout I keep these two primary modes and add two more 'colorful' modes, one for light and one for dark." I eventually settled on the idea to use traditional white/dark grey background's for these new modes. The soft and hard foreground colors would follow the same formula as the "subdued themes," but the accent colors would change on every load and be randomly selected from an assortment of colors that I define. I had to carefully select colors such that they appeared bright and vibrant, but they wouldn't clash too much with the background no matter what color was selected.

This presented design and logic challenges that are explained more in [Technical Challenges & Solutions](#technical-challenges--solutions), but I was determined to make it work. As an avid enjoyer of personalization within apps and games, I very much wanted to give the user the option to switch between these four different color themes. Ultimately, I chose names for these themes based on the atmosphere I felt they radiated: Plush, Sombre, Brilliant, and Luminous.

*_INCLUDE GRAPHIC OF COLOR BLOCK WITH HEX CODES_*

### Typography

I carefully chose my typefaces to emit a clean, modern, and professional feel while also providing a robust selection of weights and styles. For Serif, Sans-serif, and Monospaced usage, I elected to use the [IBM Plex](https://www.ibm.com/plex/) family of fonts. For the minimal presence of [**American Psycho**](https://www.youtube.com/watch?v=YHgwxVCiMyI)-inspired small-caps, I opted for the Spectral SC font.

| Google Fonts                                                       | Adobe Fonts                                                    |
|--------------------------------------------------------------------|----------------------------------------------------------------|
| [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans)   | [IBM Plex Sans](https://fonts.adobe.com/fonts/ibm-plex-sans)   |
| [IBM Plex Serif](https://fonts.google.com/specimen/IBM+Plex+Serif) | [IBM Plex Serif](https://fonts.adobe.com/fonts/ibm-plex-serif) |
| [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)   | [IBM Plex Mono](https://fonts.adobe.com/fonts/ibm-plex-mono)   |
| [Spectral SC](https://fonts.google.com/specimen/Spectral+SC)       | [Spectral SC](https://fonts.adobe.com/fonts/spectral-sc)       |

### Logo

To fully solidify myself as a branded entity, a logo was a necessity. I drafted numerous different ideas on paper and gathered opinions from friends & family to decide which one to move forth with. Having selected a base design, I crafted and refined it in Adobe Illustrator.

To act as the favicon, the logo was exported as an SVG for desktop and Progressive Web App (PWA) purposes. To further enhance responsiveness, the logo was also exported as a PNG in two different color schemes (for light/dark modes) and numerous different sizes (16x16px, 32x32px, 512x512px, Android - 180x180px, and Apple - 192x192px) to serve as fallbacks should the SVG files run into any issues. More variants of the logo were exported for uses like this README and the business card element.

### Prototyping

To mock-up more technical aspects of the site, I shifted to [CodePen](https://codepen.io). This is where I toyed around with conceptual prototypes of possible components and drafted the HTML/CSS/JS in a more abstracted environment. View some of my [early creations](https://codepen.io/kierancanter).

## Development

### Text Editor

The entire project was written within [Cursor](https://www.cursor.com/). If you're unfamiliar, Cursor is a fork of VSCode that brilliantly and natively integrates AI-powered operations like tab autocompletion, LLM chats, a natural-language code composer, and more. Since it is a VSCode fork, it will be visually familiar to previous VSCode users and has all the base features from it as well. You can even import all of your VSCode extensions, settings, profile, etc. Just as VSCode was the catalyst for migrating tons of users from Vim or Nano, I believe Cursor will have the same effect with migrating users from VSCode.

### Tech Stack

The core technology stack I employed consisted of [TypeScript](https://www.typescriptlang.org/), [React](https://react.dev/), [Next.js](https://nextjs.org/), and [Tailwind CSS](https://tailwindcss.com/). While not inspired or based on the [T3 stack](https://create.t3.gg/), I do believe it to be the most modern, modular, and effective stack for creating full-stack applications.

#### [TypeScript](https://www.typescriptlang.org/):

As we know, JavaScript is the number one language used in web development, and for good reason. It's ubiquitous across the web, extremely versatile, has a massive ecosystem and community support, and has exceptional cross-platform compatability. Despite all these positives, it does have one large flaw: **dynamic typing**. While dynamic typing can be useful for quick prototyping, projects with limited scopes, or handling unknown data structures, there are a slew of run-time and logic errors that developers will deal with when writing in a dynamically typed language. TypeScript catches these errors early at compile-time.

TypeScript completely solves this flaw. Acting as a statically-typed superset of JavaScript, it facilitates typesafe programming and extends it's functionality. Since it's not an entirely different, standalone language, it ends up compiling down to normal JavaScript and is compatible with any libraries, infrastructures, or packages previously supported by JS.

TypeScript is such an improvement over JavaScript that there really aren't any realistic reasons to not opt for it other than rapid prototyping.

#### [React](https://react.dev/):

The same component-based UI library that was famously part of the MERN stack is still one of the best choices for developing SPAs and mobile applications. Virtual DOM, JSX, hooks, not much else needs to be said.

#### [Next.js](https://nextjs.org/):

Developed by [Vercel](https://vercel.com/), Next.js is one of the most popular, industry-standard frameworks for creating React applications. With server-side rendering (SSR), and static site generation (SSG), it can greatly improve performance and search engine optimization (SEO). The ability to create backend API routes can eliminate the need for a separate backend while other features like automatic code splitting, fast refresh, and image-optimization contribute to improvements in reload times and overall performance.

#### [Tailwind CSS](https://tailwindcss.com/):

Commonly confused with being an alternative to Bootstrap, Tailwind CSS is a CSS framework (not a library) that provides reusable utility classes to help developers build custom designs without the need for custom CSS. Used inline within HTML (or JSX), the utility-first approach enabled rapid development and improves efficiency by mitigating the need to leave the markup and coordinate with separate CSS files. It's extendable, highly customizable, and promotes responsive design by the inclusion of breakpoint classes. Although it's designed to prevent the need for large-scale CSS, custom CSS classes can still be assembled with native CSS and/or Tailwind utility classes.

#### Other Libraries:

In addition to the core pieces of the stack, I took advantage of various other packages to implement certain features:
* [Vanilla-tilt](https://micku7zu.github.io/vanilla-tilt.js/)          - 3D tilt library used for the business card element on desktop devices
* [ThreeJS](https://threejs.org/)                                      - 3D animation library used for the business card element on mobile/touch devices
* [Fontawesome](https://fontawesome.com/)                              - wildly popular icon library used for most of the iconography
* [GSAP](https://gsap.com/)                                            - animation library used for the pop-in animations on load
* [react-swipeable](https://github.com/FormidableLabs/react-swipeable) - swipe gesture library for page-swiping feature

### Component Design

#### Encapsulation + Abstraction

Encapsulation is the object-oriented programming (OOP) principle that promotes self-containment of and compartmentalization of objects/components. This is quite valuable for reusability, Don't Repeat Yourself (DRY) coding, and exhibiting a separation of concerns, especially for a component-based library like React. By isolating UI elements, utility components, text data, and page routes, debugging is made easier by making components responsible for smaller portions of functionality and fosters modularity by allowing components to be reused across the project.

Abstraction is another OOP principle that hides the details of implementation and focuses on broader ideas. By removing the specifics and focusing on the features, efficiency improves and complexity decreases.

For example, the text data present in the About, Experience, and Works sections is not hard-coded into the components themselves, but abstracted out into their own files. The component retrieves this text data and inserts it into its proper location. This makes revising, editing, and adding more of the same component easier as well as simplifying the code by hiding the irrelevant information. This is all very benefitial with respect to scaling.

Encapsulation can be seen with the segregation of the utility files. To make repeating the same action over and over again (like applying the reveal animation to an element), it's contained within a separate file and function such that it can be imported and used elsewhere in the project without limiting it to a single component or repeating the same functional code multiple times.

#### Theme Context

The theme context component (the non-visual model) is used throughout the project to control the color theme. It's responsible for initalizing the theme on load with the last used theme (or a theme according to the system preferences of the user if no last theme was saved) and setting the theme when it's changed. In conjunction with the theme switcher component (the interactable controller), the theme is able to switch between four different options with a randomized color feature implemented in only the "colorful" themes. This is another example of encapsulation.

#### File Organization

When working with a project that becomes rich in files and directories, organization is paramount in avoiding the "needle in a haystack" dilemma. If your file structure is a jumbled mess with no structure, components and functions are much harder to find. I adhered to a strict hierarchical organization to maintain a separation of concerns and group related files where assets like fonts and images are stored in `public` and all source code is stored in `src`.

`src/`
* `app/`        - top-level files or pages relating to the deployment and rendering of the site
* `components/` - visual elements that are incorporated into the pages and will be seen by the user
* `context/`    - components relying on and controlling variables relating to the system context (i.e. theme context with system preferences)
* `data/`       - specific info such as text data that's abstracted out from respective components for modularity and scalability
* `styles/`     - CSS styling
* `util/`       - utility components with no visual qualities that serve a repeated purpose across multiple components

## Optimizations

## Technical Challenges & Solutions

## Deployment

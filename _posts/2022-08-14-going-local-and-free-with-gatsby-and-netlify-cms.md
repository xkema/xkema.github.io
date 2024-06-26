---
title: Going Local and Free with Gatsby & Netlify CMS
excerpt: This post is an introduction to a 7-chapter blog series about building a statically-served website with an all-local admin panel with Netlify CMS and Gatsby.
tags:
  - Netlify CMS
  - Gatsby
  - Jamstack
  - Going Local and Free with Gatsby and Netlify CMS
  - Intro
  - GitHub Pages
multipart: intro
canonical: https://kemalyilmaz.com/blog/going-local-and-free-with-gatsby-and-netlify-cms/
---

Jamstack is an architectural pattern for building websites and web applications based on two core principles. One is the famous "**pre-rendering**", and the other is the "**loose-coupling**" between the parts of the system we built. In this tutorial series, I'll try to develop a simple static website using the Jamstack architecture with a local Git-based backend and a static site generator.

## Series Summary

This series is organized by "chapters". The chapters contain a couple of "parts" corresponding to the [Git commits](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commits/) about that part. I'll not include all the code in the post content, so please refer to the commit details on [GitHub repository](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/) to review the code.

- **Intro**
  - Going Local and Free with Gatsby & Netlify CMS
- **Chapter 1** - [Setting up a Gatsby & Netlify CMS Project](/2022/setting-up-a-gatsby-and-netlify-cms-project)
  - *Part 1* - Initial Commit
  - *Part 2* - Setting up a Gatsby Site with Bare Minimums
  - *Part 3* - Setting up the Netlify CMS with a Single Collection: "designs"
- **Chapter 2** - [Building Up the Gatsby Project with Markdown Content](/2022/building-up-the-gatsby-project-with-markdown-content)
  - *Part 4* - Sourcing and Transforming Markdown Content
  - *Part 5* - Adding GraphQL Page Query to Represent Frontmatter Data in the Index Page
  - *Part 6* - Programmatically Creating Pages from Markdown Content
  - *Part 7* - Adding a Custom Template Selector Logic
  - *Part 8* - Adding React Components to Split UI
  - *Part 9* - Adding a Custom Template for the Design Detail Pages
- **Chapter 3** - [Working with Image Paths in the Markdown Content in Gatsby](/2022/working-with-image-paths-in-the-markdown-content-in-gatsby)
  - *Part 10* - Adding Image Paths to the "frontmatter" as File Nodes
  - *Part 11* - Adding Responsive Images with Sharp and GatsbyImage Component
  - *Part 12* - Adding Responsive Images to the Markdown Body
- **Chapter 4** - [Styling Gatsby Site with Tailwind CSS and PostCSS Processor](/2022/styling-gatsby-site-with-tailwind-css-and-postcss-processor)
  - *Part 13* - Setting Up Tailwind CSS and PostCSS with Gatsby
  - *Part 14/a* - Re-designing the Markup, Interactivity and Components with Tailwind CSS
  - *Part 14/b* - Controlling Typography in the Markdown Body with "tailwindcss/typography"
  - *Part 14/c* - Customizing Home Page
  - *Part 14/d* - Customizing Design Detail Pages with Multiple Images from Netlify CMS
- **Chapter 5** - [Adding "Settings", "Contact" and "404" Pages in Gatsby](/2022/adding-settings-contact-and-404-pages-in-gatsby)
  - *Part 15* - Adding Site "Settings" with a File Collection in the Netlify CMS
  - *Part 16* - Creating a "Contact" Page with a Custom Template
  - *Part 17* - Adding a Custom "404" Page
- **Chapter 6** - [Adding an "SEO" Component in Gatsby](/2022/adding-an-seo-component-in-gatsby)
  - *Part 18* - Using "react-helmet" to Control Page Metadata
- **Chapter 7** - [Preparing for the Gatsby & Netlify CMS Production Build](/2022/preparing-for-the-gatsby-and-netlify-cms-production-build)
  - *Part 19* - Customizing the Production Build to Reduce the Export Size

> There will also be additional commits after "Part 19" for bug fixes, GitHub Pages publishes and updates. "Part 19" is the official end of the series. If you're not looking for a specific update, overlook the commits after the official end.

## Background Story

I've always wanted to answer my friends' and relatives' questions about web development, and the most asked question is "*Can I have a free website?*". The answer is "*Yes*" and "*No*" same time. Because going free is not as cheap as you thought. What I think is going free and professional at the same time is way more expensive than going paid and easy. The "expensiveness" in the sentence comes from the developer experience and the time you need to build a free and professional website.

The convenient answer to this question is usually this. "*Please check this e-commerce/web-development platform. They offer great services to build what you need!*". But most of the time, nobody wants to pay 10€ a month while they have you. Let's start with our free website problem.

Say we have a stupid cousin Deniz. At a family dinner, "he/she" brought up their stupid digital idea that "he/she" needs a simple website. Whether you're a database admin or a UX designer, you know they think you can build any website just because you work for a tech company. After a couple of trials, you decided to give up explaining your profession and eventually said yes to them. Not so surprisingly, they only have a domain name registered for a year and "0.00€" cash for the remaining staff that will have been done by you.

Here is the problem rephrased:

> I need a completely free personal website with a locally served admin panel that allows me (actually you, the developer) to add detail pages for my designs.

That is what we'll have built at the end of the tutorial with a headless CMS and a static site generator.

## Choosing the Stack

If this site were a small business website with a couple of descriptive pages or a personal portfolio updated once a year, I would go complete static with plain HTML. In the current era of web development, a hand-written static solution without a pre-processing system might sound lame. But from an engineering perspective, it’d be the best cost-effective choice since the website doesn’t need frequent updates or automatic deployers, etc. In that case, the only cost would be the once-in-a-year manual updates done by the developer. But this tutorial isn't about that either. 

Enough chattering. Here is the tech stack I’ve chosen for the task:

- [**Gatsby**](https://www.gatsbyjs.com/) as the Static Site Generator
  - [File System](https://en.wikipedia.org/wiki/File_system) as the data source
- [**Netlify CMS**](https://www.netlifycms.org/) as the Headless CMS
  - [Git](https://git-scm.com/) as the data storage
  - [Markdown](https://daringfireball.net/projects/markdown/) as the data format
- [**Tailwind CSS**](https://tailwindcss.com/) for the styling
  - [PostCSS](https://postcss.org/) as CSS processor
- [**Github Pages**](https://pages.github.com/) for hosting
- [**Unsplash**](https://unsplash.com/) for demo images
  - [@eugabrielsilverio](https://unsplash.com/@eugabrielsilverio) &bull; [@priscilladupreez](https://unsplash.com/@priscilladupreez) &bull; [@ikredenets](https://unsplash.com/@ikredenets) &bull; [@sarahdorweiler](https://unsplash.com/@sarahdorweiler) &bull; [@eyemgm](https://unsplash.com/@eyemgm) &bull; [@pao_note](https://unsplash.com/@pao_note) &bull; [@nimblemade](https://unsplash.com/@nimblemade) &bull; [@markusspiske](https://unsplash.com/@markusspiske) &bull; [@tamarabellis](https://unsplash.com/@tamarabellis) &bull; [@paulina_milde_jachowska](https://unsplash.com/@paulina_milde_jachowska)
- [**Random Word Generator**](https://randomwordgenerator.com/) for the dummy content
- [**Noise Texture Generator**](https://www.noisetexturegenerator.com/) for the background pattern

> Selecting **Gatsby** was an all-random choice. It seemed easy to understand and use. Also, I had already built a website with it before I wrote this blog post. **Netlify CMS** is the leading Git-based headless CMS powered by Netlify. It is easy to head-start a CMS with a simple "index.html" file and a "config.yml" file with Netlify CMS. **Tailwind CSS** was another random choice to experiment with a new CSS framework. Basically, it is a handful of CSS utility classes that represent every possible CSS rule with predefined values. And the last one is **Github Pages** only for free hosting of the static export. And also the most valuable one since it is the only thing we need to pay to serve a static site on the internet.

Sorry for all the introductory fuss. I’m going to start building the project in the next section.

**Next**: [Setting up a Gatsby & Netlify CMS Project](/2022/setting-up-a-gatsby-and-netlify-cms-project)

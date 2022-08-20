---
title: Styling Gatsby Site with Tailwind CSS and PostCSS Processor
excerpt: Selecting a CSS Framework, integrating it into the project pipeline, and using it properly with a team of developers, ... These are all challenging problems when it comes to styling. Tailwind CSS offers a competitive solution for all and easy set-up with Gatsby. In this chapter, we'll add Tailwind CSS and PostCSS to the project and style it with its rich range of utilities.
tags:
  - Netlify CMS
  - Gatsby
  - Tailwind CSS
  - PostCSS
  - Going Local and Free with Gatsby and Netlify CMS
  - Chapter 4
  - Part 13, 14
multipart: 4/7
---

> This post is the 4th chapter of a 7-chapter article series "[Going Local and Free with Gatsby & Netlify CMS](/2022/going-local-and-free-with-gatsby-and-netlify-cms)".

> In the previous chapter, we added responsive image support to the project. In this part, we'll style the site and update the markup to comply with the styling needs.

## Part 13 - Setting Up Tailwind CSS and PostCSS with Gatsby

As you may notice, I haven't used any kind of styling to this point. This is a practice I often follow when I develop a web project. It makes me focus on the application framework and the business concerns first. After I complete the work on the topics like routing, data fetching, and image processing, ... then, I pick a styling framework and add it to the project. This might not always be possible to achieve but I prefer it if it is.

> In the previous months, an e-commerce company responded negatively to my job application because they taught my case project didn't build. It was a fully working project like at the end of Chapter 3 without styles. I wanted the people who evaluate the case project to focus on the code, not the cosmetics. (There were also a styled demo and a Git branch with styles.) It turns out the industry here is still all cosmetics, not the coding. So, use this approach at your own risk! 😄

Styling a web project is now a completely new domain. And I still don't know how did it grow this large. In this part, I'll use Tailwind CSS and PostCSS. Because both are already supported by Gatsby, and I have no idea what are they at this moment. It'll be good for me either. (That is true. When I wrote this article, I hadn't had much about these two.)

> Looking back, most of the time, I felt like I used these frameworks just for the hamburger menu components provided by them.

> When it is a simple website, I still believe we don't need these kinds of uber-abstracted development machines. Even Gatsby itself or any other framework. In essence, what we do is still the same since the invention of the HTTP. Printing hypertext/hypermedia to a digital screen. 
> 
> So, when you are stuck inside the "abstraction hell" of modern development tools, remember this. Users don't read our frameworks or programming abilities. They read the content. Why we work at this abstraction level is to "manage" a complex process from development to deployment. And more ...

Let's return back to the project. I'll follow the [Install Tailwind CSS with Gatsby](https://tailwindcss.com/docs/guides/gatsby) guide to add the framework to the project.

Now install `tailwindcss`, `postcss`, `autoprefixer` and `gatsby-plugin-postcss` plugins required to set Tailwind CSS in a Gatsby project.

```shell
# Terminal window at project root

npm i tailwindcss postcss autoprefixer gatsby-plugin-postcss
```

Create configuration files for Tailwind CSS and PostCSS. (This is not required to use Tailwind CSS. But we'll customize the default configuration.)

```shell
# Terminal window at project root

npx tailwindcss init -p
```

The command above will add two configuration files. One is `tailwind.config.js`, and the other is `postcss.config.js`.

Now we'll edit the Tailwind configuration to point to the markup templates of the project. Update the `content` property in the `tailwind.config.js` with `./src/**/*.js` value. (We have templates at both `src/components` and `src/templates` directories. Globstar (`**`) matching will cover all directories in between recursively.

```javascript
// tailwind.config.js

module.exports = {
  // ... 
  content: [
    "./src/**/*.js",
  ],
  // ...
}
```

To enable the Gatsby PostCSS plugin, add it to the `gatsby-config.js` plugins array.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    // ...
    `gatsby-plugin-postcss`,
    // ...
  ]
}
```

Now it is time to add various Tailwind CSS functionality with custom `at-rules` of Tailwind. Create a CSS file at `src/css/main.css` and add the custom Tailwind directives to it.

```css
/* src/css/main.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind variants;
```

At this point, we did everything to set up the Tailwind CSS. Now we just need to add the `main.css` file to the project by importing it to the project. We can use any template file to import the main CSS file to the project. However, Gatsby provides an entry point to do such client-side operations. It is called Gatsby Browser APIs and is controlled with the `gatsby-browser.js` files at the project root. (Or with the extensions `*.jsx`, `.tsx`.)

Create a `gatsby-browser.js` file at the project root and import the `main.css` file here.

```javascript
// gatsby-browser.js

import './src/css/main.css'
```

Restart the Gatsby development server and reload any page.

After the reload, you'll notice that Tailwind CSS base styles have already been applied to the pages. (Watch the `font-family` change and link styles.)
      
Now, we're ready to use Tailwind’s utility classes to style the project. I'll conclude this part here since it was only about setting up the Tailwind CSS in Gatsby.

> To improve the developer experience, Tailwind offers extensions for VS Code and JetBrains IDEs. So if you need helpers like autocomplete and linting, ... in the development environment take a look at them.

Before finishing up the part, I want to remind my view on choosing a tech stack. In this tutorial series, I aimed to demonstrate a couple of tools by grabbing them arbitrarily. But in the real-world experience, we shouldn't select a framework just because it's hype or has a funny name. What is supposed to determine this kind of selection is the business context that you are living in at a certain time. So please find a way to assess your circumstances and learn to evaluate the "What do I need for the current business problem?" question. Not the fuss around "Which front-end framework is the best ...?" questions.

### Update Summary

> 👉 [See the full diff at GitHub - Part 13](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/1de909e).

|       | Files Updated                  | Notable Changes                                                                                                   |
| :---: | ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
|   +   | `gatsby-browser.js`            | Added to interact with the client-side of Gatsby. Imported `main.css` here as the CSS entry point to the project. |
|  +/-  | `gatsby-config.js`             | Added `gatsby-plugin-postcss` to the plugins array.                                                               |
|  +/-  | `package-lock.json`            |                                                                                                                   |
|  +/-  | `package.json`                 | Installed `autoprefixer`, `gatsby-plugin-postcss`, `postcss` and `tailwindcss` packages.                          |
|   +   | `postcss.config.js`            | Added to control `taiwindcss` and `autoprefixer` settings.                                                        |
|  +/-  | `src/components/Layout.js`     | Removed `.Layout` classname from the layout wrapper element.                                                      |
|  +/-  | `src/components/Navigation.js` | Removed `activeStyle` attribute controls from navigation items. (It had been added for demo purposes.)            |
|   +   | `src/css/main.css`             | Added tailwind layers with tailwind specific at-rules.                                                            |
|   +   | `tailwind.config.js`           | Added tailwind configuration file to add template paths of the project.                                           |

## Part 14/a - Re-designing the Markup, Interactivity and Components with Tailwind CSS

Parts `14/a`, `14/b`, `14/c` and `14/d` are about changing the look and feel of the site. To this point, we haven't changed the look of the site to focus on the framework itself. It may sound unexciting, but I explained this above somewhere. And since most of the time, the design selections are opinionated, I'll just skip the explanations around the design choices I made. The short explanation for that is "Because it seemed better that way!".

When using Tailwind as your CSS utility framework, you need to get your hands a little bit dirty. (In a positive way.) First, you need to decide what visual style you'll use. Then check the documentation for the need. You'll most likely find a utility for it in the docs. Learn how to use it and add it to the markup. Then move on to the next.

Initially, it is not so comfortable. But you'll get used to it. Tailwind's IDE extensions are helpful at this stage. Tailwind has an intuitional syntax. As you write more and more you'll be alright with the syntax. But please consider the quote below.

> If you don't have a design decision prior to writing styles, no framework is helpful for you. And it is not the framework to blame. You may not know how to use a design tool but please at least take a pencil and paper. Then draw a big rectangle and place your components around it prior to coding. I assure you, it will make the process way easier. And you'll be less angry with the CSS frameworks.

Ok! let's make our site less ugly. I'm gonna start with the fonts and icons. (No specific reason.)

Install `gatsby-plugin-web-font-loader` to load web fonts asynchronously with Gatsby.

```shell
# Terminal window at project root

npm i gatsby-plugin-web-font-loader
```

Add the font loader plugin to the `gatsby-config.js` and select the source and the name of the font with the sizes you want to include.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    // ...
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Quicksand:300,400,500,600,700']
        }
      }
    },
    // ...
  ]
}
```

And install `@heroicons/react` package to use icons as individual React components as `JSX` tags.

```shell
# Terminal window at project root

npm i @heroicons/react
```

You don't need to add `@heroicons/react` to the plugins array. The icons are ready-to-use with installation only.

Now we have both custom fonts and icons. We'll apply the fonts to the site by extending the default Tailwind theme. Open `tailwind.config.js` and update the `theme.extend` option with the `fontFamily` CSS property by importing the default theme from the `tailwindcss` package.


```javascript
// tailwind.config.js

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // ... 
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Quicksand', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  // ...
}
```

The syntax is a bit confusing at first. However, it is pretty straightforward. We've just imported the default theme and prepended our custom font to the default theme's `fontFamily.sans` option. So if we can't load the `Quicksand` fonts from the server, the default fallback will still be the `sans` stack from the framework.

Restart the server and reload any page with text. You'll see the fonts are changed and loaded asynchronously.

While the `tailwind.config.js` is open, let's customize the responsive behaviour. Update the breakpoints and container alignment with the setup below.

```javascript
// tailwind.config.js

module.exports = {
  // ... 
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
    container: {
      center: true,
    },
    // ...
  },
  // ...
}
```

Since we set the large screen size as `1024px` wide, we can restrict the max width of the images in the markdown body. Open `gatsby-config.js` and add the `maxWidth` option to the `gatsby-remark-images` configuration.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    // ...
    {
      // resolve: `gatsby-remark-images`,
      options: {
        maxWidth: 1024,
        // ...
      }
    },
    // ...
  ]
}
```

Restart the server and open `/about` page. Inspect the image and you'll see the image is now contained inside a `1024px` wide container.

> From time to time, instead of working with two monitors, I use local network computers to preview the changes. That's why I included the `--host 0.0.0.0` option to the `gatsby develop` command attached to the `npm start` command.

That is all the configuration needed for the part. From now on, I won't go with the details since the utility classes will occupy a lot of space inside the `JSX` templates. I'll just underline the basic changes that I made.

The first organizational change is the `PageHeader` component which is a shared header area for the templates.

```jsx
// src/components/page-header.js

import React from 'react'

const PageHeader = (props) => {
  
  return (
    <div className='
        bg-stone-50
        text-center
        px-10 py-10
        text-stone-700
        border-b border-dashed border-b-stone-200
    '>
      <h2 className='text-4xl'>{props.frontmatter.title}</h2>
      <p>{props.frontmatter.description}</p>
    </div>
  )
}

export default PageHeader
```

Create the component and replace all the title and description sections with the component in every template under the `src/templates` directory. See `page-template.js` as the sample below.

Pass the `frontmatter` data from GraphQL query result to the `PageHeader` component as `frontmatter` prop.

```jsx
// src/templates/page-template.js

// ...
import PageHeader from '../components/PageHeader.js';

const PageTemplate = (props) => {

  // ...

  return (
    <Layout>
      {/* ... */}
      <PageHeader frontmatter={props.data.markdownRemark.frontmatter} />
      {/* ... */}
    </Layout>
  )
}

// ...
```

Apply the change to the other templates and revisit the pages. You'll see a better site with a shared header element with styles on every page. I hope it gives a little bit of enthusiasm at last. I know web development without styles might be a bit boring. But much is coming in a bit.

Now let's have better navigation. I'll skip most of the styling here and summarize the expand/collapse behaviour implementation. Please overlook the `...`s in the class names. 

```jsx
// src/components/Navigation.js

import React, { useState } from 'react'
import { MenuIcon, ScissorsIcon, XIcon } from '@heroicons/react/outline'

const Navigation = (props) => {

  const [navbarStatus, setNavbarStatus] = useState(false);
  /**
   * Hamburger menu controls
   */
  const handleNavbarClick = () => {
    setNavbarStatus((prevState) => {
      return !prevState;
    });
  }
  
  return (
    <nav className='
      bg-gradient-to-r from-stone-100 to-stone-300
      ...
      relative
      ...
    '>
      {/* ... */}
      <div className={`
        ...
        ${!navbarStatus ? 'hidden' : 'block'}
        ...
        md:block
        ...
      `}>
        <Link to='/' activeClassName='...' className='...'>Home</Link>
        <Link to='/about' activeClassName='...' className='...'>About</Link>
        <Link to='/designs' activeClassName='...' className='...'>Designs</Link>
      </div>
      <div className='py-5 px-5 absolute top-0 right-0 md:hidden'>
        <button className='w-6 h-6 block' onClick={handleNavbarClick}>
          {
            !navbarStatus ? <MenuIcon className='...' /> : <XIcon className='...' />
          }
        </button>
      </div>
    </nav>
  )
}
```

A pretty straightforward React component control is above. I've added the state variable `navbarStatus` to control user clicks on the hamburger menu. Based on its boolean value navbar will be visible or hidden to the user. I've also used the icons from the `@heroicons/react/outline` package for both the hamburger menu icon and the menu icon.

You'll see the hamburger menu below `768px`. Otherwise, the navbar is always visible.

> **A React Reminder**: If you haven't noticed yet, we have two navbars. One is at the top, one is at the footer. This is just for demo purposes. Switch to the mobile view and expand the hamburger menu for one. Only the clicked navbar will be expanded because state variables are encapsulated. These two navbars use exact the same React component. However, their states are managed separately.

In the shared layout component, I'll change the footer background, make the header element sticky and add a background noise pattern to the layout. (We'll move this style to a better place later on.)

```jsx
// src/components/Layout.js

import { ChevronDoubleUpIcon } from '@heroicons/react/outline'

// ...

const Layout = (props) => {
  return (
    <div className='
      ...
      bg-[url(/img/noisy-texture-100x100-o4-d12-c-4481bd-t1.png)]
      ...
    '>
      <header className='
        ...
        sticky
        top-0
        ...
      '>
        <Navigation />
      </header>
      <main>
        {props.children}
      </main>
      <footer className='
        bg-gradient-to-r from-stone-800 to-stone-900
        text-stone-200
        text-center
        py-8 px-4
      '>
        <span className='inline-block w-5 h-5'>
          <ChevronDoubleUpIcon />
        </span>
      </footer>
    </div>
  )
}

export default Layout
```

Here in the layout component, I just want to point out a single thing which is Tailwind's "arbitrary values" syntax. With the bracket `[...]` notation, you can add any value to almost every CSS rule. Here we used it to add a custom background image pattern with `bg-[url(/img/noisy-texture-100x100-o4-d12-c-4481bd-t1.png)]`.

Now, I'll return to the `src/templates/designs-template.js` designs listing page. I'll add images to the listing and create a three columns layout for the page.


```jsx
// src/templates/designs-template.js

// ...

import { GatsbyImage } from 'gatsby-plugin-image';

// ...

const DesignsTemplate = (props) => {

  // ...
  
  return (
    <Layout>
      <PageHeader frontmatter={props.data.markdownRemark.frontmatter} />
      <div className='...'>
        {/* ... */}
        <ul className='
          grid
          gap-4
          md:grid-cols-3
          place-items-center
        '>
          {
            props.data.allMarkdownRemark.edges.map((edge) => {
              return (
                <li key={edge.node.id} className='...'>
                  <GatsbyImage
                    image={edge.node.frontmatter.image.childImageSharp.gatsbyImageData}
                    alt={"Please always fill the alternative text attributes!"}
                  />
                  <div className='...'>
                    <h1 className='text-lg font-medium'>{edge.node.frontmatter.title}</h1>
                    <p>{edge.node.frontmatter.description}</p>
                    <Link to={edge.node.fields.slug} title={edge.node.fields.slug} className='...'>
                      See the Detail
                    </Link>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($pageId: String = "") {
    # ...
    allMarkdownRemark(
      # ...
    ) {
      edges {
        node {
          # ...
          frontmatter {
            # ...
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

export default DesignsTemplate
```

Two things to see here. One is the `gatsbyImageData` query in the GraphQL page query along with its usage in the `GatsbyImage` component's `image` property. Another one is the usage of the `grid` CSS feature in the `<ul>` element to demonstrate the three column layout.

Now, I'll add the third design sample with the title "hello from design 03" to demonstrate the three-column grid layout. And here are our design cards on the listing page.

Reload the page and see the changes. A better representation for a listing page.

> Please remember that I skipped details for most of the styling work. So, there will be a lot of missing styles in the code examples above. Refer to the GitHub repository for the complete version of the markup and styles.

That will close the initial design updates for the site. The purpose of this part was to put forward the main components of the site. That was the page header, the collapsible menu, the main layout and the listing page.

### Update Summary

> 👉 [See the full diff at GitHub - Part 14/a](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/b995765).

|       | Files Updated                                             | Notable Changes                                                                                                                                   |
| :---: | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
|  +/-  | `gatsby-config.js`                                        | Restricted image width in markdown body to `1024px` and added font loader to the plugins array.                                                   |
|  +/-  | `package-lock.json`                                       |                                                                                                                                                   |
|  +/-  | `package.json`                                            | Added `--host` option to `npm start` command for local network access. Installed `@heroicons/react` and `gatsby-plugin-web-font-loader` packages. |
|  +/-  | `src/components/Layout.js`                                | Updated markup and styles.                                                                                                                        |
|  +/-  | `src/components/Navigation.js`                            | Updated markup and styles. Added menu toggled logic.                                                                                              |
|   +   | `src/components/PageHeader.js`                            | Added shared `PageHeader` component.                                                                                                              |
|   +   | `src/content/designs/hello-from-design-03.md`             | Added a new design page with frontmatter image data.                                                                                              |
|  +/-  | `src/templates/default-template.js`                       | Updated markup and styles.                                                                                                                        |
|  +/-  | `src/templates/design-template.js`                        | Updated markup and styles.                                                                                                                        |
|  +/-  | `src/templates/designs-template.js`                       | Updated markup and styles.                                                                                                                        |
|  +/-  | `src/templates/page-template.js`                          | Updated markup and styles.                                                                                                                        |
|   +   | `static/img/noisy-texture-100x100-o4-d12-c-4481bd-t1.png` | Added a noise pattern for the site background.                                                                                                    |
|  +/-  | `tailwind.config.js`                                      | Customized responsive breakpoints, container position and font options.                                                                           |
|   +   | `uploads/ali-muhamad-ht1r6z5py5i-unsplash.jpg`            | Uploaded a sample image for the newly added design page.                                                                                          |

## Part 14/b - Controlling Typography in the Markdown Body with "tailwindcss/typography"

When we work with a CMS, content creators will use various typographic features in the rich text editors. And this data will most likely be passed to the client-side as HTML strings. In this case we need to add this string to the markup with JavaScript APIs like `Element.innerHTML`, `Element.insertAdjacentHTML()`, ... Or in React with the `dangerouslySetInnerHTML` attribute.

That means we can't use Tailwind's utility classes directly in the content body sections. 

> Enabling HTML content in the text editor is an option. But I strongly discourage you to do so. What I find usefull is, having a dynamic style guide is always better than a fully-featured content editor.

This is where Tailwind offers a typography plugin named `@tailwindcss/typography`. It adds a default style set to the HTML out of our control.

Now, install the `@tailwindcss/typography` plugin.

```shell
# Terminal window at project root

npm i @tailwindcss/typography
```

Open the `tailwind.config.js` and add the typography plugin to the plugins list. Then add the `typography` property to the `theme.extend` object. The only configuration update is to reset `65ch` default value of the `maxWidth` setting.

```javascript
// tailwind.config.js

module.exports = {
  // ... 
  theme: {
    // ...
    extend: {
      // ...
      typography: {
        DEFAULT: {
          css: {
            maxWidth: null,
          },
        },
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  // ...
}
```

That's all to do with the plugin configuration. Now we'll apply the typographic styles to the content. `@tailwindcss/typography` package controls styles with class names prefixed with as set of `prose-*` keyword.

Before adding the `prose-*` classes to the HTML content containers, I'll add dummy content to the `src/pages/about.md` page content to preview the changes. Update your markdown content with a couple of **bold**, *italic* content, a list of items and etc...

Now open the `src/templates/page-template.js` and add a couple of `prose-*` classes to the container element that use the `dangerouslySetInnerHTML` method.

```jsx
// src/templates/page-template.js

// ...

const PageTemplate = (props) => {
  
  // ...  

  return (
    <Layout>
      {/* ... */}
      <div
        dangerouslySetInnerHTML={{'{{
          __html: props.data.markdownRemark.html
        '}}}}
        className='
          container
          ...
          prose
          prose-p:text-stone-900
          prose-img:rounded-lg
      '>
      </div>
    </Layout>
  )
}

// ...
```

Do the same with the design listing template.

```jsx
// src/templates/designs-template.js

// ...

const DesignsTemplate = (props) => {
  
  // ...  

  return (
    <Layout>
      {/* ... */}
      <div className='...'>
        <div
          dangerouslySetInnerHTML={{'{{
            __html: props.data.markdownRemark.html
          '}}}}
          className='
            prose
            prose-p:text-stone-900
        '>
        </div>
        {/* ... */}
      </div>
    </Layout>
  )
}

// ...
```

That's it! Now open the page and reload. You'll see the default typography styles are applied to the page content. Default styles are opinionated. However, they're fully customizable in the `tailwind.config.js` file.

We now have a customized page content in the markdown body. In the next part, I'll customize the front page of the site.

### Update Summary

> 👉 [See the full diff at GitHub - Part 14/b](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/8f3f7cc).

|       | Files Updated                       | Notable Changes                                                               |
| :---: | ----------------------------------- | ----------------------------------------------------------------------------- |
|  +/-  | `package-lock.json`                 |                                                                               |
|  +/-  | `package.json`                      | Installed `@tailwindcss/typography` package for the markdown body typography. |
|  +/-  | `src/pages/about.md`                | Updated page content with dummy text.                                         |
|  +/-  | `src/templates/designs-template.js` | Updated styles.                                                               |
|  +/-  | `src/templates/page-template.js`    | Updated styles.                                                               |
|  +/-  | `tailwind.config.js`                | Added `@tailwindcss/typography` plugin and its custom options to the config.  |

## Part 14/c - Customizing Home Page

At this stage, our home page is still using the `src/templates/page-template.js` template. In this part, we'll change the look of the home page and add a special case for the home route in `gatsby-cofig.js`.

I'll start with adding a `featuredImage` field to the Netlify CMS `pages` collection. From now on, every page will have an optional featured image.

Open the `static/admin/config.yml` and add the `featuredImage` field to the `pages` collection.

```yaml
# static/admin/config.yml

# ...

collections:
  # - name: pages
    # ...
    fields:
      # ...
      - {label: "Featured Image", name: "featuredImage", widget: "image", required: false, allow_multiple: false, choose_url: false}

# ...
```

Reload the CMS. You'll see the optional featured image upload widget in the "pages" collection at the bottom of the page. Add an image to the **Index** page and leave the CMS. This change will add the `featuredImage: ...` frontmatter data to the `src/pages/index.md` content.

Now we have an image to show on the front/index page. Let's create a custom template for the index page. Create `src/templates/index-template.js` in the templates directory. You may start by copying the `src/template/default-template.js`.

```jsx
// src/templates/index-template.js

import React from 'react'
import Layout from '../components/Layout.js';

const IndexTemplate = (props) => {

  console.log(props);

  return (
    <Layout>
      <div className='cotainer'>
        <h1>Index Template</h1>
      </div>
    </Layout>
  )
}

export default IndexTemplate
```

At this point, you should still be using the `src/templates/page-template.js` on the home page because we haven't told Gatsby about this custom home page.

Remember our template selection logic in the `gatsby-node.js`? Now, I'll add a special case for the home page. Open the `gatsby-node.js` file and follow the code below.

> Add the special case right after the "Assumption 1" to override the initial check. 

```javascript
// gatsby-node.js

// ...

exports.createPages = async ({ graphql, actions, reporter }) => {
  // ...

  result.data.allMarkdownRemark.edges.forEach((edge) => {
    // ...
    // let pageTemplatePath = ...

    // Add a special case for the index layout (We need to match the slug "/" to "index-template.js" manually.)
    if (edge.node.fields.slug === '/') {
      pageTemplatePath = path.resolve(`./src/templates/index-template.js`);
    }
  
    // ...
  })
}

// ...
```

Since the home page route is a single `/`, we can't use the slugified page name here. So, we used a pretty simple `if` block to handle the home page route.

> Use special route handling on rare occasions. Overusing this kind of customization eventually means manually creating the site routes. (Hellooo, most of the back-end developers around the world. 🙋)

Add the special condition block to the `gatsby-node.js` and restart the Gatsby development server. Instead of seeing the page template with the page header and the description text, you should see the static "Index Template" heading on the home page.

Now we have the custom home page template working. Let's customize the design. I'll use the `featuredImage` as the splash image on the front page in the square format. And a static title/subtitle section on top of it. That'll be the only customization for the page.

```jsx
// src/templates/index-template.js

import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react'
import Layout from '../components/Layout.js';

const IndexTemplate = (props) => {

  console.log(props.data);

  return (
    <Layout>
      <div className='...'>
        <div className='...'>
          <h1 className='...'>Hola Mundo!</h1>
          <h2 className='...'>I'm a designer!</h2>
        </div>
        <div className='...'>
          <GatsbyImage
            image={props.data.markdownRemark.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
            alt={"Please always fill the alternative text attributes!"}
          />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($pageId: String = "") {
    markdownRemark(id: { eq: $pageId }) {
      id
      fields {
        slug
      }
      frontmatter {
        title
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              aspectRatio: 1
              transformOptions: {fit: COVER, cropFocus: CENTER}
            )
          }
        }
      }
      html
    }
  }
`

export default IndexTemplate
```

I've skipped some class names to keep the code sample above shorter. What you need to notice for the custom index page template is the GraphQL query for the custom image. It now requests a square image with an `aspectRatio` setup and transforms the image to cover its container. And the title/subtitle pair is represented by `h1`/`h2` elements statically.

> I used "home page", "index page" and "front page" to point to the home page. They all refer to the `/` route.

And that change concludes this part. At this point, we have a customized home page for the site. You may use this flow to add any other custom page out of your pre-defined templates' capabilities. But remember to avoid too much customization.

In the next and the last part of this chapter, I'll customize the design detail pages to show a group of images in the detail pages.

### Update Summary

> 👉 [See the full diff at GitHub - Part 14/c](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/b400d9d).

|       | Files Updated                                       | Notable Changes                                        |
| :---: | --------------------------------------------------- | ------------------------------------------------------ |
|  +/-  | `gatsby-node.js`                                    | Added a special case for the home page route.          |
|  +/-  | `src/pages/index.md`                                | Added `featuredImage` option to the frontmatter data.  |
|   +   | `src/templates/index-template.js`                   | Added a custom template for the site index page.       |
|  +/-  | `static/admin/config.yml`                           | Added `featuredImage` filed to the `pages` collection. |
|   +   | `uploads/gabriel-silverio-hibll8rsiwc-unsplash.jpg` | Added a feature image for the frontpage.               |

## Part 14/d - Customizing Design Detail Pages with Multiple Images from Netlify CMS

In this last part, I'll update the design detail pages to show multiple images from the CMS instead of a single one.

Let's start with the CMS configuration. Open the `static/admin/config.yml` and rename the field `image` as `featuredImage` in the `designs` collection. (We did the same for the `pages` collection in the previous part.)

Then add a `list` widget named `images` with the three fields. A `title`, a `description` and an `image` field. We'll use this list widget to show multiple images on design detail pages.

```yaml
# static/admin/config.yml

# ...

collections:
  # ...      
  # - name: designs
    # ...
    fields:
      # ...
      - {label: "Featured Image", name: "featuredImage", widget: "image", allow_multiple: false, choose_url: false}
      - label: "Images"
        name: "images"
        widget: "list"
        fields:
          - {label: "Title", name: "title", widget: "string"}
          - {label: "Description", name: "description", widget: "text"}
          - {label: "Image", name: "image", widget: "image", allow_multiple: false, choose_url: false}
```

Now go to the CMS and add a couple of images to all designs. Later on, we'll show these in the detail pages.

> I added four images to each design and customized their title/description text with random texts. I also added a fourth design item to the content named "magnitude". Along with that, I replaced the textual content with random texts on the pages "index", "about" and "designs". Lastly, I changed the content container styles in the `src/templates/page-template.js` to match with other templates. These are the changes I didn't mention in writing. But you might notice in the related commit.

Now let's update the related templates `src/templates/designs-template.js` and `src/templates/design-template.js`. Let's start with the listing page template.

Open the `src/templates/designs-template.js` and rename the `image` to `featuredImage` in both GraphQL query and the `GatsbyImage` component.

```jsx
// src/templates/designs-template.js

// ...

const DesignsTemplate = (props) => {

  // ...
  
  return (
    <Layout>
      {/* ... */}
      <div className='...'>
        {/* ... */}
        <ul className='...'>
          {
            props.data.allMarkdownRemark.edges.map((edge) => {
              return (
                <li key={edge.node.id} className='...'>
                  <GatsbyImage
                    image={edge.node.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
                    alt={"Please always fill the alternative text attributes!"}
                  />
                {/* ... */}
              </li>
              );
            })
          }
        </ul>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($pageId: String = "") {
    # ...
    # allMarkdownRemark(
      # ...
    # ) {
      edges {
        node {
          # ...
          # frontmatter {
            # ...
            featuredImage {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`

export default DesignsTemplate
```

Nothing more than a property name change in the code above. I also updated a couple of styles that are not worth mentioning.

Now, it is time to update the main topic of this part, which is the detail pages. Open the `src/templates/design-template.js` and first update the page query with `featuredImage` and `images` queries.

Then, instead of using a single `GatsbyImage` component, use an iteration for the `images` list and print every image to the page. See the code block below.


```jsx
// src/templates/design-template.js

// ...

const DesignTemplate = (props) => {

  // ...
  
  return (
    <Layout>
      {/* ... */}
      <div className='
        container
        py-8 px-4 md:px-0
      '>
        <div className='
          grid
          gap-4
          grid-cols-1
          md:grid-cols-2
        '>
          {
            props.data.markdownRemark.frontmatter.images &&
            props.data.markdownRemark.frontmatter.images.map((data) => {
              return (
                <div key={data.image.id}>
                  <div className='shadow rounded-lg overflow-clip'>
                    <GatsbyImage
                      image={data.image.childImageSharp.gatsbyImageData}
                      alt={data.title}
                    />
                  </div>
                  <div className='text-sm text-center leading-4 mt-1 p-1 rounded-lg'>
                    <h1 className='font-medium text-stone-700'>{data.title}</h1>
                    <p className='text-stone-500'>{data.description}</p>
                  </div>
                </div>
              );
            })
          }
          <div className='md:col-span-2'>
            <GatsbyImage
              image={props.data.markdownRemark.frontmatter.featuredImage.childImageSharp.gatsbyImageData}
              alt={"Please always fill the alternative text attributes!"}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($pageId: String = "") {
    markdownRemark(
      # ...
    ) {
      # ...
      frontmatter {
        # ...
        featuredImage {
          childImageSharp {
            gatsbyImageData
          }
        }
        images {
          title
          description
          image {
            id
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 1
                transformOptions: {fit: COVER}
              )
            }
          }
        }
      }
    }
  }
`

export default DesignTemplate
```

Here, I kept the class names in the code block above. Sorry if the code block is not readable. After you update the design detail page template, restart the development server and go to one of the detail pages. You should see a 2-columns grid with square images in the above `1024px` wide browser screen. Every detail page is represented with multiple images and their title/description pair. And also the `featuredImage` at the bottom of the detail page.

And that brings the project styling chapter to its end.

### Update Summary

> 👉 [See the full diff at GitHub - Part 14/d](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/afa38ad).

|       | Files Updated                                              | Notable Changes                                                                                                                  |
| :---: | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
|  +/-  | `src/content/designs/hello-from-design-01.md`              | Replaced frontmatter `image` data with `featuredImage`. Added `images` data field with multiple images. Updated textual content. |
|  +/-  | `src/content/designs/hello-from-design-02.md`              | Replaced frontmatter `image` data with `featuredImage`. Added `images` data field with multiple images. Updated textual content. |
|  +/-  | `src/content/designs/hello-from-design-03.md`              | Replaced frontmatter `image` data with `featuredImage`. Added `images` data field with multiple images. Updated textual content. |
|   +   | `src/content/designs/magnitude.md`                         | Added a new sample design detail page.                                                                                           |
|  +/-  | `src/pages/about.md`                                       | Update markdown body with dummy content.                                                                                         |
|  +/-  | `src/pages/designs.md`                                     | Update markdown body with dummy content.                                                                                         |
|  +/-  | `src/pages/index.md`                                       | Update markdown body with dummy content.                                                                                         |
|  +/-  | `src/templates/design-template.js`                         | Updated markup and styles. Updated GraphQL queries with the new filed names.                                                     |
|  +/-  | `src/templates/designs-template.js`                        | Updated markup and styles. Updated GraphQL queries with the new filed names.                                                     |
|  +/-  | `src/templates/page-template.js`                           | Updated styles.                                                                                                                  |
|  +/-  | `static/admin/config.yml`                                  | Renamed `image` filed to `featuredImage`. Added `images` list field to the `pages` collection.                                   |
|   +   | `uploads/ali-muhamad-ht1r6z5py5i-unsplash-01.jpg`          | Upload a sample image.                                                                                                           |
|   +   | `uploads/ali-muhamad-ht1r6z5py5i-unsplash-02.jpg`          | Upload a sample image.                                                                                                           |
|   +   | `uploads/ali-muhamad-ht1r6z5py5i-unsplash-03.jpg`          | Upload a sample image.                                                                                                           |
|   +   | `uploads/ali-muhamad-ht1r6z5py5i-unsplash-04.jpg`          | Upload a sample image.                                                                                                           |
|   +   | `uploads/irene-kredenets-tcvh_bwhtrc-unsplash-01.jpg`      | Upload a sample image.                                                                                                           |
|   +   | `uploads/irene-kredenets-tcvh_bwhtrc-unsplash-02.jpg`      | Upload a sample image.                                                                                                           |
|   +   | `uploads/irene-kredenets-tcvh_bwhtrc-unsplash-03.jpg`      | Upload a sample image.                                                                                                           |
|   +   | `uploads/irene-kredenets-tcvh_bwhtrc-unsplash-04.jpg`      | Upload a sample image.                                                                                                           |
|   +   | `uploads/junko-nakase-q-72wa9-7dg-unsplash.jpg`            | Upload a sample image.                                                                                                           |
|   +   | `uploads/markus-spiske-rdzzs9f53le-unsplash.jpg`           | Upload a sample image.                                                                                                           |
|   +   | `uploads/nimble-made-gdebknrytd4-unsplash.jpg`             | Upload a sample image.                                                                                                           |
|   +   | `uploads/paulina-milde-jachowska-bjqg5g6eans-unsplash.jpg` | Upload a sample image.                                                                                                           |
|   +   | `uploads/sarah-dorweiler-gupitdbdre4-unsplash-01.jpg`      | Upload a sample image.                                                                                                           |
|   +   | `uploads/sarah-dorweiler-gupitdbdre4-unsplash-02.jpg`      | Upload a sample image.                                                                                                           |
|   +   | `uploads/sarah-dorweiler-gupitdbdre4-unsplash-03.jpg`      | Upload a sample image.                                                                                                           |
|   +   | `uploads/sarah-dorweiler-gupitdbdre4-unsplash-04.jpg`      | Upload a sample image.                                                                                                           |
|   +   | `uploads/tamara-bellis-avyd_iph_c4-unsplash.jpg`           | Upload a sample image.                                                                                                           |

## Chapter 4 - Summary

I named this chapter "Styling Gatsby Site ..." but the main focus was on the setup and configuration of the Tailwind CSS framework. Not the styling itself. Because it is hard to explain design selections and CSS code in writing. I felt like I had to explain each Tailwind CSS utility class and the responsive variations that I used in the templates. So I skipped most of them. Sorry for that.

The key points to take away from this chapter are learning how to set up Tailwind CSS with Gatsby, control the typography in the uncontrolled HTML tags and add a custom template to the project with a custom route.

See you in the next!

**Next**: [Chapter 5 - Adding "Settings", "Contact" and "404" Pages in Gatsby](/2022/adding-settings-contact-and-404-pages-in-gatsby)
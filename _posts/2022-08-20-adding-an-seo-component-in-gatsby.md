---
title: Adding an "SEO" Component in Gatsby
excerpt: Dynamic websites and search engine optimization is an evergreen topic. I have no idea why we haven't resolved it already, but I believe it'll still be with us for some time. In this chapter, we'll add a React component to control page metadata with the well-known "React Helmet" component.
tags:
  - Netlify CMS
  - Gatsby
  - React Helmet
  - Seo
  - Going Local and Free with Gatsby and Netlify CMS
  - Chapter 6
  - Part 18
multipart: 6/7
canonical: https://kemalyilmaz.com/blog/adding-an-seo-component-in-gatsby/
---

> This post is the 6th chapter of a 7-chapter article series "[Going Local and Free with Gatsby & Netlify CMS](/2022/going-local-and-free-with-gatsby-and-netlify-cms)".

> In the previous chapter, we've added a `404` page to handle "Not Found" errors that have nothing to do with this chapter. Now, we'll add an SEO (Short for Search Engine Optimization.) component to control content-specific metadata across the site.

## Part 18 - Using "react-helmet" to Control Page Metadata

When working with Gatsby, you'll find out that you can't edit site `<html>`, `<body>` or `<head>` elements directly from the templates. They're all preset by the framework. But there are ways to change them. One way is to copy the default HTML template `.cache/default-html.js` to your project `src/html.js` and do the customization. Not a recommended one. The other way is to use Gatsby APIs like `onRenderBody` or `onPreRenderHTML`. A relatively new way to use Gatsby Head API was added in `gatsby@4.19.0`.

Here I'll use the good old way with the React Helmet component.

Now, install the related plugins `gatsby-plugin-react-helmet` and `react-helmet`.

```shell
# Terminal window at project root

npm i gatsby-plugin-react-helmet react-helmet
```
Add `gatsby-plugin-react-helmet` plugin to the `gatsby-config.js` plugins array.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    // ...
    `gatsby-plugin-react-helmet`,
    // ...
  ]
}
```

Now create a `src/components/Seo.js` file and export a React component from the file.

```jsx
// src/components/Seo.js

import { useLocation } from '@reach/router';
import React from 'react'
import { Helmet } from 'react-helmet'

const Seo = (props) => {
  // Get location data from the router.
  const location = useLocation();

  const pageMeta = {
    title: props.settings.siteTitle,
    description: '',
    imageSrc: '/img/static-img-og-fallback.jpg',
  }

  if (props.page !== undefined) {
    pageMeta.title = props.page.title;
    pageMeta.description = props.page.description;
    if (props.page.featuredImage?.childImageSharp.resize.src) {
      pageMeta.imageSrc = props.page.featuredImage?.childImageSharp.resize.src;
    }
  }

  return (
    <Helmet titleTemplate='%s | Hola Mundo!'>
      {/* Github Pages URL: https://xkema.github.io/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/ */}

      {/* site meta */}
      <meta name="description" content={pageMeta.description} />
      <title>{pageMeta.title}</title>

      {/* meta meta 😱 */}
      <meta property="og:url" content={location.href} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageMeta.title} />
      <meta property="og:description" content={pageMeta.description} />
      <meta property="og:image" content={pageMeta.imageSrc} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* twitter meta, missing tags will be completed from "og:*" meta */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@Twitter" />
      <meta name="twitter:image:alt" content={pageMeta.description} />

      {/* favicon */}
      <link rel="shortcut icon" href="/img/static-img-favicon.png"></link>

      {/* other */}
      <body className='
        bg-stone-50
        bg-[url(/img/static-img-bg-noisy-texture.png)]
        bg-fixed'>
      </body>
    </Helmet>
  )
}

export default Seo
```

The `Seo` component expects a prop named `page`. The `page` prop is passed from the `Layout` component. And it is filled with the `props.data.markdownRemark.frontmatter` data from each template. Bit confusing? Let's see the updates on `src/component/Layout.js`.

```jsx
// src/components/Layout.js

// ...

import Seo from './Seo.js'

const Layout = (props) => {

  // ...
  
  return (
    <div>
      <Seo page={props.page} settings={settings.markdownRemark.frontmatter.settings} />

      {/* ... */}
      
    </div>
  )
}

// ...
```

The `Seo` component in the `Layout` expects two props to be filled. The `page` and the `settings` attributes. In "Part 15", we've already had the `settings` data with a static query. However, we don't have the `props.page` yet because it should have been passed from the `<Layout>` tags in the page templates. Let's use the page template as the sample.

```jsx
// src/templates/page-template.js

// ...

const PageTemplate = (props) => {

  // ...

  return (
    <Layout page={props.data.markdownRemark.frontmatter}>
      {/* ... */}
    </Layout>
  )
}

export const query = graphql`
  query($pageId: String = "") {
    markdownRemark(id: { eq: $pageId }) {
      # ...
      frontmatter {
        # ...
        featuredImage {
          childImageSharp {
            gatsbyImageData
            resize(width: 1200, height: 630, fit: CONTAIN, background: "#fafaf9") {
              src
            }
          }
        }
      }
      # ...
    }
  }
`

// ...
```

In the template files we have the frontmatter data in the `props.data.markdown` object from the page queries. So the `page` prop in the `Seo` component is sourced from this data.

We need to update every `Layout` component in the template files with this addition.

> Remember, you need to update `frontmatter` fields inside the page queries. (Queries that accepts `$pageId` as their input argument.) Not the static queries or the other queries.

Along with this, I've added `featuredImage` to each page query in the template files to use it as the Open Graph image.

> If you feel like your Graph queries are bloated, you might want to use **GraphQL Fragments**. These are reusable GraphQL queries to organize complex queries.

Now return back to the `Seo` component and try to understand the flow. Initially, I defined a `pageMeta` variable to set defaults with static texts and `settings` data. Then, if the `page` object is available, I update it with the `page` data from the templates. And then, I return a `<Helmet>` tag with the content I want to set dynamically.

> Please note that `react-helmet` doesn't support conditional rendering. So setting a default value and then overriding it is the pattern we need to follow with the component.

That's all we need to do for the dynamic metadata creation. The remaining work will be done by `react-helmet` and `Gatsby`.

Now reload the site and navigate around the pages while keeping an eye on the browser tab. You'll now notice that page titles are updated when you switch the page. Way to go sister!

> We used `gatsby-plugin-react-helmet` in this part. But if you're not planning to use the "Server-Side Rendering (SSR)" method of Gatsby, you don't need it. In this tutorial series, we used the default rendering method "Static Site Generation (SSG)". The third rendering option supported by Gatsby is "Deferred Static Generation (DSG)".

In case you didn't notice, I moved the page background pattern from `Layout` to the `Seo` component. Previously the background image data was set on a `<div>` element in the layout. But now it is properly set on the `<body>` tag. I also added a favicon and a fallback Open Graph image for the pages that haven't got a `featuredImage`.

See the related lines below.

```jsx
// src/components/Seo.js

// ...

const Seo = (props) => {
  
  // ...

  const pageMeta = {
    // ...
    imageSrc: '/img/static-img-og-fallback.jpg',
  }

  return (
    <Helmet titleTemplate='%s | Hola Mundo!'>

      {/* ... */}

      {/* favicon */}
      <link rel="shortcut icon" href="/img/static-img-favicon.png"></link>

      {/* other */}
      <body className='
        bg-stone-50
        bg-[url(/img/static-img-bg-noisy-texture.png)]
        bg-fixed'>        
      </body>

    </Helmet>
  )
}

export default Seo
```

Lastly, to fill the `og:url` metadata, I used the `useLocation` hook from the Gatsby router `@reach/router`. 
    
And that's it for the chapter. At this point, we have search engine-optimized pages.

### Update Summary

> 👉 [See the full diff at GitHub - Part 18](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/577853d).

|       | Files Updated                                | Notable Changes                                                           |
| :---: | -------------------------------------------- | ------------------------------------------------------------------------- |
|  +/-  | `gatsby-config.js`                           | Added `gatsby-plugin-react-helmet` plugin to the config.                  |
|  +/-  | `package-lock.json`                          |                                                                           |
|  +/-  | `package.json`                               | Installed `gatsby-plugin-react-helmet` and `react-helmet` packages.       |
|  +/-  | `src/components/Layout.js`                   | Included Seo component to the layout.                                     |
|   +   | `src/components/Seo.js`                      | Added Seo component to control page metadata.                             |
|  +/-  | `src/templates/contact-template.js`          | Passed page metadata to the Layout component to use in the Seo component. |
|  +/-  | `src/templates/default-template.js`          | Passed page metadata to the Layout component to use in the Seo component. |
|  +/-  | `src/templates/design-template.js`           | Passed page metadata to the Layout component to use in the Seo component. |
|  +/-  | `src/templates/designs-template.js`          | Passed page metadata to the Layout component to use in the Seo component. |
|  +/-  | `src/templates/index-template.js`            | Passed page metadata to the Layout component to use in the Seo component. |
|  +/-  | `src/templates/page-template.js`             | Passed page metadata to the Layout component to use in the Seo component. |
|  +/-  | `static/img/static-img-bg-noisy-texture.png` | Renamed asset.                                                            |
|   +   | `static/img/static-img-favicon.png`          | Added favicon.                                                            |
|   +   | `static/img/static-img-og-fallback.jpg`      | Added fallback image for the Open Graph meta tags.                        |

## Chapter 6 - Summary

One way or another, we have to comply with the search engine bots and metadata crawlers. It has always been a struggle. However, tons of solutions arose from it. And the solution above is just one of them. In the next and hopefully the last chapter, we'll create a production build that is ready to be hosted statically on any static web hosting service.

**Next**: [Chapter 7 - Preparing for the Gatsby & Netlify CMS Production Build](/2022/preparing-for-the-gatsby-and-netlify-cms-production-build)
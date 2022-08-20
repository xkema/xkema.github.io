---
title: Preparing for the Gatsby & Netlify CMS Production Build
excerpt: Once upon a time, developing a static website was the job for most of us. Nowadays, some of our's job is to maintain the pipeline that exports this static website. In the previous chapters, we developed such a pipeline. (Actually, Gatsby and Netlify CMS did!) In this chapter, we'll prepare the static export and publish it with GitHub Pages.
tags:
  - Netlify CMS
  - Gatsby
  - gatsby build
  - Going Local and Free with Gatsby and Netlify CMS
  - Chapter 7
  - Part 19
multipart: 7/7
---

> This post is the 7th and the last chapter of a 7-chapter article series "[Going Local and Free with Gatsby & Netlify CMS](/2022/going-local-and-free-with-gatsby-and-netlify-cms)".

> The previous chapter was the last touch on our demo site. I know there is more to do. But for demo purposes, I'll cut it here and start to publish the static output of our site.

## Part 19 - Customizing the Production Build to Reduce the Export Size

Finally, it is time to publish. Before publishing, I want to alter the project configuration to demonstrate a couple of extra Gatsby APIs.

Before that, I want to add new `package.json` scripts to facilitate the build process. Update the `scripts` field with the extras below.

```json
{
  "scripts": {
    "start": "...",
    "proxy": "...",
    "clean": "gatsby clean",
    "build": "gatsby clean && gatsby build",
    "build:serve": "gatsby clean && gatsby build && gatsby serve",
    "build:path-prefix": "gatsby clean && gatsby build --prefix-paths"
  },
}
```

I'll also drop the support for Internet Explorer.

```json
{
  "browserslist": "> 0.25%, not dead, not ie 11"
}
```

Now we can continue with the reduction. First, I'll exclude Netlify CMS from the published site. Since we've targeted a locally dynamic, remotely static website, we don't need it on the remote server. Open the `gatsby-config.js` and add a boolean flag on top of the file to control that.

```javascript
// gatsby-config.js

/**
 * A flag to control Netlify CMS avbailability on production builds.
 * (CMS will only be avaiable on local development environment.)
 */
let includeNetlifyCms = process.env.NODE_ENV === 'development';

/**
 * Reference Gatsby configuration as a variable to modify it on runtime.
 */
const gatsbyConfig = {
  plugins: [
    // ...
  ]
}

// Include Netlify CMS plugin if environment is local. (See the top!)
if(includeNetlifyCms) {
  gatsbyConfig.plugins.push(`gatsby-plugin-netlify-cms`);
}

module.exports = gatsbyConfig;
```

The code block above reads the `NODE_ENV` from the process and drops `gatsby-plugin-netlify-cms` automatically if it is not the `development` environment.

Now I'll add a configuration value to control paths in Gatsby. If your site is hosted from a subdirectory, you need to tell it to Gatsby. Since we use GitHub Pages' project pages we'll need it. The configuration is the `pathPrefix` setting and it requires special treatment. See the `package.json` script `build:path-prefix` has a `--prefix-paths` flag to invoke this. We'll also use the special `withPrefix` helper method of the Gatsby for manually created paths.

Open the `gatsby-config.js` again and add it to the configuration.

```javascript
// gatsby-config.js

const gatsbyConfig = {
  pathPrefix: `/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms`,
  // ...
}

// ...

module.exports = gatsbyConfig;
```

Now I'll use two Gatsby Node APIs to reduce the build artifacts.

Open the `gatsby-node.js` and add these APIs as the code block below.

```javascript
// gatsby-node.js

// ...

const { rmSync, rmdirSync } = require('fs');

// ...

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  // Skip "source-map" creation for js files.
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false
    });
  }
}

exports.onPostBuild = () => {
  // Delete unused artifacts and Netlify CMS configuration on production build.
  rmSync(`./public/webpack.stats.json`);
  rmSync(`./public/chunk-map.json`);
  rmSync(`./public/admin/config.yml`);
  rmdirSync(`./public/admin/`);
}
```

Method names are self-explanatory. In the `onCreateWebpackConfig` callback, we removed source maps for the JavaScript files. In the `onPostBuild` callback, we removed two of the unused Gatsby build artifacts and Netlify CMS static files that are not supposed to be copied to the static export.

> You don't need to delete any of these files. It is just to demonstrate the Gatsby Node APIs mentioned above.

Lastly, I'll update every manually entered image path in the `src/components/Seo.js` component. Open `src/components/Seo.js` and update the paths.

> You should update other static paths in the project if there are any.

```javascript
// src/components/Seo.js

// ...

import { withPrefix } from 'gatsby';

// ...

const Seo = (props) => {
  // ...

  const prefixPathWithoutTrailingSlash = withPrefix('/').slice(0, -1);

  const pageMeta = {
    // ...
    imageSrc: `${prefixPathWithoutTrailingSlash}/img/static-img-og-fallback.jpg`,
  }

  if (props.page !== undefined) {
    // ...
    if (props.page.featuredImage?.childImageSharp.resize.src) {
      pageMeta.imageSrc = `${prefixPathWithoutTrailingSlash}${props.page.featuredImage?.childImageSharp.resize.src}`;
    }
  }

  // ...

  return (
    <Helmet titleTemplate='...'>
      {/* favicon */}
      <link rel="shortcut icon" href={`${prefixPathWithoutTrailingSlash}/img/static-img-favicon.png`}></link>

      {/* ... */}

    </Helmet>
  )
}

export default Seo
```

The code below is a one-time path correction for the manual asset paths. But when deploying to a subdirectory, we have to make these corrections.

At the end of the `src/components/Seo.js` component, you'll see another correction not directly related to the paths problem. It is about the `mini-css-extract-plugin`. Skip that or just read the inline code comments.

```javascript
// src/components/Seo.js

// ...

const Seo = (props) => {

  // ...

  return (
    <Helmet titleTemplate='...'>
      {/* ... */}

      {/* A fix to avoid "mini-css-extract-plugin" plugin's "Error: Can't resolve '${prefixPathWithoutTrailingSlash}/img/static-img-bg-noisy-texture.png ...' error. (This error rises only if you use a path prefix.) */}
      {/* Can be removed removed after removal of sub-folder deployment and using a static URL for the background image! */}
      <style>
        {`
          body {
            background-image: url(${prefixPathWithoutTrailingSlash}/img/static-img-bg-noisy-texture.png) !important;
          }
        `}
      </style>
    </Helmet>
  )
}

export default Seo
```

Sub-directory deployments are not so welcoming. But there is always a solution.

Now run the `npm run build:serve` command we've just added above. This command will prepare the static site. Also, provide us with a local server to preview the export at `http://localhost:9000`. Open the link and see if everything is in place as in the development server.

After navigating through the pages and design details, now try to open the Netlify CMS admin route at `http://localhost:9000/admin`. You should get our custom `404` page since we removed it from the production builds.

Now, if you'll use a root domain for your site, run the `npm run build` command and copy the `public/` directory content to the server of your choice.

If you're planning to serve your site in a subdirectory, run the `npm run build:path-prefix` command after updating the `pathPrefix` setting. Then, copy the assets to the publish directory of the server.

> In GitHub Pages' scope, your `pathPrefix` should be your repository name. In this tutorial's case, it is supposed to be `/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms`. And if you want to use the `docs/` folder for the publish directory, you should copy everything in the Gatsby output directory `public/` to the `docs/` directory.

> No matter what directory you used to publish the static export, you should set the `pathPrefix` as your repository name when deploying on GitHub Pages. Using the `/docs` folder or `/ (root)` folder doesn't change this fact. GitHub sets the **Project site** URLs as "https://username.github.io/repository". If you build a **User or organization site**, you may not have the "pathPrefix". (I haven't tested it.) In this project, we used a **Project site** to deploy the "xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms repository". And the `/docs` folder for the files.

After copying your static assets, check the site in the remote after the deployment. If everything is also in place at the remote server, you know what to do for the next manual deployment.

And this is the end!

### Update Summary

> 👉 [See the full diff at GitHub - Part 19](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/2b54740).

|       | Files Updated                       | Notable Changes                                                                                                     |
| :---: | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
|  +/-  | `gatsby-config.js`                  | Added a flag to disable Netlify CMS from production output. Added `pathPrefix` setting to the Gatsby configuration. |
|  +/-  | `gatsby-node.js`                    | Disabled Webpack `devtool` option on production. Added a manual artifact removal logic after build.                 |
|  +/-  | `package.json`                      | Added extra npm scripts. Updated default `browserslist` query to disable IE.                                        |
|  +/-  | `src/components/Seo.js`             | Updated relative links with `pathPrefix` and `withPrefix` helper of Gatsby.                                         |
|  +/-  | `src/templates/contact-template.js` | Removed `console.log` statements.                                                                                   |
|  +/-  | `src/templates/default-template.js` | Removed `console.log` statements.                                                                                   |
|  +/-  | `src/templates/design-template.js`  | Removed `console.log` statements.                                                                                   |
|  +/-  | `src/templates/designs-template.js` | Removed `console.log` statements.                                                                                   |
|  +/-  | `src/templates/index-template.js`   | Removed `console.log` statements.                                                                                   |
|  +/-  | `src/templates/page-template.js`    | Removed `console.log` statements.                                                                                   |

## Chapter 7 - Summary

Publishing a static site is an easy task. However, doing it free comes with its difficulties. We did it above with a couple of simple changes. Since every framework developer is aware of the obstacles around the topic, they bring in the fixes with the product. Here we used such helpers `pathPrefix` and `withPrefix` to publish the export to the GitHub Pages with ease.

## Closure

When working with the Jamstack pattern, I feel like "I'm making the web static again". But in a more manageable, performant and secure way. The conversion process is still a black box for most of us. While this level of abstraction is still an unwanted issue for me, I like to use the technology around the pattern. I hope I see the days that we do not need to process, transpile, convert, modify, ... the code we've written for a simple website. Until that day Jamstack will still be the reasonable choice for me.

**Back to the Intro**: [Going Local and Free with Gatsby & Netlify CMS](/2022/going-local-and-free-with-gatsby-and-netlify-cms)
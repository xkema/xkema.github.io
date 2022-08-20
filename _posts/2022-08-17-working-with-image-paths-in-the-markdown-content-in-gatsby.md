---
title: Working with Image Paths in the Markdown Content in Gatsby
excerpt: Managing responsive images in a project is both fun and pain. Thankfully, Gatsby has the "Gatsby Image Plugin" on top of the great "Sharp Node.js Image Processing Library". In this chapter, we'll add optimized and responsive images to the frontmatter data as well as the markdown body.
tags:
  - Netlify CMS
  - Gatsby
  - Sharp
  - Going Local and Free with Gatsby and Netlify CMS
  - Chapter 3
  - Part 10, 11, 12
multipart: 3/7
---

> This post is the 3rd chapter of a 7-chapter article series "[Going Local and Free with Gatsby & Netlify CMS](/2022/going-local-and-free-with-gatsby-and-netlify-cms)".

> In the previous chapter, we build up the site structure and navigation. To continue with this chapter, you should at least have a site with content sourced from markdown files.

> Here, consider "**markdown content**" as "**frontmatter varibles**" + "**markdown body**".

## Part 10 - Adding Image Paths to the "frontmatter" as File Nodes

To manage dynamic images in the project, we'll use a single `uploads/` folder and manually control the `public_folder` setting. This part will only cover frontmatter variables, not the content images.

When working with Gatsby & Netlify CMS, neither the framework nor the CMS is aware of each other's directory structure. We need to guide one of these manually to comply with the other one's directory structure.

Before getting into the image management part, let's add images to the Netlify CMS first. Open the `static/admin/config.yml` configuration and add an image widget to the "**designs**" collection. Then remove the global `public_folder` setting and move it to the "**designs**" collection itself.

```yaml
# static/admin/config.yml

# ...

# Remove and move this setting to the collection configuration as a relative path.
# public_folder: /uploads

# ...

collections:
  # - name: pages
    # ...

  # - name: designs
    # ...
    public_folder: ../../../uploads
    fields:
      # ...
      - {label: "Image", name: "image", widget: "image", allow_multiple: false, choose_url: false}
```

What we've changed above is this, we still have an `/uploads` folder to keep our uploaded images in Netlify CMS. But we instruct the CMS to rewrite the frontmatter data for the uploads by using the `../../../uploads` path in front of the generated name. (This path will simply be prepended to the generated name of the uploaded asset.) Keeping this in mind, `public_folder` is the option where we inform the Netlify CMS about our front-end asset paths would be in the site export.

> `../../../` is the relative position to the `uploads/` directory from the markdown content under `src/content/designs/` directory. You need to calculate the uploads folder's relative path for each sourced content and add it to the collection config as the `public_folder` setting. (If you organize all your content to match a single relative path, you may also define it as the root config.)
 
Now, head to the CMS route `/admin`, reload the page and add 2 different images to each design.

After publishing the design details, check the generated frontmatter data in the markdown files. You'll see the `public_path` has been appended to the image paths.

```yaml
# src/content/designs/hello-from-design-01.md

# ---
# ...
image: ../../../uploads/irene-kredenets-tcvh_bwhtrc-unsplash.jpg
# ---
```

Previously, we set the `media_folder` to the `uploads/` directory. But we hadn't used it in Gatsby. Before continuing, let's update `gatsby-config.js` and source the `uploads/` folder to the framework.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    // ...
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/uploads/`,
        name: `uploads`,
      },
    },
    // ...
  ]
}
```

Now Gatsby is aware of the `uploads/` directory. It is time to query these images in the GraphiQL tool. 

Restart the development server. Open the GraphiQL screen and create a query that includes the newly added `image` section.

> If you don't restart the development server, the query below will throw an error. Because we can't source the `uploads` directory without a server restart. But it will still work if you drop image sub fileds `id` and `publicURL` and return the frontmatter value as the `image` property. However, we need image data as file nodes, not as strings.

```graphql
# GraphiQL - query

query MyQuery {
  allMarkdownRemark(
    filter: {
      frontmatter: {contentKey: {eq: "design"}}
    }
  ) {
    edges {
      node {
        id
        frontmatter {
          title
          # ...
          image {
            id
            publicURL
          }
        }
      }
    }
  }
}
```

This query will give us an image node with a `publicURL` that addresses the image path for the upload. Also, after running the GraphQL query, check the `public/static/` directory content. You would see the resulted images are copied to the folder under long hash-named directories.

```javascript
// GraphiQL - query result

// ...
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "id": "fef329b0-1b07-570c-860b-07d195737f17",
            "frontmatter": {
              "title": "hello from design 01",
              "image": {
                "id": "d31ee59f-747b-5d3f-84b7-fa030175e15b",
                "publicURL": "/static/280f94283b7ab0c3f38fd9410423185e/irene-kredenets-tcvh_bwhtrc-unsplash.jpg"
              }
            }
          }
        },
        // ...
      ]
    }
  },
  // ...
}
```

> You may not get the expected result from the query for a couple of reasons. The first thing to look at is if you had sourced the `uploads/` directory in the `gatsby-config.js` correctly. The second one is the name of the image you uploaded. If you copy & paste the code above, this may be a conflict. So, if you didn't upload images by the Netlify CMS, use your names in the frontmatter fields and copy your images manually to the `uploads` folder.

> If you hover over the value of the `publicURL`, the image we set in the frontmatter will be previewed in the GraphiQL result window.

But what has happened above?

Manually controlling image paths is a bit confusing at first. However, it is a one-time hassle that resolves a lot.

When transforming frontmatter data, if a path points to an actual/existing asset, it will be transformed into a `File` node in GraphQL. That is where we get the `publicURL` field for the image. And why we manually modified the `public_folder` in the Netlify CMS configuration. Otherwise, you may need a plugin like `gatsby-remark-relative-images` to manage relative paths in the project.

If the paths don't point to an actual file, then the frontmatter data will be registered as `String` nodes instead of `File`.

> Gatsby & Netlify CMS docs use the `static/` folder to keep the uploaded assets in the repo. Which will keep all files inside the published static site export. Here, the originals will be stored inside a directory out of the published site. Only the used ones will be in the `publish/` directory. At this step, the images will be copied as-is under a hash-named directory. Later we'll use transformed and optimized ones.

The most important takeaway is to have file paths in the frontmatter that point to an existing image.

> Four ways to manage frontmatter image paths in a nutshell:
> 
> 1. Setting the `static` folder as the `media_folder` and `/` as the `public_folder` in the Netlify CMS configuration. (Or a sub-folder like `static/img` and `/img`.) With this setup, Gatsby will copy all the `static/` directory content to the `publish/` directory. Images will still be represented as `String` nodes, and the original will be ready to be used from the `static/` directory. That's the default Gatsby & Netlify CMS way without image processing, but we'll be using an image pre-processing step. That is why we didn't use this approach.
> 2. Using the `gatsby-remark-relative-images` helper plugin to automatically correct relative paths inside the markdown files. (Both frontmatter paths, markdown body and more, ...) We didn't use it since we'll do the path controls manually.
> 3. Keeping the `uploads/` folder out of the `static/` directory and manually configuring public paths where they had been generated. (In this case, it is Netlify CMS.)
> 4. Using a CDN and its toolset to serve and transform images.

> Netlify CMS `media_folder` setting doesn't support nested directories. So we'll keep a single source for all assets uploaded, in this case, the `uploads/` folder.

Now that we have the `publicURL` for the images, let's add these to the design detail pages. Open the template `src/templates/design-template.js`. First, update the page query with the `publicURL` field.

```jsx
// src/templates/design-template.js

// ...

export const query = graphql`
  query($pageId: String = "") {
    markdownRemark(
      # ...
    ) {
      # ...
      frontmatter {
        # ...
        image {
          publicURL
        }
      }
    }
  }
`

// ...
```

Then add a plain old `<img />` tag to the template and use the `publicURL` as its `src` attribute.

```jsx
// src/templates/design-template.js

const DesignTemplate = (props) => {

  // ...
  
  return (
    <Layout>
      <div>
        {/* ... */}
        <img
          src={props.data.markdownRemark.frontmatter.image.publicURL}
          alt={"Please always fill the alternative text attributes!"} 
        />
      </div>
    </Layout>
  )
}

// ...
```

Reload a detail page. You'll see the image is placed on the page without any transformation and optimizations.

At this part, we've just included uploaded assets from Netlify CMS to Gatsby without any pre-processing. In the next, we'll add a couple of plugins for that and use Gatsby Image Plugin to replace `<img />` tags with the `<GatsbyImage />` component.

### Update Summary

> 👉 [See the full diff at GitHub - Part 10](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/bdf33a0).

|       | Files Updated                                      | Notable Changes                                                                                               |
| :---: | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
|  +/-  | `gatsby-config.js`                                 | Sourced `uploads/` directory to the Gatsby.                                                                   |
|  +/-  | `src/content/designs/hello-from-design-01.md`      | Added `image` field to the frontmatter data of the design items.                                              |
|  +/-  | `src/content/designs/hello-from-design-02.md`      | Added `image` field to the frontmatter data of the design items.                                              |
|  +/-  | `src/templates/design-template.js`                 | Added `publicURL` field to the GraphQL query and used it to the source for the `image` field.                 |
|  +/-  | `static/admin/config.yml`                          | Added an image widget to the "**designs**" collection and `public_folder` path pointing `uploads/` directory. |
|   +   | `uploads/irene-kredenets-tcvh_bwhtrc-unsplash.jpg` | Added a sample image fot the design.                                                                          |
|   +   | `uploads/sarah-dorweiler-gupitdbdre4-unsplash.jpg` | Added a sample image fot the design.                                                                          |

## Part 11 - Adding Responsive Images with Sharp and GatsbyImage Component

This is the fun part of the image work in Gatsby. Because it is almost magical to work this easy with responsive images in a project. This part will cover the frontmatter image data, not inside the markdown body. The only requirement from the previous part is still to have file paths in the frontmatter data that point to an actual image.

At this point, we have copies of full-sized uploaded images in the site export. However, we do not have responsive and optimized variations of them. To do so, we need a group of plugins. `gatsby-plugin-image`, `gatsby-plugin-sharp` and `gatsby-transformer-sharp`.

To emphasize what each one does, I'll install one-by-one and tell the details about the plugin.

Let's start with the `gatsby-transformer-sharp` plugin. 

When you install this plugin, you'll have additional query types in the GraphQL queries. Which are the `imageSharp` and `allImageSharp` types. They will return `ImageSharp` nodes that are built on top of the `Node` interface.

Now install the `gatsby-transformer-sharp` plugin.

```shell
# Terminal window at project root

npm i gatsby-transformer-sharp
```

Add it to the `gatsby-config.js` plugins array.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    // ...
    `gatsby-transformer-sharp`,
    // ...
  ]
}
```

Restart the Gatsby development server and reload the GraphiQL page at `http://localhost:8000/___graphql`. You'll notice the new types `imageSharp` and `allImageSharp` in the explorer panel.

When you expand the frontmatter `image` fields in the `allMarkdownRemark` query, you'll see additional options `childImageSharp` and `childrenImageSharp` as well as the above two.

Now run the GraphQL query below with the `childImageSharp` field's `original` property.

```graphql
# GraphiQL - query

query MyQuery {
  allMarkdownRemark(filter: {frontmatter: {contentKey: {eq: "design"}}}) {
    edges {
      node {
        frontmatter {
          title
          image {
            publicURL
            childImageSharp {
              original {
                width
                height
                src
              }
            }
          }
        }
      }
    }
  }
}
```

```javascript
// GraphiQL - query result

{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "frontmatter": {
              "title": "hello from design 01",
              "image": {
                "publicURL": "/static/280f94283b7ab0c3f38fd9410423185e/irene-kredenets-tcvh_bwhtrc-unsplash.jpg",
                "childImageSharp": {
                  "original": {
                    "width": 1920,
                    "height": 2406,
                    "src": "/static/irene-kredenets-tcvh_bwhtrc-unsplash-280f94283b7ab0c3f38fd9410423185e.jpg"
                  }
                }
              }
            }
          }
        },
        {
          "node": {
            // ...
          }
        }
      ]
    }
  },
  // ...
}
```

Now we have our image transformer plugin's image data along with the `publicURL` from the `File` nodes. This is the same original image represented by the `publicURL`. This time, it comes from a proper transformer plugin. We won't be using the `publicURL` anymore after adding the `gatsby-transformer-sharp` plugin to the project. You may now replace the `publicURL`s in the templates with `childImageSharp.original.src`. Since we won't be using the `original` image data, let's skip it for now to get to the point.

In the `childImageSharp` node, there is another property named `gatsbyImageData`. It is the detailed image data represented by a `JSON` object. That is the data we'll be using for the images. However, if you add it to the GraphQL query above and run the query, you'll get an error. And the development server will be interrupted. (The CLI will print an error log like "missing `gatsby-plugin-sharp` plugin".) Because this object is intended to work with the image processing library itself. Without the library, the `gatsby-plugin-sharp` in this case, the transformer plugin will only give us the original image data to use immediately.

`gatsby-transformer-sharp` plugin transforms image data to `ImageSharp` nodes that are processible by the `gatsby-plugin-sharp` plugin. Like any other transformer plugin, it only transforms a node type to another.

I believe it is time to install the `gatsby-plugin-sharp` plugin.

```shell
# Terminal window at project root

npm i gatsby-plugin-sharp
```

Add it to the `gatsby-config.js` plugins array.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    // ...
    `gatsby-plugin-sharp`,
    // ...
  ]
}
```

Restart the Gatsby development server and reload the GraphiQL page at `http://localhost:8000/___graphql`. 

Replace the `original` option and re-run the previous query with `gatsbyImageData` in the GraphiQL tool.

```graphql
# GraphiQL - query

query MyQuery {
  allMarkdownRemark(filter: {frontmatter: {contentKey: {eq: "design"}}}) {
    edges {
      node {
        frontmatter {
          title
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
```

Check the result panel. You'll see the detailed representation for the image returned from the `gatsbyImageData` property with its default options. It includes a fallback image, a `srcset` for responsive image placement, size info and more. Now we're talking. 😎

```javascript
// GraphiQL - query result

{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "frontmatter": {
              "title": "hello from design 01",
              "image": {
                "childImageSharp": {
                  "gatsbyImageData": {
                    "layout": "constrained",
                    "backgroundColor": "#d8d8d8",
                    "images": {
                      "fallback": {
                        "src": "/static/280f94283b7ab0c3f38fd9410423185e/2f547/irene-kredenets-tcvh_bwhtrc-unsplash.jpg",
                        "srcSet": "/static/280f94283b7ab0c3f38fd9410423185e/2b6e5/irene-kredenets-tcvh_bwhtrc-unsplash.jpg 480w,\n/static/280f94283b7ab0c3f38fd9410423185e/4cc30/irene-kredenets-tcvh_bwhtrc-unsplash.jpg 960w,\n/static/280f94283b7ab0c3f38fd9410423185e/2f547/irene-kredenets-tcvh_bwhtrc-unsplash.jpg 1920w",
                        "sizes": "(min-width: 1920px) 1920px, 100vw"
                      },
                      "sources": [
                        {
                          "srcSet": "/static/280f94283b7ab0c3f38fd9410423185e/bf755/irene-kredenets-tcvh_bwhtrc-unsplash.webp 480w,\n/static/280f94283b7ab0c3f38fd9410423185e/ef166/irene-kredenets-tcvh_bwhtrc-unsplash.webp 960w,\n/static/280f94283b7ab0c3f38fd9410423185e/cee2a/irene-kredenets-tcvh_bwhtrc-unsplash.webp 1920w",
                          "type": "image/webp",
                          "sizes": "(min-width: 1920px) 1920px, 100vw"
                        }
                      ]
                    },
                    "width": 1920,
                    "height": 2406
                  }
                }
              }
            }
          }
        },
        // ...
      ]
    }
  },
  // ...
}
```

Now it is time to pass this data to HTML elements like `<picture />`, `<img />`, ... and render them into the pages. Should we do it manually? Nope!

Here comes the third and the last plugin, `gatsby-plugin-image`. Gatsby provides two components with this plugin. `<GatsbyImage />` and `<StaticImage />`. The former is for the dynamic images fetched by GraphQL queries, latter is for the static images used directly from their sources. 

> The `StaticImage` component's output is almost the same with the `GatsbyImage`. The difference is, you can't pass any dynamic value to the `StaticImage` component like `props.data.someImagePathOrgatsbyImageData`. You can only pass "**static strings**" to its `src` prop. This component is only for the static images as its name offers.

Install the `gatsby-plugin-image` plugin.

```shell
# Terminal window at project root

npm i gatsby-plugin-image
```

Add it to the `gatsby-config.js` plugins array.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    // ...
    `gatsby-plugin-image`,
    // ...
  ]
}
```

Restart the Gatsby development server and open the design detail page template. Replace the `publicURL` GraphQL field with the `childImageSharp`.


```jsx
// src/templates/design-template.js

// ...

export const query = graphql`
  query($pageId: String = "") {
    markdownRemark(
      # ...
    ) {
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
`

// ...
```

Now import `GatsbyImage` component from the `gatsby-plugin-image` and replace the `<img />` tag with the `<GatsbyImage />` component. The `GatsbyImage` component's `image` property expects the `JSON` data held by the `gatsbyImageData` object as its input. So pass the `gatsbyImageData` to the `image` prop.


```jsx
// src/templates/design-template.js

// ...

import { GatsbyImage } from 'gatsby-plugin-image';

// ...

const DesignTemplate = (props) => {

  // ...
  
  return (
    <Layout>
      <div>
        {/* ... */}
        <GatsbyImage
          image={props.data.markdownRemark.frontmatter.image.childImageSharp.gatsbyImageData}
          alt={"Please always fill the alternative text attributes!"} 
        />
      </div>
    </Layout>
  )
}

// ...
```

Open any design detail page and reload it. Yay! You should notice the fade effect on the design image now. And when you resize the page, you'll see that the image now has a `max-width: 100%` CSS setting. 

Don't stop and open the developer tools in your browser. Go to the "Elements" panel and check the `srcset` on the `<picture />` tag that holds the transformed image. It is all set by default without any effort. Also, check the `<img />` tag as the fallback to the `<source />` element.

Now open the "Network" panel in the developer tools. Filter the "Images" and reload the pages. Now, resize the page and see how different images are loaded by the size of the browser screen.

The last place to check is the `public/` folder of the development server. After requesting a couple of different-sized images by resizing the browser screen, check the output. You'll see the different variations are now copied to the `public/static/` folder under various hash-named folders.

> Without running a query from the site pages, you may not see any image outputs in the `public/static/` folder when running on the development server. To see every variation immediately, you may run the `npx gatsby build` command and check the images in the `public/static/` directory.

At this part, with the minimum effort possible, we included responsive images to the project. However, we're not limited to the defaults. Sharp image processing library has tons of features integrated into the Gatsby framework. Just poke around and find out its great features to integrate into your choice of design.

In the next part, we'll add the same responsive feature set to the markdown body.

### Update Summary

> 👉 [See the full diff at GitHub - Part 11](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/ca9836e).

|       | Files Updated                      | Notable Changes                                                                                                                                                    |
| :---: | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|  +/-  | `gatsby-config.js`                 | Updated plugins array with `gatsby-transformer-sharp`, `gatsby-plugin-sharp` and `gatsby-plugin-image` plugins.                                                    |
|  +/-  | `package-lock.json`                |                                                                                                                                                                    |
|  +/-  | `package.json`                     | Installed `gatsby-transformer-sharp`, `gatsby-plugin-sharp` and `gatsby-plugin-image`                                                                              |
|  +/-  | `src/templates/design-template.js` | Replaced `publicURL` with the `childImageSharp` in GraphQL query. Replaced `<img />` tag with the `<GatsbyImage />` component of the `gatsby-plugin-image` plugin. |

## Part 12 - Adding Responsive Images to the Markdown Body

In the previous part, we transformed the images inside the frontmatter data. Now we'll extend responsive support to the markdown body images.

When writing markdown content, it is possible to include raw `HTML` content. Or we can take advantage of the `MDX` markup to touch into the markup content with more complex elements. But if you want to keep your content as "content" as possible, markdown only offers you a simple inline image syntax with `![]()`.

When using markdown body as our data source, there is no way to include images as complex `HTML` markup. Also, we don't have the image data segregated from the content as a key-value pair as in the frontmatter data.

So, we need to statically analyze markup content prior to the static `HTML` generation and replace the original image with responsive markup on build time.

To do so, in the Gatsby context, we need another helper plugin `gatsby-remark-images`. But this time we'll plug this plugin into the `gatsby-transformer-remark` instead of adding it to the main plugin system. So simply, this plugin is a helper to another plugin.

Remember, we used the `gatsby-transformer-remark` plugin to parse and transform the markdown body. Now, we'll add the `gatsby-remark-images` plugin to the `gatsby-transformer-remark` plugin.

Now install the `gatsby-remark-images` plugin.

```shell
# Terminal window at project root

npm i gatsby-remark-images
```

Open the `gatsby-config.js` and add it to the `gatsby-transformer-sharp` configuration as a plugin. (This time, not to the main `plugins` array.) This will change the previous syntax, but it is the same as the main plugins. You should replace the previous string `gatsby-transformer-remark` with the object `{ resolve: ... }` below.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    // ...
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              showCaptions: true,
            }
          },
        ],
      },
    },
    // ...
  ]
}
```

> I've reverted two default options `linkImagesToOriginal` and `showCaptions`. I don't like links to original images, and I want to show captions below the images later.

> `gatsby-transformer-remark` offers many other plugins to customize markdown body processing.

`gatsby-remark-images` plugin uses `gatsby-plugin-sharp` for image processing. Since we've already installed that in the previous part for the frontmatter images, we don't need to install it. But it is a dependency on the plugin. Also, it uses the same default options unless you customize the image processing options.

Restart the Gatsby development server.

At this step, there won't be any change since we haven't got any images in the markdown body content yet. 

Before adding an image to the markdown body, remember we're controlling the `public_url` options manually in the Netlify CMS configuration. Open the "**pages**" collection configuration in the `config.yml` file. Add `public_folder` option with the value `../../uploads`.

```yaml
# static/admin/config.yml

# ...

collections:
  # - name: pages
    # ...
    public_folder: ../../uploads
    # ...

  # ...
```

> Notice that, this time, we move up two directories to the `uploads/` folder. Because this is the relative path to the `uploads/` directory from the "**pages**" folder.

> To remind you again, the `gatsby-remark-relative-images` plugin does this relative path calculation automatically. We chose manual path editing for this tutorial.

Save the Netlify CMS configuration and reload the `/admin` route. Now open the "**About**" page and add an image to the body section. (Use the `plus` icon on the right side in the "**Rich Text**" menu of the text area.)

Before visiting the "About" page open the markdown file `src/pages/about.md` and see the image syntax with the relative path we included manually `../../uploads/`.

Reload the "About" page at `http://localhost:8000/about` and see the responsive image created inside the markdown body.

You'll notice the same fade effect as the frontmatter images. The plugin has a default `maxWidth` for the images, which is `650px`. So, if you have a content area larger than that, then you'll see an image at max `650px` wide and horizontally centered to the content area. You'll also see a `<figcaption />` element with the `title` or `alt` attribute right under the image. (If you added one of the attributes.) That is because we set the `showCaptions` option to `true` above.

And that's it for the responsive markdown body images.

### Update Summary

> 👉 [See the full diff at GitHub - Part 12](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/0cc60ce).

|       | Files Updated                                         | Notable Changes                                                                                                     |
| :---: | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
|  +/-  | `gatsby-config.js`                                    | Added `gatsby-remark-images` plugin to the `gatsby-transformer-remark` plugin as a sub-plugin.                      |
|  +/-  | `package-lock.json`                                   |                                                                                                                     |
|  +/-  | `package.json`                                        | Installed `gatsby-remark-images` plugin.                                                                            |
|  +/-  | `src/pages/about.md`                                  | Added an inline image to the martkdown body.                                                                        |
|  +/-  | `static/admin/config.yml`                             | Added `public_folder` option with `../../uploads` value to the "**pages**" collection for the relative image paths. |
|   +   | `uploads/priscilla-du-preez-dlxlgiy-2vu-unsplash.jpg` | Added a sample image to the markdown body.                                                                          |

## Chapter 3 - Summary

Responsive image management is still a challenge but tools like the above rocket up the integration process. If you have a trusted solution for image manipulation, like the above or a CDN toolset, I think you shouldn't bother with manual integration. The only key work to do in a similar case is to understand your audience and serve correct sizes and use proper optimization for them specifically. That should be your only challenge if the toolset covers what you need with images technically.

Try to understand the needs of your content. My GitHub blog, where you read this tutorial, doesn't have an image processing system. I still do it manually with GIMP. So if you have just 5 cover images in your project, you don't need this complex solution.

I tried to keep this chapter as standalone as possible from the others. At the end of "Chapter 3", you should have a simple website with pages, page templates, and responsive images, ... Only missing part is styling. 

You may import a global `CSS` file from the `Layout` component and simply style the project. But I'll use another solution for styling.

In the next chapter, we'll add "**Tailwind CSS**" with the "**PostCSS**" processor.

**Next**: [Chapter 4 - Styling Gatsby Site with Tailwind CSS and PostCSS Processor](/2022/styling-gatsby-site-with-tailwind-css-and-postcss-processor)
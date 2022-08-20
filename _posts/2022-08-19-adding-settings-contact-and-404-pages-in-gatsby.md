---
title: Adding "Settings", "Contact" and "404" Pages in Gatsby
excerpt: Every site needs a common place to store shared data across pages/components. To achieve this, we'll add a settings page to Netlify CMS but do not represent this page on the client-side. With that, we'll add a simple contact page and replace the Gatsby default 404 page with a custom one.
tags:
  - Netlify CMS
  - Gatsby
  - Going Local and Free with Gatsby and Netlify CMS
  - Chapter 5
  - Part 15, 16, 17
multipart: 5/7
---

> This post is the 5th chapter of a 7-chapter article series "[Going Local and Free with Gatsby & Netlify CMS](/2022/going-local-and-free-with-gatsby-and-netlify-cms)".

> In the previous chapter, we styled the site to get a better look. This chapter doesn't depend on the previous one. However, to test the changes in this chapter, you'll still need a working Gatsby site with content sourced from markdown files.

## Part 15 - Adding Site "Settings" with a File Collection in the Netlify CMS

In this part we'll use a file collection in the Netlify CMS to store shared data in a markdown file. Until this point, we used folder collections to represent multiple files with the same data format. We can still use folder collections to store site settings in multiple files. However, this will require dynamic type generation in the CMS. Also there will be a content file for each setting we store.

Instead, we'll use a single file, `src/content/settings.md` in the content directory and store every setting inside this file.

Now open `static/admin/config.yml` and add the file collection for the settings.

```yaml
# static/admin/config.yml

# ...

collections:
  # ...
      
  # - name: pages
    # ...

  # - name: designs
    # ...
  
  - name: settings
    label: Settings
    description: General settings for the site
    files:
      - name: settings
        label: Settings
        file: src/content/settings.md
        fields:
          # - {label: "Content Key", name: "contentKey", widget: "hidden", default: "setting", required: true}
          # 👆 Hidden fields are not supported in "file" collections. This sections need to be added manually to the *.md files.
          - {label: "Title", name: "title", widget: "string"}
          - {label: "Description", name: "description", widget: "string"}
          - {
              label: "Settings", name: "settings", widget: "object",
              fields: [
                {label: "Site Title", name: "siteTitle", widget: "string"},
                {label: "Email", name: "email", widget: "string", required: false},
                {label: "Phone", name: "phone", widget: "string", required: false},
                {label: "Facebook", name: "facebook", widget: "string", required: false},
                {label: "Twitter", name: "twitter", widget: "string", required: false},
                {label: "Youtube", name: "youtube", widget: "string", required: false},
                {label: "Address", name: "address", widget: "string", required: false},
                {label: "Business Name", name: "businessName", widget: "string", required: false},
              ]
            }
```

Open the CMS and reload the page. You'll see the new "**Settings**" collection in the sidebar. Click "**Settings**" collection under this collection.

> The setup above will result an extraneous path "**Settings**" &raquo; "**Settings**" &raquo; "**...**". This is how the file collections are organized in Netlify CMS. A parent collection with a couple of files under this parent. You may organize the children across different files like "**Settings General**", "**Setting Theme**", ... I chose to stick with a single file with the same name here.

Now fill the required fields `title`, `description` and `siteTitle`. Then press the "**Publish** &raquo; **Publish now**" button at the CMS navbar.

Now open the `src/content/settings.md` file created under the content directory. You'll see the settings data is now stored in a markdown file as in the previous collections. I'll add a couple of social media links as well.

> Here, we published the actual file `src/content/settings.md` by publishing the content in the CMS. However, it is recommended to create an empty file already under the target path prior to this. Otherwise, it might result in a file existence error in case you try to access the settings from the client-side. For markdown collections an empty file is adequate or an empty object for the `JSON` data.

> Notice that in the settings collection configuration we commented out the `contentKey` field. Because it has no effect on the file collections. Netlify CMS doesn't support **hidden** fields in the file collections. So we manually entered this field into the `src/content/settings.md` file. This is another reason to create this file prior to CMS editing and publishing the content by this action.

> Having a unique `contentKey` for collections is an approach that I choose to design. I take responsibility for its side effects. You don't have to select this approach. I'm pretty sure there are more creative ways to manage collections.

At this point, we have the basic settings data for the site. With this file collection setup, you may scale this custom data with different settings and types.

Now we'll fetch this data to a shared layer in the project. To achieve this, I'll use the `src/components/Layout.js` component and pass fetched settings data to other components as `props` if we need to use them in the children.

Open the `src/components/Layout.js` and add a static query to fetch settings into the component. Since the layout component is not a page, we'll use the `useStaticQuery` to fetch the GraphQL data.

```jsx
// src/components/Layout.js

// ...

import { graphql, useStaticQuery } from 'gatsby'

// ...

const Layout = (props) => {

  // Get settings data from the CMS.
  const settings = useStaticQuery(graphql`
    {
      markdownRemark(frontmatter: {contentKey: {eq: "setting"}}) {
        frontmatter {
          title
          description
          settings {
            siteTitle
            email
            facebook
            twitter
            youtube
          }
        }
      }
    }
  `)
  
  return (
    <div className='...'>
      <header className='...'>
        <Navigation settings={settings.markdownRemark.frontmatter.settings} />
      </header>
      {/* ... */}
      <footer className='...'>
        {/* ... */}        
        <p>{settings.markdownRemark.frontmatter.settings.siteTitle}</p>
      </footer>
    </div>
  )
}

export default Layout
```

Above, we have three changes to notice. One is obviously the `useStaticQuery` call to fetch the settings data. The other one is using this settings data in the footer to show the shared `siteTitle` in the footer. The last one is that we shared settings data with the `src/components/Navigation.js` component as the `settings` prop.

> You may create another settings item to keep navigation items in a list and dynamically create site navigation based on this data instead of managing it manually.

Restart the development server and check the site footer. You should see the `siteTitle` from the `settings` collection.

And that is it for the part. We now have the shared settings collection ready to use site-wide.

> Before we go, I want to add a note on file collections. In the Netlify CMS docs, the examples use file collections to create site pages and keep custom page data inside this unique page items. Then print them in the custom templates. Here, instead of using this approach, I defined `pages` as a folder collection. I kept the shared data in the collection and separated custom ones into the templates. They're similar but not the same. Again, this is an approach I select to design.

In the next part, we'll add a custom contact page.

### Update Summary

> 👉 [See the full diff at GitHub - Part 15](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/7786fa1).

|       | Files Updated              | Notable Changes                                                                           |
| :---: | -------------------------- | ----------------------------------------------------------------------------------------- |
|  +/-  | `src/components/Layout.js` | Added a static query to fetch settings data from the CMS.                                 |
|   +   | `src/content/settings.md`  | Added the content item to store settings data.                                            |
|  +/-  | `static/admin/config.yml`  | Updated the CMS configuration to represent settings data as a file collection in the CMS. |

## Part 16 - Creating a "Contact" Page with a Custom Template

This part will add a new page to the CMS along with a custom template for the page. We'll add a "Contact" page as a sample. However, you may add any other custom page with the same flow.

> This part won't cover setting up a dynamic contact form that connects to a mail server. It'll be just a plain "Contact" page with a couple of web links.

Remember the page creation logic? To select the target template for a page we first looked for a template name with the slug. 

I'll add a "Contact" page in the CMS and add the template file `src/templates/contact-template.js`. Let's start with the CMS.

Open the admin route and add and create a page with the title "Contact". Put some dummy content in it and **Publish**. Then visit the `http://localhost:8000/contact/` route to see the page created.

The page is created immediately. However, it uses the `src/templates/page-template.js` since we don't have a `contact-template.js` in the templates directory.

Now create the `src/templates/contact-template.js`.

```jsx
// src/templates/contact-template.js

import { graphql } from 'gatsby';
import React from 'react'
import Layout from '../components/Layout.js';
import PageHeader from '../components/PageHeader.js';

const ContactTemplate = (props) => {

  console.log(props);

  return (
    <Layout>
      <PageHeader frontmatter={props.data.markdownRemark.frontmatter} />
      <div
        dangerouslySetInnerHTML={{ '{{' }}
          __html: `
            ${props.data.markdownRemark.html}
            <ul>
              <li>
                <a href="mailto:${props.data.settings.frontmatter.settings.email}" rel="noreferrer nofollow">
                  Mail
                </a>
              </li>
              <li>
                <a href="${props.data.settings.frontmatter.settings.facebook}" rel="noreferrer nofollow">
                  Facebook
                </a>
              </li>
              <li>
                <a href="${props.data.settings.frontmatter.settings.twitter}" rel="noreferrer nofollow">
                  Twitter
                </a>
              </li>
              <li>
                <a href="${props.data.settings.frontmatter.settings.youtube}" rel="noreferrer nofollow">
                  YouTube
                </a>
              </li>
            </ul>
          `
        }}
        className='
          container
          py-8 px-4
          md:px-0
          prose
          prose-p:text-stone-900
          prose-img:rounded-lg
      '>
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
      }
      html
    }
    settings: markdownRemark(frontmatter: {contentKey: {eq: "setting"}}) {
      frontmatter {
        title
        description
        settings {
          siteTitle
          email
          facebook
          twitter
          youtube
        }
      }
    }
  }
`

export default ContactTemplate
```

The contact template code above is similar to the page template. The difference is that the contact template has additional `HTML` content with the social media links from the shared settings collection data. And a query to fetch this data to the page.

> As you may notice, instead of reading the settings data from the `src/components/Layout.js` component, I have created a page query to fetch the settings data to the contact page. Because there is no direct way to use the `props` from a parent component when we render children with the `props.children`. You may use React's "**Context**" context (Yeah, I said Context context! 😄) or `React.cloneElement()` API, or some other method. I choose to duplicate the query to keep it simple.

After creating the template, restart the development server and reload the contact page. You'll see the custom template is now active for the contact page. Let's add this route to the navigation.

Open the `src/components/Navigation.js` component and add another `<Link />` component with the contact route.

```jsx
// src/components/Navigation.js

// ...

const Navigation = (props) => {

  // ...
  
  return (
    <nav className='...'>
      {/* ... */}
      <div className={`...`}>
        {/* ... */}

        <Link to='/contact' activeClassName='bg-white/50' className='
          block
          px-5 py-3
          md:py-5
          transition-colors
          hover:bg-white/50
          md:inline-block
        '>
          Contact
        </Link>

      </div>
      {/* ... */}
    </nav>
  )
}

export default Navigation
```

Now we have a custom contact page and a link for it in the navigation menu.

> Before moving on to the next part, I'll add a note on GraphQL query aliases. If you noticed, the query in the `src/templates/contact-template.js` uses the same data source (`markdownRemark`) more than one time. To use the same data source multiple times, we need to use unique names for them. In the template code above, we have the name `markdownRemark` for the generic page query (The default name is the name of the data source.) and `settings` as the unique name for the settings data query. And in the `JSX` tags, we used `props.data.markdownRemark` for the former and `props.data.settings` for the latter to use fetched data.

In the next part, we'll add a custom `404` page.

### Update Summary

> 👉 [See the full diff at GitHub - Part 16](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/b5a9e02).

|       | Files Updated                       | Notable Changes                                 |
| :---: | ----------------------------------- | ----------------------------------------------- |
|  +/-  | `src/components/Navigation.js`      | Added `/contact` route to the navigation.       |
|   +   | `src/pages/contact.md`              | Added a new content for the contact page.       |
|   +   | `src/templates/contact-template.js` | Created a custom template for the contact page. |

## Part 17 - Adding a Custom "404" Page

In the previous part, we followed the long path to create a custom page template. For the `404` page, we'll use the simple solution.

In Gatsby, creating a `404` page is pretty straightforward. Just export a React component from the `src/pages/404.js` file, and that's it.

Since we have an automated page creation logic, we only need to create a page named `404` to do the same. 

Just go to the CMS panel, and add a new page with the title "**404**". Put some content in it.

Here is what I did.

```yaml
# src/pages/404.md

---
contentKey: page
title: "404"
description: Oopps!
---

😱 Page not found!

Back to [Home](/ "Back to Home!")!
```

Now reload the site and visit a non-existent route like `http://localhost:8000/asd`. Gatsby will still show the development server version. Because it overrides the custom one in the development environment. However, it will offer you a preview button on the page like `Preview custom 404 page`. Press that button and you'll have the chance the custom `404` content.

Or you may visit the route `http://localhost:8000/404` since this content is just a plain page.


### Update Summary

> 👉 [See the full diff at GitHub - Part 17](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/fff116f).

|       | Files Updated      | Notable Changes              |
| :---: | ------------------ | ---------------------------- |
|   +   | `src/pages/404.md` | Added the custom `404` page. |

## Chapter 5 - Summary

In this relatively short chapter, we created three content items for the project. One is to store settings data shared across the site. The other two are for the custom pages. With these methods, you may scale up your project with any other custom template and data.

In the next chapter, we'll add an SEO component to prepare the site for search engines. We'll use both page-specific data and the shared settings data we created in this chapter.

**Next**: [Chapter 6 - Adding an "SEO" Component in Gatsby](/2022/adding-an-seo-component-in-gatsby)
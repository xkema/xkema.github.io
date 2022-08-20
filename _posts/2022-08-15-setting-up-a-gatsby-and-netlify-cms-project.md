---
title: Setting up a Gatsby & Netlify CMS Project
excerpt: The CLI tools of the modern frameworks do an excellent job for the project initialization. However, they usually do a little bit more than what you need. In this chapter, I'll initialize a project with Gatsby and Netlify CMS manually.
tags:
  - Netlify CMS
  - Gatsby
  - Going Local and Free with Gatsby and Netlify CMS
  - Chapter 1
  - Part 1, 2, 3
multipart: 1/7
---

> This post is the 1st chapter of a 7-chapter article series "[Going Local and Free with Gatsby & Netlify CMS](/2022/going-local-and-free-with-gatsby-and-netlify-cms)".

Initially, we'll have two tiers in the project. The Client-side will use React library and Gatsby framework. (And an `index.js` file as the homepage.) The CMS-side will use the Gatsby plugin `gatsby-plugin-netlify-cms` since we'll manage most of the site features with the Gatsby plugin system. (And a `config.yml` file to configure the CMS and define the data schema.)

## Part 1 - Initial Commit

I'll start the project without any predefined base setup provided by any CLI tool or starters. For the initial commit, I'll use a `README.md`, an `.editorconfig`, and a `.gitignore` file. Nothing special here except `.gitignore`. I'll only show its content for the minimum setup for a Gatsby project.

```shell
# .gitignore

# nodejs
node_modules/

# gatsby
.cache/
public

# other
.DS_Store
```

I'll skip `README.md` and `.editorconfig` details here, but you may use the "***👉 See the full diff at GitHub***" links now and in the future to review the complete diff.

> To work with an `.editorconfig` file, you need a code editor or IDE that understands this file or a `.editorconfig` plugin. It is not required and is up to you to add one. I use it.

### Update Summary

> 👉 [See the full diff at GitHub - Part 1](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/0b64d80).

|       | Files Updated   | Notable Changes                                  |
| :---: | --------------- | ------------------------------------------------ |
|   +   | `.editorconfig` |                                                  |
|   +   | `.gitignore`    | Removed Gatsby artifacts from Git tracking list. |
|   +   | `README.md`     |                                                  |

## Part 2 - Setting up a Gatsby Site with Bare Minimums

The reason I didn't use the Gatsby CLI to create the Gatsby part of the project is to keep this tutorial's code as readable as possible. Now initialize an NPM package and create a `package.json` file.

```shell
# Terminal window at project root

npm init
```

Then install Gatsby and React packages.

```shell
# Terminal window at project root

# "npm i" is an alias to "npm install"
npm i gatsby react@^17 react-dom@^17
```

> React `v17` is one of the peer dependencies for the `gatsby-plugin-netlify-cms` plugin to work.
> 
> `gatsby-plugin-netlify-cms`  has `netlify-cms-app` as it's peer dependency. However, `netlify-cms-app` hasn't listed `react@^18` as its peer dependency yet. You can workaround this, but I'll skip it for now by using the previous React version. When merged, [this pull request](https://github.com/netlify/netlify-cms/pull/6496/) will resolve the issue.

Now create an index file at the `src/pages/index.js` path with this content:

```jsx
// src/pages/index.js

import React from 'react';

const Index = (props) => {
  return (
    <div>
      <h1>Hello Gatsby!</h1>
      <p>(with bare minimums)</p>
    </div>
  )
}

export default Index
```

Believe it or not, that's all you need to start a Gatsby project. Now go to the root directory of your project and run the command below.

```shell
# Terminal window at project root

npx gatsby develop
```

Gatsby will start the local development server at `http://localhost:8000`, where you can see our `src/pages/index.js` file.

> Without the `src/pages/index.js` file, you can still run the Gatsby server with a built-in `404` page.

Along with the local development server, Gatsby will also create and run the built-in data explorer tool named "**GraphiQL**" at the `http://localhost:8000/___graphql` address. (The tool's name is not GraphQL. It is GraphiQL. See the "**i**" in the middle.) This great tool gives us a playground to explore each part of data sourced into the Gatsby by us manually or by the system.

Go to the tool and play around to be familiar with it for the incoming parts.

Before finishing up, I'll add the `gatsby clean && gatsby develop` command to NPM's lifecycle script `start` to work faster while restarting the Gatsby server in the development process.

```json
{
  "scripts": {
    "start": "gatsby clean && gatsby develop"
  },
}
```

### Update Summary

> 👉 [See the full diff at GitHub - Part 2](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/fb27166).

|       | Files Updated        | Notable Changes                                                           |
| :---: | -------------------- | ------------------------------------------------------------------------- |
|   +   | `LICENSE.txt`  |       Added a MIT license.                                                                    |
|   +   | `package-lock.json`  |                                                                           |
|   +   | `package.json`       | Attached `gatsby clean && gatsby develop` command to `npm start` command. |
|   +   | `src/pages/index.js` | Added a "hello world" template.                                           |

## Part 3 - Setting up the Netlify CMS with a Single Collection: "designs"

I'll install the `gatsby-plugin-netlify-cms` plugin and add it to the Gatsby configuration with the help of a `gatsby-config.js` file created at the root of the project.

Now install the plugin with the command below.

```shell
# Terminal window at project root

npm install gatsby-plugin-netlify-cms
```

Then create the `gatsby-config.js` file at the project root and add the Netlify CMS plugin to the plugins array.

```javascript
// gatsby-config.js

module.exports = {
  plugins: [
    `gatsby-plugin-netlify-cms`
  ]
}
```

Now stop the Gatsby development server. Then restart it with the `npm start` command. The plugin will automatically create the Netlify CMS at the `http://localhost:8000/admin` route.

> This will be logged into the terminal where you run the `npm start` command. It is a good habit to keep an eye on the logs.

Now visit the `http://localhost:8000/admin` route, and you'll get an error message that notices you about a missing configuration file like "*Error loading the CMS configuration*".

To make the Netlify CMS admin work, you need a `config.yml` file in the directory where you keep the Netlify CMS. Which is in Gatsby's` static/admin/config.yml` path. Add an empty config file and reload the page. Tshi time, Netlify CMS will warn you of the missing parts of the configuration file. To skip all the warnings, see the initial configuration file below. We'll use it for this part.

> `static` folder is a marked location for the Gatsby framework. This folder's content will be copied to the static site build output as is, which is the `public` folder by default. For now, just use it to keep our CMS config in.

```yaml
# static/admin/config.yml

backend:
  name: github
  repo: xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms
  branch: main

# local_backend: true

media_folder: uploads
public_folder: /uploads

# slug:
#   encoding: "ascii"
#   clean_accents: true

collections:
  - name: designs
    label: Designs
    folder: "src/content/designs"
    create: true
    fields:
      - {label: "Content Key", name: "contentKey", widget: "hidden", default: "design", required: true}
      - {label: "Title", name: "title", widget: "string"}
```

The code block above is a basic and valid configuration file for Netlify CMS, but it requires a live Git repo on a Git server and permission to edit that remote repo. (Overlook the commented out lines.) When you visit the admin route, you'll see a button that calls you to the action `Login with GitHub`. That is where we give authorization to the Netlify CMS application to modify our repository. But since we plan to create an all-local project, we will skip that part.

Now we need to take two additional actions to go all local. First, add the `local_backend: true` option to the configuration file, and reload the admin route. (Uncomment the line above.) If you reload the page, you'll still see the login button because we need a proxy server to skip the authentication step. Now, run the command below in a new terminal window at the project root. (Being in the project root might not be mandatory.)

```shell
# In a new terminal window.

npx netlify-cms-proxy-server
```

You might want to add another script to the `package.json` to run the proxy server with ease.

```json
{
  "scripts": {
    "proxy": "npx netlify-cms-proxy-server"
  }
}
```

Reload the admin route and click the `Login` button if it shows up. (Notice that now the button doesn't have a `Login with GitHub` text, just `Login`.) And here is your Git-based CMS ready in your development environment locally.

Now we have a "**Designs**" collection with empty content. Now click the `New Designs` button on the "**Designs**" collection details panel on the right side. (Or use "**Quick Add** > **Designs**" on the navigation bar.) You'll see a form with a single title field. Use "*hello from design 01*" as the title for the item and save it with the "**Publish** &raquo; **Publish now**" on the navigation bar.

Now, check the newly created file at the `src/content/designs/hello-from-design-01.md` directory.

At this step, we haven't changed much on the Gatsby side of the project. (Other than the `gatsby-plugin-netlify-cms` plugin addition.) Gatsby adds Netlify CMS support to the system but still doesn't know where to read the data stored by the CMS. (We'll do it in the next part.)

Before closing this part, I'll clarify some options in the CMS config file. The `backend` option gives the required information about our git repo to the Netlify CMS. In this case, we used `github`, but Netlify CMS accepts more, i.e. `git-gateway`, `azure`, `bitbucket`, ... or even a `test-repo` in the name field of the backend option.

> Since we set the `local_backend` option to `true`, no matter what backend name you used, Netlify CMS will always be redirected to the local repository by the `netlify-cms-proxy-server`. Even if you had entered an unexistent repo/branch name to the repo/branch field. (There will still be a pattern validation for the repo addresses.)

The `slug` option is not mandatory, but I still don't like non-ASCII characters and diacritics in the file names. Don't forget to uncomment it here.

And the last one I want to mention is the hidden `contentKey` field inside the "**Designs**" collection. I'll add a simple explanation here, but this one will be more clear when we make progress on the project.

> Plural forms on the action buttons, like `New Designs`, are customizable. I kept this to keep configuration files as short as possible.

When we query a specific part of our data with **GraphQL**, we'll need to filter items by some unique identifiers. There are a couple of methods to achieve this. Manually adding unique and hidden `contentKey` fields is what I choose to do so. Later in the project, we'll use these `contentKey` fields to create pages from markdown files and create a listing page for the designs. For now, add this field to each collection as the unique identifier.

### Update Summary

> 👉 [See the full diff at GitHub - Part 3](https://github.com/xkema/blog-demo-going-local-and-free-with-gatsby-and-netlify-cms/commit/f2c6293).

|       | Files Updated                                 | Notable Changes                                                        |
| :---: | --------------------------------------------- | ---------------------------------------------------------------------- |
|   +   | `gatsby-config.js`                            | Added `gatsby-plugin-netlify-cms` plugin to the plugins array.         |
|  +/-  | `package-lock.json`                           |                                                                        |
|  +/-  | `package.json`                                | Installed `gatsby-plugin-netlify-cms` plugin.                              |
|   +   | `src/content/designs/hello-from-design-01.md` | Created a sample item from Netlify CMS admin.                          |
|   +   | `static/admin/config.yml`                     | Created a basic Netlify CMS config file with the "designs" collection. |

## Chapter 1 - Summary

Chapter 1 simply scaffolded a Gatsby & Netlify CMS project with bare minimums. It is to keep the tutorial code as readable as possible. In a real-world project, of course, we need more complex solutions.
In the next chapter, we'll use this scaffold to build up the project with pages, templates and components.

**Next**: [Building Up the Gatsby Project with Markdown Content](/2022/building-up-the-gatsby-project-with-markdown-content)
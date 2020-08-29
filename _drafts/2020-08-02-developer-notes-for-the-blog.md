---
title: Developer Notes for the Blog
excerpt: Notes and todos for myself about blog theme, posts, styles, ...
---

Developer notes and todos for the blog.

This is an always exists draft post. Drafts are only listed on development environment. This is a also draft post sample for future posts.

## styleguide

- use lowercase space separated words for tags, like "hola lola" (will be slugified with latin option)

## todo

- check assets folder output
- github issues as contact
- add front matter object for `blog-demo-*` repositories
- add deprecation note for post older than a year
- add citation samples to preview page `Lorem ipsum dolor. [^to-cite] & [^to-cite]: Hola Lola`
- try octicons as jekyll plugin

## posts

- gpt background refreshes demo
- intercepting-browser-network-requests, chrome-interceptor
  - charles
  - safari inline
  - request blocking
  - not in the store, safety and degoogle
- gpt-s-built-in-lazyload-support
- gpt-s-ad-viewability-metric


## other

- sample minimal theme [https://justjavascript.com](https://justjavascript.com)
- [ben-balter-jekyll-style-guide](http://ben.balter.com/jekyll-style-guide/)
- [color scheme](https://coolors.co/195cb5-d3dce5-fcfdff-3c88d8-177dea) (not in use)
- `gem install eventmachine --platform ruby` fixes `--livereload` issues with `Unable to load the EventMachine C extension; ...` error on windows environment
- [https://github.com/Chalarangelo/node-static-page-generator](https://github.com/Chalarangelo/node-static-page-generator)
- [https://julian.is/article/static-websites-and-jamstack/](https://julian.is/article/static-websites-and-jamstack/)
- [https://headlesscms.org/](https://headlesscms.org/)
- [https://www.netlifycms.org/](https://www.netlifycms.org/)
- [https://www.netlifycms.org/docs/hugo/](https://www.netlifycms.org/docs/hugo/)
- [https://gohugo.io/](https://gohugo.io/)

## roadmap

- a single blog theme
- a simple css for demo pages
- each demo page goes into their own repo and optionally uses this simple css
- demo repos use "blog-demo-{{post_title}}" format for their name
- there won't be a gem based theme for anything

## notes from other project

- based on basics [https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout
- https://labs.jensimmons.com/2017/01-009F.html
- https://gridbyexample.com/
- https://css-tricks.com/snippets/css/complete-guide-grid/#prop-display
- https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf
- https://getbootstrap.com/docs/4.4/layout/grid/#auto-layout-columns
- https://bulma.io/documentation/columns/basics/
- no ie support
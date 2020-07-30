# xkema.github.io

[xkema.github.io](https://xkema.github.io/)

- `npm start` to serve jekyll at development mode with `--livereload` flag, requires globally installed `jekyll` on local machine via `gem install bundler jekyll`
- `jekyll serve --livereload` also works, use `--drafts` to render with including draft files, use `jekyll build --profile` to run jekyll profiler to see renderer timing info

## todo

- minimal theme [https://justjavascript.com](https://justjavascript.com)
- set up [a custom domain](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)
- add [pagination](https://jekyllrb.com/docs/pagination/)
- [color scheme](https://coolors.co/195cb5-d3dce5-fcfdff-3c88d8-177dea)
- [ben-balter-jekyll-style-guide](http://ben.balter.com/jekyll-style-guide/)
- https://help.github.com/articles/configuring-jekyll-plugins/
  - https://github.com/jekyll/jekyll-sitemap
  - https://github.com/jekyll/jekyll-seo-tag
- conditional html language tag set
- `aria-*`
- get rid of mobile header, it takes a lot of space
- add citation samples to preview page `Lorem ipsum dolor. [^to-cite] & [^to-cite]: Hola Lola`

## other

- `gem install eventmachine --platform ruby` fixes `--livereload` issues with `Unable to load the EventMachine C extension; ...` error on windows environment

- https://github.com/Chalarangelo/node-static-page-generator
- https://julian.is/article/static-websites-and-jamstack/
- https://headlesscms.org/
- https://www.netlifycms.org/
- https://www.netlifycms.org/docs/hugo/
- https://gohugo.io/

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
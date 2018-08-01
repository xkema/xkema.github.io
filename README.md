# xkema.github.io

[xkema.github.io](https://xkema.github.io/)

- `npm start` to serve jekyll at development mode with `--livereload` flag, requires globally installed `jekyll` on local machine
- `jekyll serve --livereload` also works, use `--drafts` to render with including draft files, use `jekyll build --profile` to run jekyll profiler tio see renderer timing info

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

- `gem install eventmachine --platform ruby` fixes `--livereload` issues with `Unable to load the EventMachine C extension; ...` error on winddows environment
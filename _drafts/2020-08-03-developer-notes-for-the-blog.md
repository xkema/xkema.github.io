---
published: false
title: Developer Notes for the Blog
excerpt: Notes and todos for myself about blog theme, posts, styles, ...
---

Developer notes and todos for the blog.

This is an always exists draft post. Drafts are only listed on development environment. This is a also draft post sample for future posts.

## styleguide

- use lowercase [@todo change lowecase requirement], space separated words for tags, like "hola lola" (will be slugified with latin option "hola-lola")
- each demo page goes into their own repo
- demo repos use "blog-demo-{{post_title | slugify: "latin" }}" format for their name
- post content (draft, all items are optional)
  - excerpt (from front matter excerpt, first gray box)
  - intro (short intro text, an outline for the post)
  - background story
  - terms
  - story
  - end note
  - links

## blog todo

- https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth
- https://developer.mozilla.org/en-US/docs/Web/CSS/text-rendering
- add notification section to front matter to show content notifications for out-of-post-content messages like draft/unpublished post messages
- add :EMOJICODE: support
- add strikeouts to theme styleguide
- add styles for gfm task lists
- add inline changelog to posts and pages
- check assets folder output
- github issues as contact
- add front matter object for `blog-demo-*` repositories
- add deprecation note for post older than a year
- try octicons as jekyll plugin

## drafts

- some extra metrics to fight with sales
- amp vs mobile on tr detail pages, do we really need it in tr area?
- i was a fan of google products till i listened to shoushanne???
- padisahim cok yasa: yazilim gelistiriciler 3e ayrilir, strtw, sekerp-kib, kolpacino. iyi veya kotu ayrimi degil salakca bir kategorizsayon denemesi

## post notes & todo

Notes and todo on `draft`, `unpublished` and `released` posts.

### dom nodes are expensive

- things are countable so count them
- waterconsumption and energy efficiency as a legal metric.
- 2 different querySelector and querySelectorAll
- initial render recurreng renders for react
- textContent recreates node while nodeValue='sth' keeps older text node
- commitTextUpdate
- comment removal reduces page weight https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Author_fast-loading_HTML_pages
- It might be an unused feature but ReactDOM Framework one of the popular framwork that use this propery to watch changes.
- DOM Traversal is is a never ending topic.
- So DOM is live do not keep a lot of comments in yout HTML, remove comments, compress HTML.
- console.logs, emty spaces comments might be handy for all but they're also evil
- head to the theguardian home page?, Array.from(document.head.childNodes).filter(child => child.nodeType === Node.COMMENT_NODE).map(child => child.textContent.trim())[0];
- 
- https://addyosmani.com/blog/taming-the-unicorn-easing-javascript-memory-profiling-in-devtools/
- https://developers.google.com/web/tools/chrome-devtools/memory-problems
- https://developer.mozilla.org/en-US/docs/Tools/Memory/Tree_Map_view
- https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
- https://www.youtube.com/watch?v=_MAD4Oly9yg&ab_channel=ReactRally
- https://www.youtube.com/watch?v=ZCuYPiUIONs&ab_channel=FacebookDevelopers
- https://developer.mozilla.org/en-US/docs/Web/API/Document/createComment
- https://reactjs.org/docs/codebase-overview.html#reconcilers
- https://reactjs.org/docs/implementation-notes.html
- https://reactjs.org/docs/faq-internals.html#what-is-react-fiber
- https://github.com/facebook/react/blob/master/CHANGELOG.md#1500-april-7-2016
- https://blog.ag-grid.com/inside-fiber-an-in-depth-overview-of-the-new-reconciliation-algorithm-in-react/
- https://github.com/acdlite/react-fiber-architecture
- https://reactjs.org/docs/implementation-notes.html
- https://reactjs.org/docs/codebase-overview.html#reconcilers
- https://reactjs.org/docs/reconciliation.html
- https://reactjs.org/docs/optimizing-performance.html#avoid-reconciliation
- https://reactjs.org/docs/codebase-overview.html#reconcilers
- https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class
- https://reactjs.org/docs/rendering-elements.html
- https://web.dev/dom-size/
- https://web.dev/lighthouse-performance/

### kuzguncuk

- yahudiler kuzguncuktan "büyük yangın?" dan sonra yeldeğirmenine göçüyor

### ad impressions and viewability

  - passive tab
  - lazyload
  - gpt background refreshes demo
  - [Monitor Active View measurement](https://support.google.com/admanager/answer/6123557?hl=en&ref_topic=7506202)
  - correlation with impressions and viewability

### intercepting-browser-network-requests, missofis-request-interceptor

- avoid long matchers
- multiple matches will use the first `to`
- it is simple becasue works only form js and css
  - there are tons of advanced versions
- https://cssnano.co/playground
- disable chrome collect errors
- restricted to http and https

### gpt-s-event-lifecycle

- switch to privacy mode with all-mock gpt library
- Use mock? enable-mock-mode.
- validate form parameters
- add gpt version note for deprecation of features
- [Publisher Ads Audits for Lighthouse](https://developers.google.com/publisher-ads-audits/)
- [Publisher Ads Audits for Lighthouse - Audit References](https://developers.google.com/publisher-ads-audits/reference)
- Use local gpt.js and log version to the user.
- 3rd party companies may have their unique implementation and view solutions
- [Counting impressions and clicks](https://support.google.com/admanager/answer/2521337?hl=en)
- [IAB compliance - Measuring impressions - Ad requests resulting in impressions are initiated by an HTTP request generated by \<script\> tags, included in the page con...](https://support.google.com/admanager/answer/141811)
- [Measuring Ad Viewability](https://www.thinkwithgoogle.com/feature/viewability/)
- [Measuring Ad Viewability - demo](https://www.thinkwithgoogle.com/feature/viewability/demo)
- [Overview of Viewability and Active View](https://support.google.com/admanager/answer/4524488?hl=en&ref_topic=6295679)
- [View reports for MRC accredited metrics only](https://support.google.com/admanager/answer/9116817?hl=en&ref_topic=7506202)
- [Macros for custom creatives](https://support.google.com/admanager/answer/6081628?hl=en&ref_topic=28159)
- [Image creatives in Ad Manager are automatically AMPHTML Ads compliant.](https://support.google.com/admanager/answer/3180371)
- [Creative selection for multiple ad slots](https://support.google.com/admanager/answer/183281)
- [Media Rating Council](http://mediaratingcouncil.org/)

## other

- [Static Websites and Jamstack](https://julian.is/article/static-websites-and-jamstack/)
- `gem install eventmachine --platform ruby` fixes `--livereload` issues with `Unable to load the EventMachine C extension; ...` error on windows environment

## notes from legacy project

- [Document and website structure - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
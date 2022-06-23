---
published: false
title: Developer Notes for the Blog
excerpt: Notes and todos for myself about blog theme, posts, styles, ...
---

Developer notes and todos for the blog.

This is an always exists draft post. Drafts are only listed on development environment. This is also a draft post sample for future posts.

## styleguide

- use full absolute paths for **blog-demo-*** pages, use **/2020/blog-title** paths for inner blog links 
- use lowercase [`@todo` change lowecase requirement], space separated words for tags, like "hola lola" (will be slugified with latin option "hola-lola")
- each demo page goes into their own repo
- demo repos use `blog-demo-{{post_title | slugify: "latin" }}` format for their name
- post content (draft, all items are optional)
  - excerpt (from front matter excerpt, first gray box)
  - post featured image
  - intro (short intro text, an outline for the post)
  - background story
  - terms
  - story
  - end note
  - links

## blog todo

- add goat analytics note for blog-demo-* pages
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

### What would Happened to my Blog If I were a Publisher

### running-transitions-on-dynamicly-created-dom-elements

```
---
title: running-transitions-on-dynamicly-created-dom-elements
excerpt: running-transitions-on-dynamicly-created-dom-elements
tags:
  - css transitions
  - javascript
---
```

```
// we create an element
const box = document.createElement("div")

// add it to the DOM
document.body.appendChild(box)

// add two css classes
box.classList.add("box")

// and remove 'faded-out' in order to fade-in our element
// requestAnimationFrame (does not work if there is a heavy for loop)
setTimeout(() => {
	box.classList.add("faded-out");
})

for(var i=0; i<200000; i++) {
	const elem = document.createElement('div');
  elem.innerText = `h-${Math.random()}`;
  document.body.insertAdjacentElement('beforeEnd', elem)
  elem.style.paddingLeft = `100px`
}

.box {
  width: 100px;
  height: 100px;
  background-color: #9D5B75;
  transition: opacity 500ms;
  opacity: 0;
}

.box.faded-out {
  opacity: 1;
}

```

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

## Publishing Extensions into Stores

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
- [Workspaces](https://developers.google.com/web/tools/chrome-devtools/workspaces/)
- [Local Overrides](https://developers.google.com/web/updates/2018/01/devtools#overrides)
https://webkit.org/web-inspector/local-overrides/
- firefox update to 1.1.0 was nearly immediate
  - tell isertAdjacentHTML warn
- chrome re-review and update took half a day

- review process slowed down because of covid for firefox

- chrome store notes
  - Ready to publish before Oct 25, 2020, 9:59:59 AM
    - publish, cancel publish, unpublish optison available
    - publish button responds your publish request submitted >> status turns published - public
    - and listed right after and available on search results
    - An error has occurred - There was a problem loading the item. Please refresh the page and try again.
      -detail page says in incognito
  - uploaded images are optimized
  - fill a large publish form
  - after submitting for for review it was ready to publish (i selected publush only the developers and me)
  - selecting developers auto includes your eamail
  - i clicked pub;ish and it sait ready
  - after selecting ok, it published section filled
  - header is clickable now but accessible only by me
  - dev publish was immediate
  - before review you can publish/unpublish to limited developers
    - you need to add your emal as a tester account to load extension, even if it is your webstore email it is required
    - some docs says it is but it is not
  - after testing it with test account i published it for public
  - Because of the following issue, your extension may require an in-depth review: - Broad Host Permissions
  - Pending Review Your item has been submitted and is currently going through a compliance review. This review may take up to a few business days to complete. Please check the developer dashboard for the most current state of your item’s review. Note: Unpublishing your item will not cancel the review. If you unpublish, you won’t be able to re-submit your item until the current review has been
  - you can't edit package or store option (whhy cant i publish: Unable to publish. Complete the points below to publish your item. Remember to Save Draft when you are done. This item is locked and cannot be edited or published.)
  - submitted at Sep 21, 12:00
- firefox store notes
  - register
  - submıt zip for validation
    - correct vidation warnings
    - add version notes
  - fill another long submission form (hope i dont do it for updates)
  - some fileds are collected from manifest json meta
  - add reviewwers note and submit
  - after validation options 
    - Manage Listing (edit description, icons, screenshots, details, ...) (review status) Queue Position: 67 of 67 approved Sep 22 12:00
    - Edit version 1.0.1 (version info, release notes, compability selection)
    - Go to My Submission (see your add on, click add on and go detai;s, view product page: This is not a public listing. You are only seeing it because of elevated permissions.)
      - Download failed. Please check your connection. add to firefox responds with this

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

### untitled-gpt-dynamic-targeting-control-blog

```
title: untitled-gpt-dynamic-targeting-control-blog
excerpt: '"GPT" offers "key-values" to target users more accurately. While "key-values" are helping with ad targeting, we can also use them to understand slot and page performance.'
tags:
  - dynamic targeting
  - single request mode
  - single request architecture
  - gpt
  - display ads
```

### Ad Impressions and Viewability

```
---
title: Ad Impressions and Viewability
excerpt: Digital advertising have those two fundamental metrics on measuring advertisement performance. One is "impressions" and the other one is "viewability". This blog post will try to explain these metrics and how GPT library implements them for display ads.
tags:
  - impressions
  - viewability
  - gpt
  - display ads
---

So you've rented some part of your web site (inventory) to an advertiser and started to show display ads at this location. At the end of the campaign -of course- they'll ask you about campaign performance. This is where you'll create a report on some metrics over a period of time. At most of the cases these metrics will be "**impressions**", "**clicks**"  and "**viewability**".

Digital ads are usually sold by number of impressions and CPM is the commonly used measurement for it. When we have an inventory item for `5$` CPM, that means the advertiser will pay us `5$` for every `1000` pageviews.

> **CPM** stands for "Cost per Mille". **CPT** is a synonym for CPM which stands for "Cost per Thousand")

Enough with terms. Now I'll try to visualize it again.

![Ad Impressions and Viewability - Creative Status](/assets/raw/ad-impressions-and-viewability-creative-status.svg "Ad Impressions and Viewability - Creative Status")
```

## other

- [Static Websites and Jamstack](https://julian.is/article/static-websites-and-jamstack/)
- `gem install eventmachine --platform ruby` fixes `--livereload` issues with `Unable to load the EventMachine C extension; ...` error on windows environment

## notes from legacy project

- [Document and website structure - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)
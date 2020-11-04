---
title: DOM Nodes are Expensive - A Prelude
excerpt: This post is an opening for a 3-parts article series about DOM interfaces.
tags:
  - dom
  - html comments
  - react demarcation
---

Everyting started with a simple question:

> Can We Uncomment HTML Comments with JavaScript?

What an unnecessary question! :) Who cares comment nodes inside the DOM? With lack of curiosity, I would also have answered it that way. But two separate events made me dig deeper for that question, and this is how that question has become a series of 3-posts in my blog.

## Series Summary

**Part 1** will cover the simple answer to the main question, which is "yes". **Part 2** will show React's internal demarcation methods at different versions. **Part 3** will try to compare memory consumption led by these extra DOM nodes.

- **Part 1** - [Can We Uncomment HTML Comments with JavaScript?](/2020/can-we-uncomment-html-comments-with-javascript "Part 1 - Can We Uncomment HTML Comments with JavaScript?")
- **Part 2** - [React's Demarcation Methods](/2020/react-s-demarcation-methods "Part 2 - React's Demarcation Methods")
- **Part 3** - [Memory Usage of Extra DOM Nodes](/2020/memory-usage-of-extra-dom-nodes "Part 3 - Memory Usage of Extra DOM Nodes")

There will also be blog demo pages for each part.

- **Demo 1** - [HTML Comments](https://xkema.github.io/blog-demo-dom-nodes-are-expensive/html-comments "Demo 1 - HTML Comments")
- **Demo 2** - [Demarcation Methods](https://xkema.github.io/blog-demo-dom-nodes-are-expensive/demarcation-methods "Demo 2 - Demarcation Methods")
- **Demo 3** - [Memory Usage](https://xkema.github.io/blog-demo-dom-nodes-are-expensive/memory-usage "Demo 3 - Memory Usage")

**Demo 1** will demonstrate traversing of DOM Comment interface. It will reveal and put pack HTML comments to the page programmatically. **Demo 2** will use the same `Clock` component to show different demarcation methods of React. **Demo 3** will show how different numbers of Comment and Text nodes affect the memory used by your web page with the same content.

## Background Story

The story behind this question arose from two separate events.

First one was a job interview with an online advertising company that has its unique inventory management software. Their development team were using React as their framework and, I'd been asked if I know "*How React updates DOM efficiently?*". Probably they were expecting some answer around Virtual DOM and reconciliation, but I was preoccupied with another concept. Because, before the interview, I'd checked the React source, and I realized that React (`v15`) was using HTML Comment interface to mark the dynamic parts of the DOM. Then update these limited portions with the calculated diffs. That was a matter of interest for me, and I saved it to my bucket.

The second one was a performance optimization problem that one of my colleagues was working on. The question was about HTML compression. Reducing the HTML size was a familiar topic for both of us, but what were the other benefits of doing minification on HTML content.

These two events made me dug deeper and search some more about HTML comments. Here we start with the first part.

**Next**: [Part 1 - Can We Uncomment HTML Comments with JavaScript?](/2020/can-we-uncomment-html-comments-with-javascript "Part 1 - Can We Uncomment HTML Comments with JavaScript?")

## A Wrap Up for the Series

I wish you would make it here with patience after reading all posts. To sum up, here are the takeaways from series:

- **DOM** represents everything inside an HTML text, whether it is visible to the user or not.
- DOM resolves a king-size domain problem, and sometimes **it offers more** than what we need.
- **Virtual DOM** is a lightweight, non-displayed DOM-copy where we compute UI changes before displaying them in the browser's displayed DOM.
- After its creation, the **DOM tree** represents every interface defined by the browser.
- **Render tree** contains the nodes only required to render the page.
- Invisible DOM interfaces **do not effect rendering performance**.
- However invisible DOM interfaces **increase memory usage**.
- Always **minify HTML** to reduce file size.
- Avoid deep DOM trees, try CSS features to **keep DOM structure simple** as possible.
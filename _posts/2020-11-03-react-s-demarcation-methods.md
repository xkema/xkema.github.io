---
title: React's Demarcation Methods
excerpt: React needs some start and end markers on the updated textual content to render changed parts partially. This process is called demarcation and to do so, it uses basic DOM features. This post will show how different versions of React carry out this process.
tags:
  - virtual dom
  - react
  - demarcation
  - DOM Nodes are Expensive - Part 2
multipart: 2/3
---

> This post is the second part of a 3-parts article series named "[DOM Nodes are Expensive](/2020/dom-nodes-are-expensive "DOM Nodes are Expensive - A Prelude")". Each post consists of a writing part and a demo part. For this post, check-out the demo page at [Demo 2 - Demarcation Methods](https://xkema.github.io/blog-demo-dom-nodes-are-expensive/demarcation-methods "Demo 2 - Demarcation Methods").

## Render Just the Right Parts 

We know React only updates what it needs to be updated. It computes diffs within in-memory data structures, then updates only related DOM fragments with those diffs. As you can easily guess, to do that, it needs some markers to isolate changing fragments of the UI. Those fragments might be a full component, a partial HTML content or just text content which we're dealing with right now.

For the text content, React still splits it into static and dynamic portions. It is called demarcation, and demarcation means determining limits of something. :)

> **A reminder!**  
> I tell all these verbose stories to show that DOM is way more substantial than it seems. It is not just a bunch of `<div>`s and `<p>`s, and `querySelector()`s ... We have more to care.  
> But sometimes we need less. That is why some developers around the world search for a lightweight solution and make-up new programming concepts like Virtual DOM.  

Images below are snapshots from interactive demo pages. You can inspect these demos at [Demo 2 - Demarcation Methods](https://xkema.github.io/blog-demo-dom-nodes-are-expensive/demarcation-methods "Demo 2 - Demarcation Methods") page.


### React v14 - `<span>` elements as markers

At `v14`, React was using wrapper `<span>` elements to target text nodes to be updated. Here how it looks like:

![Demarcation - React v14](/assets/uploads/react-updates-demarcation-v14.gif "Demarcation - React v14")

### React v15 - `<!-- comment -->` nodes as markers

At `v15`, demarcation method updated and `<span>` elements are replaced with comment markers like, `<!-- react-text: 999 -->`:

![Demarcation - React v15](/assets/uploads/react-updates-demarcation-v15.gif "Demarcation - React v15")

### React v15 - no markers

And finally, at `v16`, all markers are gone. It is now just plain-old text nodes:

![Demarcation - React v16](/assets/uploads/react-updates-demarcation-v16.gif "Demarcation - React v16")

------

React is all about performant user interfaces and components. It is just concerned with rendering data into the DOM. By looking at the demarcation evolution, we may say, the main focus is still on the go.

## Before You Leave

After this real-world example, we may continue with our memory problems and see why React changed demarcation behaviour steadily in-between different versions. And see why it is vital to reduce the number of HTML elements on a page and remove unnecessary spaces from served HTML content.

**Next**: [Part 3 - Memory Usage of Extra DOM Nodes](/2020/memory-usage-of-extra-dom-nodes "Part 3 - Memory Usage of Extra DOM Nodes")
---
title: Can We Uncomment HTML Comments with JavaScript?
excerpt: In short, yes we can play with comments like any other HTML element. Both comments and empty spaces between HTML tags are DOM interfaces that inherit from traversable DOM interfaces.
tags:
  - dom
  - html comments
  - DOM Nodes are Expensive - Part 1
---

> This post is the first part of a 3-parts article series named "[DOM Nodes are Expensive](https://xkema.github.io/2020/dom-nodes-are-expensive "DOM Nodes are Expensive - A Prelude")". Each post consists of a writing part and a demo part. For this post, check-out the demo page at [Demo 1 - HTML Comments](https://xkema.github.io/blog-demo-dom-nodes-are-expensive/html-comments "Demo 1 - HTML Comments").


## DOM is Language Independent

First thing is first, what is the DOM?

**DOM** (Document Object Model) is the representation of an annotated text as programmable objects. When it comes to web development, this annotated text is usually the `HTML`, and programmable objects are various DOM interfaces like `Node`, `Element`, `HTMLLinkElement`, ...

DOM representations are essential because they allow us to create or modify webpages with JavaScript programming language. Browsers engines read and parse `HTML` texts into the DOM. Before that, we are unable to access DOM elements by JavaScript. Then, we are good to go with JavaScript to change and modify it. For further reading, check out the [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction#DOM_and_JavaScript "DOM and JavaScript") page on DOM.

When working with an HTML page, we usually focus on the usual DOM nodes like the `body`, `p`, `div`, `a`, ... We select them with methods like `querySelector()` and `querySelectorAll()` which return `Element` or `HTMLElement` interface instances. Usual developer activities. We don't even notice comment nodes or empty text nodes while working with these methods and interfaces. As a matter of fact, we do not need to notice them at all.

But that is not my point for this post for now and, I still want to play with HTML comments in a web page source. :)

## The Short Answer, Yes!

By far, we know the answer to the main question is a yes. We can uncomment HTML comments. Here is a simple solution for that. Consider this visually empty `div` block below. You can use the JavaScript block right after the `div` element to traverse comment node inside the `div`. What it does is,  it selects the `div` element, then accesses the comment node, get its content and prints it to the console.

```html
<div>
  <!-- Hi! I'm an HTML comment. -->
</div>

<script>
  const div = document.querySelector('div');
  console.log(div.childNodes[1].nodeValue);
  // output: " Hi! I'm an HTML comment. "
</script>
```

Need a demo? Head to the [Demo 1 - HTML Comments](https://xkema.github.io/blog-demo-dom-nodes-are-expensive/html-comments "Demo 1 - HTML Comments") page, peek at the source code and find 5 comment nodes, find `Reveal HTML Comments` and `Put Back HTML Comments` on the page and click them.

------

We've finally showed that comment nodes are traversable. It is that easy, but if you've just noticed that, I've selected the second child to access `Comment` node instead of the first. `Node.childNodes` collection is a `NodeList` object and `NodeList` object indexes are 0-based. That is where I introduce you to the other DOM interface subjected to this blog post, the `Text` interface.

Believe or not, this simple `div` Element has three child nodes:

1. Value of the child `[0]` is a `Text` node with content "&crarr;&nbsp;&nbsp;". (*a newline and two extra whitespaces*)  
2. Child `[1]` is the `Comment` node with the content "&nbsp;Hi! I'm an HTML comment&nbsp;".  
3. Child `[2]` is another `Text` node with the content "&crarr;". (*a newline*)  

Why do we even care for this? We care, because DOM nodes are relational objects, and they consume our resources, like memory, power, ... On the other hand, we use this feature to solve real-world technical problems. Like in the Virtual DOM.

## Before You Leave

That's it for the initial question. If you want to go further with this topic, we'll have a real-world example for this. With having "**Part 1**" in mind, let's take a look at React's textual content update methods.

**Next**: Part 2 - React’s Demarcation Methods (incoming)
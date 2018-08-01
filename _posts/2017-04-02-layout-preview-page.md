---
layout: post
title: Layout Preview Page
excerpt: This is the layout preview page of this jekyll template, with basic HTML elements, styles and etc..
---

![A Top Image](https://picsum.photos/720/320/?image=212)

# Heading 1

These are the content heading elements. Skip the first `<h1>` element in post content which is **Layout Preview Page** in this case. It is already filled by `page.title` variable to auto-create post main header. So start with `<h2>`s.

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

Do not over use heading elements, keep it simple, I mean who needs an `<h6>` element?

## Lists

### Unordered

- Stop organizing jekyll template and write some posts
- Lorem ipsum dolor sit amet, consectetur adipisicing elit
- Do not lorem ipsum me!
- Stop organizing jekyll template and write posts

### Ordered

1. Find a topic
2. Do some research
3. Stop organizing jekyll template and write posts 
4. Do not forget citations!

## Media

### Image Full

Always use block full with images. Theme's max container width is `720px` wide. So minimum content image width is so.

![Sample Unsplash Image](https://picsum.photos/960/480/?image=479)

### Image Inline

Inline images are not supported due to keep markdow syntax simple. If you use one, a `120x160` image in this case, you'll get an unexpectedly cut in half content as in here. It is possible to use a customized markup syntax to fix but I'm skipping it for now. ![Sample Unsplash Image](https://picsum.photos/120/160/?image=756)

### Image Smaller than Site Content

You'll get this if you use images smaller than `720px`.

![A Smaller Image](https://picsum.photos/600/320/?image=519)

## Table

| Pages    | Categories    | Tags                |
| -------- | ------------- | ------------------- |
| home     | development   | front-end-developer |
| about    | tutorials     | best-practises      |
| contact  | uncategorized | untagged            |

## Code

Inline code samples are simple inline colored blocks as in `let inlineBlock = 'inline';`

Fenced code blocks are block contents styled as sample below. See [GFM guide](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown)

```javascript
let greetDictator = () => {
  console.error("upps! dictators aren't welcome here!!");
}
greet("Unde Mocratic");
```

## Text Elements

Here is the old **bold** text, and great *italic*. Links appear like [link to theme repo](https://github.com/xkema/xkema.github.io). Breaked lines starts from just here (with double or more spaces in markdown content):  
I'm breaked with a `<br>` element.

## Inline Horizontal Rule

`<hr>` elements are always block level with some margin above and below.

- - - 

Use them to create logically separated blocks in content maybe?

## Blockquotes

Lorem said:

> who cares your content style, headers, code blocks or images, stop organizing jekyll template and write posts.
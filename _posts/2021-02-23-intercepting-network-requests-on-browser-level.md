---
title: Intercepting Network Requests by a Browser Extension
excerpt: There are multiple ways to intercept network requests on different layers, and one way is to use native browser extension APIs. This post will focus on this method and a sample extension build by using that method.
tags:
  - request interceptor
  - web extension apis
canonical: https://kemalyilmaz.com/blog/intercepting-network-requests-on-browser-level/
---

![Post Featured - Intercepting Network Requests by a Browser Extension](/assets/uploads/post-featured-intercepting-network-requests-on-browser-level.jpg "Post Featured - Intercepting Network Requests by a Browser Extension")

I've been maintaining a 3rd party script for a while. It is a JavaScript library in a single repository and used by a network of sites with custom development environments. And it is being served to those sites from a CDN. As being separated from the original codebases, a problem arose from this setup, which is:

> How do I develop the library without having each site's development environment at my local environment?

I prefer not to have a "**serve-to-all**" approach in most of the development cases. So I was OK to divide the library into `N` pieces and maintain it at its own source. It would have been great if there weren't these obstacles, such as:

- I was the only developer for the project.
- I was working with the salesperson, and everything was "urgent!".
- There were at least three different development environments had to be installed to my local machine.

Working with a setup like above was dividing me into `N` pieces, not the project. So I started to search for a different solution.

> If you're bored enough, you may skip **Background Story** section and head to the [Sum Up: A Browser-Level Solution](#sum-up-a-browser-level-solution "Sum Up: A Browser-Level Solution") section.

## Background Story

Before I took over the project, people were using the system `hosts` file to develop the project locally. Developers were redirecting CDN URL's to their `localhost` URL with the default port `80`. The setup was like this:

```bash
127.0.0.1   cdn.example.com
```

With this `hosts` setup, firing up some local HTTP server software with the defaults would make your development environment for your CDN. But what if you want to check the live site? Yes, you have to comment out the related hosts file line for the CDN entry. Check live and switch back and forth infinitely. I think you get the point. It smells not so delicious.

Another problem with this setup is you can't control directories or single files with `hosts` files. You need to have exact copies of your CDN directories to work locally with them, without any interruption.

Enough with the background story. That wasn't a proper development environment, and I started to search for a better solution. And the main question turned into this:

> How do I redirect a single remote file to my localhost?

There are various ways to do it so. At system-level, we have the inefficient `hosts` file method. Another system-level solution is using proxy software, like "Charles". At browser-level, every major browser has at least one of these features; Local Overrides or Workspaces.

They're all helpful, but I need a more specific solution. Here is what I have:

- A development environment, exports a JavaScript file to a dist directory, call it `dist/my-local-script.js`.
- "dist" directory is also a local server serves at `localhost:3000`.
- A script at the live site. `example.com/assets/js/my-live-script.js`.
- A staging script at staging site. `staging.example.com/assets/js/my-live-script.js`.

And this is what I need:

- Redirect `example.com/assets/js/my-live-script.js` to `localhost:3000/my-local-script.js`.

## Sum Up: A Browser-Level Solution

So, to make things more clear here is the problem in a nutshell:

> I have a JavaScript library at `example.com/my-live-script.js`. And I have a local environment serving this script from `localhost:3000/my-local-script.js`.
>
> How do I **redirect live script to the local one**?

A browser extension may help. 

Browsers have the [WebExtensions APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API "WebExtensions APIs") to extend their look and functionality.

And there is a `webRequest` API to modify or block HTTP requests. That is the API also used by AdBlocker extensions. With this API, you can do whatever you want to do with an HTTP request.

So I used it to solve my development problems and created Missofis Request Interceptor extension. It is like an advanced `hosts` file right under your browser toolbar. You can define redirections like:

```bash
localhost:3000/my-local-script.js   example.com/assets/js/my-live-script.js
```

It is the same syntax with `hosts` file but this time more specific.

Here are the source and web store links for it. It has fixed a fair amount of development problems of me. I may be helpful for you if you have a similar environment.

- [Source](https://github.com/xkema/missofis-request-interceptor "GitHub - Missofis Request Interceptor")
- [Firefox Browser Add-ons](https://addons.mozilla.org/en-US/firefox/addon/missofis-request-interceptor/ "Firefox Browser Add-ons")
- [Chrome Web Store](https://chrome.google.com/webstore/detail/missofis-request-intercep/npjcklbcofihajkojjldmebgfaljackc "Chrome Web Store")

## An Oversimplified Snippet to Intercept HTTP Requests with "webRequest" API

`webRequest.onBeforeRequest` event is the place to cancel or redirect a network request with `webRequest` API. You may visit and see [MDN page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest "webRequest.onBeforeRequest Event Documentation Page") for lots of details.

The code below will intercept HTTP requests (about-to) made to the `http://example.com/assets/js/*` and `https://example.com/assets/js/*` paths. It will listen to the `script` requests only. And it will rewrite the URLs with `localhost:3000/dist/`.

```javascript
// main interceptor
browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    return {
      redirectUrl: details.url.replace('example.com/assets/js/', 'localhost:3000/dist/')
    };
  },
  {
    urls: [
      'http://example.com/assets/js/*',
      'https://example.com/assets/js/*',
    ],
    types: [
      'script'
    ]
  },
  ['blocking']
);
```

Say, we have some JavaScript files under "**/assets/js/**" path. The interceptor code above will redirect all requests to the `localhost:3000/dist/` path and port.

```bash
# https://example.com/assets/js/my-live-script.js  >>>  https://localhost:3000/dist/my-live-script.js
#
# http://example.com/assets/js/my-bundle.js  >>>  http://localhost:3000/dist/my-bundle.js
```

## Alternatives

By the time I faced this problem back in 2016, there weren't too many alternatives to fix this problem. Last time I checked, there were tons of advanced tools to fix this problem and more advanced problems like; locally testing an API or modifying every HTTP header individually. Try to search with one of these keywords at extension stores for the alternatives; `request interceptor`, `http editor` or `http redirect`.
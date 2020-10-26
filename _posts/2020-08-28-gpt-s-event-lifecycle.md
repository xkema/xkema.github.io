---
title: GPT's Event Lifecycle
excerpt: From requesting ads to counting them as impressions, Google Publisher Tag (GPT) Library triggers a set of events to inform page about current display ad slot statuses. This page is a preliminary reading for the demo page I built for this event lifecycle.
tags:
  - gpt
  - gpt's event lifecycle
  - display ads
---

Google Publisher Tag (**GPT**) is a JavaScript library to show digital ads controlled & served by Google Ad Manager on web pages. It is a fairly complex and closed source library maintained and served by Google. Simply put, you add a JavaScript Library and some additional `html` tags (ad tags) to your web page and Google gives you back display ads from a huge network of privacy eating partners, including themselves.

Switching back to technical mode here.

After playing around for a while, I decided to create a [demo page](https://xkema.github.io/blog-demo-gpt-s-event-lifecycle/ "A demo page to observe GPT's (Google Publisher Tag) slot lifecycle events.") to observe each GPT event and GPT option that change event behaviour. As I add extra features one by one, demo page gone bigger than I expected. So I split it up to a demo page and a blog post which is you're reading right now.

> To make some terms clear; **ad tag**s are a bunch of `html` tags that help to define and show ads on your web page, **ad slot**s are the representations of actual ads defined in your network. We use **ad tag**s to define **ad slot**s.
>
> On the other hand, it is possible to define and show ads on a page without any **ad tag**. Tagging is the documented and recommended way by Google to define slots on a page.
>
> Terms might be interchanged in different contexts. I'll use "**slot**" or "**ad slot**" to point a specific ad and the JavaScript object represents that ad on a page.

## GPT Events

Each ad slot has an event lifecycle controlled by GPT Library. Before listing events and their description, some visualization might be helpful.

### A Sample Timeline

This is a sample timeline and network activity for a single slot on a page:

![GPT's Event Lifecycle Timeline](/assets/uploads/gpt-s-event-lifecycle-timeline-opt.svg "GPT's Event Lifecycle Timeline")

Grey boxes are the network requests that represent event lifecycle. `/ads?`, `/view?` and `/activeview?` requests are the requests made by GPT to save different slot activity. You can use these strings to filter network requests to see slot activity. Use `/ads?` to see initial ad requests made by GPT, use `/view?` to see when the impression is recorded and `/activeview?` to see when the impression viewable info is sent to the server.

There are three `/view?` requests visualized in the graph. These do not necessarily exist in a single ad request alltogether. First two impressions that recorded between `slotRenderEnded` and `slotOnLoad` events are GPT's built-in impression pixel and a custom creative pixel added by a user. (Named `gpt` and `custom` in the image. User-defined pixel have to be manually added to creative by an Ad Managed user.) Third impression pixel is -*not sure a hundred per cent with that*- an AMP impression pixel for AMP pages. Some creatives are served both standard pages and not-so-standard AMP pages. So these creatives have two different impression pixels; one for standard web and one for AMP which is the third pixel labelled "amp" in the image.

### Event Details

Here are the events triggered by GPT Library and some details:

- `slotRequested` and `slotResponseReceived`

  For each ad slot, GPT sends an HTTP request to its servers with a URL like `https://securepubads.g.doubleclick.net/gampad/ads?...`. As their names suggest these two events are triggered right after sending the HTTP request and right after taking back the response to this HTTP request. 

  > **Use cases**: Slot request time is a way to find clues about your page load performance. Slower page load results postponed ad requests which might impact ad delivery performance negatively.
  
- `slotRenderEnded`

  This is where you will know about what you get from the ad server. This event injects creative code into the page which is a protected  `<iframe>` element. Ads are served inside `iframe`s and `slotRenderEnded` event simply tells "*Ok, I've injected your iframe and now waiting for the resources in that iframe.*" This event tells if there is an ad returned from the server or not. If it is, it also gives every detail about that creative served to the page like `creativeId`, `advertiserId` and more.
  
  > **Use cases**: You can log your responses to console, add specific fixes for specific ads or advertisers, etc...

- `slotOnLoad`

  This is the time when creative's `<iframe>` fires it's `load` event. So it guarantees some ugly creative image, text, ... is now rendered and visible.

  > **Use cases**: `slotOnLoad` event time is an important time because this is where the impression pixels are delivered to the page and counted as impressions. Impressions are simple HTTP requests usually made by `<img>` tags' `src` attributes. Both GPT's and custom advertisers' impression pixels are rendered to the page between `slotRenderEnded` and `slotOnLoad` events. So `slotOnLoad` event is the place where we know we send impression requests inside creative code.
  >
  > Again the creative is not necessarily to be fully downloaded to count impressions. Creatives might not be visible to the user when impressions are counted already.

- `slotVisibilityChanged`

  GPT has a built-in mechanism to watch slot viewport positions. This event is a throttled position watcher that gives information about what percentage of the slot is visible right now.

  > **Use cases**: GPT has a lazyloading solution that using this event. What if we want to refresh slots after some time or event occur on the page. `slotVisibilityChanged` event is continued to trigger the event if the slot is already rendered. So if you want to refresh a slot after initial response you can use this event to detect if the slot is re-entered to the viewport. And refresh it to deliver an additional ad to the visitors.

- `impressionViewable`

  Viewability is the second important performance metric for display advertising after impressions. This event is the metric where a larger portion of your ad content has been visible to the user longer than 1 second without any interruption. And this is the event where we know if this viewability condition has met.

  > **Use cases**: As in the previous case you can prevent refreshing ads if they are not viewable yet.

## GPT Options that Change Event Behaviour

- `enableSingleRequest`

  Combines fetching of all ad requests into a single HTTP Request. [docs](https://developers.google.com/doubleclick-gpt/reference#boolean-enablesinglerequest "GPT Reference - enableSingleRequest")

  > If you use single request mode, there will only be a single HTTP request for all slots on the page but yet separate events will be triggered for each slot. So it doesn't change individual event behaviour.
  >
  > Single request mode changes event timing if it is used together with `enableLazyLoad` option. In that case, fetching of every slot will depend on the first slot that enters into the viewport. 

- `enableLazyLoad`

  Enables GPT's built-in lazyloading feature. [docs](https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_enableLazyLoad "GPT Reference - enableLazyLoad")

  > Lazyloading helps with reducing page load time by pausing initial requests on page load. It also helps with closing the gap between impressions and viewability counts.

- `enableLazyLoad :: fetchMarginPercent`

  Start slot fetching before entering into the viewport. [docs](https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_enableLazyLoad "GPT Reference - enableLazyLoad")

  > Use fetch margin to decide when to send slot requests. `0` for right after entering the viewport, `100` for before `1vh` etc...

- `enableLazyLoad :: renderMarginPercent`

  Start slot rendering before entering into the viewport. [docs](https://developers.google.com/doubleclick-gpt/reference#googletag.PubAdsService_enableLazyLoad "GPT Reference - enableLazyLoad")

  > Postpones rendering of slot content which also means postponing impression requests until slot enters into the render margin per cent. This will also end up with better viewable impressions in most cases.

## End Notes

I hope you find something useful in the content. Again, it is not a common topic for all but still, it may help some. "Digital advertising" and "working for sales people" weren't my future plans and I thought I couldn't handle it but yet I'm here writing posts on the topic.

---

GPT features related to these events might change by time. Always refer to the [docs](https://developers.google.com/doubleclick-gpt/guides/get-started "Get Started with Google Publisher Tags") and [reference](https://developers.google.com/doubleclick-gpt/reference "GPT Reference") for up-to-date content.
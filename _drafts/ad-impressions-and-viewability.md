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
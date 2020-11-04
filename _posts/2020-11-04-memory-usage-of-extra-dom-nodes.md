---
title: Memory Usage of Extra DOM Nodes
excerpt: In this last part of the series, we'll compare the memory snapshots for a page that has the same content but different sizes of comment nodes.
tags:
  - dom
  - memory usage
  - DOM Nodes are Expensive - Part 3
---

> This post is the last part of a 3-parts article series named "[DOM Nodes are Expensive](/2020/dom-nodes-are-expensive "DOM Nodes are Expensive - A Prelude")". Each post consists of a writing part and a demo part. For this post, check-out the demo page at [Demo 3 - Memory Usage](https://xkema.github.io/blog-demo-dom-nodes-are-expensive/memory-usage "Demo 3 - Memory Usage").

## DOM Nodes Affect Memory! Use Responsibly.

The information we put into the computer programs consume resources and DOM nodes aren't free of that. They keep a lot of information about their surroundings; their parent, children, siblings, value, ... They consume energy and memory and as the title offers, they're not free of charge.

I made up several demo pages with different setups to inspect memory consumption changes. Here is the page summary table:

|     Page      |                         Description                         | Number of Comment Nodes | Compressed | File Size |
| :-----------: | :---------------------------------------------------------: | :---------------------: | :--------: | :-------: |
|   `index-0`   |     **Default** load, without extraneous comment nodes.     |           `1`           |     -      |  `2.9KB`  |
|  `index-10k`  |            **Initial** load with **10K** lines.             |          `10K`          |     -      |  `218KB`  |
|  `index-50k`  |             **Medium** load with **50K** lines.             |          `50K`          |     -      |  `1.1MB`  |
| `index-100k`  |             **Heavy** load with **100K** lines.             |         `100K`          |     -      |  `2.1MB`  |
| `index-10kc`  |             Initial load without empty spaces.              |          `10K`          |    yes     |  `208KB`  |
| `index-50kc`  |              Medium load without empty spaces.              |          `50K`          |    yes     |  `1.0MB`  |
| `index-100kc` |              Heavy load without empty spaces.               |         `100K`          |    yes     |  `2.0MB`  |
| `index-50kct` | A single comment node, but same file size with medium load. |           `1`           |     -      |  `1.0MB`  |

### Demo Grouping

**Group 1** is `Nk` pages; `10k`, `50k`, `100k`. These are the pages with `N` lines of comments. Each line has a `#comment` and `#text` node. (That makes `N*2` children for the wrapper.)

**Group 2** is `Nkc` pages; `10kc`, `50kc`, `100kc`, marked as compressed. Same with previous but without `#text` nodes. (This is what happens when you compress your HTML content. `N` children in that case.)

`50kct` page is an experiment with a single comment but a huge amount of text in it. Just for the playground. :)

## Tools, Aim and Notes

JavaScript engines use different methods to manage memory. Firefox has **SpiderMonkey** and Chrome has **v8**. Both do their work pretty well. However, numbers reported by them might not match. So, instead of focusing on the reported numbers, keep an eye on the memory consumption up &amp; down trends while reading memory related data for general.

I picked **Firefox Developer Tools** to take heap snapshots. (*Developer Edition*) Here are the reasons:

- It has a **Treemap** visualizer.
- Chrome's Memory tool doesn't show native objects sizes where the initial DOM nodes are stored in. (*I've also included Chrome Task Manager results.*)
- I was unable to take heap snapshots with Chrome's Memory tool for the large pages. (*Builds were taking too much time or they were completely stuck at some point.*)

> Will increasing the number of comment nodes, also increase memory usage?

That is what I want to answer with this demo. The answer is predictable, but to close this post series, I need to add some physical evidence.

Lastly, for the tests, I used a brand new user profile to take heap snapshots and read task manager data, without extensions and without any extra browser setting. It was the best cleanroom environment I could provide for this demo. Also, it is the recommended way. Test results might be different from the numbers reported here at your development environment based on the extensions and browser settings you use.

Firefox profile page is a little bit hidden at `about:profiles` page. :)

**Note**: Numbers at the tables are rounded!

-----

I'll compare limited items to get to my main point. You can go further at demo pages if you like.

Task managers are the starting point for the memory inspection. Firefox task manager is at `about:performance` page. Or use `Menu > More > Task Manager`. Chome task manager is at `Window > Task Manager`. (these are for macOS, please find your way to the tool at your environment)

## Task Manager

![Firefox Task Manager Sample](/assets/uploads/firefox-task-manager-results-sample.jpg "Firefox Task Manager Sample")

Task manager results are pretty straightforward. At the table below, the "**Memory (Firefox)**" column shows memory consumption is nearly proportional to the number of comment lines. See `10k`, `50k` and `100k` lines have `5MB`, `23MB` and `45MB` of memory occupation respectively.

For the compressed pages, removing `#text` nodes saved a lot of memory. (Again, it means HTML compression.) Without `#text` nodes, `50k` page is only `7MB` instead of `23MB`. (compare `index-50k` and `index-50kc`)

|     Page      | Memory (Firefox) | Memory Footprint (Chrome Dev) |
| :-----------: | :--------------: | :---------------------------: |
|   `index-0`   |     `550KB`      |            `25MB`             |
|  `index-10k`  |      `5MB`       |            `27MB`             |
|  `index-50k`  |      `23MB`      |            `36MB`             |
| `index-100k`  |      `45MB`      |            `47MB`             |
| `index-10kc`  |      `2MB`       |            `26MB`             |
| `index-50kc`  |      `7MB`       |            `31MB`             |
| `index-100kc` |      `14MB`      |            `37MB`             |
| `index-50kct` |     `1.6MB`      |            `26MB`             |

Task manager data has already proved our main point. Let's move to the details with the memory snapshots.

## Memory Snapshots

Below, there is a treemap representation sample for a page. Each coloured box is an allocation category. And each rectangle represents the proportional size on the heap.

At rightmost, the box with the text "**domNode**" is the DOM objects category. It shows every DOM node, the number of the nodes and their size in the current document. That is where we read to compare pages.

Each DOM object has a details text beside it in this format: `A 12KiB 15 count`. It means the document has 15 `<a>` elements and they occupy `12KiB` portion of the heap.

`KiB` stands for **kibibyte**, which is 1024 bytes. (It is `KB` for geeks.)

![Firefox Memory Heap Snapshot Sample](/assets/uploads/firefox-memory-heap-snapshot-sample.jpg "Firefox Memory Heap Snapshot Sample")

### Summary Table

Here is the summary table for all pages. Odd columns that start with the page name are the size for each allocation group. Even columns (*".. count" columns*) are the number of DOM nodes. `#comment` is HTML comment nodes. `#text` is the textual content inside elements and stray spaces between HTML elements. "**domNode (total)**" column is the sum of all nodes, including `#comment`, `#text` and all other HTML elements not shown in the table. (e.g., `FOOTER`, `A`, `LINK`, `META`, `DIV`, ...)

"**domNode (total)**" column represents the sum of `#comment`, `#text`, `#document` and all other HTML nodes not included in the table.

Consider this table as the task manager results in detail.

|     Page      |    #comment    |     #text      | #document | domNode (total) |          Snapshot Size           |
| :-----------: | :------------: | :------------: | :-------: | :-------------: | :------------------------------: |
|   `index-0`   |     `144B`     |     `8KiB`     | `254KiB`  |    `281KiB`     |             `0.55MB`             |
|    &nbsp;     |   `1 count`    |   `64 count`   | `1 count` |   `106 count`   |   [snapshot][snapshot-index-0]   |
|  `index-10k`  |     `1MiB`     |     `1MiB`     |  `4MiB`   |     `7MiB`      |             `7.8MB`              |
|    &nbsp;     | `10000 count`  | `10064 count`  | `1 count` |  `20106 count`  |  [snapshot][snapshot-index-10k]  |
|  `index-50k`  |     `6MiB`     |     `6MiB`     |  `22MiB`  |     `35MiB`     |             `37.4MB`             |
|    &nbsp;     | `50000 count`  | `50064 count`  | `1 count` | `100106 count`  |  [snapshot][snapshot-index-50k]  |
| `index-100k`  |    `13MiB`     |    `12MiB`     |  `44MiB`  |     `70MiB`     |             `74.2MB`             |
|    &nbsp;     | `100000 count` | `100064 count` | `1 count` | `200106 count`  | [snapshot][snapshot-index-100k]  |
| `index-10kc`  |     `1MiB`     |     `7KiB`     |  `1MiB`   |     `3MiB`      |             `3.5MB`              |
|    &nbsp;     | `10000 count`  |   `61 count`   | `1 count` |  `10101 count`  | [snapshot][snapshot-index-10kc]  |
| `index-50kc`  |     `6MiB`     |     `7KiB`     |  `7MiB`   |     `14MiB`     |              `15MB`              |
|    &nbsp;     | `50000 count`  |   `61 count`   | `1 count` |  `50101 count`  | [snapshot][snapshot-index-50kc]  |
| `index-100kc` |    `13MiB`     |     `7KiB`     |  `14MiB`  |     `27MiB`     |             `29.4MB`             |
|    &nbsp;     | `100000 count` |   `61 count`   | `1 count` | `100101 count`  | [snapshot][snapshot-index-100kc] |
| `index-50kct` |     `1MiB`     |     `8KiB`     |  `1MiB`   |     `2MiB`      |             `2.7MB`              |
|    &nbsp;     |   `1 count`    |   `63 count`   | `1 count` |   `104 count`   | [snapshot][snapshot-index-50kct] |

### Increasing Number of DOM Nodes: `10k`, `50k` and `100k` Pages

> I know none of us needs 10K lines of comments.

|     Page     |        #comment        |         #text          |    domNode (total)     |
| :----------: | :--------------------: | :--------------------: | :--------------------: |
| `index-10k`  |  `1MiB` `10000 count`  |  `1MiB` `10064 count`  |  `7MiB` `20106 count`  |
| `index-50k`  |  `6MiB` `50000 count`  |  `6MiB` `50064 count`  | `35MiB` `100106 count` |
| `index-100k` | `13MiB` `100000 count` | `12MiB` `100064 count` | `70MiB` `200106 count` |

### What if we drop `#text` nodes from comment wrappers

> Compress served HTML even if you didn't do it by far.

|     Page      |        #comment        |       #text       |    domNode (total)     |
| :-----------: | :--------------------: | :---------------: | :--------------------: |
| `index-10kc`  |  `1MiB` `10000 count`  | `7KiB` `61 count` |  `3MiB` `10101 count`  |
| `index-50kc`  |  `6MiB` `50000 count`  | `7KiB` `61 count` | `14MiB` `50101 count`  |
| `index-100kc` | `13MiB` `100000 count` | `7KiB` `61 count` | `27MiB` `100101 count` |

### Same Page with/without `#text` Nodes

> Need to focus on the previous table? Here is the `50k` page comparison.

|     Page     |       #comment       |        #text         |    domNode (total)     |
| :----------: | :------------------: | :------------------: | :--------------------: |
| `index-50k`  | `6MiB` `50000 count` | `6MiB` `50064 count` | `35MiB` `100106 count` |
| `index-50kc` | `6MiB` `50000 count` |  `7KiB` `61 count`   | `14MiB` `50101 count`  |

### Bonus

> A page with a huge number of comment nodes vs. a single comment node with a huge number of bulk text.

|     Page      |       #comment       |       #text       |    domNode (total)    | File Size |
| :-----------: | :------------------: | :---------------: | :-------------------: | :-------: |
| `index-50kc`  | `6MiB` `50000 count` | `7KiB` `61 count` | `14MiB` `50101 count` |  `1.0MB`  |
| `index-50kct` |   `1MiB` `1 count`   | `8KiB` `63 count` |  `2MiB` `104 count`   |  `1.0MB`  |

## But What about Page Speed?

Ok, we got the memory stuff. But **Will extra comment nodes affect page speed?**

**No!** Not the rendering at all.

> **A quick recap**: Browsers read HTML text, construct DOM and CSSOM. Then combine these two into the Render Tree. To print pixels into the displays, we need the render tree and render tree includes only the nodes required to render the page. It doesn't have `<head>`, `<script>` or `<comment>` sections anymore.

However, larger DOM size will still increase memory usage, slow down the layout calculations, increase data usage, slow down load time.

## Wrap Up

Wrap up for the series is at the prelude post. Head back to the starter post to see takeaways from series.

**Prelude Post**: [A Wrap Up for the Series](/2020/dom-nodes-are-expensive#a-wrap-up-for-the-series "A Wrap Up for the Series")

[snapshot-index-0]: /assets/uploads/memory-usage-index-0.png "snapshot-index-0"
[snapshot-index-10k]: /assets/uploads/memory-usage-index-10k.png "snapshot-index-10k"
[snapshot-index-50k]: /assets/uploads/memory-usage-index-50k.png "snapshot-index-50k"
[snapshot-index-100k]: /assets/uploads/memory-usage-index-100k.png "snapshot-index-100k"
[snapshot-index-10kc]: /assets/uploads/memory-usage-index-10kc.png "snapshot-index-10kc"
[snapshot-index-50kc]: /assets/uploads/memory-usage-index-50kc.png "snapshot-index-50kc"
[snapshot-index-100kc]: /assets/uploads/memory-usage-index-100kc.png "snapshot-index-100kc"
[snapshot-index-50kct]: /assets/uploads/memory-usage-index-50kct.png "snapshot-index-50kct"
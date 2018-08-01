---
layout: default
title: Türkçe Yazılar
permalink: /turkce-yazilar
---

<ul class="posts-list">
  {% for post in site.categories['turkce-yazilar'] %}
  <li>
    <article class="post">
      <h1 class="title">
          <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
      </h1>
      <time class="date" datetime="{{ post.date }}">{{ post.date | date_to_string }}</time>
      <p class="excerpt">{{ post.excerpt | strip_html }}</p>
    </article>
  </li>
  {% endfor %}
</ul>
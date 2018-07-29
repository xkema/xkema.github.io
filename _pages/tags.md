---
layout: page
title: Tags
permalink: /tags
---

<ul>
  {% assign tags = site.tags | sort %}
  {% for tag in tags %}
  {% assign tag_name = tag | first %}
  <li>
    <h2>
      <a id="{{ tag_name }}" href="#{{ tag_name }}">{{ tag_name }}</a>
    </h2>
    <ul>
      {% for post in site.tags[tag_name] %}
      <li>
        <a href="{{ post.url | absolute_url }}">
          {{ post.title }}
        </a>
      </li>
      {% endfor %}        
    </ul>
  </li>
  {% endfor %}
</ul>
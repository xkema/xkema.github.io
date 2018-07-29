---
layout: page
title: Categories
permalink: /categories
---

<ul>
  {% assign categories = site.categories | sort %}
  {% for category in categories %}
  {% assign category_name = category | first %}
  <li>
    <h2>
      <a id="{{ category_name }}" href="#{{ category_name }}">{{ category_name }}</a>
    </h2>
    <ul>
      {% for post in site.categories[category_name] %}
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
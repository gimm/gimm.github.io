---
title: video list page
layout: default
---
<h2>Videos</h2>
<ul>
    {% for video in site.videos %}
    <li>
        <a href="{{ site.url }}{{ video.url }}">
            <img src="{{ video.thumnail}}?image_crop_resized=160x100" alt="{{ video.title }}"/>
            <span>{{ video.title }}</span>
        </a>
    </li>
    {% endfor %}
</ul>
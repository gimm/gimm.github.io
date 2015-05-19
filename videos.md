---
title: video list page
layout: default
---
<ul class="video-list">
    {% for video in site.videos %}
    <li>
        <h3>{{ video.title }}</h3>
        <a href="{{ site.url }}{{ video.url }}">
            <img src="{{ video.thumnail}}?image_crop_resized=640x400" alt="{{ video.title }}"/>
        </a>
    </li>
    {% endfor %}
</ul>

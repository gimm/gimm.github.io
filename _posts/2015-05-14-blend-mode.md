---
title: CSS Blend Mode
---
![blend mode](http://webahead.oss-cn-qingdao.aliyuncs.com/images/poster/blend-mode.png)
常做图片编辑的朋友对图层混合一定不会陌生，而CSS混合模式正是为了在浏览器里做图层混合。长期以来，设计师在Photoshop里达成的视觉效果，最终都导出图片提供给前端工程师使用，混合模式就是这其中的一个例子。浏览器有了混合模式的支持，一切都变得简单得体得多。

###混合模式是什么
>A blend mode is a method of calculating the final color value of a pixel when layers overlap. Each blend mode takes the color value of the foreground and the backdrop (top color and bottom >color respectively), perfoms its calculation and returns a color value. The final, visible layer is the result of performing the blend mode calculation on every overlapping pixel among the >blended layers.
>
>大概意思就是：混合模式就是当多个图层重叠时，基于某种方法计算出重叠区域的各个像素点的最终颜色。

CSS混合模式目前有两个使用场景，[background-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode)和[mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)。前者是对DOM元素的多个背景图层进行混合操作，后者则是对重叠的DOM元素自身进行混合。

混合模式可选值为：`normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity`。各自的具体效果，可以参考[这里](http://www.webdesignerdepot.com/2014/07/15-css-blend-modes-that-will-supercharge-your-images/)。

###background-blend-mode(多背景重叠效果)
```css
.blended {
  background-image: url(bg.jpg);
  background-color: deepblue;
  background-blend-mode: multiply;
}
```
顾名思义，背景图层的混合操作，首先你要有多个背景图层，这里的背景色和背景图片就构成了2个图层，当然，你还可以加更多的背景图片图层。在上面列举的十多种混合模式，`multiply | screen | overlay`是比较常用的，可以在[这里](http://sarasoueidan.com/demos/css-blender/)快速查看不同效果。
![background-blend](http://webahead.oss-cn-qingdao.aliyuncs.com/images/blend-mode/background-blend.png)
###mix-blend-mode(多DOM元素重叠效果)
```css
h1{
    mix-blend-mode: multiply;
}
```
元素图层的混合和之前的背景混合大同小异。一个比较好的应用场景就是文字和背景元素的融合。
<p data-height="268" data-theme-id="0" data-slug-hash="QbNYwE" data-default-tab="result" data-user="gimm" class='codepen'>See the Pen <a href='http://codepen.io/gimm/pen/QbNYwE/'>CSS Blend Mode</a> by Gimm (<a href='http://codepen.io/gimm'>@gimm</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

###现实中的例子
前端时间抽空帮同事做个页面，设计师发过来一些切好的图。
![cto wiki](http://webahead.oss-cn-qingdao.aliyuncs.com/images/blend-mode/cto-wiki.png)

浏览了一遍图片，发现他竟然把这种色块都给我单独切出来了。作为资深码农，表示没必要，如是我很自然的用了rgba色做了这个色块，使背景地图透出来。

设计师看了，问我是不是没有用他切好的色块，并强调色块是“压”上去的，不是单纯的让背景透出来。看来设计师很认真，也够为难他的，他不知道怎么跟我解释这个blend mode效果。从这个例子上来看，混合模式到底也还算帮了设计师的们的忙。

###小结
Blend Mode用法很简单，它属于锦上添花型的，是么时候用才是关键，要使用得恰到好处。

相信很多人都会想到这个混合模式和透明效果比较像，的确如此，但是有细微差别，blend的效果更棒而已。

###参考链接
http://webplatform.adobe.com/blend-modes/ 
https://css-tricks.com/basics-css-blend-modes/
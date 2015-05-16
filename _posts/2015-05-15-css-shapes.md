---
title: CSS Shapes
---
![css shapes](http://webahead.oss-cn-qingdao.aliyuncs.com/images/poster/css-shapes.svg)
从布局角度来看，一个页面就是由无数个矩型组成的，矩型挨矩型，矩型套矩型，这就是浏览器眼里的网页，也是CSS Positioning，及Content Flow等概念的根基。CSS Shapes的出现将打破这个看似沉闷的方型世界。

一直以来，人们都不甘于网页单一的矩型结构。从最开始的，切图做圆角，阴影，背景填充等，到如今的通过[CSS实现的简单形状](https://css-tricks.com/examples/ShapesOfCSS/)（主要利用border、pseudo element、transform等）。然而这一切都只是假象，在父子兄弟节点眼中，我们的形状依然是个矩形。这就意味这，**这个表面上的形状改变，并不能影响对应的内容排版**。
![fake shape](http://alistapart.com/d/394/demo-user-profile-screenshot-incomplete.png)

###真实的CSS Shapes
形状只有被周围元素感知才能真正起到形状的作用，[CSS Shapes](http://dev.w3.org/csswg/css-shapes-2/)就是给我们提供一个在现有矩形基础上画出一个形状的方法，这个形状类似于一个作用范围，来约束文字内容的排版。
![real shape](http://alistapart.com/d/394/demo-user-profile-screenshot.png)
具体用法为：
![css shapes method](http://alistapart.com/d/394/shape-rule.png)
其中，shape property常用的为`shape-outside`和`shape-inside`，分别表示该区域作用于内部或者外部，其它取值可以参考其规范。shape function则有circle、ellipse、inset、和polygon。
每个形状都是由一系列的点连起来构成的，这样来理解的话，polygon其实是最底层的方法，而前面三个可以看作它的快捷方式。
之前例子的css代码大致为:

```css
.element {
	shape-outside: circle();
    float: left;
	height: 10em;
	width: 15em;
}
```

注意，要使这里的shape-outside起作用，你还需要1、让元素浮动，2、设定高度和宽度。很明显，这给CSS Shape的使用造成了很大的障碍。

Polygon给了我们足够的自由，让文字排版随心所欲，可以做出各种印刷杂志的效果。
![polygon function](http://webahead.oss-cn-qingdao.aliyuncs.com/images/css-shapes/shape-inside-workaround.jpg)

和SVG路径一样，没有人会真正手写这些polygon节点，这些工作都是依赖工具完成。自然，针对于CSS Shape的polygon也有对应的工具。[CSS Shapes Editor for Chrome](https://chrome.google.com/webstore/detail/css-shapes-editor/nenndldnbcncjmeacmnondmkkfedmgmp)和[CSS Shapes Editor extension for Brackets](https://github.com/adobe-webplatform/brackets-css-shapes-editor)就是很好的代表。
![](http://blogs.adobe.com/webplatform/files/2014/09/edit.gif)

###小结
CSS Shapes主要是用来优化文字排版，让页面可以做得更精美。
它还处在一个很不成熟的阶段，[浏览器支持](http://caniuse.com/#feat=css-shapes)也不是很好。莫名其妙我的Chrome 42竟然不支持，也没法做实例，无奈到处盗图，见谅。更多的例子可以查看[Adobe CSS Shape Collection](http://codepen.io/collection/lrmwd/)。

###参考链接
- http://alistapart.com/article/css-shapes-101 
- http://www.html5rocks.com/en/tutorials/shapes/getting-started/
---
title: 更好的组织你的CSS文件
---
![better css](http://webahead.oss-cn-qingdao.aliyuncs.com/images/poster/better-css.jpg)
在互联网盛行的今天，前端越来越受到重视。这个看脸的时代，界面观感显得尤为重要，因此 CSS 也在前端开发过程中扮演着越来越重要的角色。CSS 是个不会报错的语言，你可以随意堆砌，肆意妄为，在有大量 CSS 代码的站点，对 CSS 的**主动控制**就变得很有必要。

如今常听说的 CSS 组织方法有 OOCSS,SMACSS,BEM。

###OOCSS
面向对象的 CSS，和面向对象编程一样，核心就在于复用，从而减少重复，减少代码量，同时使维护变得更容易。它更像一个理论，而不是具体实践指南。
做过面向对象编程的应该都有体会，面向对象的第一步就是如何抽象出对象来。OOCSS 也类似，它需要在页面里找出类似的模式(对象)，然后针对这个模式定义样式，从而达到样式的复用。这里的对象我们可以理解成一些类似的可视化模式(Visual Pattern)。
OOCSS 有两大核心理论：
- 结构和样式分离(SEPARATION OF STRUCTURE FROM SKIN)  
	样式不要局限于具体的结构，就是尽量将不同结构间类似的样式统一来管理。
- 容器和内容分离(SEPARATION OF CONTAINERS AND CONTENT)  
	内容不局限于容器，尽量要做到内容在各个地方都表现一致。

为了达成 OOCSS 的抽象，有时候还有必要刻意按照某种方式来构建 html 结构，以便让页面的多个元素结构类似。Nicole Sullivan万能的 [meida object](https://github.com/stubbornella/oocss/wiki/Content#media-object-)就是很好的例子。

###SMACSS
SMACSS 的全称为 Scalable and Modular Architecture for CSS，其核心就是模块化。按照 Jonathan Snook 的说法，一个站点的 CSS 可以分为5个模块：
- Base 
	或者叫 reset，这里的规则定义了所以元素应该有的初始状态
- Layout 
	把页面划分为主要的多个容器，定义容器的样式
- Module 
	可复用的一些组件，比如按钮
- State 
	状态一般指hidden/expanded, active/inactive, valid/invalid 等，页面元素在特定状态下的样式一般都归类到这里
- Theme 
	这个是可选的，一般情况你不会用到，Jonathan 是做 Yahoo 邮箱的，所以他需要 Theme

以上这些模块只是一个最佳实践，你完全可以根据实际情况来规划自己的模块。一般情况，我们可能需要一个 Shame 模块，来存放一些比较龌龊的代码。然而如何把 Responsive Web Design 很好的融合到这些模块里，似乎还是没有明确的方案。
除了模块化，SMACSS 也推荐了命名规则，以及一些最佳实践。其核心目标为：
>- Increase the semantic value of a section of html and content  
>- Decrease the expectation of a specific html structure

###BEM
Bolck Element Modifier,很大程度上是一直命名规范，`block__element--modifier`。

```css
/* Block component */
.btn {}

/* Element that depends upon the block */ 
.btn__price {}

/* Modifier that changes the style of the block */
.btn--orange {} 
.btn--big {}
```

按照这种规范，我们可以让选择器扁平化（不在需要多层选择器），单一化。这样就避免了由于选择器过于复杂而造成的样式覆盖，这是我们在写 CSS 过程中一个很突出的问题。[CSS Specificity 参考](http://www.smashingmagazine.com/2007/07/27/css-specificity-things-you-should-know/)。

###小结
CSS 是一个没有严格规矩的语言，也不存在什么框架、规范，以上这些只能算是最佳实践：模块化，扁平化，多复用，少耦合等，Bootstrap，Fundation 之类的，也就是一个最佳实践的集合。当然，如果你还没有尝试过 CSS Pre-processor， 试一下SASS，LESS或者其它选择吧。
最后，如果你只是像我一样做几个页面的个人博客，以上这些方法论就不要太当真了，有这种意识就好。

###参考链接
- https://mattstauffer.co/blog/organizing-css-oocss-smacss-and-bem
- https://css-tricks.com/bem-101/
- https://smacss.com
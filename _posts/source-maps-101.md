---
title: source maps 简介
---

source maps是什么，有什么用
===
web开发过程中，为了兼顾开发和生产两个环境的利益诉求，通常同一个文件在不同的环境下就有不同的形态。比如，在开发过程中我们页面引用hello.js，代码易读、易调试，在生产环境下，就需要压缩混淆后的hello.min.js，代码小传输快。  
source map就是一个包含了hello.js和hello.min.js之间的对应关系的文件。有了这个对应关系，我们就可以像调试hello.js一样来调试hello.min.js了。如果你有过调试*.min.js代码的经历，你就明白那是个头疼的活。  
source map不仅停留在js范畴，它还可以用于css（sass到css的对应）。将来某一天，它存在于markdown和html之间我也不会奇怪。  
总而言之，正如其名，source map就是帮助浏览器把开发者不友好的格式映射成其源码（source）。

source map使用场景
===

source map原理
===

小结
===
source maps是个不错工具，但是随着web开发流程的进化，它的出场机会越来越少。诸如Grunt、Gulp之类的工具，让开发和产品环境间的切换变得随心所欲，相比而言，source map带给开发者的在产品环境下的代码友好就不那么稀有珍贵了。

参考链接
---
- [introduction to javascript source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)
- [an introduction to source maps](http://blog.teamtreehouse.com/introduction-source-maps)

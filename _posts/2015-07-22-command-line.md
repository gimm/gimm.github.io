---
title: command line
tags: terminal zsh
poster: jpg
---
最近开始用Mac做开发主力机，期间发现一些命令行工具相关的优化和配置。打造一个舒服的开发环境是值得投入时间的。

### zsh
毫无以为bash是最流行的shell，Mac默认也是使用bash的。

zsh的的介绍可以参考 https://github.com/robbyrussell/oh-my-zsh 以及 http://zhuanlan.zhihu.com/mactalk/19556676

至于为什么要切换到zsh，因为zsh有很多方便的[特性](http://code.joejag.com/2014/why-zsh.html)，更重要的是他有丰富的[插件](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins)。

### iTerm
网上都建议使用[iTerm](http://www.iterm2.com/)来替换Mac自带的Terminal。iTerm有很多特性（Yosemite上的Terminal也已经很强大了），但目前吸引我的只有它更方便的Tab和更好的配色支持。

### Theme
天天面对的东西，外观自然是要赏心悦目的。
- zsh themes
  
  除了一堆特性和插件外，zsh还支持[主题](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)。各种炫酷，已经超越普通大众对命令行的认知了。
  
  我选用了其中的agnoster
  ![agnoster](https://cloud.githubusercontent.com/assets/2618447/6316862/70f58fb6-ba03-11e4-82c9-c083bf9a6574.png)
  这里除了常规的更换、设置字体外，还有一个坑，zsh自带的agnoster.zsh-theme有问题（git信息显示那个+-号是一个.），需要把最新的[agnoster](https://gist.github.com/3712874)文件更新到.oh-my-zsh/themes/下面。

- iterm profile
  
  iTerm的主题相对而言就容易很多。流行的有[solarized](http://ethanschoonover.com/solarized)，[base16](http://chriskempson.github.io/base16/)之类。选哪个在于个人喜好。另外，这些流行主题一般都做了各种适配，比如solarized有针对sublime，textmate等的主题。

  一般而言，这些主题都对iTerm适配的要好些。如果你是原生控（一定程度上，我也是），要在Terminal上用solarized，请用这个[osx-terminal.app-colors-solarized](https://github.com/tomislav/osx-terminal.app-colors-solarized)。
  
  另外，agnoster在Terminal上，git信息尾部那个三角颜色总是不对。到这里，应该明白了，强迫症患者为什么选择iTerm了。
  
- vim colors

  如果你是个追求逼格的程序员，或许你还在用vim。vim还有自己的一套配置：~/.vimrc。当然，它也有主题。

### Plugin
搞定各种配色后，看起来舒服，但要用起来也爽，就要上插件了。

zsh插件很多，但实话实说，有搞头的也没多少，反正我只用了2个：[auto-jump](osx-terminal.app-colors-solarized)， [history-substring-search](https://github.com/zsh-users/zsh-history-substring-search)。他们分别解决了命令行使用过程中2个最常见的问题：目录跳转，历史命令跳转。

### 个性化
这一系列的主题、插件等，都可以自定义，及原创。其中vim的配置就更有搞头，更需要自定义。

我们可以把所以这些配置，插件，主题之类的都放到github，方便分享，也可以保持一个历史记录。


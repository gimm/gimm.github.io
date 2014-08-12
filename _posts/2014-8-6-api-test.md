---
title: language syntax highlight testing
---


[jekyll configurations](http://jekyllrb.com/docs/configuration/)

ruby code

{% highlight ruby linenos %}
    def show
      puts "Outputting a very lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong line"
      @widget = Widget(params[:id])
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @widget }
      end
    end
{% endhighlight %}
    
```ruby
def foo
  puts 'foo'
end
```

javascript code

```javascript
window.onpopstate = function (e) {
    history.state && container.html(history.state.content);
    e.preventDefault();
};
var lastScrollTop = window.scrollY;
var siteHeader = $("header");
var siteTitle = $(".brand h1 a").get(0);
```

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias aliquid deserunt dolor facere id, molestias officia optio sapiente ut! Dolor dolores fugit vel? Ab, accusantium, quas? Dicta, modi veritatis.
---
title: Meet Jekyll
---


[Jekyll](http://jekyllrb.com/) is the backend engine behind [GitHub Pages](https://pages.github.com/). While GitHub Pages is a good place to host your static files, and Jekyll introduces possibilities to make it **dynamic**.

Almost every web developer has tried to set up a personal blog/site, I'm one of these. Nowadays, things get easier as all these cloud platforms came out. We still have to deal with platform specific environment, tools. Early this year, I have tried IBM's [bluemix](bluemix.net) and [Heroku](heroku.com), turns out that Bluemix is buggy and Heroku is slow. 

The hardest part of web development might be the **inputs**, not easy to style, complex to validate, and has to do backend storage work. While a static site can get rid of all these, and GitHub Pages is a perfect place for static files, it provides you customized sub-domain, and instance deploy/update ability with git.

###Here's some materials to get you started 
- [GitHub Pages](https://pages.github.com/)
- [Jekyll](http://jekyllrb.com/)
- [Jekyll Now](https://github.com/barryclark/jekyll-now)

After fork Jekyll Now, you now have your own home page at GitHub. Jekyll is kind of preprocessor based on templates, meanwhile, provides some syntax [variables](http://jekyllrb.com/docs/variables/). Jekyll enables you to generate static pages on repository update, and with [Disqus](http://disqus.com/), we have a full functional blog without pain.

> Keep in mind that Jekyll on GitHub doesn't support customized plugins, this takes me 4+ hours to find out!! 
> [jekyll-plugins-with-github-pages](https://help.github.com/articles/using-jekyll-plugins-with-github-pages)

###Let's take it further - single page app
Single page app is more efficient and trendy. Every single page app has a start point, and the navigation is triggered by hash change. As GitHub doesn't support htaccess, we need to do this manually:

1. create a redirect layout, with javascript piece

```javascript
location.hash = location.pathname;
location.pathname = "";
```

This will make gimm.github.io/some-page redirects to gimm.github.io/#some-page

2. use this layout for every page/post, except for the index page(the start point)

3. add script to index page to handle the page/post load based on the hash

```javascript
// if hash is not empty, load that page
if (/\w/.test(location.hash)) {
	var url = baseurl + hash;
    //load page/post based on this url
}
// handle internal links in page
$(document).on("click", "a[href^='/']", function (e) {
	var url = this.href;
  	if (!this.target && (url.indexOf("#") === -1)) {
  		//load page/post based on this url
  		e.preventDefault();
  }
});
```

After the steps above, we could have a single page app, and by using [html5 history api](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history), we can replace these hashes with urls. Full details could be found in [main.js](https://github.com/gimm/gimm.github.io/blob/master/scripts/main.js). Actually, GitHub is doing the same thing to achieve partially loading with direct urls.

A single page app is up on GitHub, stable and low-latency.
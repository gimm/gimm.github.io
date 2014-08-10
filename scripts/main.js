var baseurl = location.href.split("#").shift();
var cache = {};
var loading = false;
var mainContainer = "main.container";
var dataWrapper = "#data";
var articleListWrapper = ".articles";
var articleListTail = ".articles-tail";
var articleListTailLink = articleListTail + " > .next-page";
$(function () {
    console.log("ready!");
    var container = $("main.container");
    var hash = window.location.hash.replace(/#\/?/, "");

    cache[baseurl] = container.html();

    //store index page to history
    window.history.replaceState({"content": container.html()}, "gimm", baseurl);

    if (/\w/.test(hash)) {
        if ($("a[href='" + location.hash + "']").length === 0) {  // it's a redirect hash, not anchor
            console.log("replace", baseurl);
            var url = baseurl + hash;
            switchPage(url);
        }

    } else if (hash !== "") {
        container.html("<h3>Seriously, Where did you get this url?</h3>");
    }


    /*
     *   bind events
     */
    $(document).on("click", "a[href^='/']", function (e) {
        console.log("html 5 click");
        var url = this.href;
        if (!this.target && (url.indexOf("#") === -1)) {
            switchPage(url);
            e.preventDefault();
        }

    });

    window.onpopstate = function (e) {
        console.log("restore AT ", location.href, history.state);

        history.state && container.html(history.state.content);
        e.preventDefault();
    };

    var lastScrollTop = window.scrollY;

    window.onscroll = function (e) {
        var tail = $(articleListTailLink).get(0);


        if (tail && !loading && lastScrollTop < window.scrollY && isElementInViewport(tail)) {
            console.log("add");
            loading = true;

            nextPosts();
        }
        lastScrollTop = window.scrollY;
    };
});

//load pages/posts, switch views
function switchPage(url) {
    var container = $(mainContainer);
    if (url === location.href.split("#").shift()) {
        console.log("skip");
        container.html(history.state.content);
    } else if (cache[url]) {
        console.log("cache");
        container.html(cache[url]);
        window.history.replaceState({"content": cache[url]}, "gimm", url);
    } else {
        load(url, function (res, status) {
            if (status === "success") {
                cache[url] = res;
                cache[url] = $("<div>").append(res).find(dataWrapper).html();
                container.html(cache[url]);
                console.log("push", url);
                window.history.pushState({"content": cache[url]}, "gimm", url);
            } else {
                container.html("error loading resource", url);
            }
        });
    }

}

//load more posts, incremental loading of the post list
function nextPosts() {
    var url = $(articleListTailLink).get(0).href;
    load(url, function (res, status) {
        $(articleListTailLink).html("loading...");
        if (status === "success") {
            cache[url] = res;
            cache[url] = $("<div>").append(res).find(mainContainer);
            $(articleListWrapper).append(cache[url].find(articleListWrapper + " > .article"));
            $(articleListTail).html(cache[url].find(articleListTail));
        } else {
            $(articleListTailLink).html("error loading articles!");
        }
        loading = false;
    });
}
// load html resource by url
function load(url, callback) {

    console.log("load", url);
    $.get(url, function (res, status) {
        cache[url] = res;
        $.isFunction(callback) && callback.apply(null, arguments);
    });
};


function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document. documentElement.clientWidth)  &&
        rect.top < (window.innerHeight || document. documentElement.clientHeight);
}


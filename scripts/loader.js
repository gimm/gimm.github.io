`use strict`;
/**
 * Created by gimm on 5/18/2015.
 */
(function(window){
    if(window.w !== undefined){
        return window.w;
    }

    /*
        hack helpful methods into native js
    */

    //
    Function.prototype.shield = function(){
        //validator could be rules, regex or function

        var original = this;

        if(original.shield){    //shield already
            return original;
        }

        //declared parameters, with comments and white spaces. e.g. "/*required*/name, age"
        var signature = original.toString().match(/\(([\s\S]*?)\)/).pop().replace(/((\/\/.*$)|(\s)/mg);

        //parameters names, e.g. ["name", "age"]
        var names = signature.replace(/(\/\*[\s\S]*?\*\/)/mg,'').split(",");

        var args = Array.prototype.slice.call(arguments, 0, original.length);
        if(args.length === 0){
            //split signature into parts, e.g. [/*required,object*/name, age]
            signature.split(/,(?!([a-z\|]+?\*+\/))/g).map(function(param, index){
                var name = names[index];
                //e.g. "require,object|array"
                var rule = param.match(/^\/\*+([a-z|,]+)\*+\//).pop();
            });
        }

        var shield = function() {
            console.log("shield function with args", args);
            return original.apply(this, arguments);
        };

        return shield;
    };
    /*arg规则
    required(object|array)
    default(value)
    */

    var hello = function(/*string*/name, /*string(hello)*/message){
        //hello
    }.shield();

    var mixin = function(/*object*/target, /*object...*/source, /*boolean(false)*/overwrite){

    }.shield();

    var livereload = function(/*object|boolean|number(35729)*/livereload){
    }.shield();

    var sum = function(/*number*/x, /*number...*/y){
    }.shield();

    var w = window.w = {};
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    w.mixin = function(/*object*/target, /*object...*/source, /*boolean(true)*/overwrite){
        overwrite = (overwrite === undefined ? true : !!overwrite);
        for(var k in source){
            if(source.hasOwnProperty(k) && !target.hasOwnProperty(k) || overwrite){
                target[k] = source[k];
            }
        }
        return target;
    };

    w.load = function(/*string|array*/url, /*object(undefined)*/attrs, /*function(undefined)*/callback) {
        console.log("trying to load asset", url);
        var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            asset;
        switch (url.split(".").pop().replace(/\?[\s\S]+/, "")){
            case "css":
                asset = w.mixin(document.createElement("link"), {
                    type: "text/css", rel :"stylesheet", href: url, charset: "utf-8"
                });
                break;
            case "js":
                asset = w.mixin(document.createElement("script"), {
                    type: "text/javascript", src: url, charset: "utf-8"
                });
                break;
            default:
                console.warn("Unsupported asset: ", url);
        }
        if(asset !== undefined){
            if(typeof attrs === "object"){
                w.mixin(asset, attrs);
            }
            if(typeof callback === "function"){
                asset.onload = callback;
            }
            asset && head.appendChild(asset);
        }
    };

    window.onload = function(){
        isMobile || w.load("/styles/desktop.css");
        !isMobile && document.querySelector(".highlight") && w.load("/styles/highlights.css");

        var commentBtn = document.querySelector(".comment-btn");
        if(commentBtn && commentBtn.style.display!=="none"){
            commentBtn.addEventListener("click", function(){
                this.style.display = "none";
                if(isMobile) {
                    (function(){
                        var expire_time = parseInt((new Date()).getTime()/(5*60*1000));

                        w.load("http://changyan.sohu.com/upload/mobile/wap-js/version.js?_="+expire_time, {}, function(){
                            w.load('http://changyan.itc.cn/upload/mobile/wap-js/changyan_mobile.js?client_id=cyrHvP6IQ&'
                                + 'conf=prod_0b1f5470d926872fc636a0397ac75310&version='
                                + cyan_resource_version, {id: 'changyan_mobile_js'});
                        });
                    })();
                }else{
                    (function(){
                        var appid = 'cyrHvP6IQ',
                                conf = 'prod_0b1f5470d926872fc636a0397ac75310';

                        w.load('http://assets.changyan.sohu.com/upload/changyan.js?conf='+ conf +'&appid=' + appid);
                        window.SCS_NO_IFRAME = true;
                    })();
                }
            }, false);
        }

        //Add anchors for h3
        var h3s = document.querySelectorAll(".content h3");
        if(h3s){
            Array.prototype.slice.apply(h3s).forEach(function(h3){
                var id = h3.id;
                var anchor = document.createElement("a");
                anchor.id = "user-content-" + id;
                anchor.className = "anchor";
                anchor.href = "#" + id;
                anchor["aria-hidden"] = true;
                var icon = document.createElement("img");
                icon.src = "/images/link.svg";
                anchor.appendChild(icon);
                h3.appendChild(anchor);
            });
        }

        //Add desc for img
        var imgs = document.querySelectorAll(".content img");
        if(imgs){
            Array.prototype.slice.apply(imgs).forEach(function(img){
                var desc = img.alt;
                if(desc){
                    var span = document.createElement("span");
                    span.className = "img-desc";
                    span.textContent = desc;
                    if(img.nextSibling){
                        img.parentNode.insertBefore(span, img.nextSibling);
                    }else{
                        img.parentNode.appendChild(span);
                    }

                }
            });
        }
    };
})(window);


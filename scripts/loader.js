/**
 * Created by gimm on 5/18/2015.
 */
(function(w){
    if(w.loader !== undefined){
        return;
    }
    w.loader = {};
    w.loader.load = function(url, type) {
        if(!type){
            type = url.substr(url.lastIndexOf(".")+1);
        }
        if(type === "css"){
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }else if(type === "js"){
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            document.getElementsByTagName("head")[0].appendChild(script);
        }else{
            console.warn("Error loading asset ", url);
        }
    };

    w.onload = function(){
        w.loader.load("/styles/font.css");
        if(document.querySelector(".highlight")){
            window.loader.load("/styles/highlights.css");
        }
        var commentBtn = document.querySelector(".comment-btn");
        if(commentBtn && commentBtn.style.display!=="none"){
            commentBtn.addEventListener("click", function(){
                this.style.display = "none";
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                    (function(){
                        var expire_time = parseInt((new Date()).getTime()/(5*60*1000));
                        var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
                        var script_version = document.createElement("script"),script_cyan = document.createElement("script");
                        script_version.type = script_cyan.type = "text/javascript";
                        script_version.charset = script_cyan.charset = "utf-8";
                        script_version.onload = function(){
                            script_cyan.id = 'changyan_mobile_js';
                            script_cyan.src = 'http://changyan.itc.cn/upload/mobile/wap-js/changyan_mobile.js?client_id=cyrHvP6IQ&'
                            + 'conf=prod_0b1f5470d926872fc636a0397ac75310&version=' + cyan_resource_version;
                            head.insertBefore(script_cyan, head.firstChild);
                        };
                        script_version.src = 'http://changyan.sohu.com/upload/mobile/wap-js/version.js?_='+expire_time;
                        head.insertBefore(script_version, head.firstChild);
                    })();
                }else{
                    (function(){
                        var appid = 'cyrHvP6IQ',
                                conf = 'prod_0b1f5470d926872fc636a0397ac75310';
                        var doc = document,
                                s = doc.createElement('script'),
                                h = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;
                        s.type = 'text/javascript';
                        s.charset = 'utf-8';
                        s.src =  'http://assets.changyan.sohu.com/upload/changyan.js?conf='+ conf +'&appid=' + appid;
                        h.insertBefore(s,h.firstChild);
                        window.SCS_NO_IFRAME = true;
                    })();
                }
            }, false);
        }

        //为标题添加锚点
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

        //为图片添加说明
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


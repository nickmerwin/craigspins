Craigspin's
===========

Add this bookmarklet:


```javascript
javascript:(function(){var g=Math.floor($(window).width()/237);$(window).resize(function(){$("body").css({paddingLeft:($(window).width()-237*g)/2})});var o=$("body").html(),c=$("<form/>",{id:"qForm"}),b=$("<input/>",{id:"q"}).css({cssFloat:"left",width:183,border:"1px solid",lineHeight:1.3,boxShadow:"0 1px #fff, inset 0 1px rgba(34,25,25,0.05)","-moz-box-shadow":"0 1px #fff, inset 0 1px rgba(34,25,25,0.05)","-webkit-box-shadow":"0 1px #fff, inset 0 1px rgba(34,25,25,0.05)",fontSize:13,borderColor:"#C2C0C0 #CCCACA #D1CFCF",
padding:5,backgroundColor:"#FAF7F7",margin:0}),f=$("<a/>",{id:"qBtn",href:"#"}).css({cssFloat:"left",marginLeft:-1,padding:"7px 7px 2px",minHeight:17,border:"1px solid",boxShadow:"0 1px rgba(255,255,255,0.9), inset 0 0 2px rgba(255,255,255,0.75)","-moz-box-shadow":"0 1px rgba(255,255,255,0.9), inset 0 0 2px rgba(255,255,255,0.75)","-webkit-box-shadow":"0 1px rgba(255,255,255,0.9), inset 0 0 2px rgba(255,255,255,0.75)",borderColor:"#C2C0C0 #CCCACA #D1CFCF"}).append($("<img/>",{src:"http://passets-cdn.pinterest.com/images/search.gif"})),
b=$("<div/>",{id:"qWr"}).css({cssFloat:"left",margin:"8px 0 0",paddingLeft:15}).append(c.append(b).append(f)),p=$("<div/>",{id:"logo"}).css({position:"absolute",marginLeft:-50,left:"50%",top:7}).append($("<img/>",{src:"http://lemurheavy.com/images/craigspin/logo.png"})),b=$("<div/>",{id:"nav"}).css({position:"fixed",height:44,top:0,left:0,width:"100%",backgroundColor:"#FAF7F7",boxShadow:"inset 0 1px #fff, 0 1px 3px rgba(34,25,25,0.4)",zIndex:103,"-webkit-box-shadow":"inset 0 1px #fff, 0 1px 3px rgba(34,25,25,0.4)",
"-moz-box-shadow":"inset 0 1px #fff, 0 1px 2px rgba(34,25,25,0.4)"}).append(b).append(p);$("html").css({background:'url("http://lemurheavy.com/images/craigspin/paper.jpg")'});$("body").css({margin:0,fontFamily:"'helvetica neue', arial, sans-serif",fontSize:"11px",background:"transparent"}).html($("<div/>",{id:"wr",style:"padding:60px 0 0; width:100%;"})).append($("<div/>",{id:"parser"}).css({display:"none"})).append(b);$("#q").focus(function(){$(this).css({backgroundColor:"#fff"})}).blur(function(){$(this).css({backgroundColor:"#FAF7F7"})});
b=function(){try{for(var d=$("#q").val(),e=0;e<g;e++)h[e].html("");j=0;k=d;l(d,0);return!1}catch(a){return console.log(a),!1}};c.submit(b);f.click(b);$("body").css({paddingLeft:($(window).width()-237*g)/2});for(var h=[],c=0;c<g;c++)f=$("<div/>").css({width:222,cssFloat:"left",marginLeft:15}),0==c&&f.css({marginLeft:0}),h.push(f),$("#wr").append(f);$("#wr").append($("<div/>").css({clear:"both",cssFloat:"none"}));var j=0,k=(window.location.search.match(/query=(.*?)(&|$)/)||[])[1],l=function(d,e){console.log("loadPage: "+
d);$.get("/search/sss?query="+(d||"")+"&s="+100*e,function(a){m(a)||(n=!0);i=!1})},n=!1,i=!1;$(window).scroll(function(){!i&&(!n&&$(window).scrollTop()+$(window).height()>$("#wr").height()-$(window).height())&&(i=!0,l(k,++j))});var m=function(d){console.log("parsing!");var e=[];$("#parser").html(d).find("span.i").add("span.ih").each(function(){if(id=this.id.match(/images:(.*?)$/)){var a=$(this).parents("p").find("a");e.push({src:"http://images.craigslist.org/"+id[1],href:a[0].href,title:a[0].innerHTML,
section:a[1].innerHTML,sectionHref:a[1].href,price:($(this).parents("p").html().match(/(\$.*?)</)||[])[1]})}});for(d=0;d<e.length;d++){for(var a=e[d],a=$("<div/>",{style:"padding:15px 15px 0; margin: 0 0 15px; overflow: hidden; background-color:#fff; -moz-box-shadow: 0 1px 2px rgba(34,25,25,0.4); -webkit-box-shadow: 0 1px 3px rgba(34,25,25,0.4); box-shadow: 0 1px 3px rgba(34,25,25,0.4);"}).append($("<a/>",{href:a.href,target:"_blank"}).append($("<img/>",{src:a.src,style:"width:192px"}))).append($("<div/>").css({margin:"10px 0"}).html($("<a/>",
{href:a.href,target:"_blank"}).css({color:"#000",textDecoration:"none"}).html("<b>"+(a.price||"")+"</b> "+a.title.substr(0,20)))).append($("<div/>").css({padding:10,margin:"0 -15px",backgroundColor:"#eee"}).html($("<a/>",{href:a.sectionHref,target:"_blank"}).css({color:"#8C7E7E",fontWeight:"bold",textTransform:"capitalize",textDecoration:"none"}).html(a.section))),b=h[0],c=0;c<g;c++)h[c].height()<b.height()&&(b=h[c]);b.append(a)}return 0<e.length};m(o)})();
```


Run from Craigslist url ie: 

http://losangeles.craigslist.org/sss/

Compiled using:

http://closure-compiler.appspot.com/home

And encoded using:

http://scriptasylum.com/tutorials/encode-decode.html
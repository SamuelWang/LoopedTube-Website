﻿(function(g){var c;g.loopedtube={player:null,cuedVideo:null,currentVideo:null,currentFunc:null,loadYouTubeAPIStatus:0,loadPlayerStatus:0,cued:!1,isLoop:!0,musicMode:!1};c=g.loopedtube;c.loadFunc=function(a,d){if(a===c.currentFunc)$.isFunction(d)&&d();else{var b="view/"+a+".html",e=$("#content");c.player&&(c.player.destroy(),c.player=null,c.currentVideo=null,c.cuedVideo=null,c.loadPlayerStatus=0,c.cued=!1);e.empty().text("loading...");$.ajax({async:!0,url:b,success:function(b){e.empty();if(b)try{$("#content").html(b),
$.ajax({async:!0,cache:!0,dataType:"script",url:"controller/"+a+".js",success:function(b){c.currentFunc=a;$.isFunction(d)&&d()},error:function(a,b,d){e.empty();c.showMessage("Failure to load function.","error")}})}catch(h){e.empty(),c.showMessage("Failure to load function.","error")}else c.showMessage("Failure to load function.","error")},error:function(a,b,d){e.empty();c.showMessage("Failure to load function.","error")}})}};c.addRecentVideo=function(a,d){var b=c.getRecentVideoList(),e=-1;try{b.forEach(function(b,
c){b.id===a.id&&(e=c)}),-1===e?c.getVideoData(a.id,function(c){a.title=c[0].title;a.thumbnail=c[0].thumbnail;99<b.length&&(b=b.splice(0,99));b.unshift(a);localStorage.setItem("recentVideos",JSON.stringify(b));$.isFunction(d)&&d(b)}):a.title&&a.thumbnail?(b.splice(e,1),b.unshift(a),localStorage.setItem("recentVideos",JSON.stringify(b)),$.isFunction(d)&&d(b)):c.getVideoData(a.id,function(c){a.title=c[0].title;a.thumbnail=c[0].thumbnail;b.splice(e,1);b.unshift(a);localStorage.setItem("recentVideos",
JSON.stringify(b));$.isFunction(d)&&d(b)})}catch(f){}};c.getRecentVideoList=function(){var a=localStorage.getItem("recentVideos");return a=a?JSON.parse(a):[]};c.renderVideoList=function(a,c,b){var e=a.find(".list-view-body"),f;$.isArray(c)&&0<c.length?(!0===b&&e.empty(),c.forEach(function(a){a.title&&a.thumbnail&&(f=$('<div class="list-view-body-record clearfix"></div>'),$('<img class="list-view-body-record-img" />').attr("src",a.thumbnail.url).appendTo(f),$('<div class="list-view-body-record-title"></div>').text(a.title).appendTo(f),
f.data("videoId",a.id).on("click",function(){$(this);History.pushState({video:a},"","?video="+a.id)}),f.appendTo(e))})):!0===b&&e.text("\u7121\u8a18\u9304")};c.startWatchCurrentTime=function(){var a=$("#time-interval"),d=$("#starttime",a),b=$("#endtime",a);this.startWatchCurrentTime.intervalId=setInterval(function(){var a=$.timeToSecond(b.val());c.player.getCurrentTime()>=a&&a<c.currentVideo.duration&&c.player.seekTo($.timeToSecond(d.val()))},500)};c.startWatchCurrentTime.intervalId=null;c.stopWatchCurrentTime=
function(){clearInterval(this.startWatchCurrentTime.intervalId);this.startWatchCurrentTime.intervalId=null};c.cueVideo=function(){if(1!==c.loadPlayerStatus&&1!==c.loadYouTubeAPIStatus)if(0===c.loadPlayerStatus){var a=document.documentElement.clientWidth,d=853,b=480;768>a&&(d=320,b=240);768<=a&&1024>a&&(d=640,b=360);1800<=a&&(d=1280,b=720);c.loadPlayerStatus=1;c.player=new YT.Player("player",{width:d,height:b,events:{onReady:onPlayerReady}})}else return a=this.cuedVideo,d=a.id,b=$("#player-content"),
d&&(b.is(":visible")||b.show(600),c.player.cueVideoById(d,a.startTime,c.musicMode?"small":"default")),this};c.getVideoData=function(a,c,b){$.ajax({url:"https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBcc3KRsP4a0NpQMymFkQNXkMXoROsTov4&part=snippet&fields=items(id,snippet(title,thumbnails))&id="+a,async:!0,dataType:"json",method:"GET",error:function(a,c,d){$.isFunction(b)&&b({code:c,message:d})},success:function(a){a?a.error&&$.isFunction(b)?b(a.error):$.isArray(a.items)&&$.isFunction(c)&&(a.items=
a.items.map(function(a){var b={};b.id=a.id.videoId;b.title=a.snippet.title;b.thumbnail=a.snippet.thumbnails["default"];return b}),c(a.items)):$.isFunction(b)&&b({code:"error",message:"nothing"})}})};c.searchVideo=function(a,c,b){var e="https://www.googleapis.com/youtube/v3/search?key=AIzaSyBcc3KRsP4a0NpQMymFkQNXkMXoROsTov4&part=snippet&fields=nextPageToken,items(id,snippet(title,thumbnails))&type=video&order=viewCount&maxResults=10&q="+encodeURIComponent(a.q);a.pageToken&&(e+="&pageToken="+a.pageToken);
$.ajax({url:e,async:!0,dataType:"json",method:"GET",error:function(a,c,d){$.isFunction(b)&&b({code:c,message:d})},success:function(a){a?a.error&&$.isFunction(b)?b(a.error):$.isArray(a.items)&&$.isFunction(c)&&(a.items=a.items.map(function(a){var b={};b.id=a.id.videoId;b.title=a.snippet.title;b.thumbnail=a.snippet.thumbnails["default"];return b}),c({items:a.items,next:a.nextPageToken})):$.isFunction(b)&&b({code:"error",message:"nothing"})}})};c.toggleButtonActive=function(a,c,b){a.hasClass("active")?
(a.removeClass("active"),$.isFunction(b)&&b.call(a)):(a.addClass("active"),$.isFunction(c)&&c.call(a));return this};c.showMessage=function(a,c){var b=$("#message-box"),e=$(".message",b),f=6;if(a){clearTimeout(this.showMessage.timeout);e.html(a).removeClass("warning error");switch(c){case "warning":e.addClass("warning");f=12;break;case "error":e.addClass("error"),f=18}b.show(400,"linear");this.showMessage.timeout=setTimeout(function(){b.hide(400,"linear")},1E3*f)}return this};c.showMessage.timeout=
null;c.parseVideoId=function(a){if(!a)return null;var d=new c.Video,b=/http[s]?\:\/\/www\.youtube\.com\/watch\?v\=([\w\-]{11})\&?.*/ig.exec(a),e=/http[s]?\:\/\/youtu\.be\/([\w\-]{11})(\?t\=([\w\d]+))?/ig.exec(a),f=/^<iframe\s{1}.*?https\:\/\/www\.youtube\.com\/embed\/([\w\-]{11})\??.*/ig.exec(a);f&&f[1]?d.id=f[1]:b&&b[1]?d.id=b[1]:e&&e[1]?(d.id=e[1],e[3]&&(a=/((\d{1,2})h)?((\d{1,2})m)?((\d{1,2})s)?/ig.exec(e[3]),b=0,a[2]&&(b+=3600*parseInt(a[2],10)),a[4]&&(b+=60*parseInt(a[4],10)),a[6]&&(b+=parseInt(a[6],
10)),0<=b&&(d.startTime=b))):11===a.length&&(d.id=a);c.getRecentVideoList().every(function(a){return a.id===d.id?(d=a,!1):!0});return d};c.Video=function(a){if(!(this instanceof c.Video))return new c.Video(a);this.id=a?a:null;this.thumbnail=this.title=null;this.endTime=this.startTime=this.duration=0};c.Video.prototype={videoId:function(a){return a?(this.id=this.parseVideoId(a),this):this.id}}})(window);
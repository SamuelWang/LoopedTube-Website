﻿function onPlayerReady() {
    loopedtube.player.addEventListener("onStateChange", function (a) {
        var c = a.data, b = $("#time-interval"); a = $("#starttime", b); b = $("#endtime", b); switch (c) {
            case YT.PlayerState.ENDED: loopedtube.isLoop ? (loopedtube.cued = !0, loopedtube.player.playVideo()) : loopedtube.stopWatchCurrentTime(); break; case YT.PlayerState.PLAYING: var c = loopedtube.player.getDuration(), d = $.timeToSecond(a.val()), e = $.timeToSecond(b.val()); loopedtube.cued && (a.removeAttr("disabled"), 0 < d && loopedtube.player.seekTo(d), c &&
            0 === e && (loopedtube.currentVideo.duration = c, $("#endtime", "#time-interval").val($.secondToTime(c)), b.removeAttr("disabled")), loopedtube.cued = !1, loopedtube.addRecentVideo(loopedtube.currentVideo, function () { loopedtube.renderRecentVedioList() }), $("#playin").val(loopedtube.currentVideo.id)); break; case YT.PlayerState.PAUSED: loopedtube.stopWatchCurrentTime(); break; case YT.PlayerState.CUED: d = loopedtube.cuedVideo.startTime ? loopedtube.cuedVideo.startTime : 0, a.val($.secondToTime(d)), b.val($.secondToTime(0)), a.attr("disabled",
            "disabled"), b.attr("disabled", "disabled"), loopedtube.currentVideo = loopedtube.cuedVideo, loopedtube.cued = !0, loopedtube.player.playVideo()
        }
    }); loopedtube.player.addEventListener("onError", function (a) {
        switch (a.data) {
            case 2: loopedtube.showMessage("\u932f\u8aa4\u7684\u5f71\u97f3ID\u3002", "warning"); break; case 5: loopedtube.showMessage("\u64ad\u653e\u5668\u767c\u751f\u672a\u77e5\u932f\u8aa4\u3002", "warning"); break; case 100: loopedtube.showMessage("\u6b64\u5f71\u97f3\u53ef\u80fd\u5df2\u88ab\u522a\u9664\u6216\u662f\u70ba\u79c1\u4eba\u5f71\u97f3\u3002",
            "warning"); break; case 101: loopedtube.showMessage("\u5f71\u97f3\u64c1\u6709\u8005\u4e0d\u5141\u8a31\u6b64\u5f71\u97f3\u5728YouTube\u7db2\u7ad9\u4ee5\u5916\u88ab\u64ad\u653e\u3002", "warning")
        }
    }); loopedtube.cueVideo()
} function onYouTubeIframeAPIReady() { loopedtube.player = new YT.Player("player", { width: 854, height: 480, events: { onReady: onPlayerReady } }) } $(function () { loopedtube.initialize() });
'use strict';
// For Local Development
// var baseUrl = 'http://localhost:3000';
// For Publish
var baseUrl = 'http://39.108.162.91';

var url = {
    // 网易云音乐 API
    music163: {
        getPlayListById: baseUrl + '/playlist/detail', //demo:/playlist/detail?id=24381616
        getMusicById: baseUrl + '/music/url', //demo:/music/url?id=347230,347231
        getMusciDetail: baseUrl + '/song/detail', //demo:/song/detail?ids=347230
        searchSongs: baseUrl + '/search?type=1&limit=25', //demo:/search?keywords=海阔天空
        getLyric: baseUrl + '/lyric', //demo:/lyric?id=347230
    } 
};

export default url;
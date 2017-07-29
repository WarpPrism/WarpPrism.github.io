// Cloud Music api https://api.imjad.cn/
import React from 'react';
import StateBar from 'components/iphone/stateBar.js';
import MyModal from 'components/iphone/modal.js';
import {Input, Menu} from 'antd';
const Search = Input.Search;

import 'styles/app/music.css';

class Music extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false,//播放状态
            musicName: '',//歌曲名称
            singer: '',//歌手
            curTime: 0,//当前播放时长
            duration: 0,//歌曲总时长
            playList: [],//播放列表
            playId: -1,//当前播放的歌曲的index
            totalNum: 0,//播放列表歌曲数,
            modal: 'hide',//modal状态 hide show
            searchList: [],//搜索结果
            lyrics: [{lyric:'还没有歌词哦~'}],//歌词
            curLyricIndex: 0,//当前歌词位置
            lyricScroll: 0//歌词滚动控制
        };
        this.timer = null;
        this.coverTimer = null;
        this.coverDeg = 0;
        this.waveTimer = null;
    }
    componentDidMount() {
        //初始化
        this.initApp();
    }
    componentWillUnmount() {
        this.pauseMusic();
        //注销事件监听 ...
        this.refs.audio.src = null;
    }
    render() {
        return (
            <div className='music-app'>
                <MyModal title='提示' msg='该音乐为付费音乐，自动为您播放下一首' option1= '' option2='确定' state={this.state.modal} hideModal={this.hideModal.bind(this)}/>
                <StateBar theme='dark'/>
                <div className='music-top-bar'>
                    <div className='search-btn' onClick={this.showSearchList.bind(this)}></div>
                    <a href="https://music.163.com" target="_blank" className='netease-icon'></a>
                    <header>Music</header>
                    <div className='playlist-btn' onClick={this.showPlayList.bind(this)}>
                        <span className='playlist-title-num'>
                            {this.state.totalNum}
                        </span>
                    </div>
                </div>
                <div className='slide-part'>
                    <div className='music-pic' onClick={this.toggleMusicLyric.bind(this)}></div>
                    <div className='music-lyric' onClick={this.toggleMusicLyric.bind(this)} ref='lyricDOM'>
                        {
                            this.state.lyrics.map(function(item, index) {
                                return (
                                    <p className={this.state.curLyricIndex==index?'active-lyric':''} key={index}>{item.lyric}</p>
                                );
                            }.bind(this))
                        }
                    </div>
                    <div className='canvas-container'>
                        <canvas ref='wave' className='dynamic-wave'>
                            Your Browser Doesn't Support <pre>canvas</pre> Element.
                        </canvas>
                    </div>
                    <div className='music-info'>
                        <div className='music-name'>{this.state.musicName}</div>
                        <div className='singer'>{this.state.singer}</div>
                    </div>
                    <div className='progress-bar flex'>
                        <span className='time-played'>{this.formatTime(this.state.curTime)}</span>
                        <div className='bar bar1'>
                            <div className='bar bar2'></div>
                        </div>
                        <span className='time-total'>{this.formatTime(this.state.duration)}</span>
                    </div>
                    <div className='music-controls flex'>
                        <div className='lyric-ctrl' onClick={this.toggleMusicLyric.bind(this)}></div>
                        <div className='play-pre' onClick={this.playPre.bind(this)}></div>
                        <div className='play-pause' onClick={this.switchPlayState.bind(this)}></div>
                        <div className='play-next' onClick={this.playNext.bind(this)}></div>
                    </div>
                </div>
                <audio id='audio' ref='audio' crossOrigin="anonymous">
                    Your browser does not support the <code>audio</code> element.
                </audio>
                <div className='playlist-wrap' onClick={this.hidePlayList.bind(this)}>
                    <div ref='playlist' className='playlist'>
                        <div className='playlist-title'>
                            播放列表
                        </div>
                        <span className='close-playlist' onClick={this.hidePlayList.bind(this)}/>
                        <ol>
                            {
                                this.state.playList.map(function(item, index) {
                                    return (
                                        <li className='playlist-item' key={index} onClick={this.playNext.bind(this, index)}>
                                            {index+1}. {item.name}
                                        </li>
                                    );
                                }.bind(this))
                            }
                        </ol>
                        <div className='netease-cr'>Powered By &copy; Netease Cloud Music</div>
                    </div>
                </div>
                {/*搜索菜单*/}
                <div className='searchlist-wrap' onClick={this.hideSearchList.bind(this)}>
                    <div ref='searchlist' className='searchlist'>
                        <span id='close-search' className='close-playlist' onClick={this.hideSearchList.bind(this)}/>
                        <header>搜索</header>
                        <Search className='search-input' placeholder="输入您想搜索的歌曲信息" size='large' onSearch={value => this.startSearch(value)}/>
                        <div className='triangle'></div>
                        <Menu className='searchlist-ol'>
                            <Menu.Item>
                                <a href='javascript:;' className='searchlist-item'>搜索结果共 {this.state.searchList.length} 项</a>
                            </Menu.Item>
                            {
                            this.state.searchList.map((item, index) => {
                                return (
                                    <Menu.Item key={index}>
                                        <a href='javascript:;' className='searchlist-item' onClick={this.playMusicById.bind(this, item)}>
                                            {item.name} <span className='fr' style={{fontStyle:'italic'}}>{item.singer}</span>
                                        </a>
                                    </Menu.Item>
                                );
                            })
                            }
                        </Menu>
                    </div>
                </div>

            </div>
        );
    }
    //播放器初始化
    initApp() {
        var vm = this;
        // 增加url query对象
        let query = {};
        if (window.location.hash.indexOf('?') > -1) {
            let keyvalue = (window.location.hash.split('?')[1]).split('&');
            keyvalue.forEach((pair, index) => {
                let key = pair.split('=')[0];
                let value = pair.split('=')[1];
                query[key] = value;
            })
        }
        vm.refs.audio.addEventListener('durationchange', function() {
            var duration = vm.refs.audio.duration;
            vm.setState({
                duration: duration
            });
        });
        vm.refs.audio.addEventListener('ended', function() {
            console.info('当前音乐播放停止: ' + vm.state.musicName);
            var lyricDOM = vm.refs.lyricDOM || $('.music-lyric')[0];
            vm.pauseMusic();
            lyricDOM.scrollTop = 0;
            vm.setState({
                lyricScroll: 0
            });
        })
        vm.getPlayList();
        // 页面激活状态变更
        var hiddenProperty = 'hidden' in document ? 'hidden' :
            'webkitHidden' in document ? 'webkitHidden' :
            'mozHidden' in document ? 'mozHidden' : null;
        var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        document.addEventListener(visibilityChangeEvent, function() {
            if (!document[hiddenProperty]) {
                if (ua.os.name != 'Android' && vm.state.play == true) {
                    // vm.startTheWave();
                    vm.startMusicVisualEffect();
                    vm.spinTheCover();
                }
                if (ua.os.name == 'Android' && vm.state.play == true) {
                    vm.startMusicVisualEffect();
                }
            } else {
                // console.log('non-active');
                clearInterval(vm.waveTimer);
                clearInterval(vm.coverTimer);
            }
        })
        if (query.songId) {
            var songitem = {
                id: query.songId,
                singer: ''
            };
            vm.playMusicById(songitem);
        }
        // 播放本地资源的音乐
        else if (vm.state.playId == -1) {
            vm.refs.audio.src = 'https://github.com/WarpPrism/WarpPrism.github.io/blob/master/src/others/music.mp3?raw=true';
            // vm.refs.audio.src = 'others/music.mp3';
            vm.setState({
                musicName: 'Cannon Flying In the Sky',
                singer: '全智贤'
            });
        }
    }
    switchPlayState() {
        if (this.state.play == false) {
            this.playMusic();
        } else if (this.state.play == true) {
            this.pauseMusic();
        }
    }
    // 播放
    playMusic() {
        this.refs.audio.play();
        $('.play-pause').css('background-image', 'url("../../images/music/pause.png")');
        this.playing();
        this.setState({
            play: true
        });
    }
    // 暂停
    pauseMusic() {
        this.refs.audio.pause();
        $('.play-pause').css('background-image', 'url("../../images/music/play.png")');
        this.setState({
            play: false
        });
        clearInterval(this.timer);
        clearInterval(this.coverTimer);
        clearInterval(this.waveTimer);
        this.timer = this.coverTimer = this.waveTimer = null;
    }
    // 获取播放列表
    getPlayList(id) {
        // 网易云音乐API, 获取歌单"喜欢的音乐"
        var listId = 136410100;
        // listId = 5071630;
        if (id) {
            listId = id;
        }
        $.get(`https://api.imjad.cn/cloudmusic/?type=playlist&id=${listId}`).then((result) => {
            if (result.code == 200) {
                var playList = [];
                for (var i = 0; i < result.playlist.tracks.length; i++) {
                    var track = result.playlist.tracks[i];
                    var song = {};
                    song.name = track.name;
                    song.id = track.id;
                    song.picUrl = track.al.picUrl;
                    if (track.ar.length > 0) {
                        song.artist = '';
                        track.ar.forEach((artist, index) => {
                            artist.name = artist.name?artist.name:'';
                            song.artist += artist.name + ' ';
                        });
                    } else {
                        song.artist = '佚名';
                    }
                    playList.push(song);
                }
                this.setState({
                    playList: playList,
                    totalNum: playList.length
                });
            }
        });
    }
    // 音乐播放中
    playing() {
        var vm = this;
        var lyricDOM = vm.refs.lyricDOM || $('.music-lyric')[0];
        if (ua.os.name != 'Android') {
            vm.spinTheCover();
            vm.startMusicVisualEffect();
            // vm.startTheWave();
        }
        if (ua.os.name == 'Android') {
            vm.startMusicVisualEffect();
        }
        vm.timer = setInterval(function() {
            var duration = vm.state.duration
            var curTime = vm.refs.audio.currentTime;
            lyricDOM.scrollTop = vm.state.lyricScroll;
            var percent = (curTime / duration).toFixed(2);
            $('.bar2').css('right', (1-percent)*267 + 'px');
            //歌词计算Start， 算法优化//
            var minDeltaTime = 9999;
            var activeIndex = vm.state.curLyricIndex || 0;
            for (let i = activeIndex + 1; i < vm.state.lyrics.length; i++) {
                let item = vm.state.lyrics[i];
                let delta = Math.abs(curTime - item.lyricTime);
                if (delta <= minDeltaTime && curTime >= item.lyricTime) {
                    minDeltaTime = delta;
                    activeIndex = i;
                }
            }
            //滚动歌词，居中显示当前歌词
            var activeLyricDOM = $('.active-lyric')[0];
            if (activeLyricDOM) {
                lyricDOM.scrollTop = (activeLyricDOM.offsetTop - 120)<=0?0:(activeLyricDOM.offsetTop - 120);
            }
            //歌词计算End//
            vm.setState({
                lyricScroll: lyricDOM.scrollTop,
                curLyricIndex: activeIndex,
                curTime: curTime
            }, function() {
                //滚动歌词，居中显示当前歌词
                var activeLyricDOM = $('.active-lyric')[0];
                if (activeLyricDOM) {
                    lyricDOM.scrollTop = (activeLyricDOM.offsetTop - 120)<=0?0:(activeLyricDOM.offsetTop - 120);
                }
            });
        }, 500);
    }
    // 封面旋转
    spinTheCover() {
        // console.log('spin the cover');
        var vm = this;
        vm.coverTimer = setInterval(() => {
            vm.coverDeg = (vm.coverDeg + 0.1) % 360;
            $('.music-pic').css('transform', `rotate(${vm.coverDeg}deg)`)
        }, 20);
    }
    // 音乐动感波浪
    startTheWave() {
        var vm = this;
        var canvas = vm.refs.wave;
        var ctx = canvas.getContext('2d');
        canvas.width = 371;
        canvas.height = 80;

        function drawSinCurve(ctx, A=30, w=0.1, o=0, color) {
            // 绘制正弦曲线
            ctx.beginPath();
            if (color) {
                ctx.strokeStyle = color;
            }
            for (var x = 5; x < 365; x+=3) {
                ctx.moveTo(x-1, A*Math.sin(w*(x-1) + o)+40);
                ctx.lineTo(x, A*Math.sin(w*x + o)+40);
                ctx.stroke();
            }
            ctx.closePath();
        }
        var a=30, w=0.1, o=0, color;
        vm.waveTimer = setInterval(() => {
            ctx.clearRect(0, 0, 371, 80);
            o -= 0.2;
            a = parseInt(30 * Math.random());
            color = '#ff899d';
            drawSinCurve(ctx, a, w, o, color);
            a = parseInt(30 * Math.random());
            color = '#d998ff';
            drawSinCurve(ctx, a, w, o+10, color);
        }, 125);
    }
    /**
     * @desc {音乐可视化效果}
     *
     * @memberof Music
     */
    startMusicVisualEffect() {
        let vm = this;
        let canvas = vm.refs.wave;
        const CW = 371, CH = 85;
        canvas.width = CW;
        canvas.height = CH;
        let ctx = canvas.getContext('2d');
        let line = ctx.createLinearGradient(0,0,0,CH);
        line.addColorStop(0, 'red');
        line.addColorStop(0.5, '#ff799d');        
        line.addColorStop(1, '#d998ff');
        ctx.fillStyle = line;
        if (!vm.actx) {
            vm.actx = new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext)();
        }
        let actx = vm.actx;
        // let gainNode = actx[actx.createGain?'createGain':'createGainNode']();
        // gainNode.connect(actx.destination);
        let analyser = actx.createAnalyser();
        var barNum = 128;
        analyser.fftSize = 2 * barNum;
        let audio = vm.refs.audio;
        audio = vm.refs.audio;
        // console.log(audio.src);
        if (!vm.audioSrc || vm.audioSrc === null) {
            vm.audioSrc = actx.createMediaElementSource(audio);
        }
        vm.audioSrc.connect(analyser);
        analyser.connect(actx.destination);

        function visualization() {
            var arr = new Uint8Array(analyser.frequencyBinCount);

            requestAnimationFrame = window.requestAnimationFrame ||
                                        window.webkitRequestAnimationFrame ||
                                        window.mozRequestAnimationFrame;
            function v() {
                analyser.getByteFrequencyData(arr);
                drawBars(arr);
                requestAnimationFrame(v);
            }
            requestAnimationFrame(v);
        }
        function drawBars(arr) {
            ctx.clearRect(0, 0, CW, CH);
            let w = CW / (barNum) + 5;
            for (let i = 0; i <  barNum; i++) {
                let h = arr[i] / (300) * CH;
                ctx.fillRect(i*w, CH - h, w*0.77, h);
            }
        }
        visualization();
    }
    // 播放时间格式化
    formatTime(t) {
        t = parseInt(t);
        var m = parseInt(t / 60);
        m = (m < 10)?('0' + m):m;
        var s = t % 60;
        s = (s < 10)?('0' + s):s;
        return '' + m + ':' + s;
    }
    playNext(id) {
        var vm = this;
        vm.state.lyricScroll = 0;
        var lyricDOM = vm.refs.lyricDOM || $('.music-lyric')[0];
        lyricDOM.scrollTop = 0;
        vm.setState({
            lyricScroll: 0,
            curLyricIndex: 0
        });
        var nextId = vm.state.playId + 1;
        if (nextId >= vm.state.totalNum) {
            nextId = 0;
        }
        var clickfromplaylist = false;
        if (id != undefined && id != null && typeof id == 'number') {
            nextId = id;
            clickfromplaylist = true;
            vm.hidePlayList();
        }
        var nextMusic = vm.state.playList[nextId];
        if (nextMusic) {
            $.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${nextMusic.id}`, (result) => {
                if (result.code == 200) {
                    if (result.data && result.data.length > 0) {
                        // 切换音乐
                        var musicUrl = result.data[0].url;
                        if (musicUrl == null) {
                            // 付费音乐
                            if (clickfromplaylist) vm.showModal();
                            vm.playNext(nextId+1);
                        } else {
                            vm.getMusicLyric(nextMusic);
                            vm.pauseMusic();
                            vm.refs.audio.src = musicUrl;
                            vm.refs.audio.load();
                            vm.setState({
                                musicName: nextMusic.name,
                                singer: nextMusic.artist,
                                playId: nextId
                            });
                            // 切换歌曲封面
                            $('.music-pic').css('background-image', `url("${nextMusic.picUrl}")`);
                            setTimeout(() => {
                                vm.playMusic();
                            }, 300);
                        }
                    }
                }
            });
        }
    }
    playPre() {
        var vm = this;
        var lyricDOM = vm.refs.lyricDOM || $('.music-lyric')[0];
        vm.state.lyricScroll = 0;
        lyricDOM.scrollTop = 0;
        vm.setState({
            lyricScroll: 0,
            curLyricIndex: 0
        });
        var nextId = vm.state.playId - 1;
        if (nextId < 0) {
            nextId = vm.state.totalNum - 1;
        }
        var nextMusic = vm.state.playList[nextId];
        if (nextMusic) {
            $.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${nextMusic.id}`, (result) => {
                if (result.code == 200) {
                    if (result.data && result.data.length > 0) {
                        // 切换音乐
                        var musicUrl = result.data[0].url;
                        if (musicUrl == null) {
                            // 付费音乐
                            vm.playNext(nextId - 1);
                        } else {
                            vm.getMusicLyric(nextMusic);
                            vm.pauseMusic();
                            vm.refs.audio.src = musicUrl;
                            vm.refs.audio.load();
                            vm.setState({
                                musicName: nextMusic.name,
                                singer: nextMusic.artist,
                                playId: nextId
                            });
                            // 切换歌曲封面
                            $('.music-pic').css('background-image', `url("${nextMusic.picUrl}")`);
                            setTimeout(() => {
                                vm.playMusic();
                            }, 300);
                        }
                    }
                }
            });
        }
    }
    // 弹出播放列表
    showPlayList() {
        var vm = this;
        $('.playlist-wrap').css('display', 'block');
        $('.playlist').css('display', 'block');
        $('.playlist')[0].scrollTop = 0;
        $(vm.refs.playlist).addClass('animated bounceInUp');
    }
    hidePlayList(e) {
        var vm = this;
        if (e != undefined) {
            var target = e.target || e.srcElement;
            if (target != $('.playlist-wrap')[0] && target != $('.close-playlist')[0]) {
                return;
            }
        }
        $(vm.refs.playlist).addClass('animated bounceOutDown');
        setTimeout(() => {
            $('.playlist-wrap').css('display', 'none');
            $('.playlist').css('display', 'none');
            $(vm.refs.playlist).removeClass('animated bounceOutDown');
        }, 700);
    }

    showModal(e) {
        this.setState({
            modal: 'show'
        });
    }
    hideModal(e) {
        this.setState({
            modal: 'hide'
        });
    }
    // 搜索音乐相关函数
    showSearchList() {
        var vm = this;
        $('.searchlist-wrap').css('display', 'block');
        $('.searchlist').css('display', 'block');
        $('.searchlist').addClass('animated fadeInLeft');
        if (ua.os.name=='Android' || ua.browser.name=='IE') {
            $('.searchlist-wrap').css('background', '#eee');
            return;
        }
        $('.slide-part').addClass('heavy-blur');
        $('.music-top-bar').addClass('heavy-blur');
        $('.state-bar').addClass('heavy-blur');
    }
    hideSearchList(e) {
        if (e != undefined) {
            var target = e.target;
            if (target == $('.searchlist-wrap')[0] || target.id=='close-search') {
                $('.searchlist').addClass('animated fadeOutRight');
                setTimeout(() => {
                    $('.searchlist-wrap').css('display', 'none');
                    $('.searchlist').css('display', 'none');
                    $('.searchlist').removeClass('fadeInLeft');
                    $('.searchlist').removeClass('fadeOutRight');
                    if (ua.os.name=='Android' || ua.browser.name=='IE') {
                        return;
                    }
                    $('.slide-part').removeClass('heavy-blur');
                    $('.music-top-bar').removeClass('heavy-blur');
                    $('.state-bar').removeClass('heavy-blur');
                },700)
            }
        }
    }
    // 根据input输入值搜索结果
    startSearch(value) {
        var vm = this;
        if (value == '') {
            vm.setState({
                searchList: []
            })
        }
        if (value != '') {
            $.get('https://api.imjad.cn/cloudmusic/?type=search&s=' + value, function(result) {
                if (result.code == 200) {
                    if (result.result.songCount == 0) {
                        vm.setState({
                            searchList: []
                        });
                        return;
                    }
                    var songs = result.result.songs;
                    var sr = [];
                    for (let i = 0; i < songs.length; i++) {
                        var item = songs[i];
                        if (item.fee) {
                            // 付费音乐
                            // continue;
                        }
                        var song = {};
                        song.name = item.name;
                        song.picUrl = item.al.picUrl
                        if (item.ar.length > 0) {
                            song.singer = item.ar[0].name;
                        } else {
                            song.singer = '佚名';
                        }
                        song.id = item.id;
                        sr.push(song);
                        vm.setState({
                            searchList: sr
                        })
                    }
                }
            })
        }
    }
    // 根据item.id播放音乐
    playMusicById(item) {
        var vm = this;
        var lyricDOM = vm.refs.lyricDOM || $('.music-lyric')[0];
        vm.state.lyricScroll = 0;
        lyricDOM.scrollTop = 0;
        vm.setState({
            lyricScroll: 0,
            curLyricIndex: 0
        });
        if (item && item.id) {
            console.log('songId', item.id);
            var getDetail = new Promise((resolve, reject) => {
                $.get(`https://api.imjad.cn/cloudmusic/?type=detail&id=${item.id}`, (result) => {
                    if (result.code == 200) {
                        if (result.songs.length > 0) {
                            var song = result.songs[0];
                            item.name = song.name;
                            item.picUrl = song.al.picUrl;
                            item.singer = '';
                            song.ar.forEach((artist, index) => {
                                artist.name = artist.name?artist.name:'';
                                item.singer += artist.name + ' ';
                            });
                            resolve();
                        } else {
                            vm.refs.audio.src = 'https://github.com/WarpPrism/WarpPrism.github.io/blob/master/src/others/music.mp3?raw=true';
                            vm.setState({
                                musicName: 'Cannon Flying In the Sky',
                                singer: '全智贤'
                            });
                            reject();
                        }
                    }
                })
            });
            function getMusicUrl() {
                $.get(`https://api.imjad.cn/cloudmusic/?type=song&id=${item.id}`, (result) => {
                    if (result.code == 200) {
                        if (result.data && result.data.length > 0) {
                            // 切换音乐
                            var musicUrl = result.data[0].url;
                            if (musicUrl == null) {
                                // 付费音乐
                                vm.showModal();
                                vm.playNext();
                                return;
                            } else {
                                vm.pauseMusic();
                                vm.refs.audio.src = musicUrl;
                                // vm.refs.audio.load();
                                vm.setState({
                                    musicName: item.name,
                                    singer: item.singer
                                });
                                // 切换歌曲封面
                                $('.music-pic').css('background-image', `url("${item.picUrl}")`);
                                setTimeout(() => {
                                    vm.playMusic();
                                    $('#close-search').click();
                                }, 300);
                            }
                        }
                    }
                });
                vm.getMusicLyric(item);
            }
            getDetail.then(getMusicUrl, function(){});
        }
    }
    // 获取歌词
    getMusicLyric(item) {
        var vm = this;
        var lyricDOM = vm.refs.lyricDOM || $('.music-lyric')[0];
        vm.state.lyricScroll = 0;
        lyricDOM.scrollTop = 0;
        vm.setState({
            lyricScroll: 0,
            curLyricIndex: 0
        });
        // 歌词获取
        $.get(`https://api.imjad.cn/cloudmusic/?type=lyric&id=${item.id}`, (result) => {
            if (result.code == 200) {
                if (result.lrc && result.lrc.hasOwnProperty('lyric')) {
                    var lyrics = result.lrc.lyric;
                    var lines = lyrics.split('\n');
                    var lyricsParsed = [];
                    // console.log(lines);
                    lines.forEach(function(item, index) {
                        //正则匹配计算歌词时间和歌词
                        item.replace(/(\[.*])(.*)/g, function(match, $1, $2) {
                            var lyricObj = {
                                lyricTime: 0,
                                lyric: ''
                            };
                            var lyricTime = 0;
                            if ($1) {
                                lyricTime += ($1.substring(1,3)) * 60;
                                lyricTime += parseInt($1.substring(4,6));
                                lyricTime += parseFloat('0.' + $1.substring(7).replace(']', ''));
                            }
                            lyricObj.lyricTime = lyricTime;
                            if ($2) {
                                lyricObj.lyric = $2;
                            }
                            lyricsParsed.push(lyricObj);
                        });
                    });
                    var lyricEnd = {
                        lyricTime: 99999,
                        lyric: '--- END ---'
                    };
                    lyricsParsed.push(lyricEnd);
                    vm.setState({
                        lyrics: lyricsParsed
                    });
                } else {
                    // 纯音乐，没有歌词
                    vm.setState({
                        lyrics: [{
                            lyricTime: 0,
                            lyric: '还没有歌词哦~'
                        }]
                    });
                }
            }
        });
    }
    //控制歌词显示
    toggleMusicLyric() {
        var vm = this;
        var cover = $('.music-pic');
        var lyric = $('.music-lyric');
        if (cover.css('display') == 'block') {
            if (vm.coverTimer) {
                clearInterval(vm.coverTimer);
                vm.coverTimer = null;
            }
            cover.hide();
            lyric.show();
        } else if (cover.css('display') == 'none') {
            if (vm.state.play && vm.coverTimer == null && ua.os.name != 'Android') {
                vm.spinTheCover();
            }
            cover.show();
            lyric.hide();
        }
    }
}

export default Music;

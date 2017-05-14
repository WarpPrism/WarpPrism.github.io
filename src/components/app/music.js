// Cloud Music api https://api.imjad.cn/
import React from 'react';
import StateBar from 'components/iphone/stateBar.js';
import MyModal from 'components/iphone/modal.js';
import {Input,Menu } from 'antd';
const Search = Input.Search;


require('styles/app/music.css');

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
            modal: 'hide',//modal状态
            searchList: [],
            lyrics: [],//歌词
            curLyricIndex: 0,
            lyricScroll: 0
        };
        this.timer = null;
        this.coverTimer = null;
        this.coverDeg = 0;
        this.waveTimer = null;
    }
    componentDidMount() {
        this.getInitMusicInfo();
    }
    componentWillUnmount() {
        this.refs.audio.pause();
        this.setState({
            play:false
        });
        this.pauseMusic();
        //注销事件监听
        this.refs.audio.oncanplay = null;
    }
    render() {
        return (
            <div className='music-app'>
                <MyModal title='提示' msg='该音乐为付费音乐，自动为您播放下一首' option1= '' option2='确定' state={this.state.modal} hideModal={this.hideModal.bind(this)}/>
                <StateBar theme='dark'/>
                <div className='music-top-bar'>
                    <div className='search-btn' onClick={this.showSearchList.bind(this)}></div>
                    <header>Music</header>
                    <div className='playlist-btn' onClick={this.showPlayList.bind(this)}>
                        <span className='playlist-title-num'>
                            {this.state.totalNum}
                        </span>
                    </div>
                </div>
                <div className='slide-part'>
                    <div className='music-pic' onClick={this.toggleMusicLyric.bind(this)}></div>
                    <div className='music-lyric' onClick={this.toggleMusicLyric.bind(this)}>
                        {
                            this.state.lyrics.map(function(item, index) {
                                return (
                                    <p className={this.state.curLyricIndex==index?'active-lyric':''} key={index}>{item.lyric}</p>
                                );
                            }.bind(this))
                        }
                    </div>

                    <canvas ref='wave' className='dynamic-wave'></canvas>
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
                <audio id='audio' ref='audio'></audio>
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
                        <div className='netease-cr'>Powered By &copy; Netease Music</div>
                    </div>
                </div>
                {/*搜索菜单*/}
                <div className='searchlist-wrap' onClick={this.hideSearchList.bind(this)}>
                    <div ref='searchlist' className='searchlist'>
                        <header>搜索</header>
                        <Search className='search-input' placeholder="输入您想搜索的歌曲信息" size='large' onSearch={value => this.startSearch(value)}/>
                        <div className='triangle'></div>
                        {/*<ol className='searchlist-ol'>
                            <li className='searchlist-item'>搜索结果 {this.state.searchList.length} 项</li>
                            {
                                this.state.searchList.map((item, index) => {
                                    return (
                                        <li className='searchlist-item' key={index} onClick={this.playMusicById.bind(this, item)}>
                                            {item.name} <span className='fr' style={{fontStyle:'italic'}}>{item.singer}</span>
                                        </li>
                                    );
                                })
                            }
                        </ol>*/}
                        <Menu className='searchlist-ol'>
                            <Menu.Item>
                                <a href='javascript:;' className='searchlist-item'>搜索结果 {this.state.searchList.length} 项</a>
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
    switchPlayState() {
        if (this.state.play == false) {
            this.playMusic();
        } else if (this.state.play == true) {
            this.pauseMusic();
        }
    }
    playMusic() {
        this.refs.audio.play();

        $('.play-pause').css('background-image', 'url("../../images/music/pause.png")');
        this.setState({
            play: true
        });
        this.playing();
    }
    pauseMusic() {
        this.refs.audio.pause();
        $('.play-pause').css('background-image', 'url("../../images/music/play.png")');
        this.setState({
            play: false
        });
        clearInterval(this.timer);
        clearInterval(this.coverTimer);
        clearInterval(this.waveTimer);
    }
    //播放器初始信息
    getInitMusicInfo() {
        var vm = this;
        // 播放本地资源的音乐
        if (vm.state.playId == -1) {
            vm.refs.audio.src = 'https://github.com/WarpPrism/WarpPrism.github.io/blob/master/src/others/music.mp3?raw=true';
            vm.setState({
                musicName: 'Cannon Flying In the Sky',
                singer: '全智贤'
            });
        }

        vm.refs.audio.oncanplay = function() {
            var duration = vm.refs.audio.duration;
            vm.setState({
                duration: duration
            });
        }
        vm.getPlayList();

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
                        song.artist = track.ar[0].name;
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
        if (ua.os.name != 'Android') {
            vm.spinTheCover();
            vm.startTheWave();
        }
        $('.music-lyric')[0].scrollTop = vm.state.lyricScroll;
        vm.timer = setInterval(function() {
            var duration = vm.state.duration
            var curTime = vm.refs.audio.currentTime;
            if (Math.abs(curTime - duration) <= 0.1) {
                vm.pauseMusic();
            }
            var percent = (curTime / duration).toFixed(3);
            $('.bar2').css('right', (1-percent)*267 + 'px');
            //歌词计算
            var minDeltaTime = 9999;
            var activeIndex = 0;
            vm.state.lyrics.forEach(function(item, index) {
                var delta = Math.abs(curTime - item.lyricTime);
                if (delta <= minDeltaTime && curTime >= item.lyricTime) {
                    minDeltaTime = delta;
                    activeIndex = index;
                }
            })
            if (activeIndex > 6 && activeIndex != vm.state.curLyricIndex) {
                //滚动歌词
                // console.log($('.music-lyric')[0].scrollTop);
                $('.music-lyric')[0].scrollTop += 30;
                vm.setState({
                    lyricScroll: vm.state.lyricScroll + 30
                });
            }
            //歌词计算
            vm.setState({
                curLyricIndex: activeIndex,
                curTime: curTime
            });

        }, 500);
    }
    // 封面旋转
    spinTheCover() {
        var vm = this;
        vm.coverTimer = setInterval(() => {
            vm.coverDeg = (vm.coverDeg + 0.1) % 360;
            $('.music-pic').css('transform', `rotate(${vm.coverDeg}deg)`)
        }, 20);
    }
    // 音乐动感波浪
    startTheWave() {
        var vm = this;
        var canvas = this.refs.wave;
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
        if (ua.os.name == 'Android') {
            drawSinCurve(ctx, 30, 0.1, 0, '#ff899d');
            drawSinCurve(ctx, 20, 0.1, 0.7, '#d998ff');
            return;
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
                            }, 0);
                        }
                    }
                }
            });
        }
    }
    playPre() {
        var vm = this;
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
                            }, 0);
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
            if (target == $('.searchlist-wrap')[0]) {
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
        if (item && item.id) {
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
                            vm.refs.audio.load();
                            vm.setState({
                                musicName: item.name,
                                singer: item.singer
                            });
                            // 切换歌曲封面
                            $('.music-pic').css('background-image', `url("${item.picUrl}")`);
                            setTimeout(() => {
                                vm.playMusic();
                                $('.searchlist-wrap').click();
                            }, 0);
                        }
                    }
                }
            });
            vm.getMusicLyric(item);
        }
    }
    getMusicLyric(item) {
        var vm = this;
        vm.state.lyricScroll = 0;
        vm.setState({
            lyricScroll: 0
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

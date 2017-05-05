// Cloud Music api https://api.imjad.cn/
import React from 'react';
import StateBar from 'components/iphone/stateBar.js';
import Modal from 'components/iphone/modal.js';

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
            modal: 'hide'//modal状态
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
        clearInterval(this.timer);
        clearInterval(this.coverTimer);
        clearInterval(this.waveTimer);
    }
    render() {
        return (
            <div className='music-app'>
                <Modal title='提示' msg='该音乐为付费音乐，自动为您播放下一首' option1= '' option2='确定' state={this.state.modal} hideModal={this.hideModal.bind(this)}/>
                <StateBar theme='dark'/>
                <div className='music-top-bar'>
                    <header>Music</header>
                    <div className='playlist-btn' onClick={this.showPlayList.bind(this)}>
                        <span className='playlist-title-num'>
                            {this.state.totalNum}
                        </span>
                    </div>
                </div>
                <div className='slide-part'>
                    <div className='music-pic'></div>
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
        vm.spinTheCover();
        vm.startTheWave();
        var duration = vm.state.duration || vm.refs.audio.duration;

        vm.timer = setInterval(function() {
            var curTime = vm.refs.audio.currentTime;
            var percent = (curTime / duration).toFixed(3);
            $('.bar2').css('right', (1 - percent)*100 + '%');
            vm.setState({
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
                        console.log(result);
                        var musicUrl = result.data[0].url;
                        if (musicUrl == null) {
                            // 付费音乐
                            if (clickfromplaylist) vm.showModal();
                            vm.playNext(nextId+1);
                        } else {
                            vm.pauseMusic();
                            vm.refs.audio.src = musicUrl;
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
                            vm.pauseMusic();
                            vm.refs.audio.src = musicUrl;
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
}

export default Music;

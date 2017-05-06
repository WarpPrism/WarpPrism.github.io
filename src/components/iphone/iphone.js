import React from 'react';
require('styles/iphone.css');

class Iphone extends React.Component {
    constructor(props) {
        super(props);
        this.$drag = false;
        this.initX = 0;
        this.initY = 0;
        this.initLeft = 200;
        this.initTop = 0;
        this.state = {
            theme: 'dark',
            iphoneLeft: 100,
            iphoneTop: -100
        }
    }
    componentDidMount() {
        var vm = this;
        $(document).mouseup(function() {
            vm.$drag = false;
        });

        var parser = new UAParser();
        var os = parser.getOS();
        if (os == 'Android' || os == 'IOS') {
            vm.setState({
                iphoneTop: -120,
                iphoneLeft: -50
            })
        }
    }
    render() {
        return (
            <div style={{left:(this.state.iphoneLeft+'px'),top:(this.state.iphoneTop+'px')}} className={(this.state.theme=='dark')?'iphone iphone-dark':'iphone'} ref='iPhone'>
                <div className='iphone-top' onMouseDown={this.startDrag.bind(this)} onMouseMove={this.draging.bind(this)} onMouseUp={this.endDrag.bind(this)}>
                    <span className='camera'></span>
                    <span className='speaker'></span>
                    <span className='sensor'></span>
                </div>
                <div className='top-bar'></div>
                <div className='iphone-screen'>
                    {this.props.children}
                </div>
                <div className='buttons'>
                    <span className="sleep"></span>
                    <span className="on-off"></span>
                    <span className="up"></span>
                    <span className="down"></span>
                </div>
                <div className='bottom-bar'></div>
                <div className='iphone-bottom'>
                    <span className='home-btn' onClick={this.handleHomeBtnAction.bind(this)}></span>
                </div>
                <div className='theme-picker'>
                    <div className='dark-picker' onClick={this.changeIphoneTheme.bind(this, 'dark')}></div>
                    <div className='light-picker' onClick={this.changeIphoneTheme.bind(this, 'light')}></div>
                </div>
            </div>
        )
    }
    // 增加iPhone拖动定位效果
    startDrag(e) {
        e.persist();
        var x = e.nativeEvent.clientX;
        var y = e.nativeEvent.clientY;
        this.$drag = true;
        this.initX = x;
        this.initY = y;
        this.initLeft = +($('.iphone').css('left').replace('px', ''));
        this.initTop = +($('.iphone').css('top').replace('px', ''));
    }
    // iphone拖拽移动
    draging(e) {
        if (this.$drag == true) {
            e.persist();
            // console.log(e.target, $('.iphone-top'));
            // if ((e.target) != $('.iphone-top')[0]) {
            //     this.endDrag();
            //     return;
            // }
            var x = e.nativeEvent.clientX;
            var y = e.nativeEvent.clientY;
            // $('.iphone').css({
            //     'top': this.initTop + (y - this.initY) + 'px',
            //     'left': this.initLeft + (x - this.initX) + 'px'
            // });
            //使用state更新位置
            this.setState({
                iphoneTop: this.initTop + (y - this.initY),
                iphoneLeft: this.initLeft + (x - this.initX)
            });
        }
    }
    endDrag(e) {
        this.$drag = false;
        this.initX = 0;
        this.initY = 0;
        this.initLeft = +($('.iphone').css('left').replace('px', ''));
        this.initTop = +($('.iphone').css('top').replace('px', ''));
    }

    changeIphoneTheme(theme) {
        if (theme == 'dark') {
            this.setState({
                theme: 'dark'
            });
        } else if (theme == 'light') {
            this.setState({
                theme: 'light'
            });
        }
    }
    // iphone home button 交互事件
    handleHomeBtnAction() {
        var hash = window.location.hash;
        if (hash == '#/' || hash == '#') {
        } else {}
        window.location.hash = '#/iphone_home';
    }
}

export default Iphone;
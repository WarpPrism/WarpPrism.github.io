import React from 'react';
require('styles/mainClock.css');

class MainClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            year: '',
            month: '',
            date: '',
            day: '',
            hour: '',
            minute: ''
        };
    }
    componentDidMount() {
        this.updateTime();
        this.timer = setInterval(() => {
            this.updateTime();
    }, 30 * 1000); // 每 30s 更新一次锁屏时间
    }
    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }
    render() {
        return (
            <div className='lock-clock'>
                <div className='clock-time'>
                    {this.state.hour}<span className='second-flash' ref='flash'>:</span>{this.state.minute}
                </div>
                <div className='clock-date'>
                    {this.state.month}月{this.state.date}日&nbsp;{this.state.day}
                </div>
            </div>
        );
    }
    updateTime() {
        var D = new Date();
        var h = D.getHours();
        var m = D.getMinutes();
        var y = D.getFullYear();
        var month = D.getMonth() + 1;
        var date = D.getDate();
        var day = this.toDayString(D.getDay());
        // if (h < 10) h = '0' + h;
        if (m < 10) m = '0' + m;
        this.setState({
            year: y,
            month: month,
            date: date,
            day: day,
            hour: h,
            minute: m
        });
    }
    toDayString(d) {
        var arr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        if (!arr[d]) {
            return '';
        } else {
            return arr[d];
        }
    }
}

export default MainClock;
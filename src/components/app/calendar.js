// http://codepen.io/WarpPrism/pen/grKqvV
//（传统DOM方法构建日历应用）From My Codepen
import React from 'react';
import StateBar from 'components/iphone/stateBar.js';

import 'styles/app/calendar.css';


class Calendar extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.generateCalendar();
    }
    render() {
        return (
        <div className='calendar-app'>
            <div id="calandar">
                <div id="calandar-header">
                    <div id="header1" className="clearfix">
                        <div id="month">**</div>
                        <div id="month-right-div">
                            <div id="weekday">**</div>
                            <div id="year">**</div></div>
                    </div>
                    <div id="header2">
                        <ul>
                            <li data-weekday="1">日</li>
                            <li data-weekday="2">一</li>
                            <li data-weekday="3">二</li>
                            <li data-weekday="4">三</li>
                            <li data-weekday="5">四</li>
                            <li data-weekday="6">五</li>
                            <li data-weekday="7">六</li></ul>
                    </div>
                </div>
                <div id="calandar-body"></div>
                <div id="calandar-footer" className="clearfix">
                    <div id="next-month" className="button"></div>
                    <div id="go-to-today">
                        <p>今天</p>
                    </div>
                    <div id="pre-month" className="button"></div>
                </div>
            </div>
        </div>
        );
    }
    generateCalendar() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var today = now.getDate();
        var weekday = now.getDay();
        var $NOW = {
            y: year,
            m: month,
            d: today
        };
        
        var weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
        var monthDays = [];
        function setMonthDays(year) {
            if (year % 4 == 0) {
                // 闰年，二月有29天
                monthDays = [31, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            } else {
                // 平年
                monthDays = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            }
        }
        setMonthDays(year);
        
        now.setTime(now.setDate(1));
        // 获取本月1号是星期几
        var firstDayofThisMonth = now.getDay();
        // 重置
        now.setTime(now.setDate(today));
        
        // 获取DOM
        var monthDOM = document.getElementById('month');
        var yearDOM = document.getElementById('year');
        var weekdayDOM = document.getElementById('weekday');
        var calandarBodyDOM = document.getElementById('calandar-body');
        var nextDOM = document.getElementById('next-month');
        var preDOM = document.getElementById('pre-month');
        var goToTodayDOM = document.getElementById('go-to-today');
        
        var calandarStart = function() {
            monthDOM.innerHTML = month + '月';
            yearDOM.innerHTML = year + '年'; 
            weekdayDOM.innerHTML = weekdays[weekday];
            // 创建日历主体
            var currentMonthDay = 1;
            var nextMonthDay = 1;
            var preMonthDay = monthDays[month - 1];
            
            var currentShowDays = monthDays[month] + firstDayofThisMonth;
            var lines = Math.ceil(currentShowDays / 7);
            for (let i = 0; i < lines; i++) {
                var row = document.createElement('div');
                row.classList.add('row');
                calandarBodyDOM.appendChild(row);
                for (let j = 0; j < 7; j++) {
                    var cell = document.createElement('div');
                    cell.classList.add('cell');
                    var pos = i * 7 + j + 1;
                    // 计算前一个月的日期
                    if (pos <= firstDayofThisMonth) {
                        cell.innerHTML = preMonthDay - (firstDayofThisMonth - pos);
                        cell.classList.add('cell-not-this-month');
                        cell.addEventListener('click', function(e) {
                            if (month == 1) {
                                year--;
                                month = 13;
                            }
                            goToDate(year, month - 1, +this.innerHTML);       
                        }, false);
                    }
                    // 确定当月1号的位置, 并计算后续的日期
                    if (pos > firstDayofThisMonth) {
                        if (currentMonthDay <= monthDays[month]) {
                            if (currentMonthDay == today) {
                                cell.classList.add('today');
                            }
                            cell.innerHTML = currentMonthDay++;
                            cell.addEventListener('click', function(e) {
                                // var cells = calandarBodyDOM.getElementsByClassName('cell');
                                // cells = Array.prototype.slice.call(cells, 0);
                                // cells.forEach(function(item) {
                                //     if (item.classList.contains('today')) {
                                //         item.classList.remove('today');
                                //     }
                                // });
                                // this.classList.add('today');
                                goToDate(year, month, +this.innerHTML);
                            }, false);
                        } else {
                            // 计算下月的日期
                            cell.innerHTML = nextMonthDay++;
                            cell.classList.add('cell-not-this-month');
                            cell.addEventListener('click', function(e) {
                                if (month == 12) {
                                    year++;
                                    month = 0;
                                }
                                goToDate(year, month + 1, +this.innerHTML);       
                            }, false);
                        }
                        
                    }
                    row.appendChild(cell);
                }
            }
        };
        calandarStart();
        
        // 跳转到指定日期，如跳转到 2016 01 01，则更新当前日历到2016年元旦
        var goToDate = function(y, m, d) {
            var date = new Date();
            if (y >= 1970 && y <= 3000 && Math.floor(y) === y) {
                date.setFullYear(y);
                setMonthDays(y);
            } else {
                console.error('Calandar Not Support 1970- and 3000+');
                return;
            }
            if (d >= 1 && d <= monthDays[m] && Math.floor(d) === d) {
                date.setDate(d);
            } else {
                console.error('Wrong Day Format');
                return;
            }
            if (m > 0 && m < 13 && Math.floor(m) === m) {
                date.setMonth(m - 1);
            } else {
                console.error('Wrong Month Format');
                return;
            }
            
            year = date.getFullYear();
            month = date.getMonth() + 1;
            today = date.getDate();
            weekday = date.getDay();
            date.setTime(date.setDate(1));
            // 获取本月1号是星期几
            firstDayofThisMonth = date.getDay();
            // 重置
            date.setTime(date.setDate(today));
            
            // 清空calandar-body
            var rows = calandarBodyDOM.getElementsByClassName('row');
            rows = Array.prototype.slice.call(rows, 0);
            rows.forEach(function(item) {
                calandarBodyDOM.removeChild(item);
            });
            calandarStart();
        }
        
        // 月份跳转按钮
        nextDOM.addEventListener('click', function(e) {
            if (month == 12) {
                year++;
                month = 0;
            }
            goToDate(year, month + 1, 1);       
        }, false);
        preDOM.addEventListener('click', function(e) {
            if (month == 1) {
                year--;
                month = 13;
            }
            goToDate(year, month - 1, 1);
        }, false);
        goToTodayDOM.addEventListener('click', function(e) {
            goToDate($NOW.y, $NOW.m, $NOW.d);
        }, false);
    }
}

export default Calendar;
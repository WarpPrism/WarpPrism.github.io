import React from 'react';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        var getLocation = $.getJSON('https://freegeoip.net/json/');
        var location;
        getLocation.done(() => {
            console.log(getLocation.responseJSON);
            location = getLocation.responseJSON;
            getWeather(location);
        })
        getLocation.withCredentials = false;
        console.log(getLocation);

        getLocation.fail(() => {
            console.log('Weather App Get Location Infomation Failed!');
        })
        function getWeather(location) {
            if (location.city) {
                var city = location.city.toLowerCase();
                var weatherXHR = $.ajax({
                    type: 'get',
                    url: 'https://api.thinkpage.cn/v3/weather/now.json?key=cgpym59ia3on0nss&location=' + city + '&language=zh-Hans&unit=c',
                    success: (data) => {
                        console.log(data);
                    }
                });
                console.log(weatherXHR);
            }
        }
    }
    render() {
        return (
            <div className='weather-app'></div>
        );
    }
}

export default Weather;
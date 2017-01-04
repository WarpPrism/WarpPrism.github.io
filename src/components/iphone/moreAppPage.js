import React from 'react';

require('styles/moreAppPage.css');

class MoreAppPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='more-app-page'>
                <div className='app-page-row'>
                    <div className='app'>
                        <div className='app-icon'>
                            <img src='images/iosicons/camera.png' alt='icon'/>
                        </div>
                        <div className='app-name'>相机</div>
                    </div>
                    <div className='app'>
                        <div className='app-icon'>
                            <img src='images/iosicons/calculator.png' alt='icon'/>
                        </div>
                        <div className='app-name'>相机</div>
                    </div>
                    <div className='app'>
                        <div className='app-icon'>
                            <img src='images/iosicons/notes.png' alt='icon'/>
                        </div>
                        <div className='app-name'>相机</div>
                    </div>
                    <div className='app'>
                        <div className='app-icon'>
                            <img src='images/iosicons/weather.png' alt='icon'/>
                        </div>
                        <div className='app-name'>相机</div>
                    </div>
                </div>
                <div className='app-page-row'>
                    <div className='app' onClick={this.openWeatherApp}>
                        <div className='app-icon'>
                            <img src='images/iosicons/weather.png' alt='icon'/>
                        </div>
                        <div className='app-name'>天气</div>
                    </div>
                    <div className='app'>
                        <div className='app-icon'>
                            <img src='images/iosicons/camera.png' alt='icon'/>
                        </div>
                        <div className='app-name'>相机</div>
                    </div>
                    <div className='app'>
                        <div className='app-icon'>
                            <img src='images/iosicons/calculator.png' alt='icon'/>
                        </div>
                        <div className='app-name'>相机</div>
                    </div>
                    <div className='app'>
                        <div className='app-icon'>
                            <img src='images/iosicons/notes.png' alt='icon'/>
                        </div>
                        <div className='app-name'>相机</div>
                    </div>
                </div>
            </div>
        );
    }
    openWeatherApp(e) {
        // 打开天气应用
        var getLocation = $.getJSON('https://freegeoip.net/json/');
        var location;
        getLocation.done(() => {
            console.log(getLocation.responseJSON);
            location = getLocation.responseJSON.city + ',' + getLocation.responseJSON.country_code;
            getWeather(location);
        })
        getLocation.fail(() => {

        })

        function getWeather(mylocation) {
            var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + mylocation + "&appid=b1cc0ead659679e5009fe3300f5d1206";
            var requestWeather = $.getJSON(weatherURL);

            requestWeather.done(() => {
                console.log(requestWeather.responseJSON);
            })
            requestWeather.fail(() => {
                console.log('Get Weather Error!');
            })
        }
    }
}

export default MoreAppPage;
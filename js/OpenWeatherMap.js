/**
 * built as singleton.  Was really looking for a 
 * way to use that DP in an app.  This probably wasn't the best
 * choice 
 * 
 * for the OpenWeather API
 */ 

const openWeatherMap = (function() {
    let instance, apiKey;
    const url = 'http://api.openweathermap.org/data/2.5/';
    const unit = 'imperial';

    function init() {
        function _setKey(key){
            apiKey = key;
        }

        // grabs the current weather conditions for the location passed
        function _getCurrent(lat, long) {
            const apiUrl = `${url}weather?appid=${apiKey}&lat=${lat}&lon=${long}&units=${unit}`;
            return fetch(apiUrl)
                .then(data => data.json())
                .then(data => {
                    return {
                        temp: data.main.temp,
                        name: data.name,
                        wind: data.wind.speed,
                        description: data.weather[0].description,
                        icon: data.weather[0].icon,
                        humidity: data.main.humidity
                    };
                });
        }

        function _getForecast(lat, long){
            let apiUrl = `${url}forecast?appid=${apiKey}&lat=${lat}&lon=${long}&units=${unit}`;
            const promise = fetch(apiUrl);

            promise
                .then(data => data.json())
                .then(data => {

                    let forecast = data.list.map(item => {
                        return {
                            date: moment.utc(item.dt_txt).local().format(),
                            humidity: item.main.humidity,
                            temp: item.main.temp,
                            description: item.weather[0].description,
                            wind: item.wind.speed
                        };
                    });
                });
        }
        return {
            setKey: _setKey,
            getForecast: _getForecast,
            getCurrent: _getCurrent
        };
    }

    return {
        getInstance () {
            if( !instance ){
                instance = init();
            }
            return instance;
        }
    };

})();
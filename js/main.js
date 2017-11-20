
(function(){

    const currentCntr = document.querySelector('#current-cntr');
    const currentSRC = document.querySelector('#current-weather-template').innerHTML;
    const currentTPL = Handlebars.compile(currentSRC);

    let openWeather = openWeatherMap.getInstance();
    openWeather.setKey('d4a8c3d32a6bdc0b2af43aeef1aa78ef');

    // start by getting users location and loading their weather
    var myLoc = ipInfo.getInstance();
    myLoc.setToken('99ccb2631f5de4');

    myLoc.getLocation().then(data => {
        const userLoc = `${data.city}, ${data.region}`;
        const cords = data.loc.split(',');

        openWeather.getCurrent(cords[0], cords[1]).then(data => {
            data.location = userLoc;
            currentCntr.innerHTML = currentTPL(data);
        });
    });

    var input = document.getElementById('locationTextField');
    var autocomplete = new google.maps.places.Autocomplete(input);

    // handle user selection of a location
    autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace();
        openWeather.getCurrent(place.geometry.location.lat(), place.geometry.location.lng()).then(data => {
            data.location = place.formatted_address;
            currentCntr.innerHTML = currentTPL(data);
        });
    });

})();
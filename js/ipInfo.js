/**
 * built as singleton.  Was really looking for a 
 * way to use that DP in an app.  This probably wasn't the best
 * choice 
 * 
 * for the ipinfo.io api 
 * https://ipinfo.io/developers
 */ 

const ipInfo = (function() {
    let instance, token;
    const _url = 'http://ipinfo.io/json';

    const defaultLoc = 'Seattle';

    function init() {
        function _setToken (key) {
            token = key;
        }

        /**
         * returns a promise
         */
        function _getLocation() {
            const locationPromise = fetch(`${_url}?token=${token}`);
            
            return locationPromise
                .then(data => data.json())
                .then(data => {
                    return data;
                })
                .catch(function(reason){
                    return [];
                });
        }

        return {
            getLocation: _getLocation,
            setToken: _setToken,
            defaultLoc: defaultLoc
        };
    }

    return {
        getInstance: function () {
            if( !instance ) {
                instance = init();
            }
            return instance;
        }
    };
})();
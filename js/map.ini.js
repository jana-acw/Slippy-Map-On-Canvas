(function (window) {
    if (typeof window.slippymap !== 'undefined') {
        window.slippymap.extension.ini = function (map) {
            var ini = {
            	lastUpdate : 0,
            	updateDefered : false,
                prefix: 'slippymap_' + map.div + '_',
                init: function () {
                    map.renderer.canvas.addEventListener('moveend', ini.update);
                    map.renderer.canvas.addEventListener('zoomed', ini.update);
                    ini.set();
                },
                set: function () {
                    var lon, lat, zoom;
                    try {
                        lon = parseFloat(localStorage.getItem(ini.prefix + "lon"));
                        lat = parseFloat(localStorage.getItem(ini.prefix + "lat"));
                        zoom = parseFloat(localStorage.getItem(ini.prefix + "zoom"));
                    map.position.coords(
                        {
                            lon: parseFloat(lon),
                            lat: parseFloat(lat),
                            zoom: parseFloat(zoom)
                        });


					} catch (e) {
                        slippymap.debug('localStorage: ' + e);
                    }
                },
                update: function () {
                	var now = function () {
                            return (new Date()).getTime();
                    }();
                    if(now - ini.lastUpdate < 1000) {
                    	if(!ini.updateDefered){
                    	ini.updateDefered = true;
                    	setTimeout(function(){
                    		ini.update();
                    		ini.updateDefered = false;
                    	}, 1000);
                    	}
                    	return;
                    }
                    slippymap.debug("localStorage, update");
                    var coords = map.position.coords();
                    
                    try {
                        localStorage.setItem(ini.prefix + "lon", coords.lon);
                        localStorage.setItem(ini.prefix + "lat", coords.lat);
                        localStorage.setItem(ini.prefix + "zoom", coords.z);
                    } catch (e) {
                        slippymap.debug('localStorage: ' + e);
                    }
                    ini.lastUpdate = now;
                }
            };
            return ini;
        };
    }
})(window);
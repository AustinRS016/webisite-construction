


var mymap = L.map('map').setView([47.325, -120.8], 8);

var Stamen_TerrainBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
}).addTo(mymap);

var streams = $.getJSON("Coho_Dist_reproj_simp.geoJson",function(data1){
		L.geoJson(data1, {
			style : function(feature) {
				 return {
						color: "#0080ff",
						fillOpacity: 0.1,
						fillColor: "#blue",
						weight: 1,
				}
			}
		}).addTo(mymap);
		});


var barriers = $.getJSON("Coho_bar_reproj.geoJson",function(data){
 	 	L.geoJson(data, {
      pointToLayer: function(feature, latlng){
				var color,
				year = feature.properties.YearCorrec;
								if (year > 2018) color = 'yellow';
								else if (year > 2015) color = 'orange';
								else if (year > 2010) color = 'red';
								else if (year > 2005) color = 'purple';
								else if (year > 2000) color = 'blue';
								else color = 'green';
        var marker = L.circleMarker(latlng, {radius: 3, color: color});
        marker.bindPopup("County: " + feature.properties.Cnty_Name + "<br>Stream Name: " + feature.properties.Stream_Nam + "<br>Tributary to: " + feature.properties.TribTo_Nam + "<br>WRIA Code: " + feature.properties.WRIA_Num);
        return marker;
      }
    }).addTo(mymap);
		});

(function (){
    'use strict';

    angular
        .module(APP.NAME)
        .component('mapDetails',{
            templateUrl: '/app/content/client/sites/mapDetails.html' ,
            controller: 'mapController'
        });
})();

(function (){
    'use strict';

    angular
        .module(APP.NAME)
        .controller('mapController', MapController);

    MapController.$inject('$scope');

    function MapController($scope){
        var vm = this;
        vm.$scope = $scope;
        vm.$onInit = _onInit;

        function _onInit(){
            console.log('onInit: mapController');
            function initMap() {
                var myLatLng1 = { lat: 34.041025, lng: -118.269642 };
                var myLatLng2 = { lat: 34.0739, lng: -118.2400 };
    
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 13,
                    center: { lat: 34.041025, lng: -118.269642 }
                });
    
                //Train routes
                var transitLayer = new google.maps.TransitLayer();
                transitLayer.setMap(map);
                //
    
                //setting specific markers on map
                var marker1 = new google.maps.Marker({
                    position: myLatLng1,
                    map: map,
                    title: 'Hub1'
                });
    
                var marker2 = new google.maps.Marker({
                    position: myLatLng2,
                    map: map,
                    title: 'Hub2'
                });
                //
    
                //draggable routes
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer({
                    draggable: true,
                    map: map,
                    panel: document.getElementById('right-panel')
                });
    
                directionsDisplay.addListener('directions_changed', function () {
                    computeTotalDistance(directionsDisplay.getDirections());
                });
    
                displayRoute('LA Convention Center, CA', 'Dodgers Stadium, CA', directionsService,
                    directionsDisplay);
            }
    
            function displayRoute(origin, destination, service, display) {
                service.route({
                    origin: origin,
                    destination: destination,
                    waypoints: null, //[{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}]
                    travelMode: 'DRIVING',
                    avoidTolls: true
                }, function (response, status) {
                    if (status === 'OK') {
                        display.setDirections(response);
                    } else {
                        alert('Could not display directions due to: ' + status);
                    }
                });
            }
    
            function computeTotalDistance(result) {
                var total = 0;
                var myroute = result.routes[0];
                for (var i = 0; i < myroute.legs.length; i++) {
                    total += myroute.legs[i].distance.value;
                }
                total = total / 1000;
                document.getElementById('total').innerHTML = total + ' km';
            }
        }
    }
        
})();
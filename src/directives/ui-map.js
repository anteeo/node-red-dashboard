/* global angular */
angular.module('ui').directive('uiMap', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var map = null,
                marker = L.marker([53.1231595, 18.00187]), // It must begin with any position
                polyline = L.polyline([], {
                    color: 'blue'
                });

            var currentValue = [];

            scope.$watch("me.item.value", function (value) {
                if (Array.isArray(value)) {
                    currentValue[0] = value[0];
                    currentValue[1] = value[1];
                } else if (typeof value === "object") {
                    currentValue[0] = value.lat;
                    currentValue[1] = value.lng;
                }

                if (currentValue.length > 0) {
                    polyline.addLatLng(currentValue);
                    marker.setLatLng(currentValue);

                    if (map !== null) {
                        if (!map.hasLayer(marker)) {
                            // If map doesn't have marker, add it
                            marker.addTo(map);
                        }
                        if (!map.hasLayer(polyline)) {
                            // If map doesn't have polyline, add it
                            polyline.addTo(map);
                        }
                        // Change marker position and pan zoom to its' new location
                        map.panTo(currentValue);
                    }
                }
            })
            $timeout(function () {
                element.text("");

                map = L.map(element[0]);
                map.setZoom(13);

                L.tileLayer(scope.$eval("me.item.tileUrl"), {
                    attribution: scope.$eval("me.item.attribution")
                }).addTo(map);

                if (currentValue.length > 0) {
                    // If value has already arrived, just pan zoom to it and add marker and polyline
                    map.panTo(currentValue);
                    marker.addTo(map);
                    polyline.addTo(map);
                }
            }, 500);
        }
    }
}]);
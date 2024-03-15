import React, { useEffect, useState } from 'react';

export const Map = () => {
    const [infoWindow, setInfoWindow] = useState(null);

    useEffect(() => {
        const initAutocomplete = () => {
            const map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: -33.8688, lng: 151.2195 },
                zoom: 13,
                mapTypeId: "roadmap",
            });
            const input = document.getElementById("pac-input");

            // Create SearchBox after the Google Maps script is loaded
            const searchBox = new window.google.maps.places.SearchBox(input);

            map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

            map.addListener("bounds_changed", () => {
                searchBox.setBounds(map.getBounds());
            });

            let markers = [];

            const createInfoWindow = (content) => {
                return new window.google.maps.InfoWindow({
                    content,
                });
            };

            searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();

                if (places.length === 0) {
                    return;
                }

                markers.forEach((marker) => {
                    marker.setMap(null);
                });
                markers = [];

                const bounds = new window.google.maps.LatLngBounds();

                places.forEach((place) => {
                    if (!place.geometry || !place.geometry.location) {
                        console.log("Returned place contains no geometry");
                        return;
                    }

                    const icon = {
                        url: place.icon,
                        size: new window.google.maps.Size(71, 71),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(17, 34),
                        scaledSize: new window.google.maps.Size(25, 25),
                    };

                    const marker = new window.google.maps.Marker({
                        map,
                        icon,
                        title: place.name,
                        position: place.geometry.location,
                    });

                    const contentString = `<div><strong>${place.name}</strong><br>${place.formatted_address}</div>`;

                    const infowindow = createInfoWindow(contentString);

                    marker.addListener("click", () => {
                        if (infoWindow) {
                            infoWindow.close();
                        }
                        infowindow.open(map, marker);
                        setInfoWindow(infowindow);
                    });

                    markers.push(marker);
                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
        };

        window.initAutocomplete = initAutocomplete;

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDFyYWfngcDExH5QVcJtUaAXMFgIdwFtok&libraries=places&callback=initAutocomplete`;
        script.defer = true;
        document.head.appendChild(script);

        return () => {
            // Clean up function
            delete window.initAutocomplete;
            document.head.removeChild(script);
        };
    }, []);

    return (
        <div>
            <input id="pac-input" type="text" placeholder="Search Box" />
            <div id="map" style={{ height: '100vh', width: '100%' }}></div>
        </div>
    );
};

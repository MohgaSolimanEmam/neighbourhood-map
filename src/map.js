import React, { Component } from 'react';

export default class Map extends Component {

    state = {
        map: null,
        info: {},
        bounds: {},
        width: window.innerWidth,
        markers: [],
    }

    bounds = new window.google.maps.LatLngBounds();
    // opens the active marker on side nav bar click
    openInfoWindow = (activeLoca) => {
        if (!activeLoca) return;
        const activeMarker = this.state.markers.find(marker => {
            return marker.title === activeLoca.title ;
            
        })
        this.infoWindowInit(activeMarker);
    }


    settingMap = () => {
        //  save the map and markers array to the state
        this.setState({
            map: new window.google.maps.Map(document.getElementById('map'), {

                //  map center
                center: { lat: 30.0083745, lng: 31.2149558 },
                zoom: 10
            }),
            bounds: new window.google.maps.LatLngBounds(),
            info: new window.google.maps.InfoWindow()
        }, () => {
            // makes  the markers appear triggered only initial
            this.createMarkers();
        }
        )
    };
    // funciton to  open the info window  if the marker is clicked
    infoWindowInit = (marker) => {
        const infoWindow = this.state.info;
        if (infoWindow.marker !== marker) {
            infoWindow.setContent(`
            <h3>${marker.title}</h3>
            <p id="infoaddress">${marker.address}</p>`);
            infoWindow.marker = marker;
            infoWindow.addListener('closeclick', function () {
                infoWindow.marker = null;
            });
            infoWindow.open(this.state.map, marker)
        }
    }

    createMarkers = () => {
        // adding markers to array
        const that = this;
        console.log(this.props.locations);
        const markers = that.props.locations.map((location, index) => {
            const marker = new window.google.maps.Marker({
                position: location.location,
                title: location.title,
                address: location.formattedAddress,
                photo: location.photo,
                animation: window.google.maps.Animation.DROP,
                id: index,
                map: this.state.map
            });
            // adding event listener to every marker
            this.bounds.extend(marker.position);

            marker.addListener('click', function () {
                // opining the infowindow on click
                that.infoWindowInit(this);
            });
            this.state.map.fitBounds(this.bounds);
            return marker;
        })
        this.setState({ markers: markers })
    };
    deteteFilteredMarkers = () => {
        const filtedMarkers = this.state.markers.filter((marker) => {
            return this.props.locations.find(locaion => {
                return locaion.title === marker.title
            })
        })

        this.state.markers.forEach((marker) => marker.setMap(null));


        filtedMarkers.forEach((marker) => {
            marker.setMap(this.state.map);
        });
    }


    componentDidUpdate() {
        this.openInfoWindow(this.props.activeLocation);
        if (this.state.markers.length !== this.props.locations.length) {
            this.deteteFilteredMarkers();

        }

    }

    componentDidMount() {
        this.settingMap();
        window.gm_authFailure = () => {
            alert('map failed')
        }
    }

    render() {
        return (
            <div id="map" className="map" tabIndex="4" role="map"></div>
        )
    }
}

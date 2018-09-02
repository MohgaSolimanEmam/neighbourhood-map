import React, {Component} from 'react';
import scriptLoader from 'react-async-script-loader';
import Map from './map'
import './App.css';
import Sidenav from "./Sidenav";
import { Places, url} from "./data/foursquare";

class App extends Component {

    state = {
        map: {},
        info: {},
        bounds: {},
        width: window.innerWidth,
        mapReady: false,
        locations: [],
        filteredPlaces: [],
        activeLocation:null
    };

    filterPlace = (filterText) => {

        const newFilteredPlaces = this.state.locations.filter(location => {
            return location.title.toLowerCase().indexOf(filterText.toLowerCase()) > -1;
        })
        this.setState({
            filteredPlaces: newFilteredPlaces
        })
    };

    changeActiveMarker = (activeLocation) => {
        this.setState({
            activeLocation:activeLocation
        })
    }

    componentWillReceiveProps({isScriptLoaded, isScriptLoadSucceed}) {
        if (isScriptLoaded && !this.props.isScriptLoaded) {
            // load finished
            if (isScriptLoadSucceed) {
                if (window.google) {
                    this.setState({mapReady: true});
                }
            }
        } else {
            alert('map didn`t load')
        }
    };
    componentDidMount() {
        // calling the API and change the state
        Places(url).then(data => {
            const places = data.response.venues.map(place => {
              return ({
                  formattedAddress: place.location.formattedAddress,
                    title: place.name,
                    location: place.location.labeledLatLngs[0]
                })
            })
            this.setState({
                locations: places,
                filteredPlaces: places
            })
        }).catch(error => alert(error));


    }


    render() {


        return (
            <div className="content">
                <Sidenav
                    locations={this.state.filteredPlaces}
                    changeActiveMarker={this.changeActiveMarker}
                    filter={this.filterPlace} />
                
                <main className="container" role="main">
                    {(this.state.mapReady && this.state.locations.length > 0) && <Map
                        activeLocation={this.state.activeLocation}
                        locations={this.state.filteredPlaces}
                    />}
                </main>
            </div>
        );
    }
}


export default scriptLoader(
    [
        'https://maps.googleapis.com/maps/api/js?key=',
    ]
)(App);

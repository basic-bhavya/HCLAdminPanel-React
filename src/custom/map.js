import React, { Component } from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';



// const MyMapComponent = (props) => (
//   <GoogleMap
//     defaultZoom={10}
//     defaultCenter={{ lat: 28.546190, lng: 77.556213 }}
//   >
//     {props.isMarkerShown && <Marker position={{ lat: 28.546190, lng: 77.556213 }} />}
//   </GoogleMap>
// )

// const WrappedMap = withScriptjs(withGoogleMap(Map))

class MapContainer extends Component {
  render() {
    return (
      <div className="MapContainer">
        <Map
          google={this.props.google}
          zoom={5}
          initialCenter={{ lat: 20.593683, lng: 78.962883 }}>

          <Marker
            title={'This is the title'}
            onClick={this.onMarkerClick}
            position={{ lat: 22.546190, lng: 71.556213 }}
            name={'Current location'}
            icon={{
              url: 'https://image.flaticon.com/icons/png/512/1978/premium/1978149.png',
              anchor: new this.props.google.maps.Point(32,32),
              scaledSize: new this.props.google.maps.Size(64,64)
            }} />

          <Marker
            title={'This is the title'}
            onClick={this.onMarkerClick}
            position={{ lat: 24.546190, lng: 78.556213 }}
            name={'Current location'}
            icon={{
              url: 'https://image.flaticon.com/icons/png/512/2326/2326355.png',
              anchor: new this.props.google.maps.Point(32,32),
              scaledSize: new this.props.google.maps.Size(64,64)
            }} />

          <InfoWindow onClose={this.onInfoWindowClose}>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

// export default MapContainer;

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo')
})(MapContainer)
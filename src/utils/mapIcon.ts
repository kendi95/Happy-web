import Leaflet from 'leaflet';

import mapMarker from '../assets/map-marker.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarker,
  iconAnchor: [29, 68],
  iconSize: [58, 68],
  popupAnchor: [170, 2]
})

export default mapIcon;
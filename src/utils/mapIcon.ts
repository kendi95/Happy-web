import Leaflet from 'leaflet';

const mapIcon = Leaflet.icon({
  iconUrl: require('../assets/map-marker.svg'),
  iconAnchor: [29, 68],
  iconSize: [58, 68],
  popupAnchor: [170, 2]
})

export default mapIcon;
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from "../images/icon-location.svg"
import { addOffset, addTileLayer, getAddress, validateIp } from './helpers';


const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('button')
const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timeZoneInfo = document.querySelector('#timezone')
const ispInfo = document.querySelector('#isp')

ipInput.addEventListener('keydown', handleKey);
btn.addEventListener('click', getData);

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [40, 50],
})

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13
});
addTileLayer(map)
L.marker([51.5, -0.09], { icon: markerIcon }).addTo(map);

function getData() {
  if (validateIp(ipInput.value)) {
    getAddress(ipInput.value)
      .then(setInfo)
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

function setInfo( mapData) {
  console.log('mapData: ', mapData);
  const {lat, lng, city, region, timezone} = mapData.location;
  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = city + ", " + region;
  timeZoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng]);
  L.marker([lat, lng], { icon: markerIcon }).addTo(map);

  if (matchMedia("(max-width: 1023px)").matches) {
    addOffset(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getAddress('2.63.172.255').then(setInfo)
})


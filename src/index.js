'use strict';

import 'babel-polyfill';
import L, { marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { addOffsetY, addTileLayer, getAdress, validateIp } from './helpers';
import icon from '../images/icon-location.svg';

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');
const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

const markerIcon = L.icon({
  iconUrl: icon,
  iconSize: [30, 40]
});

const map = L.map('map').setView([51.505, -0.09], 13);
addTileLayer(map);
let currentMarker = L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
  if (validateIp(ipInput.value)) {
    getAdress(ipInput.value).then(setData);
  }
}

function handleKey(e) {
  if (e.key === 'Enter') {
    getData();
  }
}

function setData(mapData) {
  const { lat, lng, country, timezone, region } = mapData.location;

  ipInfo.innerText = mapData.ip;
  locationInfo.innerText = country + ' ' + region;
  timezoneInfo.innerText = timezone;
  ispInfo.innerText = mapData.isp;

  map.setView([lat, lng], 13);
  currentMarker.setLatLng([lat, lng]);

  if (window.matchMedia('(max-width: 1023px)').matches) {
    addOffsetY(map);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  getAdress('102.22.22.1').then(setData);
});

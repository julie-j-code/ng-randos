import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
// pour l'autocomplétion et l'apparition des résultats de recherche
// import "leaflet/dist/leaflet.css";
import * as L from 'leaflet';
import * as ELG from "esri-leaflet-geocoder";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";

import { Hike } from '../shared/hike';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  map: any;
  marker: any;
  @Input() hikeCoords: any;
  @Input() hike: Hike;
  lat: any
  lng: any;
  markerFocus: any
  descriptionMap: string = ""

  // retrieve from https://gist.github.com/ThomasG77/61fa02b35abf4b971390
  smallIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    shadowSize: [41, 41]
  });

  constructor() {
  }

  ngAfterViewInit(): void {
    this.createMap();

    // pour actionner draggable marker
    this.marker.on('dragend', () => {
      console.log("coucou")

      this.lat = this.marker.getLatLng().lat;
      this.lng = this.marker.getLatLng().lng
      this.marker.setLatLng([this.lat, this.lng]);
      console.log(this.lat)
      console.log(this.lng)
      // en js on aurait un truc du genre : 
      // document.getElementById('latitude').value = marker.getLatLng().lat;
      // document.getElementById('longitude').value = marker.getLatLng().lng;

    });

    

  }


  createMap() {
    console.log("lala", this.hikeCoords)

    if (this.hikeCoords !== 0) {
      this.markerFocus = {
        lat: this.hikeCoords.lat,
        lng: this.hikeCoords.lng
      };
      this.descriptionMap = this.hike.name

    } else {
      // le  point de focus par défaut qui sera plus tard celui du visiteur
      this.markerFocus = {
        lat: 48.114384,
        lng: -1.669494
      };
      this.descriptionMap = `
      Le parc du Thabor, situé à Rennes à proximité du centre-ville,
      est un parc public aménagé sur plus de dix hectares dont la particularité est de mêler un jardin à la française,
      un jardin à l’anglaise et un important jardin botanique.`
    }

    const zoomLevel = 12;

    this.map = L.map('map', {
      center: [this.markerFocus.lat, this.markerFocus.lng],
      zoom: zoomLevel
    });

    const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 12,
      maxZoom: 17,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    mainLayer.addTo(this.map);

    const popupOptions = {
      coords: this.markerFocus,
      text: this.descriptionMap,
      open: true
    };

    this.addMarker(popupOptions);

  // pour la recherche
  const searchControl = new ELG.geosearch({
    useMapBounds: false,
    background: { // autocasts new ColorBackground()
      color: "magenta" // autocasts as new Color()
    },
    providers: [
      ELG.arcgisOnlineProvider({
        apikey: "AAPK829991d5c6a8476c8914fba4c8c8a7a3KooiYZEgRAUO1gESaLfnIdgcBSKEAR4KUUnDXl7tFJMmTL76Rh-8z8XMX5uRnEri"
      })
    ]
  });

  const results = new L.LayerGroup().addTo(this.map);
  searchControl
  .on("results", function (data) {
    results.clearLayers();
    for (let i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  })
  .addTo(this.map);

  this.map.on("click", (e) => {
   new ELG.ReverseGeocode().latlng(e.latlng).run((error, result) => {
     if (error) {
       return;
     }
     if (this.marker && this.map.hasLayer(this.marker))
       this.map.removeLayer(this.marker);

     this.marker = L.marker(result.latlng)
       .addTo(this.map)
       .bindPopup(result.address.Match_addr)
       .openPopup();
   });
 });
 // fin de la recherche


  }

  addMarker({ coords, text, open }) {

    this.marker = L.marker([coords.lat, coords.lng], { icon: this.smallIcon, draggable: true });
    if (open) {
      this.marker.addTo(this.map).bindPopup(text).openPopup();
    } else {
      this.marker.addTo(this.map).bindPopup(text);
    }


  }

  


  // marker.on('dragend', function (e) {
  //   document.getElementById('latitude').value = marker.getLatLng().lat;
  //   document.getElementById('longitude').value = marker.getLatLng().lng;
  // });


}
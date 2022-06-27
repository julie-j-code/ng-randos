import { AfterContentInit, Component, OnInit } from '@angular/core';
// import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";
import * as ELG from "esri-leaflet-geocoder";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

@Component({
  selector: 'app-map-localisation',
  templateUrl: './map-localisation.component.html',
  styleUrls: ['./map-localisation.component.css']
})
export class MapLocalisationComponent implements OnInit {
  map: any;
  marker: any;
  results: any;

  constructor() { }

  ngOnInit(): void {
    if (!navigator.geolocation) {
      console.log('location is not supported');

      this.map = L.map("map").setView([51.505, -0.09], 3);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }
    // si la localisation a été activée
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      // const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      this.map = L.map('map').setView([coords.latitude, coords.longitude], 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      ).addTo(this.map);

      this.marker = L.marker([coords.latitude, coords.longitude]).addTo(this.map);

      this.marker.bindPopup('<b>Hi</b>').openPopup();

      let popup = L.popup()
        .setLatLng([coords.latitude, coords.longitude])
        .setContent('Vous êtes ici !')
        .openOn(this.map);
    });

    this.watchPosition();

  }


  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }



}

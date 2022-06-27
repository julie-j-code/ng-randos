import { Component, OnInit } from "@angular/core";
// import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";
import * as ELG from "esri-leaflet-geocoder";
import Geocoder from 'leaflet-control-geocoder';

// import marker icons

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
});

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  marker: any;
  map: any;

  ngOnInit() {

    this.map = L.map("map").setView([51.505, -0.09], 3);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);


    const searchControl = new ELG.geosearch({
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

    console.log(new ELG.ReverseGeocode());
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
  }
}
import { Component, AfterViewInit, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { Hike } from '../shared/hike';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  map: any;
  marker: any;
  @Input() hikeCoords: any;
  @Input() hike: any;
  lat: any
  lng: any;
  markerFocus: any
  descriptionMap:string=""

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

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.createMap();





    this.marker.on('dragend', () => {
      // Do stuff
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log("y a eu du changement")
    console.log(changes)
    console.log("focus sur changements", changes.hikeCoords.currentValue)
    this.hikeCoords = changes.hikeCoords.currentValue
    console.log(this.hikeCoords)



  }

  createMap() {
    console.log("lala", this.hikeCoords)

    if (this.hikeCoords !== 0) {
      this.markerFocus = {
        lat: this.hikeCoords.lat,
        lng: this.hikeCoords.lng
      };
      this.descriptionMap=this.hike.name

    } else {
      this.markerFocus = {
        // lat:48.11855897570442,
        // lng:-1.6051587229594593
        lat: 48.114384,
        lng: -1.669494
      };
      this.descriptionMap=`
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
    // const descriptionMap = `
    //   Le parc du Thabor, situé à Rennes à proximité du centre-ville,
    //   est un parc public aménagé sur plus de dix hectares dont la particularité est de mêler un jardin à la française,
    //   un jardin à l’anglaise et un important jardin botanique.`;

    const popupOptions = {
      coords: this.markerFocus,
      text: this.descriptionMap,
      open: true
    };
    this.addMarker(popupOptions);

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
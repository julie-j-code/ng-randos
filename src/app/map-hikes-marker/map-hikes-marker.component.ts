import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MarkerService } from '../marker.service';
import { Hike } from '../shared/hike';
import { HikeService } from '../shared/hike.service';

// import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package


@Component({
  selector: 'app-map-hikes-marker',
  templateUrl: './map-hikes-marker.component.html',
  styleUrls: ['./map-hikes-marker.component.css']
})
export class MapHikesMarkerComponent implements AfterViewInit {

  map: any;
  marker: any;

  //   @Input() hikeCoords;
  //   private marker;

  // private map: L.Map;
  // private centroid: L.LatLngExpression = [48.114384, -1.669494]; //

  // private initMap(): void {
  //   this.map = L.map('map', {
  //     center: this.centroid,
  //     zoom: 12
  //   });

  //   const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 18,
  //     minZoom: 10,
  //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });


  //   tiles.addTo(this.map);

  //   this.marker.addTo(this.map)
  
  // }

  // constructor(private markerService: MarkerService, private service:HikeService) { }

  // ngOnInit(): void {
  //   this.initMap();
  //   // this.markerService.makeCapitalMarkers(this.map);
  //   this.marker=this.service.makeMarker(this.map);
    
  // }



  
    constructor(private service : HikeService) {
    }
  
    ngAfterViewInit(): void  {
      this.createMap();
      this.service.makeMarker(this.map)   
  
    }
  

    createMap() {  
 
      this.map = L.map('map').setView([46.1313653,-2.4362227],5)
  
      const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
 
      maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
  
      mainLayer.addTo(this.map);
    
    }
  

  
  
    }
  
    
  
  
    // marker.on('dragend', function (e) {
    //   document.getElementById('latitude').value = marker.getLatLng().lat;
    //   document.getElementById('longitude').value = marker.getLatLng().lng;
    // });
  
  
  
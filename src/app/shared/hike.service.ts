import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hike } from './hike';
import * as L from "leaflet";


@Injectable({
  providedIn: 'root'
})
export class HikeService {
  private _url: string = 'http://localhost:3400/hikes'
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

  constructor(private http: HttpClient) { }

  getHikes(): Observable<Hike[]> {
    return this.http.get<Hike[]>(this._url)

  }

  getHikesById(id: number): Observable<Hike> {
    return this.http.get<Hike>(`${this._url}/${id}`)
  }


  makeMarker(map: L.Map): void {

    this.http.get<Hike[]>(this._url).subscribe(res => {
      for (const c of res) {
        if (c.coords) {
          console.log(c.coords.lat);
          const lat = c.coords.lat;
          const lon = c.coords.lng;
          const marker = L.marker([lat, lon], { icon: this.smallIcon }).addTo(map)
            .bindPopup(c.name)
            .openPopup();
        }

      }

    })


  }


  postHike(newHike: Hike) {
    return this.http.post(this._url, newHike)
  }

  editHike(hikeToEdit: any) {
    return this.http.put<Hike>(`${this._url}/${hikeToEdit.id}`, hikeToEdit)

  }

}

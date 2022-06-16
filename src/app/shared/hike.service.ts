import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hike } from './hike';


@Injectable({
  providedIn: 'root'
})
export class HikeService {
  private _url:string='/assets/hikes.json'

  constructor(private http:HttpClient) { }



 getHikes():Observable<Hike[]> {
  return this.http.get<Hike[]>(this._url)

}

}

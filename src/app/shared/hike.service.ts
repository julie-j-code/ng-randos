import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hike } from './hike';


@Injectable({
  providedIn: 'root'
})
export class HikeService {
  private _url:string='http://localhost:3400/hikes'

  constructor(private http:HttpClient) { }

 getHikes():Observable<Hike[]> {
  return this.http.get<Hike[]>(this._url)

}

getHikesById(id:number):Observable<Hike>{
  return this.http.get<Hike>(`${this._url}/${id}`)

}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hike } from '../shared/hike';
import { HikeService } from '../shared/hike.service';

@Component({
  selector: 'app-hike-details',
  templateUrl: './hike-details.component.html',
  styleUrls: ['./hike-details.component.css']
})
export class HikeDetailsComponent implements OnInit {
  hike:any={
    "id": 0,
    "name": "",
    "duration": 0,
    "region": "",
    "startingPoint": "",
    "distance": 0,
    "distanceUnit": "km",
    "heightDifference": 0,
    "evaluation": [0],
    "description": ""
  }

  title: string=""

  constructor(private service:HikeService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.title = `Détails de la randonnée ${id}`;
    this.service.getHikesById(id).subscribe(data=>this.hike=data);
  }


}

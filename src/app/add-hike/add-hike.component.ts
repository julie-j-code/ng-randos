import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Hike } from '../shared/hike';
import { HikeService } from '../shared/hike.service';

@Component({
  selector: 'app-add-hike',
  templateUrl: './add-hike.component.html',
  styleUrls: ['./add-hike.component.css']
})
export class AddHikeComponent implements OnInit {
  hikes:any
  newHike:any
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

  id:number=0;

  constructor(private service:HikeService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.service.getHikes().subscribe(data =>this.hikes=data)
    if (this.route.snapshot.params['id']) {
      this.id = +this.route.snapshot.params['id'];


if (this.id>0) {
  this.service.getHikesById(this.id).subscribe(data=>this.hike=data)  
}

    }
    
  }



  createHike(newHike:NgForm){
    // inutile de forcer la valeur de l'id. Erreur de ma part !
    // newHike.value['id']= this.hikes.length;
    this.service.postHike(newHike.value).subscribe((myVar)=>{  
      this.hikes = [myVar,...this.hikes]
    })

  }

  editHike(hikeToEdit:NgForm){
    console.log(hikeToEdit)
    this.service.editHike(hikeToEdit).subscribe(data=>console.log(data))
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  
 

  constructor(private service:HikeService) { }

  ngOnInit(): void {

    this.service.getHikes().subscribe(data =>this.hikes=data)
  }

  createHike(newHike:NgForm){
    // inutile de forcer la valeur de l'id. Erreur de ma part !
    // newHike.value['id']= this.hikes.length;
    this.service.postHike(newHike.value).subscribe((myVar)=>{  
      this.hikes = [myVar,...this.hikes]
    })

  }

}

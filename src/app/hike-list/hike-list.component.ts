import { Component, OnInit } from '@angular/core';
import { Hike } from '../shared/hike';
import { HikeService } from '../shared/hike.service';

@Component({
  selector: 'app-hike-list',
  templateUrl: './hike-list.component.html',
  styleUrls: ['./hike-list.component.css']
})
export class HikeListComponent implements OnInit {
  title:string="Liste des randonnées";
  hikes:Hike[]=[];
  searchTerms:string="";

  constructor(private service:HikeService) { }

  ngOnInit(): void {
    this.service.getHikes().subscribe(data =>this.hikes=data)
  }

  getAll():any {
    this.service.getHikes(); 
  
  }
 

}

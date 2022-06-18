import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  title:string='Nous contacter'

  constructor(private service:ContactService) { }

  ngOnInit(): void {
  }

  sendMessage(form:NgForm){
    // console.log(form.value)
    this.service.postContactForm(form);

  }

}

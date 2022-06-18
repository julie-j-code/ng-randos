import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  postContactForm(contactForm:any){
    console.log(contactForm.value)

  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {ReCaptchaV3Service} from 'ng-recaptcha';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent   {




  contactData = {
    name: '',
    email: '',
    message: '',
  };
  recaptchaV3Service: any;

  constructor(private http: HttpClient,recaptchaV3Service: ReCaptchaV3Service) {}
 
 

  //constructor(private recaptchaV3Service: ReCaptchaV3Service) {}

  onSubmit() {
    //this.recaptchaV3Service.execute('submit').subscribe((token) => {
      
    //})

    this.http.post('http://127.0.0.1:5000/contact', this.contactData).subscribe(
      (response) => {
        console.log('Message sent successfully', response);
        
        // Optionally reset the form or show a success message here
      },
      (error) => {
        console.error('Error sending message', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }
}

import { Component } from '@angular/core';
import { MessageListComponent } from '../message-list/message-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MessageListComponent,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showMessage = false;

  
  toggleMessageList(){
  this.showMessage = !this.showMessage;
  }

  scrollTo(section: string) {
    const element = document.getElementById(section);
  if (element) {
   element.scrollIntoView({ behavior: 'smooth' });
    }}

}

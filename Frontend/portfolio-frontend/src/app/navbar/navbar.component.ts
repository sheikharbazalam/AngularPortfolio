import { Component } from '@angular/core';
import { MessageListComponent } from '../message-list/message-list.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MessageListComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showMessage = false;

  
  toggleMessageList(){
  this.showMessage = !this.showMessage;
  }

}

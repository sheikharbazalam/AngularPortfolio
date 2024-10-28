import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-menubars',
  standalone: true,
  templateUrl: './menubars.component.html',
  styleUrls: ['./menubars.component.css'],
  imports: [CommonModule],
   // Include CommonModule here
})
export class MenubarsComponent {
  socials = [
    
    {
      link: "https://www.linkedin.com/in/sheikh-arbaz-alam-6b6b46172/",
      label: "LinkedIn",
      icon: 'fab fa-linkedin' // Font Awesome class for LinkedIn
    },
    /*{
      link: "https://github.com/thespoof-source",
      label: "GitHub",
      icon: 'fab fa-github' // Font Awesome class for GitHub
    },
    {
      link: "https://codepen.io/thespoof14",
      label: "CodePen",
      icon: 'fab fa-codepen' // Font Awesome class for CodePen
    },*/
  ];

  resumeLink = "https://strath-my.sharepoint.com/:w:/r/personal/sheikh_alam_2022_uni_strath_ac_uk/_layouts/15/doc2.aspx?sourcedoc=%7BC5B04EC6-C846-43D1-BFF9-23D46554D832%7D&file=SheikhArbazAlam_CV%20.docx&action=default&mobileredirect=true&DefaultItemOpen=1&ct=1713912054207&wdOrigin=OFFICECOM-WEB.START.REC&cid=97c7340d-db61-4229-99e1-b3bca051cc2f&wdPreviousSessionSrc=HarmonyWeb&wdPreviousSession=7eca50cb-e8c9-41db-8b22-6d768277b54a";
}

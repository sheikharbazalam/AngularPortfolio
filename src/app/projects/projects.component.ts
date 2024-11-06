import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(
      (data) => {
        this.projects = data;
        console.log('Projects loaded:', data);
      },
      (error: HttpErrorResponse) => {  // Use HttpErrorResponse for a more specific type
        console.error('Error loading projects:', error);
      }
    );
  }
}

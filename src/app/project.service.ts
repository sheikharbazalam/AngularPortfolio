import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // Ensures this service is a singleton across the app
})
export class ProjectService {
  private apiUrl = 'http://localhost:5000/projects';  // Your Flask API endpoint

  constructor(private http: HttpClient) {}

  // Method to get all projects
  getProjects(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Method to add a project
  addProject(projectData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.apiUrl, projectData, { headers });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private apiUrl = 'http://localhost:5165/api/issues';

  constructor(private http: HttpClient) {}

 getIssues() {
  return this.http.get<any[]>(this.apiUrl);
}

  addIssue(issue: any) {
    return this.http.post(this.apiUrl, issue);
  }

  updateIssue(id: number, issue: any) {
  return this.http.put(`http://localhost:5165/api/issues/${id}`, issue);
}

  deleteIssue(id: number) {
  return this.http.delete(
    `http://localhost:5165/api/issues/${id}`,
    { responseType: 'text' }   
  );
}

}

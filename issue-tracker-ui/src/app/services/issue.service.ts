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

  deleteIssue(id: number) {
  return this.http.delete(
    `http://localhost:5165/api/issues/${id}`,
    { responseType: 'text' }   
  );
}

getComments(issueId: number) {
  return this.http.get<any[]>(
    `http://localhost:5165/api/issues/${issueId}/comments`
  );
}

addComment(data: any) {
  return this.http.post(
    `http://localhost:5165/api/issues/comments`,
    data
  );
}

getIssuesByUser(userId: number) {
  return this.http.get<any[]>(
    `${this.apiUrl}/assigned/${userId}`
  );
}

updateIssue(issueId: number, payload: any) {
  return this.http.put(
    `http://localhost:5165/api/issues/${issueId}`,
    payload
  );
}

getMyIssues(userId: number) {
  return this.http.get<any[]>(
    `http://localhost:5165/api/issues/assigned/${userId}`
  );
}



}

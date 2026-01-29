import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5165/api/users';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addUser(user: any) {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(id: number, user: any) {
  return this.http.put(`http://localhost:5165/api/Users/${id}`, user);
}

deleteUser(id: number) {
  return this.http.delete(`http://localhost:5165/api/Users/${id}`);
}
}

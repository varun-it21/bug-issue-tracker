import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';   

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf], 
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class AdminLayout {

  showMenu = false;

  constructor(private router: Router) {}

  
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  viewProfile() {
    alert('Profile page coming soon 👤');
    this.showMenu = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}

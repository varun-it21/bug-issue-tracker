import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-add-users',
  standalone: true,
  imports: [FormsModule, CommonModule,NgIf,NgFor],
  templateUrl: './add-users.html',
  styleUrl: './add-users.css',
})
export class AddUsers implements OnInit {

  users: any[] = [];
  searchText = '';
  showAddUser = false;
  showView = false;
  showEdit = false;
  showDelete = false;
  selectedUser: any = null;
  currentPage = 1;
pageSize = 5;
  newUser = {
    user_name: '',
    user_email: '',
    password: '',
    role_id: 2,
    is_active: true
  };

  constructor(
  private userService: UserService,
  private router: Router,
  private cdr: ChangeDetectorRef 
){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}

  ngOnInit() {
  this.loadUsers();
}

loadUsers() {
  this.userService.getUsers().subscribe(data => {
    console.log("Users from API:", data);
    this.users = [...data];  
    this.cdr.detectChanges(); 
  });
}

  openAddUser() {
    this.showAddUser = true;
  }

  closeAddUser() {
    this.showAddUser = false;
    this.resetForm();
  }

  resetForm() {
    this.newUser = {
      user_name: '',
      user_email: '',
      password: '',
      role_id: 2,
      is_active: true
    };
  }

  addUser() {
    this.userService.addUser(this.newUser).subscribe(() => {
      alert("User added successfully ✅");
      this.loadUsers();
      this.closeAddUser();
    });
  }

  openView(user: any) {
    this.selectedUser = user;
    this.showView = true;
  }

  openEdit(user: any) {
  this.selectedUser = { ...user }; 
  this.showEdit = true;
}

saveEdit() {
  console.log("Editing user:", this.selectedUser.userId);

  this.userService.updateUser(this.selectedUser.userId, this.selectedUser)
    .subscribe({
      next: () => {
        alert("User updated successfully ✅");
        this.loadUsers();
        this.closePopup();
      },
      error: err => console.error("Update error:", err)
    });
}

  closePopup() {
    this.showView = false;
    this.showEdit = false;
    this.showDelete = false;
    this.selectedUser = null;
  }

  trackByUserId(index: number, user: any) {
  return user.userId;
}

get filteredUsers() {
  return this.users.filter(u =>
    (u.user_name || '').toLowerCase().includes(this.searchText.toLowerCase())
  );
}


get paginatedUsers() {
  const start = (this.currentPage - 1) * this.pageSize;
  const end = start + this.pageSize;
  return this.filteredUsers.slice(start, end);
}

get pageNumbers() {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}

get totalPages() {
  return Math.ceil(this.filteredUsers.length / this.pageSize);
}

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

nextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}

prevPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}


}

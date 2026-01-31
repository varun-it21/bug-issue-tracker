import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-issues',
  standalone: true,
  imports: [FormsModule, CommonModule,NgFor],
  templateUrl: './add-issues.html',
  styleUrl: './add-issues.css',
})
export class AddIssues implements OnInit {

  users: any[] = [];

  issue = {
  title: '',
  description: '',
  priority: 'High',
  status: 'Open',
  assignedTo: null,   
  deadline: '',
  createdBy: 1
};

  constructor(
    private router: Router,
    private issueService: IssueService,
    private userService: UserService
  ) {}

  ngOnInit() {
  this.loadUsers();
}

loadUsers() {
  this.userService.getUsers().subscribe({
    next: (data) => {
      console.log('ADD USERS API 👉', data);
      this.users = data;
    },
    error: (err) => {
      console.error('ADD USERS ERROR ❌', err);
    }
  });
}

 addIssue() {

 if (!this.issue.title || this.issue.title.trim() === '') {
    alert('Issue title is required');
    return;
  }

  if (this.issue.assignedTo === null) {
  alert('Please select a valid user');
  return;
}

if (this.issue.assignedTo === null || this.issue.assignedTo === undefined) {
  alert('Please select a user');
  return;
}

  console.log('FINAL PAYLOAD:', this.issue);

  this.issueService.addIssue(this.issue).subscribe({
    next: () => {
      alert('Issue added successfully ✅');
      this.router.navigate(['/admin/issues']);
    },
    error: (err) => {
      console.error('Validation errors:', err.error?.errors);
    }
  });
}

}

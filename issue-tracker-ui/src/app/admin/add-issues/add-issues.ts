import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-issues',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
  assignedTo: 0,   // will be set from dropdown
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
  this.userService.getUsers().subscribe(data => {
    this.users = data;

    // ✅ auto select first user (avoid FK error)
    if (this.users.length > 0) {
      this.issue.assignedTo = this.users[0].id;
    }
  });
}

  addIssue() {
  console.log('Issue object:', this.issue);

  this.issueService.addIssue(this.issue).subscribe({
    next: (res) => {
      alert('Issue added successfully ✅');
      this.router.navigate(['/admin/issues']);
    },
    error: (err) => {
      console.error('API ERROR:', err);
      alert('Failed to add issue ❌');
    }
  });
}
}

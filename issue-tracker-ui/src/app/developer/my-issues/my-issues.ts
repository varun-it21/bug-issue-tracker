import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-issues',
  standalone: true, // ✅ important
  imports: [CommonModule], // ✅ for ngFor, ngClass
  templateUrl: './my-issues.html',
  styleUrls: ['./my-issues.css'], // ✅ fix styleUrl
})
export class MyIssuesComponent implements OnInit {

  // logged-in user (later replace with real login)
  loggedInUser = 'Varun';

  issues = [
    { issueId: 1, title: 'Login Bug', priority: 'HIGH', status: 'OPEN', assignedTo: 'Varun' },
    { issueId: 2, title: 'UI Bug', priority: 'MEDIUM', status: 'IN_PROGRESS', assignedTo: 'Varun' },
    { issueId: 3, title: 'API Error', priority: 'LOW', status: 'COMPLETED', assignedTo: 'Arun' },
    { issueId: 4, title: 'Security Bug', priority: 'HIGH', status: 'OPEN', assignedTo: 'Varun' },
    { issueId: 5, title: 'DB Issue', priority: 'LOW', status: 'OPEN', assignedTo: 'Karthi' }
  ];

  myIssues: any[] = [];

  ngOnInit(): void {
    this.loadMyIssues();
  }

  loadMyIssues() {
    this.myIssues = this.issues.filter(issue => issue.assignedTo === this.loggedInUser);
  }
}

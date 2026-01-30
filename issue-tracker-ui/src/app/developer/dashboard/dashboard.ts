import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgClass,CommonModule], 
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], 
})
export class DashboardComponent implements OnInit {

  // Simulate logged-in user
  loggedInUser = 'Varun';

  totalIssues = 0;

  priority = {
    high: 0,
    medium: 0,
    low: 0
  };

  status = {
    open: 0,
    inProgress: 0,
    completed: 0
  };

  issues = [
    { issueId: 1, title: 'Login Bug', description: 'Login fails', priority: 'High', status: 'Open', assignedTo: 'Varun' },
    { issueId: 2, title: 'UI Bug', description: 'CSS issue', priority: 'Medium', status: 'In-progress', assignedTo: 'Varun' },
    { issueId: 3, title: 'API Error', description: '500 error', priority: 'Low', status: 'Completed', assignedTo: 'Arun' },
    { issueId: 4, title: 'Security Bug', description: 'XSS issue', priority: 'High', status: 'Open', assignedTo: 'Varun' },
    { issueId: 5, title: 'DB Issue', description: 'Query slow', priority: 'Low', status: 'Open', assignedTo: 'Varun' }
  ];

  myIssues: any[] = [];
  highPriorityIssues: any[] = [];

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {

    // Filter issues for logged-in user
    this.myIssues = this.issues.filter(issue => issue.assignedTo === this.loggedInUser);

    // Total issues count
    this.totalIssues = this.myIssues.length;

    // Reset counts
    this.priority = { high: 0, medium: 0, low: 0 };
    this.status = { open: 0, inProgress: 0, completed: 0 };

    // Priority & Status count
    this.myIssues.forEach(issue => {

      if (issue.priority === 'High') this.priority.high++;
      if (issue.priority === 'Medium') this.priority.medium++;
      if (issue.priority === 'Low') this.priority.low++;

      if (issue.status === 'Open') this.status.open++;
      if (issue.status === 'In-progress') this.status.inProgress++;
      if (issue.status === 'Completed') this.status.completed++;
    });

    // High priority issues (for table)
    this.highPriorityIssues = this.myIssues.filter(issue => issue.priority === 'High');
  }
}

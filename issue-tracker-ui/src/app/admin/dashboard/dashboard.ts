import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboard {

  totalIssues = 3;

  status = {
    open: 1,
    inProgress: 1,
    completed: 1
  };

  priority = {
    high: 1,
    medium: 1,
    low: 1
  };

  issues = [
  {
    issue_id: 1,
    title: 'Login Bug',
    description: 'Login fails for some users',
    priority: 'High',
    status: 'Open',
    assignee: 'John'
  },
  {
    issue_id: 2,
    title: 'UI Issue',
    description: 'Button alignment problem',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Varun'
  },
  {
    issue_id: 3,
    title: 'API Error',
    description: '500 error on dashboard API',
    priority: 'Low',
    status: 'Completed',
    assignee: 'Priya'
  },
  {
    issue_id: 4,
    title: 'Signup Failure',
    description: 'User signup not working',
    priority: 'High',
    status: 'Open',
    assignee: 'Arun'
  },
  {
    issue_id: 5,
    title: 'Database Connection',
    description: 'DB connection timeout',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Karthik'
  },
];

}

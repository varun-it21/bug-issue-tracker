import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';
import { IssueService } from '../../services/issue.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminDashboard implements OnInit {

  issues: any[] = [];

  totalIssues = 0;

  status = {
    open: 0,
    inProgress: 0,
    completed: 0
  };

  priority = {
    high: 0,
    medium: 0,
    low: 0
  };

  constructor(
    private issueService: IssueService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.loadIssues();
  }

  loadIssues() {
    this.issueService.getIssues().subscribe(data => {
      console.log("Dashboard Issues:", data); 

      this.issues = [...data]; 
      this.calculateDashboard();

      this.cdr.detectChanges(); 
    });
  }

  calculateDashboard() {
    this.totalIssues = this.issues.length;

    this.status = { open: 0, inProgress: 0, completed: 0 };
    this.priority = { high: 0, medium: 0, low: 0 };

    for (let issue of this.issues) {
      if (issue.status === 'Open') this.status.open++;
      else if (issue.status === 'InProgress') this.status.inProgress++;
      else if (issue.status === 'Completed') this.status.completed++;

      if (issue.priority === 'High') this.priority.high++;
      else if (issue.priority === 'Medium') this.priority.medium++;
      else if (issue.priority === 'Low') this.priority.low++;
    }
  }

  get highPriorityIssues() {
    return this.issues.filter(i => i.priority === 'High');
  }
}

import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass, CommonModule } from '@angular/common';
import { IssueService } from '../../services/issue.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgClass,CommonModule], 
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'], 
})
export class DashboardComponent implements OnInit {

   loggedInUserId = ''; 
  totalIssues = 0;
  priority = { high:0, medium:0, low:0 };
  status = { open:0, inProgress:0, completed:0 };
  myIssues:any[] = [];
  highPriorityIssues:any[] = [];

  constructor(private issueService: IssueService,
      private router: Router

  ) {}

  ngOnInit() {
    this.loadDashboard(); 
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.loadDashboard();   
    });
  }

  loadDashboard() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.userId;

  console.log("Logged In User From Storage:", user);   
  console.log("UserId Sending To API:", userId);       

  if (!userId) return;
  this.issueService.getIssuesByUser(userId)
    .subscribe((data: any[]) => {
      console.log("Dashboard API Data:", data);       
      this.myIssues = data;
      this.totalIssues = data.length;
      this.priority = { high: 0, medium: 0, low: 0 };
      this.status = { open: 0, inProgress: 0, completed: 0 };

      data.forEach(issue => {
        if (issue.priority === 'High') this.priority.high++;
        if (issue.priority === 'Medium') this.priority.medium++;
        if (issue.priority === 'Low') this.priority.low++;
        if (issue.status === 'Open') this.status.open++;
        if (issue.status === 'InProgress') this.status.inProgress++;
        if (issue.status === 'Completed') this.status.completed++;
      });

      this.highPriorityIssues =
        data.filter(i => i.priority === 'High');
    });
  }
}

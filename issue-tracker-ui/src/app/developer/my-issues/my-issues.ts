import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'app-my-issues',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-issues.html',
  styleUrls: ['./my-issues.css'],
})
export class MyIssuesComponent implements OnInit {
  myIssues: any[] = [];
  commentsMap: { [key: number]: any[] } = {};
  showUpdate = false;
  selectedIssue: any = null;
  comment = '';
  constructor(private issueService: IssueService) {}
  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.userId) {
      console.error('User not logged in');
      return;
    }
    this.issueService.getMyIssues(user.userId).subscribe({
      next: (issues: any[]) => {
        this.myIssues = issues;
        this.myIssues.forEach(issue => {
          this.issueService.getComments(issue.issueId).subscribe(comments => {
            this.commentsMap[issue.issueId] = comments;
          });
        });
      },
      error: err => console.error(err)
    });
  }

  openUpdate(issue: any) {
  if (issue.status === 'Completed') {
    alert('This issue is completed. Only admin can update it.');
    return;
  }

  this.selectedIssue = { ...issue };
  this.comment = '';
  this.showUpdate = true;
}

  closeUpdate() {
    this.showUpdate = false;
    this.selectedIssue = null;
    this.comment = '';
  }

 saveStatus() {
  if (!this.comment.trim()) {
    alert('Comment is required ❗');
    return;
  }
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const payload = {
    issueId: this.selectedIssue.issueId,
    title: this.selectedIssue.title,        
    status: this.selectedIssue.status,      
    description: this.comment,             
    updatedBy: user.userId
  };

  this.issueService.updateIssue(
    this.selectedIssue.issueId,
    payload
  ).subscribe({
    next: () => {
      this.selectedIssue.status = payload.status;
      if (!this.commentsMap[this.selectedIssue.issueId]) {
        this.commentsMap[this.selectedIssue.issueId] = [];
      }
      this.commentsMap[this.selectedIssue.issueId].unshift({
        commentText: this.comment,
        cmtBy: user.userId,
        cmtAt: new Date()
      });
      this.closeUpdate();
    },
    error: err => {
      console.error(err);
      alert('Failed to update status ❌');
    }
  });
}

}

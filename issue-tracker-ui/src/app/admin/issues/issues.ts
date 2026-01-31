  import { Component, OnInit } from '@angular/core';
  import { NgFor, NgClass, NgIf } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { IssueService } from '../../services/issue.service';
  import { UserService } from '../../services/user.service';
  import { DatePipe } from '@angular/common';
  import { Router, NavigationEnd } from '@angular/router';
  import { ChangeDetectorRef } from '@angular/core';


  @Component({
    selector: 'app-issues',
    standalone: true,
    imports: [NgFor, NgClass, FormsModule, NgIf,DatePipe],
    templateUrl: './issues.html',
    styleUrls: ['./issues.css']
  })
  export class Issues implements OnInit {

    searchText = '';
    selectedStatus = '';
    selectedPriority = '';
    showView = false;
    showEdit = false;
    showDelete = false;
    selectedIssue: any = null;
    issues: any[] = [];
    users: any[] = [];
    userMap: any = {}; 
    comments: any[] = [];
  newComment: string = '';
  loggedInUserId = 1; 

    currentPage = 1;
    pageSize = 7;

  constructor(
    private router: Router,
    private issueService: IssueService,
    private userService: UserService,
    private cdr: ChangeDetectorRef 
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.loadUsersAndIssues();
  }

  loadUsersAndIssues() {
  this.userService.getUsers().subscribe(users => {

    console.log("USERS API 👉", users);   // ✅ ADD THIS

    this.users = users;

    this.userMap = {};
    for (let u of this.users) {
  this.userMap[u.userId] = u.user_name;
}


    console.log("USER MAP 👉", this.userMap);   // ✅ ADD THIS

    this.issueService.getIssues().subscribe(data => {

      console.log("ISSUES API 👉", data);   // ✅ ADD THIS

      this.issues = [...data];
      this.cdr.detectChanges();
    });
  });
}


  loadUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;

      this.userMap = {};
for (let u of this.users) {
  this.userMap[u.userId] = u.user_name;
}

      console.log('User Map:', this.userMap);
    });
  }

    loadIssues() {
    this.issueService.getIssues().subscribe((data: any[]) => {
      this.issues = [...data];
    });
  }

   get filteredIssues() {
  return this.issues.filter(issue =>
    (issue.title ?? '')
      .toLowerCase()
      .includes(this.searchText.toLowerCase()) &&
    (this.selectedStatus === '' ||
      (issue.status ?? '') === this.selectedStatus) &&
    (this.selectedPriority === '' ||
      (issue.priority ?? '') === this.selectedPriority)
  );
}

    get paginatedIssues() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredIssues.slice(start, start + this.pageSize);
    }

    get totalPages() {
      return Math.ceil(this.filteredIssues.length / this.pageSize);
    }

    changePage(page: number) {
      this.currentPage = page;
    }

    goToAddIssue() {
      this.router.navigate(['/admin/add-issues']);
    }

    openView(issue: any) {
    this.selectedIssue = issue;
    this.showView = true;
    this.loadComments(issue.issueId); 
  }

openEdit(issue: any) {
  this.selectedIssue = {
    ...issue,
    assignedTo: issue.assignedTo ?? issue.assigned_to ?? issue.AssignedTo
  };
  this.showEdit = true;
}

    openDelete(issue: any) {
  console.log("Delete Issue:", issue);
  this.selectedIssue = { ...issue };
  this.showDelete = true;
}

  saveEdit() {

      console.log('saveEdit() CALLED');
  if (!this.selectedIssue.title || this.selectedIssue.title.trim() === '') {
    alert('Title is required');
    return;
  }
  if (!this.selectedIssue.status || this.selectedIssue.status.trim() === '') {
    alert('Status is required');
    return;
  }
  if (!this.selectedIssue.description || this.selectedIssue.description.trim() === '') {
    alert('Description is required');
    return;
  }

  const id = this.selectedIssue.issueId;

  const updatedIssue = {
    title: this.selectedIssue.title,
    description: this.selectedIssue.description,
    priority: this.selectedIssue.priority,
    status: this.selectedIssue.status,  
    assignedTo: this.selectedIssue.assignedTo,
    deadline: this.selectedIssue.deadline
  };

  console.log('PUT PAYLOAD 👉', updatedIssue);

  this.issueService.updateIssue(id, updatedIssue).subscribe({
    next: () => {
      alert('Issue updated successfully ✅');
      this.loadUsersAndIssues();
      this.closePopup();
    },
    error: (err) => {
      console.error('Update error:', err);
      alert('Failed to update issue ❌');
    }
  });
}



    confirmDelete() {
  const id = this.selectedIssue.issueId || this.selectedIssue.issue_id;

  console.log("Deleting issue ID:", id); 

  this.issueService.deleteIssue(id).subscribe({
    next: () => {
      alert('Issue deleted successfully ✅');
      this.loadUsersAndIssues();
      this.closePopup();
    },
    error: (err) => {
      console.error("Delete error:", err);
      alert('Delete failed ❌');
    }
  });
}

    closePopup() {
      this.showView = false;
      this.showEdit = false;
      this.showDelete = false;
      this.selectedIssue = null;
    }

    addComment() {
    if (!this.newComment.trim()) return;

    const data = {
      issueId: this.selectedIssue.issueId,
      commentText: this.newComment,
      cmtBy: this.loggedInUserId
    };

    this.issueService.addComment(data).subscribe(() => {
      this.newComment = '';
      this.loadComments(this.selectedIssue.issueId); 
    });
  }

  loadComments(issueId: number) {
    this.issueService.getComments(issueId).subscribe((res: any[]) => {
      this.comments = res;
    });
  }

  isOverdue(date: string | null) {
  if (!date) return false;
  return new Date(date) < new Date();
}
  }

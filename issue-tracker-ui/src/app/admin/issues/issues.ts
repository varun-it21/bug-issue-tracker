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

  // ✅ Popup flags
  showView = false;
  showEdit = false;
  showDelete = false;
  selectedIssue: any = null;

  issues: any[] = [];

  users: any[] = [];
  userMap: any = {}; // id → name

  currentPage = 1;
  pageSize = 7;

constructor(
  private router: Router,
  private issueService: IssueService,
  private userService: UserService,
  private cdr: ChangeDetectorRef // ✅ ADD THIS
) {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
}

ngOnInit() {
  this.loadUsersAndIssues();
}
loadUsersAndIssues() {
  this.userService.getUsers().subscribe(users => {
    this.users = users;

    this.userMap = {};
    for (let u of this.users) {
      this.userMap[u.user_id] = u.user_name;
    }

    this.issueService.getIssues().subscribe(data => {
      this.issues = [...data]; // ✅ assign data
      console.log("Issues Loaded:", this.issues);

      this.cdr.detectChanges(); // 🔥 FORCE UI UPDATE
    });
  });
}

  isOverdue(date: string | null) {
  if (!date) return false; 
  return new Date(date) < new Date();
}

  // ✅ Load users from backend
 loadUsers() {
  this.userService.getUsers().subscribe(data => {
    this.users = data;

    this.userMap = {};
    for (let u of this.users) {
      this.userMap[u.user_id] = u.user_name; // ✅ match your backend fields
    }

    console.log('User Map:', this.userMap);
  });
}

  // ✅ Load issues from backend
  loadIssues() {
  this.issueService.getIssues().subscribe((data: any[]) => {
    this.issues = [...data];
  });
}

  // ✅ Filters
  get filteredIssues() {
    return this.issues.filter(issue =>
      issue.title.toLowerCase().includes(this.searchText.toLowerCase()) &&
      (this.selectedStatus === '' || issue.status === this.selectedStatus) &&
      (this.selectedPriority === '' || issue.priority === this.selectedPriority)
    );
  }

  // ✅ Pagination
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

  // ================= POPUPS =================

  openView(issue: any) {
    this.selectedIssue = { ...issue };
    this.showView = true;
  }

  openEdit(issue: any) {
    this.selectedIssue = { ...issue };
    this.showEdit = true;
  }

  openDelete(issue: any) {
    this.selectedIssue = issue;
    this.showDelete = true;
  }

  // ✅ Save Edit (Update Issue)
 saveEdit() {
  console.log("Editing issue:", this.selectedIssue); // 🔥 debug

  this.issueService.updateIssue(this.selectedIssue.issueId, this.selectedIssue)
    .subscribe({
      next: (res) => {
        alert('Issue updated successfully ✅');
        this.loadUsersAndIssues(); // reload from DB
        this.closePopup();
      },
      error: (err) => {
        console.error("Update error:", err);
        alert('Failed to update issue ❌');
      }
    });
}

  // ✅ Confirm Delete (Backend)
  confirmDelete() {
    this.issueService.deleteIssue(this.selectedIssue.issueId).subscribe(() => {
      alert('Issue deleted successfully ✅');
      this.loadIssues();
      this.closePopup();
    });
  }

  // ✅ Close All Popups
  closePopup() {
    this.showView = false;
    this.showEdit = false;
    this.showDelete = false;
    this.selectedIssue = null;
  }
}

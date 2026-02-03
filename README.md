# 🐞 Issue / Bug Tracker

A full-stack **Issue & Bug Tracking System** built with **Angular** (frontend) and **ASP.NET Core Web API** (backend).  
This application helps teams track issues, manage assignments, enforce workflows, and maintain clear communication between **Admins** and **Developers**.

---

## ✨ Features

### 👤 User Roles

- **Admin**
  - Create, edit, and delete issues
  - Assign issues to developers
  - Change issue status (Open / InProgress / Completed)
  - Extend deadlines
  - View all comments (admin + developer)

- **Developer**
  - View issues assigned to them
  - Update **status only**
  - **Mandatory comment** when updating status
  - **Cannot update Completed issues** until admin reopens them

---

### 📌 Issue Management

- Title, description, priority, and status
- Assigned developer
- Deadline tracking
- Overdue issue highlighting
- Status-based access control

---

### 💬 Comments

- Admin and Developer comments stored in database
- Comments visible in both Admin and Developer views
- Latest comments can be viewed inline or in modal
- Mandatory comment when developer updates status

---

### ⏰ Deadline Handling

- Overdue issues visually highlighted
- Deadline does **not** auto-complete tasks
- Admin controls final resolution

---

### 🔐 Authentication (Current)

- Role-based UI using `localStorage`
- Persistent login across page refresh
- Admin and Developer can be tested in different tabs
- JWT-ready architecture for future enhancement

---

## 🛠️ Tech Stack

### Frontend
- Angular
- TypeScript
- HTML / CSS
- Standalone Components
- FormsModule

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- RESTful APIs

---

## 📂 Project Structure

### 🖥️ Frontend – Angular (`issue-tracker-ui`)
```text
issue-tracker-ui/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── issues/
│   │   │   └── add-issues/
│   │   │
│   │   ├── developer/
│   │   │   └── my-issues/
│   │   │
│   │   ├── services/
│   │   │   ├── issue.service.ts
│   │   │   └── user.service.ts
│   │   │
│   │   ├── auth/
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   ├── environments/
│   └── index.html
│
├── angular.json
├── package.json
└── README.md


### 🖥️ Backend – ### 🖥️ Frontend – Angular (`issue-tracker-ui`)
issue-tracker-api/
├── Controllers/
│   ├── IssuesController.cs
│   └── IssueCommentsController.cs
│
├── Models/
│   ├── Issue.cs
│   ├── IssueComment.cs
│   ├── User.cs
│   └── Role.cs
│
├── Data/
│   └── AppDbContext.cs
│
├── Migrations/
├── Program.cs
├── appsettings.json
└── README.md
```

---

## 🔄 Workflow Rules

| Rule | Enforced |
|-----|----------|
| Developer must add comment on status update | ✅ |
| Developer cannot update Completed issue | ✅ |
| Only Admin can reopen Completed issue | ✅ |
| Overdue ≠ Completed | ✅ |
| Comments permanently stored | ✅ |

---

## 🚀 How to Run the Project

### Backend (ASP.NET Core)

```bash
cd backend
dotnet restore
dotnet run
Backend runs on:

http://localhost:5165
Frontend (Angular)
cd issue-tracker-ui
npm install
ng serve
Frontend runs on:

http://localhost:4200
🧪 Testing Roles
Login as Admin → Manage all issues

Login as Developer → View assigned issues only

Refresh page → Login persists

Completed issues → Locked for developers

### 🔮 Future Enhancements 
JWT authentication

Role-based API authorization

Notifications for overdue issues

Activity logs and audit trail

SLA and performance metrics

File attachments for issues

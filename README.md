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

## 📸 Application Screenshots

### 🔐 Login Page
<p align="center">
  <img src="https://github.com/user-attachments/assets/a20f0c56-813b-4783-9850-372cc399cee6" width="800" />
</p>

---

### 🧑‍💼 Admin Dashboard – Issue List
<p align="center">
  <img src="https://github.com/user-attachments/assets/f55172f2-1073-4a3b-90fa-9bb8e4cf2ce5" width="800" />
</p>

---

### ✏️ Edit Issue (Admin)
<p align="center">
  <img src="https://github.com/user-attachments/assets/cca5cfb5-fa94-4ef0-98a2-47ddc2553c62" width="800" />
</p>

---

### 👁️ View Issue Details
<p align="center">
  <img src="https://github.com/user-attachments/assets/cac5f4dc-2074-4837-ad56-702b40bbbfb2" width="800" />
</p>

---

### 💬 Issue Comments
<p align="center">
  <img src="https://github.com/user-attachments/assets/ad5c9861-1365-4506-ae7c-8ae5d0ee62d1" width="800" />
</p>

---

### 👨‍💻 Developer – My Dashboard
<p align="center">
  <img src="https://github.com/user-attachments/assets/101a071e-5eba-4215-92c0-dde6d6c67e6f" width="800" />
</p>

---

### 🔄 Developer – My Issues
<p align="center">
  <img src="https://github.com/user-attachments/assets/2644ebe2-632d-4ad3-b16f-828822d5cabb" width="800" />
</p>

---

### Developer- Updation
<p align="center">
  <img src="https://github.com/user-attachments/assets/48dbed29-a292-453b-8b4e-c120887a3cbf" width="800" />
</p>



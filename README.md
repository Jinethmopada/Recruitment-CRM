# 🚀 Recruit CRM — Recruitment Management System

A modern, full-stack **Recruitment CRM** designed to help recruiters and hiring teams manage jobs, candidates, applications, and recruitment workflows from a centralized dashboard.

Built with **React.js, Node.js, Express.js, MongoDB, JWT Authentication, Axios, React Context API, and Tailwind CSS**, this project demonstrates real-world frontend development, REST API integration, authentication, CRUD operations, responsive UI development, and deployment.

---

## 🌐 Live Demo

🔗 **Live Application:** https://recruit-crm-self.vercel.app

🔗 **Backend API:** https://recruit-crm-backend.vercel.app

---

## 📸 Project Overview

Recruit CRM provides recruiters with a centralized interface to manage recruitment operations efficiently.

### Core Modules

- 🔐 User Registration & Login
- 🔑 JWT-based Authentication
- 📊 Recruitment Dashboard
- 💼 Job Management
- 👤 Candidate Management
- 🔎 Job Search & Filtering
- ✏️ Create, Update & Delete Jobs
- 📋 Candidate Data Management
- 📱 Responsive Dashboard
- 🧭 Protected Routes
- 🔌 REST API Integration
- ☁️ Vercel Deployment
- 🗄️ MongoDB Database

---

## ✨ Key Features

### 🔐 Authentication

- User registration with password hashing using `bcrypt`
- Secure login using JWT
- Token-based authentication
- Protected dashboard routes
- Authentication-aware navigation
- Invalid credential handling
- Persistent login using browser storage

---

### 📊 Recruitment Dashboard

The dashboard provides recruiters with a centralized overview of recruitment activities.

Features include:

- Recruitment statistics
- Recent jobs
- Candidate overview
- Quick navigation
- Responsive sidebar navigation
- Top navigation bar

---

### 💼 Job Management

Recruiters can manage job postings through a complete CRUD workflow.

#### Create Job

Recruiters can create jobs with:

- Job ID
- Job Title
- Department
- Location
- Job Type
- Experience Level
- Job Status
- Job Description

#### View Jobs

Jobs can be displayed with:

- Job ID
- Title
- Department
- Location
- Experience
- Status
- Posted Date

#### Update Jobs

Recruiters can:

- Open job details
- Switch to edit mode
- Modify job information
- Save changes
- Refresh the job list automatically

#### Delete Jobs

Recruiters can delete job postings directly from the job details interface.

---

## 🔎 Job Search & Filtering

The Jobs module supports dynamic searching and filtering.

Users can search jobs by:

- Job ID
- Job Title

Filters include:

- Department
- Location
- Job Type
- Experience Level
- Job Status

Filtering is implemented on the frontend using React state and Context API.

---

## 👥 Candidate Management

The Candidate module is designed to manage candidate information throughout the recruitment process.

Candidate information can include:

- Candidate ID
- Name
- Email
- Phone
- Skills
- Experience
- Resume
- Application details
- Recruitment status

The architecture is designed to support future recruitment workflows such as:

`Applied → Screening → Interview → Selected → Rejected`

---

## 🧭 Responsive Navigation

The application includes a responsive recruitment dashboard layout.

### Sidebar

- Dashboard
- Jobs
- Candidates
- Applications
- Calendar
- Reports
- Messages
- Settings
- Profile
- Logout

The sidebar supports:

- Desktop collapsed state
- Hover expansion
- Mobile menu
- Responsive navigation
- React Router navigation

---

## 🛡️ Protected Routes

Private dashboard pages are protected using authentication.

Unauthenticated users are redirected to the login page.

Example application flow:

```text
Login
  ↓
JWT Token
  ↓
Authentication
  ↓
Protected Route
  ↓
Dashboard

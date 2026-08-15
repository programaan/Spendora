# 💰 Spendora — Full Stack Personal Finance Dashboard

<img width="1343" height="683" alt="Spendora" src="https://github.com/user-attachments/assets/5833245a-90e8-41cf-80e2-c26869f7af29" />

A modern full-stack personal finance management application designed to help users manage their income, expenses, budgets, financial reports, and personal profile through a responsive dashboard.

Spendora combines a responsive **React + Vite** frontend with a **Django REST Framework** backend, **MySQL** database, **JWT authentication**, **Cloudinary** profile image storage, and **Mailjet** transactional email services.

---

## 🌐 Live Demo

**Frontend:** https://spendora-theta.vercel.app/

---

## ✨ Features

### 📊 Dashboard

* Financial overview dashboard
* Income summary
* Expense summary
* Balance overview
* Recent transactions
* Monthly income and expense chart
* Expense category breakdown
* Budget progress tracking

### 💰 Income Management

* Add income
* Edit income
* Delete income
* Income categories
* Income source tracking
* Date-based income records
* Income summary and filtering

### 💸 Expense Management

* Add expenses
* Edit expenses
* Delete expenses
* Expense categories
* Expense title and amount tracking
* Date-based expense records
* Expense summary and filtering

### 🎯 Budget Management

* Create budgets
* Edit budgets
* Delete budgets
* Category-based budgets
* Monthly budgets
* Budget amount tracking
* Budget progress monitoring

### 📈 Reports

* Financial summary
* Monthly financial trends
* Expense category reports
* Date-range based reports
* Income and expense analysis
* Budget information
* PDF financial report export
* Excel financial report export

### 🔐 Authentication

* User registration
* Email-based login
* JWT authentication
* Access and refresh tokens
* Automatic access-token refresh
* Email verification
* Forgot password
* Password reset
* Protected routes
* Public and protected route handling
* Persistent authentication state

### 👤 Profile Management

* View profile
* Update profile information
* Upload profile image
* Cloud-based profile image storage

### 🌓 User Experience

* Responsive dashboard
* Mobile sidebar navigation
* Light and dark theme support
* Interactive charts
* Loading states
* Toast notifications
* Responsive tables
* Dialog-based forms

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* React Router DOM
* Axios
* Tailwind CSS
* Recharts
* Lucide React
* Next Themes
* React Helmet Async
* Sonner
* Shadcn UI
* JavaScript

### Backend

* Python
* Django
* Django REST Framework
* Simple JWT
* REST APIs

### Database

* MySQL

### Authentication

* JWT Authentication
* Access and Refresh Tokens
* Email Verification
* Password Reset
* Protected Routes

### Integrations

* Cloudinary
* Mailjet

### Data Export

* XLSX / SheetJS
* jsPDF
* jsPDF AutoTable
* File Saver

### Deployment

* Vercel — Frontend
* Render — Backend
* TiDB — Database

---

## 📁 Project Structure

```text
Spendora/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── lib/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── accounts/
│   ├── budget/
│   ├── dashboard/
│   ├── expense/
│   ├── income/
│   ├── reports/
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
└── README.md
```

---

## 🔄 Authentication Flow

```text
Register
   │
   ▼
Email Verification
   │
   ▼
Login
   │
   ▼
JWT Access + Refresh Tokens
   │
   ▼
Authenticated Session
   │
   ▼
Protected Routes
   │
   ├──────────────┬──────────────┬──────────────┐
   ▼              ▼              ▼              ▼
Dashboard       Income        Expenses        Budget
   │              │              │              │
   └──────────────┴──────────────┴──────────────┘
                          │
                          ▼
                       Reports
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/programaan/Spendora
cd Spendora
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

Open another terminal:

```bash
cd backend
```

Create a virtual environment.

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

---

## 🔑 Environment Variables

### Backend

Create a `.env` file inside the `backend` directory:

```env
SECRET_KEY=
DEBUG=

DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

CORS_ALLOWED_ORIGINS=
CSRF_TRUSTED_ORIGINS=

MAILJET_API_KEY=
MAILJET_SECRET_KEY=
MAILJET_FROM_EMAIL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FRONTEND_URL=
```

### Frontend

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=
```

> ⚠️ Never commit `.env` files, database credentials, API keys, or private service credentials to GitHub.

---

## 🛡️ Security

The application includes:

* JWT-based authentication
* Access and refresh tokens
* Automatic access-token refresh
* Protected routes
* Backend authentication
* User-specific data access
* Password validation
* Email verification
* Password reset flow
* CORS configuration
* CSRF trusted origins
* Environment-based secrets
* Secure database connection
* Cloudinary-secured media configuration

Sensitive credentials such as database passwords, API keys, JWT secrets, and third-party service credentials are stored through environment variables.

---

## 🧠 What I Learned

Through Spendora, I gained hands-on experience with:

* React component architecture
* React Router
* Vite
* Axios API integration
* Context API
* Tailwind CSS
* Recharts
* Responsive dashboard development
* Django REST Framework
* JWT authentication
* Access and refresh token handling
* Protected routes
* REST API design
* TiDB database integration
* Income management
* Expense management
* Budget management
* Financial reporting
* Dashboard data visualization
* Email verification
* Password reset workflows
* Cloudinary integration
* Mailjet integration
* PDF report generation
* Excel report generation
* Environment configuration
* Full-stack application deployment

---

## 👨‍💻 Author

Made with ❤️ by **programaan**

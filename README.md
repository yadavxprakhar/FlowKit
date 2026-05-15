# Flowkit

> **The kit for teams that move.**  
> A modern team task manager for planning, tracking, and collaborating — all in one smooth flow.

---

## 🚀 About Flowkit

**Flowkit** is a collaborative project management app designed for small to mid-sized teams. It combines task management, project boards, and team communication in a clean, fast interface.

- ✅ **Task Lists** – Organize work that actually moves
- 📊 **Project Boards** – Visual progress tracking
- 💬 **Team Huddle** – Quick updates without context switching
- ⏱️ **Time Tracking** – Built-in timers for accountability
- 🔒 **Secure** – JWT-based authentication with Spring Security

---

## 🛠️ Tech Stack

### **Frontend (Client-Side)**
| Technology | Purpose |
|------------|---------|
| **React.js** | UI framework (SPA) |
| **Vite** | Fast build tool and dev server |
| **JavaScript (JSX)** | Core language |
| **Tailwind CSS** | Utility-first styling |
| **React Router v6** | Client-side routing |
| **Axios** | HTTP client for API requests |
| **Zustand** (or Context API) | Lightweight state management |

### **Backend (Server-Side)**
| Technology | Purpose |
|------------|---------|
| **Java** | Core language |
| **Spring Boot** | Framework for REST API |
| **Spring Web** | RESTful controllers |
| **Spring Data JPA** | ORM (Hibernate) |
| **Spring Security** | Authentication & authorization |
| **JWT** | Stateless token-based auth |

### **Database**
| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Relational database for users, projects, tasks |

---

## 📁 Project Structure
```
flowkit/
├── frontend/ # React SPA
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page-level components
│ │ ├── api/ # Axios API service layer
│ │ ├── store/ # State management (Zustand)
│ │ ├── utils/ # Helper functions
│ │ └── App.jsx # Root component
│ ├── public/
│ ├── package.json
│ └── vite.config.js
│
├── backend/ # Spring Boot REST API
│ ├── src/main/java/com/flowkit/
│ │ ├── controller/ # REST controllers
│ │ ├── service/ # Business logic
│ │ ├── repository/ # JPA repositories
│ │ ├── model/ # Entity classes (User, Project, Task)
│ │ ├── security/ # JWT, Security configs
│ │ └── FlowkitApplication.java
│ ├── src/main/resources/
│ │ ├── application.properties # DB config, JWT secret
│ │ └── data.sql # (Optional) seed data
│ └── pom.xml # Maven dependencies
│
├── database/
│ └── schema.sql # PostgreSQL table definitions
│
├── docs/ # Documentation, API specs
├── .gitignore
├── README.md # You are here
└── LICENSE
```
---

## ⚙️ Getting Started

### **Prerequisites**
- **Node.js** (v18+)
- **Java** (JDK 17+)
- **Maven** (3.8+)
- **PostgreSQL** (v14+)

---

### 1. Clone the Repository**
```bash
git clone https://github.com/yourusername/flowkit.git
cd flowkit
```

## 2. Backend Setup
```
a) Configure PostgreSQL
Create a database:

SQL

CREATE DATABASE flowkit_db;
b) Update application.properties
Edit backend/src/main/resources/application.properties:

properties

spring.datasource.url=jdbc:postgresql://localhost:5432/flowkit_db
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Secret (use a strong random string in production)
jwt.secret=your_jwt_secret_key_here
jwt.expiration=86400000
c) Run the Backend
Bash

cd backend
mvn clean install
mvn spring-boot:run
Backend will run on http://localhost:8080
```

## 3. Frontend Setup
```
a) Install Dependencies
Bash

cd frontend
npm install
b) Configure API Base URL
Edit frontend/src/api/config.js:

JavaScript

export const API_BASE_URL = 'http://localhost:8080/api';
c) Run the Frontend
Bash

npm run dev
Frontend will run on http://localhost:5173
```

## 🔐 Authentication Flow
```
Register → POST /api/auth/register
Login → POST /api/auth/login → Returns JWT token
Protected Routes → Include Authorization: Bearer <token> in headers
Frontend → Store token in localStorage or Zustand store
```
---
## 📡 API Endpoints (Examples)

| Method	| Endpoint |	Description	| Auth Required
|---------|----------|--------------|--------------|
| POST | /api/auth/register |	Create new user	 | ❌ |
| POST	| /api/auth/login	| Login & get JWT| 	❌ |
| GET	| /api/projects	| Get all projects |	✅ |
| POST	| /api/projects	| Create new project |	✅ |
| GET	| /api/tasks	| Get all tasks	| ✅ |
| POST	| /api/tasks	| Create new task | 	✅ | 
| PUT	| /api/tasks/{id}	| Update task	| ✅ | 
| DELETE	| /api/tasks/{id}	| Delete task	| ✅ | 

---

## 🎨 Design System
```
Colors: Primary #2563EB, Accent #0EA5E9
Typography: Inter (UI), JetBrains Mono (code/numbers)
Icons: Lucide React or Heroicons
Components: Built with Tailwind utility classes
See /docs/design-system.md for full details.
```
---
## 🧪 Testing

Backend
```Bash

cd backend
mvn test
```
Frontend
```Bash

cd frontend
npm run test
```
---

## 🚢 Deployment

Backend (Spring Boot)
- Build JAR: mvn clean package
- Deploy to: Railway, Render, AWS Elastic Beanstalk, or DigitalOcean App Platform
  
Frontend (React)
- Build: npm run build
- Deploy to: Vercel, Netlify, or Cloudflare Pages

Database
-Use managed PostgreSQL: Supabase, Neon, Railway, or AWS RDS

---  

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repo
2. Create a feature branch: git checkout -b feature/your-feature
3. Commit changes: git commit -m 'Add some feature'
4. Push to branch: git push origin feature/your-feature
5. Open a Pull Request

--- 

## 📄 License

This project is licensed under the MIT License – see the LICENSE file for details.

---

## 📬 Contact

Website: flowkit.com (coming soon)
Email: hello@flowkit.com
Twitter: @flowkit

--- 

## 🌟 Roadmap
```
 User authentication (JWT)
 Task CRUD operations
 Project boards (Kanban)
 Real-time updates (WebSockets)
 Team collaboration (invites, permissions)
 File attachments
 Time tracking
 Mobile app (React Native)
```
<div align="center">
<sub> Built with ❤️ by Prakhar. </sub>
</div>

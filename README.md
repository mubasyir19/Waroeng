<div align="center">
  <h1>🍽️ Waroeng</h1>
  <p><strong>Point of Sales (POS) Web Application for Modern Businesses</strong></p>
  <p>
    <img src="https://img.shields.io/badge/TypeScript-97.1%25-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Next.js-2.0%25-663399?logo=nextdotjs&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" alt="Docker">
    <img src="https://img.shields.io/badge/Status-Active-00C853" alt="Status">
    <img src="https://img.shields.io/github/license/mubasyir19/Waroeng" alt="License">
  </p>
</div>

## 📖 Overview

**Waroeng** is a comprehensive Point of Sales (POS) web application designed to streamline transaction management, inventory tracking, and sales reporting for small to medium-sized retail businesses, particularly in the food and beverage sector. Built with a modern technology stack, it offers a responsive interface, real-time data processing, and containerized deployment for scalability.

## 🎯 Key Features

| Feature                    | Description                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Product Management**     | Complete CRUD operations for products with categorization, pricing, and stock tracking.                 |
| **Transaction Processing** | Fast and intuitive cart system with automatic tax calculation, discounts, and multiple payment methods. |
| **Sales Dashboard**        | Real-time visualization of daily, weekly, and monthly revenue with interactive charts.                  |
| **Order Types**            | Support for dine-in, takeaway, and delivery orders with status tracking.                                |
| **User Authentication**    | Role-based access control (Admin, Cashier, Manager) for secure operations.                              |
| **Docker Support**         | Fully containerized application for consistent development and production environments.                 |

## 🧰 Technology Stack

### Core Technologies

- **Frontend**: TypeScript, Next.js, TailwindCSS, Shadcn UI
- **Backend**: TypeScript, Node.js, Express.js, Prisma ORM
- **Database**: PostgreSQL 15
- **Containerization**: Docker, Docker Compose

### Development Tools

- **Version Control**: Git & GitHub
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, Supertest (backend), Vitest (frontend)

## 📋 Prerequisites

Before running Waroeng, ensure you have the following installed:

- **Node.js** (v18.x or later) → [Download](https://nodejs.org/)
- **Docker** & **Docker Compose** (v2.0+) → [Download](https://docker.com/)
- **Git** (v2.30+) → [Download](https://git-scm.com/)
- **Package Manager**: npm (v9+) or yarn (v1.22+)

## 🚀 Quick Start (Production with Docker)

This is the recommended method for deploying Waroeng in a production environment.

1. **Clone the Repository**
   ```bash
   git clone https://github.com/mubasyir19/Waroeng.git
   cd Waroeng
   ```
2. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your database credentials, JWT secrets, etc.
   ```
3. **Build and Run with Docker Compose**
   ```bash
   docker-compose up -d --build
   ```
4. **Build and Run with Docker Compose**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/v1
   - API Documentation: http://localhost:5000/api-docs (if Swagger is configured)
5. **Stop the Application**
   ```bash
   docker-compose down
   ```

## 💻 Development Setup

For local development without Docker:

### Backend Setup

```bash
cd frontend
npm install
cp .env.example .env  # Set API URL (default: http://localhost:5000)
npm run dev  # Starts Vite development server
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env  # Set API URL (default: http://localhost:5000)
npm run dev  # Starts Vite development server
```

### Database Initialization (if not using Docker)

```bash
# Create database (example for PostgreSQL)
createdb waroeng_db

# Run migrations
cd backend
npm run migrate:up

# Seed initial data (optional)
npm run seed
```

## 📁 Project Structure

```bash
Waroeng/
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API endpoints
│   │   ├── middlewares/    # Auth, validation, error handling
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── app.ts          # Express app configuration
│   ├── tests/              # Unit and integration tests
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-based pages (Dashboard, Products, Transactions)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API client functions
│   │   ├── store/          # State management (Redux/Zustand)
│   │   ├── types/          # TypeScript interfaces
│   │   └── styles/         # Global CSS/Tailwind
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml      # Multi-container orchestration
├── .gitignore
└── README.md
```

## 🔧 Configuration

### Environment Variables

##### Backend

```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@db:5432/waroeng
JWT_SECRET=your-secret-key-here
CORS_ORIGIN=http://localhost:3000
```

##### Frontend

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

## 🤝 Contributing

We welcome contributions from the community. Please follow these steps:

1. Fork the repository and clone it locally.
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit your changes: git commit -m 'Add some amazing feature'
4. Follow Conventional Commits specification.
5. Push to the branch: git push origin feature/amazing-feature
6. Open a Pull Request against the main branch.

### Development Guidelines

- Write unit tests for new features (coverage ≥ 80%).
- Ensure TypeScript strict mode passes.
- Run linting before committing: npm run lint
- Update documentation for API changes.

<!-- ## 📊 API Endpoints -->

## 📜 License

Distributed under the MIT License. See LICENSE file for more information.

```bash
MIT License

Copyright (c) 2026 Mahdy Mubasyir

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 👤 Author

Mahdy Mubasyir

- GitHub: @mubasyir19
- Project Link: https://github.com/mubasyir19/Waroeng

## 🙏 Acknowledgments

- Icon and design inspiration from various POS systems.
- Open-source libraries that made this project possible (React, Express, Docker).
- Contributors and testers who provided valuable feedback.

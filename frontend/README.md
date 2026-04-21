# 🚀 POS Waroeng

**POS Waroeng** is a modern Point of Sales system built for small businesses such as street food stalls and local shops. It provides simple yet powerful tools for managing products, handling transactions with ease, and tracking sales reports efficiently.

[Backend POS-Waroeng](https://github.com/mubasyir19/Backend-Waroeng)

---

## 🧩 Key Features

- 🔐 **User Authentication** — secure login and logout system.
- 🛒 **Product Management** — add, edit, delete, and view products.
- 💵 **Sales Transactions** — record sales, calculate totals automatically, and manage payments.
- 📦 **Inventory Control** — stock updates automatically after each transaction.
- 📊 **Sales Reports** — daily, weekly, and monthly summaries.
<!-- - ⚙️ **Admin Dashboard** — quick overview of essential data and KPIs. -->
- 📱 **Responsive Design** — optimized for desktop and tablet devices.

---

## 🛠️ Technologies Used

| Category       | Technology                                  |
| -------------- | ------------------------------------------- |
| Frontend       | Next.js, TypeScript, TailwindCSS, Shadcn UI |
| Backend        | NestJS                                      |
| Database       | PostgreSQL & Prisma ORM                     |
| Authentication | JWT, HTTP Only Cookie                       |
| Tools          | ESLint, Prettier, Git                       |

---

## 📦 Prerequisites

Before running this project, make sure you have installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm / yarn / pnpm
- Git
- Database server PostgreSQL
- Database Management Tools (DBeaver, etc.)

---

## ⚙️ Installation Steps

1.  **Clone the repository**

    ```bash
    git clone https://github.com/mubasyir19/POS-Waroeng.git
    cd POS-Waroeng
    ```

2.  **Install dependencies**

    ```bash
     npm install
     # or
     yarn install
    ```

3.  **Configure environment variables**
    Create a .env file in the root directory based on .env.example:

    ```bash
     NEXT_PUBLIC_API=http://localhost:5000/api
    ```

4.  **Run the development server**
    ```bash
     npm run dev
    ```
    Then open your browser at http://localhost:3000

## 🗂️ Project Structure

```
├── node_modules/
├── public/                  # Static assets (images, icons, etc.)
├── src/
│   ├── app/                 # Next.js App Router (frontend)
│   ├── components/          # Reusable UI components
│   ├── helpers/             # Utility and helper functions
│   ├── hooks/               # Custom Hooks
│   ├── lib/                 # Utility and helper functions
│   ├── services/            # Backend / API routes
│   ├── store/               # Zustand global state management
│   └── types/               # TypeScript types and interfaces
│   ├── utils                # Configuration and dummy data
│   ├── middleware           # Custom middleware for this project
│
├── .env.example             # Example environment configuration
├── .gitignore               # Example environment configuration
├── .components.json         # Shadcn UI configuration
├── .eslint.config.mjs       # ESLint configuration
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── README.md
├── tsconfig.json
```

## 🧪 Usage Examples

Here are a few examples of how to use the application:

1. Log in to the App
   - Enter your email and password.
   - Upon successful login, you’ll be redirected to the main dashboard.

2. Add a New Product
   - Navigate to Products → Add Product.
   - Fill in product name, price, stock, and category.
   - Click Save.

3. Record a Transaction
   - Select a product from the product list.
   - Enter the quantity to purchase.
   - Click Checkout, and the system calculates the total automatically.
   - Save the transaction — stock levels will be updated automatically.

4. View Reports
   - Go to Reports → Daily Sales.
   - Filter by date and export to PDF/Excel if supported.

## ⚡ Available NPM Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Run the app in development mode     |
| `npm run build` | Build the project for production    |
| `npm run start` | Start the production build          |
| `npm run lint`  | Run ESLint to check for code issues |

## 👥 Contributing

Contributions are welcome and appreciated 💡

1. Fork repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature X"
   ```
4. Commit your changes:
   ```bash
   git commit -m "Add feature X"
   ```
5. Submit a Pull Request to the main branch.

<!-- Please ensure your code passes lint checks and follows the project’s code style guidelines. -->

## 🌐 Contact

For inquiries or collaboration opportunities:

Author: Mahdy Mubasyir
Email: m.mubasyir19@gmail.com
GitHub: @mubasyir19
Website: [https://mahdy-mubasyir.vercel.app/](https://mahdy-mubasyir.vercel.app/)

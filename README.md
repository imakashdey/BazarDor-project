# 🛒 বাজার দর (BazarDor) — Daily Commodity Price Tracker

[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Auth-Better_Auth-emerald?style=flat)](https://www.better-auth.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

**বাজার দর (BazarDor)** is a modern, responsive web application designed to help users explore, compare, and monitor the prices of essential commodities in Bangladesh, including rice, lentils, oil, vegetables, fish, meat, and spices.

The application provides an intuitive interface for viewing product prices, comparing market information, browsing categories, and managing user accounts.

## 📌 Project Overview

নিত্যপ্রয়োজনীয় পণ্যের বাজারদর প্রতিদিন পরিবর্তিত হয়। **বাজার দর** ব্যবহারকারীদের পণ্যের মূল্য, ক্যাটাগরি অনুযায়ী পণ্য অনুসন্ধান এবং বাজারদরের তুলনা সহজভাবে দেখতে সাহায্য করে।

The project combines a responsive user interface, category-based navigation, product details, authentication, and profile management to provide a convenient market-price browsing experience.

## 🚀 Key Features

### 1. ⚡ Price Ticker and Price Trends
- Displays product names, prices, and price-change indicators in a scrolling ticker.
- Highlights products with rising and falling prices.
- Provides an organized overview of product prices on the homepage.

### 2. 📊 Product Details and Market Comparison
- Dedicated product detail pages with relevant pricing information.
- Displays available minimum, maximum, and average price data.
- Helps users compare prices where the API provides market-level information.

### 3. 🔐 Authentication and Protected Routes
- Email and password authentication using Better Auth.
- Google and GitHub social sign-in.
- Protects product detail pages from unauthorized access.
- Redirects users to sign in when authentication is required.

### 4. 🔍 Category Browsing and Product Sorting
- Browse products by categories such as rice, lentils, oil, vegetables, fish, and meat.
- Sort products by price in ascending or descending order.
- Supports numeric sorting for Bengali-formatted prices.
- Provides loading and empty-state feedback where implemented.

### 5. 👤 Profile Management
- Dedicated profile page for authenticated users.
- Displays account information.
- Allows users to update their profile information.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js App Router | Routing, rendering, and application structure |
| React | Reusable UI components |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and layout |
| Better Auth | Authentication and session management |
| MongoDB | Database integration for authentication, when configured |
| React Hot Toast | User feedback and toast notifications |
| Lucide Icons | Interface icons |

## 📡 API Endpoints

The application uses the Bazar Dor API.

Base URL:

`https://api.api-store.workers.dev/api/bazardor`

| Endpoint | Description |
|---|---|
| `/categories` | Retrieve all categories |
| `/categories/{category_slug}` | Retrieve a category |
| `/products` | Retrieve products |
| `/products?category={category_slug}` | Filter products by category |
| `/products/{id}` | Retrieve a product by ID |

**Note:** Endpoint availability and response formats depend on the API service.

## 💻 Local Setup and Installation

### Prerequisites
- Node.js and npm
- Git
- Required authentication and database credentials, if applicable

### 1. Clone the repository

```bash
git clone https://github.com/imakashdey/BazarDor-project.git
cd BazarDor-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root, if that is what your application configuration uses.

Example:

```env
NEXT_PUBLIC_API_URL=https://api.api-store.workers.dev/api/bazardor
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=your_mongodb_connection_uri
```

Use the exact environment variable names required by your source code. Do not commit real secrets or database credentials to GitHub.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

The following is an illustrative overview. Adjust the filenames and routes to match the actual repository.

```text
src/
├── app/
│   ├── api/
│   │   └── auth/
│   ├── category/
│   │   └── [slug]/
│   ├── product/
│   │   └── [slug]/
│   ├── profile/
│   │   └── update/
│   ├── signin/
│   ├── signup/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
├── lib/
└── types/
```

## 🌐 Live Demo and Repository

- **Live Website:** [Bazar Dor — Live Demo](https://bazar-dor-project-pc5n.vercel.app/)
- **GitHub Repository:** [BazarDor-project](https://github.com/imakashdey/BazarDor-project)

## 🎓 Project Information

Developed for **Programming Hero — Batch 14, Assignment 07**.

The project demonstrates responsive web design, API integration, category-based product browsing, authentication, protected routes, and profile management.

---

*বাজার দর — নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।*

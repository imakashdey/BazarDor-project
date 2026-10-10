# 🛒 বাজার দর (BazarDor) — Daily Commodity Price Tracker

[![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![BetterAuth](https://img.shields.io/badge/Auth-BetterAuth-emerald?style=flat)](https://better-auth.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)

> **বাজার দর (BazarDor)** হলো বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের (চাল, ডাল, তেল, শাকসবজি, মাছ, মাংস ও মসলা) দৈনন্দিন বাজারদর পর্যবেক্ষণ, তুলনা ও বিশ্লেষণের একটি আধুনিক এবং সম্পূর্ণ রেসপনসিভ ওয়েব অ্যাপ্লিকেশন।

---

## 📌 Project Overview / সংক্ষিপ্ত বিবরণ

বাজারে নিত্যপণ্যের মূল্যের ওঠানামা সাধারণ মানুষের দৈনন্দিন জীবনের সাথে সরাসরি সম্পৃক্ত। **বাজার দর** প্ল্যাটফর্মের মাধ্যমে ক্রেতারা প্রতিদিনের বাজারমূল্যের হালনাগাদ তথ্য, বিভিন্ন বাজারের তুলনামূলক সর্বনিম্ন ও সর্বোচ্চ দর, গড় মূল্য এবং মূল্য বৃদ্ধির ও হ্রাসের হার এক নজরে সহজে পর্যবেক্ষণ করতে পারেন।

---

## 🚀 Key Features / ৫টি মূল বৈশিষ্ট্য

1. **⚡ লাইভ প্রাইস ট্র্যাকার ও মার্কেট টিকার (Live Price Marquee & Ticker):**
   - ওয়েবসাইটের শীর্ষভাগে ইনফিনিট স্ক্রলিং টিকারে তাৎক্ষণিকভাবে প্রতিটি পণ্যের বাংলা নাম, আইকন, আজকের দর এবং মূল্য পরিবর্তনের হার (▲ বৃদ্ধি / ▼ হ্রাস / — স্থির) প্রদর্শিত হয়।
   - হোমপেজে **“আজ দাম বেড়েছে ▲”** এবং **“আজ দাম কমেছে ▼”** সেকশনে শীর্ষ ৬টি পণ্যের দ্রুত বিশ্লেষণ।

2. **📊 বিস্তারিত বাজারভিত্তিক তুলনা ও পরিসংখ্যান (Detailed Market-wise Breakdown):**
   - প্রতিটি পণ্যের বিস্তারিত পাতায় (Protected Detail Page) বিভিন্ন বিভাগীয় পাইকারি ও খুচরা বাজারের সর্বনিম্ন, সর্বোচ্চ এবং গড় মূল্যের তুলনামূলক তালিকা ও ছক।
   - গতকাল, গত সপ্তাহ এবং গত মাসের মূল্যের সাথে ঐতিহাসিক পার্থক্যের বিশ্লেষণ।

3. **🔒 নিরাপদ প্রমাণীকরণ ও রুট সুরক্ষা (Better-Auth Authentication & Route Protection):**
   - ইমেইল/পাসওয়ার্ড এবং সোশ্যাল লগইন (Google ও GitHub) এর মাধ্যমে সহজ সাইন ইন ও সাইন আপ।
   - পণ্যের বিস্তারিত পেজে অননুমোদিত প্রবেশ রোধে স্বয়ংক্রিয় রিডাইরেক্ট এবং সুন্দর টোস্ট (Toast) নোটিফিকেশন।

4. **🔍 ক্যাটাগরি ব্রাউজিং ও আধুনিক সংখ্যাভিত্তিক সাজানোর সুবিধা (Category Filtering & Numeric Sorting):**
   - চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ প্রতিটি ক্যাটাগরির জন্য পৃথক পেজ।
   - ড্রপডাউনের মাধ্যমে বাংলা সংখ্যা অনুযায়ী সঠিক গাণিতিক ক্রমানুসারে (দাম: কম থেকে বেশি, বেশি থেকে কম, বেশি দাম বৃদ্ধি ইত্যাদি) সাজানোর সুবিধা।

5. **👤 প্রোফাইল ম্যানেজমেন্ট ও তথ্য পরিবর্তন (Profile Management & Update Information):**
   - ব্যবহারকারীর ব্যক্তিগত তথ্য ও স্ট্যাটাস প্রদর্শনের ডেডিকেটেড ড্যাশবোর্ড।
   - বেটার-অথ (BetterAuth) ইন্টিগ্রেশন ব্যবহার করে নিজস্ব নাম ও তথ্য সরাসরি আপডেট করার সুবিধা (`/profile/update`)।

---

## 🛠️ Technologies Used / ব্যবহৃত প্রযুক্তি

| প্রযুক্তি | উদ্দেশ্য |
|---|---|
| **Next.js (App Router)** | আধুনিক ফুল-স্ট্যাক ফ্রেমওয়ার্ক, SSR ও ডাইনামিক রাউটিং |
| **React 19 & TypeScript** | শক্তিশালী কম্পোনেন্ট ভিত্তিক ইন্টারফেস এবং টাইপ নিরাপত্তা |
| **Tailwind CSS & DaisyUI** | আধুনিক, রেসপনসিভ এবং দৃষ্টিনন্দন ডিজাইন সিস্টেম |
| **BetterAuth** | নিরাপদ প্রমাণীকরণ (Email/Password, Google, GitHub) |
| **MongoDB & Mongo Adapter** | ব্যবহারকারী ও সেশনের ডাটাবেজ সংরক্ষণ |
| **React Hot Toast** | ইন্টারেক্টিভ ও নান্দনিক টোস্ট নোটিফিকেশন |
| **React Marquee Text** | মসৃণ লাইভ প্রাইস টিকার স্ক্রলার |
| **Lucide Icons** | পরিচ্ছন্ন ও আধুনিক ভেক্টর আইকন |

---

## 📡 API Endpoints

- **All Products:** `/products`
- **Filter by Category:** `/products?category={category_slug}`
- **Single Product:** `/products/{id}` বা Slug অনুসন্ধান
- **Categories:** `/categories`
- **Single Category:** `/categories/{category_slug}`

---

## 💻 Local Setup & Installation / ইনস্টলেশন গাইড

১. **রিপোজিটরি ক্লোন করুন:**
```bash
git clone https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor.git
cd bazar-dor-a-7
```

২. **প্রয়োজনীয় প্যাকেজ ইনস্টল করুন:**
```bash
npm install
```

৩. **পরিবেশ ভেরিয়েবল (.env) কনফিগার করুন:**
প্রজেক্টের রুট ডিরেক্টরিতে `.env` ফাইলে নিচের তথ্যগুলো প্রদান করুন:
```env
NEXT_PUBLIC_API_URL=https://api.abcz.workers.dev/api/bazardor
BETTER_AUTH_SECRET=your_better_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=your_mongodb_connection_uri
```

৪. **ডেভেলপমেন্ট সার্ভার চালু করুন:**
```bash
npm run dev
```
ব্রাউজারে [http://localhost:3000](http://localhost:3000) ওপেন করে প্রজেক্টটি ব্রাউজ করুন।

---

## 📂 Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/   # BetterAuth Route Handler
│   ├── category/[slug]/     # Category Detail & Filter Page
│   ├── product/[slug]/      # Protected Product Detail & Comparison Page
│   ├── profile/             # User Profile Dashboard
│   │   └── update/          # Profile Information Update Page (C3)
│   ├── signin/              # Sign In Page with Toast & Social Auth
│   ├── signup/              # User Registration Page
│   ├── globals.css          # Tailwind CSS & Custom utilities
│   ├── layout.js            # Root Layout with Font & Toaster
│   ├── loading.tsx          # Dynamic Loading Skeleton
│   ├── not-found.tsx        # Custom 404 Page
│   └── page.js              # Home Page with Hero & Product Sections
├── components/
│   ├── CategoryNav.tsx      # Active Highlight Category Navigation
│   ├── CategoryProductlist.tsx # Sortable Category Product Grid
│   ├── Footer.tsx           # Figma-matched Footer
│   ├── Header.tsx           # Logo, Live Date & Auth Buttons / Profile
│   ├── Hero.tsx             # Hero Banner with CTA smooth anchor scroll
│   ├── LoadingSkeleton.tsx  # Shimmering Skeletons
│   ├── Navbar.tsx           # Server Category Loader
│   ├── PriceTicker.tsx      # Infinite Price Marquee Ticker
│   ├── ProductCard.tsx      # Product Card with Bengali numerals & badges
│   ├── ProductSection.tsx   # Risers, Fallers & All Products Grid
│   └── SortDropdown.tsx     # Custom Sort Dropdown (C1)
├── lib/
│   ├── api.ts               # Multi-endpoint resilient API Client
│   ├── auth.ts              # BetterAuth Server Instance & Mongo Adapter
│   ├── auth-client.ts       # BetterAuth React Client
│   ├── auth-errors.ts       # Bangla Auth Error Translator
│   └── utils.ts             # Bengali numerals, currency & date utilities
└── types/
    └── index.ts             # Complete TypeScript Interfaces
```

---

## 🌐 Live & Repository Links

- **Live Deployment:** [বাজার দর লাইভ ওয়েবসাইট](https://bazardor.vercel.app) *(Deploy on Vercel/Netlify)*
- **GitHub Repository:** [B14-A7-Bazar-Dor](https://github.com/ProgrammingHero1/B14-A7-Bazar-Dor)

---

Developed with ❤️ for **Programming Hero Batch 14 - Assignment 07**.

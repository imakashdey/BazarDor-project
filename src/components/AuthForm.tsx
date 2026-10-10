"use client";

import { ReactNode } from "react";

interface AuthFormProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function AuthForm({ title, subtitle, children }: AuthFormProps) {
  return (
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-950">{title}</h1>
        {subtitle && <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>}
      </div>
      <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 shadow-xs">
        {children}
      </div>
    </div>
  );
}

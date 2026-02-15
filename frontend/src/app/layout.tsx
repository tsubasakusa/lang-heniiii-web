"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  FileText,
  GraduationCap,
  Home,
  Languages,
  Settings,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Input", icon: Home },
  { href: "/analyze", label: "Analysis", icon: Languages },
  { href: "/vocabulary", label: "Vocabulary", icon: BookOpen },
  { href: "/grammar", label: "Grammar", icon: GraduationCap },
  { href: "/handout", label: "Handout", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="zh-TW">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-card">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2">
                <Languages className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">Lang Heniiii</span>
              </Link>
            </div>
            <nav className="space-y-1 p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
              <Link
                href="/privacy"
                className="text-xs text-muted-foreground hover:underline"
              >
                Privacy Policy
              </Link>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 pl-64">
            <div className="container mx-auto max-w-4xl p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

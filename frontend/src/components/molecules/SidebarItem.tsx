import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  href: string;
  icon: React.ElementType;
}

export default function SidebarItem({ href, icon: Icon }: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/${href}`;

  return (
    <Link href={href} className="group">
      <li
        className={`flex items-center justify-center rounded-xl p-1 transition-all duration-300 lg:p-2 xl:p-3 ${isActive ? "bg-primary" : "group-hover:bg-primary"}`}
      >
        <Icon
          className={`size-3 transition-all duration-300 lg:size-4 xl:size-6 ${isActive ? "text-white" : "text-primary group-hover:text-white"}`}
        />
      </li>
    </Link>
  );
}

"use client";

import {
  BadgePercent,
  Bell,
  ChartPie,
  House,
  LogOut,
  Mail,
  Settings,
} from "lucide-react";
import Image from "next/image";
// import Link from "next/link";
import React from "react";
import SidebarItem from "../molecules/SidebarItem";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useLogoutUser } from "@/hooks/useUser";

export default function Sidebar() {
  const { handleLogout } = useLogoutUser();
  return (
    <aside className="bg-background h-screen rounded-r-2xl p-2 lg:p-4 xl:p-6">
      <ul className="flex flex-col justify-between gap-6">
        <li className="bg-primary/30 flex items-center justify-center rounded-xl p-0.5 md:p-1 lg:p-2 xl:p-3">
          <Image
            src={`/icons/ic-logo.svg`}
            width={24}
            height={24}
            alt="logo"
            className="size-3 lg:size-4 xl:size-6"
          />
        </li>
        <SidebarItem href="home" icon={House} />
        <SidebarItem href="discount" icon={BadgePercent} />
        <SidebarItem href="dashboard" icon={ChartPie} />
        <SidebarItem href="messages" icon={Mail} />
        <SidebarItem href="notifications" icon={Bell} />
        <SidebarItem href="settings" icon={Settings} />
        <Dialog>
          <DialogTrigger asChild>
            <li
              className={`group hover:bg-primary flex cursor-pointer items-center justify-center rounded-xl p-1 transition-all duration-300 lg:p-2 xl:p-3`}
            >
              <LogOut
                className={`text-primary size-3 transition-all duration-300 group-hover:text-white lg:size-4 xl:size-6`}
              />
            </li>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">
                Konfirmasi Logout
              </DialogTitle>
              <DialogDescription className="text-text-light">
                Apakah kamu yakin ingin keluar?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <button
                  type="button"
                  className="rounded-md border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
                >
                  Batal
                </button>
              </DialogClose>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-primary hover:bg-primary/80 rounded-md px-3 py-2 text-sm font-semibold text-white"
              >
                Logout
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ul>
    </aside>
  );
}

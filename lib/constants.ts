"use client"
import { BookOpen, Briefcase, File, Home, LucideIcon, MessageCircle } from "lucide-react";

interface SidebarItem {
    name: string
    link: string
    icon: LucideIcon
    isActive?: boolean
}

export const sidebarItems: SidebarItem[] = [
    {
        name: "Home",
        link: "/",
        icon: Home
    },
    {
        name: "Jobs",
        link: "/jobs",
        icon: Briefcase
    },
    {
        name: "Blogs",
        link: "/blogs",
        icon: BookOpen
    }
]

export const jobSidebarItems: SidebarItem[] = [
    {
        name: "Full Time Jobs",
        link: "/jobs/fulltime",
        icon: Briefcase,
        isActive: true
    },
    {
        name: "Internship",
        link: "/jobs/internship",
        icon: Briefcase,
        isActive: true
    },
    {
        name: "Applied",
        link: "/jobs/applied",
        icon: File,
        isActive: false
    },
    {
        name: "Other",
        link: "/jobs/other",
        icon: Briefcase,
        isActive: true
    },
    {
        name: "Messages",
        link: "/jobs/messages",
        icon: MessageCircle,
        isActive: false
    }
]
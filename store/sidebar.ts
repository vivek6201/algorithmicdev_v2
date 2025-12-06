import { create } from 'zustand';

export interface SubNavItem {
    title: string;
    href: string;
}

export interface NavSection {
    title: string;
    items: SubNavItem[];
}

interface SidebarState {
    secondaryNavItems: NavSection[];
    activeTab: string; // e.g., 'courses', 'blogs'
    isSidebarOpen: boolean;

    // Actions
    setSecondaryNavItems: (items: NavSection[]) => void;
    setActiveTab: (tab: string) => void;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    secondaryNavItems: [],
    activeTab: '',
    isSidebarOpen: true,

    setSecondaryNavItems: (items) => set({ secondaryNavItems: items }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
}));
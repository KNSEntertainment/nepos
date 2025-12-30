import { BookImage, Settings, GalleryThumbnails, LayoutDashboard, Book, Newspaper, User } from "lucide-react";

export const menuItems = [
	{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "bg-[#0094da]", href: "/dashboard" },
	// { id: "hero", label: "Hero", icon: LayoutDashboard, color: "bg-blue-900", href: "/dashboard/hero" },
	{ id: "contactmessages", label: "Contact Messages", icon: Book, color: "bg-red-900", href: "/dashboard/contactmessages" },
	{ id: "events", label: "Events", icon: BookImage, color: "bg-purple-500", href: "/dashboard/events" },
	{ id: "blogs", label: "Blogs", icon: Newspaper, color: "bg-orange-700", href: "/dashboard/blogs" },
	{ id: "gallery", label: "Gallery", icon: GalleryThumbnails, color: "bg-orange-500", href: "/dashboard/gallery" },
	{ id: "users", label: "Users", icon: User, color: "bg-[#0094da]", href: "/dashboard/users" },
	// { id: "notices", label: "Notices", icon: MessageCircle, color: "bg-yellow-800", href: "/dashboard/notices" },
	// { id: "subscribers", label: "Subscribers", icon: Mail, color: "bg-[#0094da]", href: "/dashboard/subscribers" },
	{ id: "settings", label: "Profile Settings", icon: Settings, color: "bg-gray-500", href: "/dashboard/settings" },
];

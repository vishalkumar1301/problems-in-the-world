"use client"





import * as React from "react"
import { useAuth } from '@/store/hooks';

import Logo from "@/components/Logo"
import { navigationItems } from "@/config/navigation"
import HeaderNavLinks from "@/components/Headers/HeaderNavLinks"
import LeftNavigation from "@/components/Navigations/LeftNavigation"
import ProfileDropdownMenu from "@/components/Profile/ProfileDropdownMenu"






export default function LoggedInHeader() {
	const { isLoggedIn } = useAuth();


	return (
		<nav className="border-b bg-background">
			<div className="flex h-16 items-center px-4">
				<Logo className="mr-4" />
				<HeaderNavLinks navigationItems={navigationItems} />
				<div className="flex-grow" />
				<div className="flex items-center justify-between space-x-2 md:justify-end">
					{isLoggedIn && <ProfileDropdownMenu />}
				</div>
				<LeftNavigation navigationItems={navigationItems} />
			</div>
		</nav>
	)
}
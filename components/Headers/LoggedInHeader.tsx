"use client"

import * as React from "react"
import { useAppSelector } from '@/store/hooks';
import Logo from "@/components/logo"
import { navigationItems } from "@/lib/constants/navigation"
import HeaderNavLinks from "@/components/Headers/HeaderNavLinks"
import LeftNavigation from "@/components/Navigations/LeftNavigation"
import ProfileDropdownMenu from "@/components/Profile/ProfileDropdownMenu"

export default function LoggedInHeader() {
	const { user } = useAppSelector((state) => state.auth);

	return (
		<nav className="border-b bg-background">
			<div className="flex h-16 items-center px-4">
				<Logo />
				<HeaderNavLinks navigationItems={navigationItems} />
				<div className="flex-grow" />
				<div className="flex items-center justify-between space-x-2 md:justify-end">
					{user && <ProfileDropdownMenu user={user} />}
				</div>
				<LeftNavigation navigationItems={navigationItems} />
			</div>
		</nav>
	)
}
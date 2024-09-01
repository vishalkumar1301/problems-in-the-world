"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, Globe } from "lucide-react" // Added Globe icon

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Problem Categories", href: "/problem-category" },
    { name: "Add Problem", href: "/add-problem" },
]

export default function Navigation() {
    const pathname = usePathname()

    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Globe className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">ProblemsInTheWorld.com</span>
                </Link>
                <div className="hidden md:flex md:space-x-4">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                    </div>
                    <nav className="flex items-center space-x-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-8 w-8 rounded-full"
                                    aria-label="User menu"
                                >
                                    <img
                                        src="/placeholder.svg"
                                        alt="User avatar"
                                        className="h-8 w-8 rounded-full"
                                    />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-9 w-9 p-0 md:hidden"
                            aria-label="Open menu"
                        >
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold">Your Logo</span>
                        </Link>
                        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                            <div className="flex flex-col space-y-2">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "block py-2 text-sm font-medium transition-colors hover:text-primary",
                                            pathname === item.href
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </ScrollArea>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}
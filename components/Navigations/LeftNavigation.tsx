import React from 'react'
import Link from "next/link"
import { cn } from "@/lib/utils"
import Logo from "@/components/Logo"
import { MenuIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { INavigationProps } from "@/lib/types/INavigationProps"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function LeftNavigation({ navigationItems }: INavigationProps) {
    const pathname = usePathname()

    return (
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
                <Logo href="/" />
                <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                    <div className="flex flex-col space-y-2">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center py-2 text-sm font-medium transition-colors hover:text-primary",
                                    pathname === item.href
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="mr-2 h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}
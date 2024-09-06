import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { INavigationItem } from "@/lib/types/INavigationItem"
import { INavigationProps } from "@/lib/types/INavigationProps"

export default function HeaderNavLinks({ navigationItems }: INavigationProps) {
    const pathname = usePathname()

    return (
        <div className="hidden md:flex md:space-x-4">
            {navigationItems.map((item: INavigationItem) => (
                <Link key={item.href} href={item.href}
                    className={cn(
                        "flex items-center text-sm font-medium transition-colors hover:text-primary",
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
    )
}
"use client"

import * as React from "react"
import Logo from "@/components/logo"

export default function LoggedOutHeader() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm pointer-events-auto">
            <div className="flex h-16 items-center px-4">
                <Logo />
            </div>
        </nav>
    )
}
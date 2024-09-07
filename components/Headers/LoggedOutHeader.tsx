"use client"

import * as React from "react"
import Logo from "@/components/logo"
import { SearchForm } from '@/components/Maps/SearchForm';
import { useMapContext } from "@/contexts/MapContext";

export default function LoggedOutHeader() {
    const { handleAddressSubmit } = useMapContext();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm pointer-events-auto">
            <div className="flex h-16 items-center px-4">
                <Logo />
                <div className="flex-grow mx-4">
                    <SearchForm onSubmit={handleAddressSubmit} />
                </div>
            </div>
        </nav>
    )
}
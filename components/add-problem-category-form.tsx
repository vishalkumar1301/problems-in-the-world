"use client"

import * as z from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProblemCategory } from "@/lib/interfaces/ProblemCategories"

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
})

type ProblemCategoryFormValues = z.infer<typeof formSchema>

export default function AddProblemCategoryForm() {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProblemCategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    })

    async function onSubmit(values: ProblemCategoryFormValues) {
        setIsLoading(true)
        try {
            const response = await fetch('/api/problem-categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                throw new Error('Failed to add problem category')
            }

            const data = await response.json()
            toast({
                title: "Success",
                description: "Problem category has been created.",
            })
            reset() // Reset form after successful submission
        } catch (error) {
            console.error('Error adding problem category:', error)
            toast({
                title: "Error",
                description: "Failed to add problem category. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    placeholder="Enter category name"
                    {...register("name")}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
                <p className="text-sm text-muted-foreground">
                    The name of the problem category.
                </p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    placeholder="Enter category description"
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-sm text-red-500">{errors.description.message}</p>
                )}
                <p className="text-sm text-muted-foreground">
                    A brief description of the problem category (optional).
                </p>
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Problem Category"}
            </Button>
        </form>
    )
}
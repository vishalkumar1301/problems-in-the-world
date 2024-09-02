'use client';




import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ProblemCategory } from "@/lib/interfaces/ProblemCategories";
import { ProblemFormSchema, ProblemFormValues } from "@/lib/formSchemas/ProblemFormSchema";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";







export default function AddProblemForm() {




	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);




	const { control, reset, register, handleSubmit, formState: { errors } } = useForm<ProblemFormValues>({
		resolver: zodResolver(ProblemFormSchema),
		defaultValues: {
			name: "",
			description: "",
			category_id: "",
		},
	});






	const [categories, setCategories] = useState<ProblemCategory[]>([]);
	
	
	useEffect(() => {
		fetchCategories();
	}, []);


	const fetchCategories = async () => {
		try {
			const response = await fetch('/api/problem-categories');
			if (response.ok) {
				const data = await response.json();
				setCategories(data);
			}
		} catch (error) {
			console.error('Error fetching categories:', error);
		}
	};









	async function onSubmit(values: ProblemFormValues) {
		setIsLoading(true);
		try {
			const response = await fetch('/api/problems', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...values,
					category_id: parseInt(values.category_id),
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to add problem');
			}

			const data = await response.json();
			toast({
				title: "Success",
				description: "Problem has been created.",
			});
			reset();
		} catch (error) {
			console.error('Error adding problem:', error);
			toast({
				title: "Error",
				description: "Failed to add problem. Please try again.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	}









	
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			<div className="space-y-2">



				<Label htmlFor="name">Name</Label>
				
				<Input id="name" placeholder="Enter problem name" {...register("name")} />
				{errors.name && ( <p className="text-sm text-red-500">{errors.name.message}</p> )}
				
				<p className="text-sm text-muted-foreground">
					The name of the problem.
				</p>




			</div>
			<div className="space-y-2">
				
				
				
				
				
				<Label htmlFor="description">Description</Label>
				
				<Textarea id="description" placeholder="Enter problem description" {...register("description")} />
				{errors.description && (
					<p className="text-sm text-red-500">{errors.description.message}</p>
				)}

				<p className="text-sm text-muted-foreground">
					A detailed description of the problem.
				</p>





				
			</div>
			<div className="space-y-2">
				
				
				
				
				
				
				<Label htmlFor="category_id">Category</Label>
				
				<Controller name="category_id" control={control} render={({ field }) => (
					<Select onValueChange={field.onChange} value={field.value}>
						<SelectTrigger id="category_id">
							<SelectValue placeholder="Select a category" />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem key={category.category_id} value={category.category_id?.toString() ?? ''}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)} />
				{errors.category_id && (
					<p className="text-sm text-red-500">{errors.category_id.message}</p>
				)}

				<p className="text-sm text-muted-foreground">
					The category this problem belongs to.
				</p>







			</div>






			<Button type="submit" disabled={isLoading}>
				{isLoading ? "Creating..." : "Create Problem"}
			</Button>






			
		</form>
	);
}
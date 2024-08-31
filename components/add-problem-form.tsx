'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { ProblemCategory } from "@/lib/interfaces/ProblemCategories";

export default function AddProblemForm() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [categoryId, setCategoryId] = useState('');
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/problems', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, description, category_id: parseInt(categoryId) }),
			});

			if (!response.ok) {
				throw new Error('Failed to add problem');
			}

			const data = await response.json();
			console.log('Problem added:', data);
			setName('');
			setDescription('');
			setCategoryId('');
			alert('Problem added successfully!');
		} catch (error) {
			console.error('Error adding problem:', error);
			alert('Failed to add problem. Please try again.');
		}
	};

	return (
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<Label htmlFor="name">Problem Name</Label>
					<Input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>
				<div>
					<Label htmlFor="description">Description</Label>
					<Textarea
						id="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div>
					<Label htmlFor="category">Category</Label>
					<Select
						id="category"
						value={categoryId}
						onChange={(e) => setCategoryId(e.target.value)}
						required
					>
						<option value="">Select a category</option>
						{categories.map((category) => (
							<option key={category.category_id} value={category.category_id}>
								{category.name}
							</option>
						))}
					</Select>
				</div>
				<Button type="submit">Add Problem</Button>
			</form>
	);
}
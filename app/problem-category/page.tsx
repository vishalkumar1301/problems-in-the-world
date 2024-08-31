import Image from "next/image";
import AddProblemCategoryForm from "@/components/add-problem-category-form";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <h1 className="text-3xl font-bold my-4">Problem Categories</h1>
            <AddProblemCategoryForm />
        </div>
    );
}

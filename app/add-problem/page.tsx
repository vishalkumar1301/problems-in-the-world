import Image from "next/image";
import AddProblemForm from "@/components/add-problem-form";

export default function AddProblem() {
    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <AddProblemForm />
        </div>
    );
}
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Loading() {
    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
            <LoadingSpinner />
        </div>
    );
}

import dynamic from "next/dynamic";
import { LoadingSpinner } from "@/components";

const Home = dynamic(() => import("@/app/[locale]/(core)/_component/Home"), {
    loading: () => <LoadingSpinner />,
});

export default async function Page() {
    return <Home />;
}

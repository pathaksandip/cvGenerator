// pages/dashboard.tsx

import { Suspense } from "react";
import dynamic from "next/dynamic";
import LoadingComponent from "../LoadingComponent";

const Dash = dynamic(() => import("./Dashboard"), {
  loading: () => <LoadingComponent />, // Show the placeholder component while loading
  ssr: false, // Set to false if you don't want server-side rendering for this component
});

export default function DashboardPage() {
  return (
    <>
      {" "}
      <Suspense fallback="Loading">
        {" "}
        <Dash />
      </Suspense>
    </>
  );
}
("");

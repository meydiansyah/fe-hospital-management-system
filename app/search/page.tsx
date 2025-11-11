import { Suspense } from "react";
import SearchPage from "./SearchPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <span className="text-sm font-medium text-slate-500">Memuat...</span>
        </div>
      }
    >
      <SearchPage />
    </Suspense>
  );
}


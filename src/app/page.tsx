import { Suspense } from "react";
import VerificationView from "./_components/VerificationView";

export default function Page() {
  return (
    <Suspense>
      <VerificationView />
    </Suspense>
  );
}

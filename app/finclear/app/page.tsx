import AuthGuard from "@/components/AuthGuard";
import FinClearApp from "@/components/FinClearApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinClear Portal | Signature By Tunde O",
  description:
    "Client-accountant financial portal. Dashboard, transactions, documents, AI reports, and collaboration.",
};

export default function FinClearAppPage() {
  return (
    <AuthGuard>
      <FinClearApp />
    </AuthGuard>
  );
}

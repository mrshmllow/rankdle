import { ReactNode } from "react";
import { userIsApprover } from "./authorize";
import { redirect } from "next/navigation";

export default async function ApproveLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await userIsApprover())) {
    return redirect("/account/login");
  }

  return <>{children}</>;
}

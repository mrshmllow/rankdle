import { createServerClient } from "@/lib/supabase-server";

export async function userIsApprover() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user === null) {
    return false;
  }

  const approver = user.app_metadata["approver"] as boolean | undefined;

  return approver === true;
}

// @ts-nocheck
"use client";

import { toast } from "@default/ui/primitives/toast";
import { Button } from "@default/ui/primitives/button";

export default function ToastComponent() {
  const handleInvite = () => {
    toast.success("Invitation sent", {
      description: "alex@example.com has been invited to collaborate.",
      position: "top-center",
      action: {
        label: "Resend",
        dismiss: true,
        onClick: () =>
          toast.success("Invitation resent", {
            description: "A new invite link has been delivered."
          })
      }
    });
  };

  return (
    <Button variant="outline" onClick={handleInvite} className="cursor-pointer">
      Invite Member
    </Button>
  );
}

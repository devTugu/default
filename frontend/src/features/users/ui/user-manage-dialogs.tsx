"use client";

import { Loader2 } from "lucide-react";
import type { UserOutput } from "@/entities/user";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { Input } from "@/shared/ui/input";
import { UserDeleteDialog } from "./user-delete-dialog";
import type { UserManageSheetModel } from "./use-user-manage-sheet";
import type { UnassignTarget } from "./user-manage-sheet.types";

interface UserManageDialogsProps {
  user: UserOutput | null;
  unassignTarget: UnassignTarget | null;
  setUnassignTarget: (target: UnassignTarget | null) => void;
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  anonymizeOpen: boolean;
  setAnonymizeOpen: (open: boolean) => void;
  anonymizeConfirmEmail: string;
  setAnonymizeConfirmEmail: (email: string) => void;
  anonymizePending: boolean;
  onUnassign: () => void;
  onAnonymize: () => void;
  onDeleted: () => void;
  t: UserManageSheetModel["t"];
  tCommon: UserManageSheetModel["tCommon"];
}

export function UserManageDialogs({
  user,
  unassignTarget,
  setUnassignTarget,
  deleteOpen,
  setDeleteOpen,
  anonymizeOpen,
  setAnonymizeOpen,
  anonymizeConfirmEmail,
  setAnonymizeConfirmEmail,
  anonymizePending,
  onUnassign,
  onAnonymize,
  onDeleted,
  t,
  tCommon,
}: UserManageDialogsProps) {
  return (
    <>
      <AlertDialog
        open={unassignTarget !== null}
        onOpenChange={(dialogOpen) => !dialogOpen && setUnassignTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("removeRoleTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("removeRoleDescription", {
                roleName: unassignTarget?.roleName ?? "",
                email: user?.email ?? "",
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{tCommon("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={onUnassign}>
              {tCommon("remove")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <UserDeleteDialog
        user={user}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={onDeleted}
      />

      <AlertDialog
        open={anonymizeOpen}
        onOpenChange={(dialogOpen) => {
          setAnonymizeOpen(dialogOpen);
          if (!dialogOpen) setAnonymizeConfirmEmail("");
        }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("anonymizeTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("anonymizeDescription", { email: user?.email ?? "" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2">
            <label
              htmlFor="anonymize-confirm-email"
              className="text-sm font-medium">
              {t("anonymizeConfirmLabel")}
            </label>
            <Input
              id="anonymize-confirm-email"
              value={anonymizeConfirmEmail}
              onChange={(event) => setAnonymizeConfirmEmail(event.target.value)}
              placeholder={user?.email ?? ""}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={anonymizePending}>
              {tCommon("cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onAnonymize}
              disabled={
                anonymizePending ||
                anonymizeConfirmEmail.trim() !== (user?.email ?? "")
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {anonymizePending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              {t("anonymizePii")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

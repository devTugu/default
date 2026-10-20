"use client";

import { AdminFormSheet } from "@/shared/ui/admin-form-sheet";
import { buildUserManageFooter } from "./user-manage-actions";
import { UserManageDialogs } from "./user-manage-dialogs";
import { UserManageSheetContent } from "./user-manage-sheet-content";
import {
  useUserManageSheet,
  type UserSheetState,
} from "./use-user-manage-sheet";

export type { UserSheetState };

interface UserManageSheetProps {
  state: UserSheetState | null;
  onOpenChange: (open: boolean) => void;
}

export function UserManageSheet({ state, onOpenChange }: UserManageSheetProps) {
  const model = useUserManageSheet({ state, onOpenChange });

  if (!model.open) return null;

  const {
    t,
    tCommon,
    isCreate,
    user,
    activeTab,
    unassignTarget,
    setUnassignTarget,
    deleteOpen,
    setDeleteOpen,
    anonymizeOpen,
    setAnonymizeOpen,
    anonymizeConfirmEmail,
    setAnonymizeConfirmEmail,
    anonymizeUser,
    handleUnassignRole,
    handleAnonymize,
  } = model;

  return (
    <>
      <AdminFormSheet
        open={model.open}
        onOpenChange={onOpenChange}
        title={
          isCreate ? t("createTitle") : (user?.email ?? t("editTitle"))
        }
        description={
          isCreate
            ? t("createDescription")
            : activeTab === "roles"
              ? t("editRolesDescription")
              : t("editProfileDescription")
        }
        size="md"
        showContentLocale={false}
        footer={buildUserManageFooter(model)}
      >
        <UserManageSheetContent model={model} />
      </AdminFormSheet>

      <UserManageDialogs
        user={user}
        unassignTarget={unassignTarget}
        setUnassignTarget={setUnassignTarget}
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        anonymizeOpen={anonymizeOpen}
        setAnonymizeOpen={setAnonymizeOpen}
        anonymizeConfirmEmail={anonymizeConfirmEmail}
        setAnonymizeConfirmEmail={setAnonymizeConfirmEmail}
        anonymizePending={anonymizeUser.isPending}
        onUnassign={handleUnassignRole}
        onAnonymize={handleAnonymize}
        onDeleted={() => onOpenChange(false)}
        t={t}
        tCommon={tCommon}
      />
    </>
  );
}

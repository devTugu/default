"use client";

import { AdminFormSheet } from "@/shared/ui/admin-form-sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { buildUserManageFooter } from "./user-manage-actions";
import { UserManageDialogs } from "./user-manage-dialogs";
import {
  UserManageCreateIdentity,
  UserManageEditIdentity,
} from "./user-manage-identity-section";
import { UserManageRolesSection } from "./user-manage-roles-section";
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
    tTable,
    isCreate,
    user,
    sheetId,
    activeTab,
    setTabSelection,
    selectedRoleId,
    setRoleSelection,
    formId,
    createForm,
    editForm,
    onCreateSubmit,
    onEditSubmit,
    assignableRoles,
    roleNameToId,
    canAssign,
    canUnassign,
    assignRole,
    handleAssignRole,
    setUnassignTarget,
    unassignTarget,
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

  const footer = buildUserManageFooter(model);

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
        footer={footer}>
        {isCreate ? (
          <UserManageCreateIdentity
            form={createForm}
            formId={formId}
            onSubmit={onCreateSubmit}
          />
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setTabSelection({
                sheetId,
                tab: value as "profile" | "roles",
              })
            }>
            <TabsList className="w-full">
              <TabsTrigger value="profile" className="flex-1">
                {t("tabProfile")}
              </TabsTrigger>
              <TabsTrigger value="roles" className="flex-1">
                {tTable("roles")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-4">
              <UserManageEditIdentity
                form={editForm}
                formId={formId}
                user={user}
                onSubmit={onEditSubmit}
              />
            </TabsContent>
            <TabsContent value="roles" className="mt-4">
              <UserManageRolesSection
                user={user}
                roleNameToId={roleNameToId}
                assignableRoles={assignableRoles}
                selectedRoleId={selectedRoleId}
                canAssign={canAssign}
                canUnassign={canUnassign}
                assignPending={assignRole.isPending}
                onRoleSelect={(roleId) =>
                  setRoleSelection({ sheetId, roleId })
                }
                onAssign={handleAssignRole}
                onUnassignRequest={setUnassignTarget}
              />
            </TabsContent>
          </Tabs>
        )}
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

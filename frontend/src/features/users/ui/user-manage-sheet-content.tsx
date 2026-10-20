'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@default/ui/primitives/tabs';
import {
  UserManageCreateIdentity,
  UserManageEditIdentity,
} from './user-manage-identity-section';
import { UserManageRolesSection } from './user-manage-roles-section';
import type { useUserManageSheet } from './use-user-manage-sheet';

type UserManageModel = ReturnType<typeof useUserManageSheet>;

type UserManageSheetContentProps = {
  model: UserManageModel;
};

export function UserManageSheetContent({ model }: UserManageSheetContentProps) {
  const {
    t,
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
  } = model;

  if (isCreate) {
    return (
      <UserManageCreateIdentity
        form={createForm}
        formId={formId}
        onSubmit={onCreateSubmit}
      />
    );
  }

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) =>
        setTabSelection({
          sheetId,
          tab: value as 'profile' | 'roles',
        })
      }
    >
      <TabsList className="w-full">
        <TabsTrigger value="profile" className="flex-1">
          {t('tabProfile')}
        </TabsTrigger>
        <TabsTrigger value="roles" className="flex-1">
          {tTable('roles')}
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
          onRoleSelect={(roleId) => setRoleSelection({ sheetId, roleId })}
          onAssign={handleAssignRole}
          onUnassignRequest={setUnassignTarget}
        />
      </TabsContent>
    </Tabs>
  );
}

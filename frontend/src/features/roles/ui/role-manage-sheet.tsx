'use client';

import { Loader2 } from 'lucide-react';
import { AdminFormSheet } from '@/shared/ui/admin-form-sheet';
import { Button } from '@default/ui/primitives/button';
import { RoleCreateForm, RoleEditForm } from './role-manage-forms';
import {
  useRoleManageSheet,
  type RoleSheetState,
} from './use-role-manage-sheet';

export type { RoleSheetState };

interface RoleManageSheetProps {
  state: RoleSheetState | null;
  onOpenChange: (open: boolean) => void;
}

export function RoleManageSheet({ state, onOpenChange }: RoleManageSheetProps) {
  const model = useRoleManageSheet({ state, onOpenChange });
  if (!model.open) return null;

  const {
    t,
    tCommon,
    isCreate,
    role,
    createForm,
    editForm,
    canSubmit,
    onCreateSubmit,
    onEditSubmit,
    isPending,
    formId,
    permissions,
    isLoadingPerms,
    isPermsError,
  } = model;

  const footer = canSubmit ? (
    <div className="flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => onOpenChange(false)}
        disabled={isPending}
      >
        {tCommon('cancel')}
      </Button>
      <Button type="submit" form={formId} disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
        {isCreate ? tCommon('create') : tCommon('save')}
      </Button>
    </div>
  ) : null;

  return (
    <AdminFormSheet
      open={model.open}
      onOpenChange={onOpenChange}
      title={
        isCreate
          ? t('createTitle')
          : t('editTitle', { name: role?.name ?? '' })
      }
      description={isCreate ? t('createDescription') : t('editDescription')}
      size="lg"
      showContentLocale={false}
      footer={footer}
    >
      {isCreate ? (
        <RoleCreateForm
          formId={formId}
          form={createForm}
          onSubmit={onCreateSubmit}
          permissions={permissions}
          isLoadingPerms={isLoadingPerms}
          isPermsError={isPermsError}
        />
      ) : role ? (
        <RoleEditForm
          formId={formId}
          form={editForm}
          role={role}
          onSubmit={onEditSubmit}
          permissions={permissions}
          isLoadingPerms={isLoadingPerms}
          isPermsError={isPermsError}
        />
      ) : null}
    </AdminFormSheet>
  );
}

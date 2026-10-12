'use client';

import { Loader2 } from 'lucide-react';
import { AdminFormSheet } from '@/shared/ui/admin-form-sheet';
import { Button } from '@default/ui/primitives/button';
import {
  PermissionCreateForm,
  PermissionEditForm,
} from './permission-manage-forms';
import {
  usePermissionManageSheet,
  type PermissionSheetState,
} from './use-permission-manage-sheet';

export type { PermissionSheetState };

interface PermissionManageSheetProps {
  state: PermissionSheetState | null;
  onOpenChange: (open: boolean) => void;
}

export function PermissionManageSheet({
  state,
  onOpenChange,
}: PermissionManageSheetProps) {
  const model = usePermissionManageSheet({ state, onOpenChange });
  if (!model.open) return null;

  const {
    t,
    tCommon,
    isCreate,
    permission,
    createForm,
    editForm,
    canSubmit,
    onCreateSubmit,
    onEditSubmit,
    isPending,
    formId,
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
          : t('editTitle', { code: permission?.code ?? '' })
      }
      description={isCreate ? t('createDescription') : t('editDescription')}
      size="md"
      showContentLocale={false}
      footer={footer}
    >
      {isCreate ? (
        <PermissionCreateForm
          formId={formId}
          form={createForm}
          onSubmit={onCreateSubmit}
        />
      ) : permission ? (
        <PermissionEditForm
          formId={formId}
          form={editForm}
          permission={permission}
          onSubmit={onEditSubmit}
        />
      ) : null}
    </AdminFormSheet>
  );
}

'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@default/ui/primitives/button';
import type { UserManageSheetModel } from './use-user-manage-sheet';
import { UserManagePrivacyActions } from './user-manage-privacy-actions';

type FooterModel = Pick<
  UserManageSheetModel,
  | 't'
  | 'tCommon'
  | 'isCreate'
  | 'isEdit'
  | 'activeTab'
  | 'user'
  | 'currentUser'
  | 'canCreate'
  | 'canUpdate'
  | 'canExport'
  | 'canAnonymize'
  | 'canDelete'
  | 'isPending'
  | 'formId'
  | 'exportUserData'
  | 'handleExportData'
  | 'setAnonymizeConfirmEmail'
  | 'setAnonymizeOpen'
  | 'setDeleteOpen'
  | 'onOpenChange'
>;

export function buildUserManageFooter(model: FooterModel) {
  const {
    tCommon,
    isCreate,
    isEdit,
    activeTab,
    canCreate,
    canUpdate,
    isPending,
    formId,
    onOpenChange,
  } = model;

  const showProfileFooter = isCreate || (isEdit && activeTab === 'profile');

  if (showProfileFooter && ((isCreate && canCreate) || (isEdit && canUpdate))) {
    return (
      <div className="space-y-4">
        {isEdit ? <UserManagePrivacyActions {...model} /> : null}
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
      </div>
    );
  }

  if (isEdit && activeTab === 'roles') {
    return (
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          {tCommon('close')}
        </Button>
      </div>
    );
  }

  return null;
}

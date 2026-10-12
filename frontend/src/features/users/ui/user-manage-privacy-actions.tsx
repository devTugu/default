'use client';

import { Loader2 } from 'lucide-react';
import { Button } from '@default/ui/primitives/button';
import type { UserManageSheetModel } from './use-user-manage-sheet';

type PrivacyModel = Pick<
  UserManageSheetModel,
  | 't'
  | 'tCommon'
  | 'user'
  | 'currentUser'
  | 'canExport'
  | 'canAnonymize'
  | 'canDelete'
  | 'exportUserData'
  | 'handleExportData'
  | 'setAnonymizeConfirmEmail'
  | 'setAnonymizeOpen'
  | 'setDeleteOpen'
>;

export function UserManagePrivacyActions(model: PrivacyModel) {
  const {
    t,
    tCommon,
    user,
    currentUser,
    canExport,
    canAnonymize,
    canDelete,
    exportUserData,
    handleExportData,
    setAnonymizeConfirmEmail,
    setAnonymizeOpen,
    setDeleteOpen,
  } = model;

  return (
    <>
      {canExport || canAnonymize || canDelete ? (
        <div className="rounded-md border p-3">
          <p className="text-sm font-medium">{t('privacyTitle')}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t('privacyDescription')}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {canExport ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleExportData}
                disabled={exportUserData.isPending}
              >
                {exportUserData.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : null}
                {exportUserData.isPending
                  ? t('exportingData')
                  : t('exportData')}
              </Button>
            ) : null}
            {canAnonymize ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setAnonymizeConfirmEmail('');
                  setAnonymizeOpen(true);
                }}
              >
                {t('anonymizePii')}
              </Button>
            ) : null}
          </div>
          {!canAnonymize && canDelete && currentUser?.id === user?.id ? (
            <p className="mt-2 text-xs text-muted-foreground">
              {t('anonymizeSelfBlocked')}
            </p>
          ) : null}
        </div>
      ) : null}
      {canDelete ? (
        <div className="rounded-md border border-destructive/30 p-3">
          <p className="text-sm font-medium text-destructive">
            {tCommon('dangerZone')}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t('dangerZoneDescription')}
          </p>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="mt-2"
            onClick={() => setDeleteOpen(true)}
          >
            {t('deleteUser')}
          </Button>
        </div>
      ) : null}
    </>
  );
}

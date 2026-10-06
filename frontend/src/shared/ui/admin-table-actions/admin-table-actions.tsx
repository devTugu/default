'use client';

import { Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { PermissionCode } from '@/shared/config/permissions';
import { Button } from '@/shared/ui/button';

interface AdminTableActionsProps {
  name: string;
  updatePermission?: PermissionCode;
  deletePermission?: PermissionCode;
  /** Injected from features/auth — shared must not import features. */
  can?: (code: PermissionCode) => boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AdminTableActions({
  name,
  updatePermission,
  deletePermission,
  can,
  onEdit,
  onDelete,
}: AdminTableActionsProps) {
  const t = useTranslations('common');
  const canEdit = updatePermission
    ? Boolean(can?.(updatePermission))
    : Boolean(onEdit);
  const canDelete = deletePermission
    ? Boolean(can?.(deletePermission))
    : Boolean(onDelete);

  if (!canEdit && !canDelete) return null;

  return (
    <div className="flex items-center justify-end gap-1">
      {canEdit && onEdit ? (
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={onEdit}
          aria-label={t('editAriaLabel', { name })}
        >
          <Pencil className="size-4" />
        </Button>
      ) : null}
      {canDelete && onDelete ? (
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-destructive hover:text-destructive"
          onClick={onDelete}
          aria-label={t('deleteAriaLabel', { name })}
        >
          <Trash2 className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}

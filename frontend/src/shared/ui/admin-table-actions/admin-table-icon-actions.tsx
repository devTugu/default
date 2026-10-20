'use client';

import { Eye, Pencil, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface AdminTableIconActionsProps {
  name: string;
  canEdit: boolean;
  canDelete: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AdminTableIconActions({
  name,
  canEdit,
  canDelete,
  onEdit,
  onDelete,
}: AdminTableIconActionsProps) {
  const t = useTranslations('common');

  return (
    <div className="flex items-center justify-end gap-3 text-foreground">
      {canDelete && onDelete ? (
        <button
          type="button"
          onClick={onDelete}
          className="text-foreground hover:text-destructive cursor-pointer"
          aria-label={t('deleteAriaLabel', { name })}
        >
          <Trash2 className="size-4" />
        </button>
      ) : null}
      {canEdit && onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="hover:text-foreground/80 cursor-pointer"
          aria-label={t('viewAriaLabel', { name })}
        >
          <Eye className="size-4" />
        </button>
      ) : null}
      {canEdit && onEdit ? (
        <button
          type="button"
          onClick={onEdit}
          className="hover:text-foreground/80 cursor-pointer"
          aria-label={t('editAriaLabel', { name })}
        >
          <Pencil className="size-4" />
        </button>
      ) : null}
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Permission } from '../types/permission';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { ScrollArea } from '@/shared/ui/scroll-area';
import { Separator } from '@/shared/ui/separator';
import { filterPermissions, groupPermissions } from './group-permissions';

interface PermissionPickerProps {
  permissions: Permission[];
  value: number[];
  onChange: (ids: number[]) => void;
  disabled?: boolean;
}

interface PermissionGroupProps {
  title: string;
  items: Permission[];
  value: number[];
  onChange: (ids: number[]) => void;
  disabled?: boolean;
  selectAllLabel: string;
}

function PermissionGroup({
  title,
  items,
  value,
  onChange,
  disabled,
  selectAllLabel,
}: PermissionGroupProps) {
  if (items.length === 0) return null;

  const allSelected = items.every((item) => value.includes(item.id));
  const someSelected = items.some((item) => value.includes(item.id));

  const toggleAll = (checked: boolean) => {
    const groupIds = items.map((item) => item.id);
    if (checked) {
      onChange([...new Set([...value, ...groupIds])]);
      return;
    }
    onChange(value.filter((id) => !groupIds.includes(id)));
  };

  const toggleOne = (id: number, checked: boolean) => {
    if (checked) {
      onChange([...value, id]);
      return;
    }
    onChange(value.filter((current) => current !== id));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <Checkbox
            checked={allSelected ? true : someSelected ? 'indeterminate' : false}
            onCheckedChange={(checked) => toggleAll(checked === true)}
            disabled={disabled}
          />
          {selectAllLabel}
        </label>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex cursor-pointer items-start gap-2 rounded-md border p-2 text-sm"
          >
            <Checkbox
              checked={value.includes(item.id)}
              onCheckedChange={(checked) =>
                toggleOne(item.id, checked === true)
              }
              disabled={disabled}
              className="mt-0.5"
            />
            <span className="min-w-0 flex-1">
              <span className="font-medium">{item.code}</span>
              {item.description ? (
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {item.description}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function PermissionPicker({
  permissions,
  value,
  onChange,
  disabled,
}: PermissionPickerProps) {
  const t = useTranslations('entities.permissions');
  const tCommon = useTranslations('common');
  const tGroups = useTranslations('permissionGroups');
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () => filterPermissions(permissions, search),
    [permissions, search],
  );
  const groups = useMemo(
    () => groupPermissions(filtered, tGroups),
    [filtered, tGroups],
  );

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="permission-search">{t('searchLabel')}</Label>
        <Input
          id="permission-search"
          placeholder={t('filterPlaceholder')}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          disabled={disabled}
        />
      </div>
      <ScrollArea className="h-64 rounded-md border p-3">
        <div className="space-y-4 pr-3">
          {groups.map((group, index) => (
            <div key={group.key}>
              {index > 0 ? <Separator className="mb-4" /> : null}
              <PermissionGroup
                title={group.title}
                items={group.items}
                value={value}
                onChange={onChange}
                disabled={disabled}
                selectAllLabel={tCommon('selectAll')}
              />
            </div>
          ))}
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t('pickerEmpty')}</p>
          ) : null}
        </div>
      </ScrollArea>
      <p className="text-xs text-muted-foreground">
        {t('selectedCount', { selected: value.length, total: permissions.length })}
      </p>
    </div>
  );
}

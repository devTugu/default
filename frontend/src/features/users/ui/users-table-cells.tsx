'use client';

import type { UserOutput } from '@/entities/user';
import { SUPER_ADMIN_ROLE } from '@/shared/config/permissions';
import { Badge } from '@default/ui/primitives/badge';

export function userInitials(email: string): string {
  const local = email.split('@')[0] ?? email;
  return local.slice(0, 2).toUpperCase();
}

export function UserEmailCell({
  user,
  noRolesLabel,
}: {
  user: UserOutput;
  noRolesLabel: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
        {userInitials(user.email)}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{user.email}</p>
        <p className="text-muted-foreground truncate text-xs">
          {user.roles[0] ?? noRolesLabel}
        </p>
      </div>
    </div>
  );
}

export function ClickableRoleBadges({
  user,
  onClick,
  noRolesLabel,
}: {
  user: UserOutput;
  onClick: () => void;
  noRolesLabel: string;
}) {
  if (user.roles.length === 0) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="text-muted-foreground hover:text-foreground text-sm"
      >
        {noRolesLabel}
      </button>
    );
  }

  return (
    <button type="button" onClick={onClick} className="flex flex-wrap gap-1 text-left">
      {user.roles.map((role) => (
        <Badge
          key={role}
          variant={role === SUPER_ADMIN_ROLE ? 'default' : 'secondary'}
          className="cursor-pointer"
        >
          {role}
        </Badge>
      ))}
    </button>
  );
}

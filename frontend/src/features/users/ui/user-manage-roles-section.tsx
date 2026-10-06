"use client";

import { Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { UserOutput } from "@/entities/user";
import { SUPER_ADMIN_ROLE } from "@/shared/config/permissions";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import type { UnassignTarget } from "./user-manage-sheet.types";

function RoleBadge({
  name,
  onRemove,
  canRemove,
  removeAriaLabel,
}: {
  name: string;
  onRemove?: () => void;
  canRemove: boolean;
  removeAriaLabel: string;
}) {
  return (
    <Badge
      variant={name === SUPER_ADMIN_ROLE ? "default" : "secondary"}
      className="gap-1 pr-1">
      {name}
      {canRemove && onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-sm p-0.5 hover:bg-background/20"
          aria-label={removeAriaLabel}>
          <X className="size-3" />
        </button>
      ) : null}
    </Badge>
  );
}

interface AssignableRole {
  id: number;
  name: string;
}

interface UserManageRolesSectionProps {
  user: UserOutput | null;
  roleNameToId: Map<string, number>;
  assignableRoles: AssignableRole[];
  selectedRoleId: string;
  canAssign: boolean;
  canUnassign: boolean;
  assignPending: boolean;
  onRoleSelect: (roleId: string) => void;
  onAssign: () => void;
  onUnassignRequest: (target: UnassignTarget) => void;
}

export function UserManageRolesSection({
  user,
  roleNameToId,
  assignableRoles,
  selectedRoleId,
  canAssign,
  canUnassign,
  assignPending,
  onRoleSelect,
  onAssign,
  onUnassignRequest,
}: UserManageRolesSectionProps) {
  const t = useTranslations("entities.users");
  const tCommon = useTranslations("common");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-sm font-medium">{t("currentRoles")}</p>
        {user && user.roles.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.roles.map((roleName) => {
              const roleId = roleNameToId.get(roleName);
              return (
                <RoleBadge
                  key={roleName}
                  name={roleName}
                  canRemove={canUnassign && roleId !== undefined}
                  removeAriaLabel={tCommon("removeAriaLabel", {
                    name: roleName,
                  })}
                  onRemove={
                    roleId !== undefined
                      ? () =>
                          onUnassignRequest({
                            roleId,
                            roleName,
                          })
                      : undefined
                  }
                />
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t("emptyRoles")}</p>
        )}
      </div>
      {canAssign ? (
        <div className="space-y-2">
          <p className="text-sm font-medium">{t("addRole")}</p>
          <div className="flex gap-2">
            <Select value={selectedRoleId} onValueChange={onRoleSelect}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={t("selectRole")} />
              </SelectTrigger>
              <SelectContent>
                {assignableRoles.map((role) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={onAssign}
              disabled={!selectedRoleId || assignPending}>
              {assignPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              {tCommon("add")}
            </Button>
          </div>
          {assignableRoles.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              {t("allRolesAssigned")}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

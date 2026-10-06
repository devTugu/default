"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import type { UserManageSheetModel } from "./use-user-manage-sheet";

type FooterModel = Pick<
  UserManageSheetModel,
  | "t"
  | "tCommon"
  | "isCreate"
  | "isEdit"
  | "activeTab"
  | "user"
  | "currentUser"
  | "canCreate"
  | "canUpdate"
  | "canExport"
  | "canAnonymize"
  | "canDelete"
  | "isPending"
  | "formId"
  | "exportUserData"
  | "handleExportData"
  | "setAnonymizeConfirmEmail"
  | "setAnonymizeOpen"
  | "setDeleteOpen"
  | "onOpenChange"
>;

export function buildUserManageFooter(model: FooterModel) {
  const {
    t,
    tCommon,
    isCreate,
    isEdit,
    activeTab,
    user,
    currentUser,
    canCreate,
    canUpdate,
    canExport,
    canAnonymize,
    canDelete,
    isPending,
    formId,
    exportUserData,
    handleExportData,
    setAnonymizeConfirmEmail,
    setAnonymizeOpen,
    setDeleteOpen,
    onOpenChange,
  } = model;

  const showProfileFooter = isCreate || (isEdit && activeTab === "profile");

  if (showProfileFooter && ((isCreate && canCreate) || (isEdit && canUpdate))) {
    return (
      <div className="space-y-4">
        {isEdit && (canExport || canAnonymize || canDelete) ? (
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium">{t("privacyTitle")}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("privacyDescription")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {canExport ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleExportData}
                  disabled={exportUserData.isPending}>
                  {exportUserData.isPending ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  {exportUserData.isPending
                    ? t("exportingData")
                    : t("exportData")}
                </Button>
              ) : null}
              {canAnonymize ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAnonymizeConfirmEmail("");
                    setAnonymizeOpen(true);
                  }}>
                  {t("anonymizePii")}
                </Button>
              ) : null}
            </div>
            {!canAnonymize && canDelete && currentUser?.id === user?.id ? (
              <p className="mt-2 text-xs text-muted-foreground">
                {t("anonymizeSelfBlocked")}
              </p>
            ) : null}
          </div>
        ) : null}
        {isEdit && canDelete ? (
          <div className="rounded-md border border-destructive/30 p-3">
            <p className="text-sm font-medium text-destructive">
              {tCommon("dangerZone")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {t("dangerZoneDescription")}
            </p>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="mt-2"
              onClick={() => setDeleteOpen(true)}>
              {t("deleteUser")}
            </Button>
          </div>
        ) : null}
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}>
            {tCommon("cancel")}
          </Button>
          <Button type="submit" form={formId} disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : null}
            {isCreate ? tCommon("create") : tCommon("save")}
          </Button>
        </div>
      </div>
    );
  }

  if (isEdit && activeTab === "roles") {
    return (
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}>
          {tCommon("close")}
        </Button>
      </div>
    );
  }

  return null;
}

import { toast } from "sonner";
import type {
  CreateUserFormValues,
  UpdateUserFormValues,
  UserOutput,
} from "@/entities/user";
import { getErrorMessage } from "@/shared/api";
import type { UnassignTarget } from "./user-manage-sheet.types";

interface MutationLike<TArgs, TResult = unknown> {
  mutateAsync: (args: TArgs) => Promise<TResult>;
}

interface UserManageHandlersDeps {
  t: (key: string) => string;
  user: UserOutput | null;
  selectedRoleId: string;
  sheetId: string;
  unassignTarget: UnassignTarget | null;
  anonymizeConfirmEmail: string;
  onOpenChange: (open: boolean) => void;
  setRoleSelection: (value: { sheetId: string; roleId: string }) => void;
  setUnassignTarget: (value: UnassignTarget | null) => void;
  setAnonymizeOpen: (open: boolean) => void;
  setAnonymizeConfirmEmail: (email: string) => void;
  createUser: MutationLike<CreateUserFormValues>;
  updateUser: MutationLike<{ id: number; data: Partial<UpdateUserFormValues> }>;
  assignRole: MutationLike<{ userId: number; roleId: number }>;
  unassignRole: MutationLike<{ userId: number; roleId: number }>;
  exportUserData: MutationLike<number>;
  anonymizeUser: MutationLike<number>;
}

export function createUserManageHandlers(deps: UserManageHandlersDeps) {
  const {
    t,
    user,
    selectedRoleId,
    sheetId,
    unassignTarget,
    anonymizeConfirmEmail,
    onOpenChange,
    setRoleSelection,
    setUnassignTarget,
    setAnonymizeOpen,
    setAnonymizeConfirmEmail,
    createUser,
    updateUser,
    assignRole,
    unassignRole,
    exportUserData,
    anonymizeUser,
  } = deps;

  const onCreateSubmit = async (values: CreateUserFormValues) => {
    try {
      await createUser.mutateAsync(values);
      toast.success(t("toastCreated"));
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onEditSubmit = async (values: UpdateUserFormValues) => {
    if (!user) return;
    try {
      const payload = {
        isActive: values.isActive,
        ...(values.password ? { password: values.password } : {}),
      };
      await updateUser.mutateAsync({ id: user.id, data: payload });
      toast.success(t("toastUpdated"));
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleAssignRole = async () => {
    if (!user || !selectedRoleId) return;
    try {
      await assignRole.mutateAsync({
        userId: user.id,
        roleId: Number(selectedRoleId),
      });
      toast.success(t("toastRoleAssigned"));
      setRoleSelection({ sheetId, roleId: "" });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUnassignRole = async () => {
    if (!user || !unassignTarget) return;
    try {
      await unassignRole.mutateAsync({
        userId: user.id,
        roleId: unassignTarget.roleId,
      });
      toast.success(t("toastRoleRemoved"));
      setUnassignTarget(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleExportData = async () => {
    if (!user) return;
    try {
      await exportUserData.mutateAsync(user.id);
      toast.success(t("toastExported"));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleAnonymize = async () => {
    if (!user) return;
    if (anonymizeConfirmEmail.trim() !== user.email) {
      toast.error(t("anonymizeConfirmLabel"));
      return;
    }
    try {
      await anonymizeUser.mutateAsync(user.id);
      toast.success(t("toastAnonymized"));
      setAnonymizeOpen(false);
      setAnonymizeConfirmEmail("");
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    onCreateSubmit,
    onEditSubmit,
    handleAssignRole,
    handleUnassignRole,
    handleExportData,
    handleAnonymize,
  };
}

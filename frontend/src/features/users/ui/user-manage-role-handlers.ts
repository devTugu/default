import { toast } from 'sonner';
import type { UserOutput } from '@/entities/user';
import { getErrorMessage } from '@/shared/api';
import type { UnassignTarget } from './user-manage-sheet.types';

interface MutationLike<TArgs> {
  mutateAsync: (args: TArgs) => Promise<unknown>;
}

interface RoleHandlersDeps {
  t: (key: string) => string;
  user: UserOutput | null;
  selectedRoleId: string;
  sheetId: string;
  unassignTarget: UnassignTarget | null;
  setRoleSelection: (value: { sheetId: string; roleId: string }) => void;
  setUnassignTarget: (value: UnassignTarget | null) => void;
  assignRole: MutationLike<{ userId: number; roleId: number }>;
  unassignRole: MutationLike<{ userId: number; roleId: number }>;
}

export function createUserRoleHandlers(deps: RoleHandlersDeps) {
  const {
    t,
    user,
    selectedRoleId,
    sheetId,
    unassignTarget,
    setRoleSelection,
    setUnassignTarget,
    assignRole,
    unassignRole,
  } = deps;

  const handleAssignRole = async () => {
    if (!user || !selectedRoleId) return;
    try {
      await assignRole.mutateAsync({
        userId: user.id,
        roleId: Number(selectedRoleId),
      });
      toast.success(t('toastRoleAssigned'));
      setRoleSelection({ sheetId, roleId: '' });
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
      toast.success(t('toastRoleRemoved'));
      setUnassignTarget(null);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return { handleAssignRole, handleUnassignRole };
}

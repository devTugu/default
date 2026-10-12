import { toast } from 'sonner';
import type {
  CreateRoleFormValues,
  UpdateRoleFormValues,
  Role,
} from '@/entities/role';
import { getErrorMessage } from '@/shared/api';

interface MutationLike<TArgs> {
  mutateAsync: (args: TArgs) => Promise<unknown>;
}

export function createRoleSubmitHandlers(params: {
  t: (key: string) => string;
  role: Role | null;
  onOpenChange: (open: boolean) => void;
  createRole: MutationLike<CreateRoleFormValues>;
  updateRole: MutationLike<{ id: number; data: UpdateRoleFormValues }>;
}) {
  const { t, role, onOpenChange, createRole, updateRole } = params;

  const onCreateSubmit = async (values: CreateRoleFormValues) => {
    try {
      await createRole.mutateAsync(values);
      toast.success(t('toastCreated'));
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onEditSubmit = async (values: UpdateRoleFormValues) => {
    if (!role) return;
    try {
      await updateRole.mutateAsync({ id: role.id, data: values });
      toast.success(t('toastUpdated'));
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return { onCreateSubmit, onEditSubmit };
}

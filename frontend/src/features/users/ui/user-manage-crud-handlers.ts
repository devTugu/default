import { toast } from 'sonner';
import type {
  CreateUserFormValues,
  UpdateUserFormValues,
  UserOutput,
} from '@/entities/user';
import { getErrorMessage } from '@/shared/api';

interface MutationLike<TArgs> {
  mutateAsync: (args: TArgs) => Promise<unknown>;
}

interface CrudHandlersDeps {
  t: (key: string) => string;
  user: UserOutput | null;
  anonymizeConfirmEmail: string;
  onOpenChange: (open: boolean) => void;
  setAnonymizeOpen: (open: boolean) => void;
  setAnonymizeConfirmEmail: (email: string) => void;
  createUser: MutationLike<CreateUserFormValues>;
  updateUser: MutationLike<{ id: number; data: Partial<UpdateUserFormValues> }>;
  exportUserData: MutationLike<number>;
  anonymizeUser: MutationLike<number>;
}

export function createUserCrudHandlers(deps: CrudHandlersDeps) {
  const {
    t,
    user,
    anonymizeConfirmEmail,
    onOpenChange,
    setAnonymizeOpen,
    setAnonymizeConfirmEmail,
    createUser,
    updateUser,
    exportUserData,
    anonymizeUser,
  } = deps;

  const onCreateSubmit = async (values: CreateUserFormValues) => {
    try {
      await createUser.mutateAsync(values);
      toast.success(t('toastCreated'));
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
      toast.success(t('toastUpdated'));
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleExportData = async () => {
    if (!user) return;
    try {
      await exportUserData.mutateAsync(user.id);
      toast.success(t('toastExported'));
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleAnonymize = async () => {
    if (!user) return;
    if (anonymizeConfirmEmail.trim() !== user.email) {
      toast.error(t('anonymizeConfirmLabel'));
      return;
    }
    try {
      await anonymizeUser.mutateAsync(user.id);
      toast.success(t('toastAnonymized'));
      setAnonymizeOpen(false);
      setAnonymizeConfirmEmail('');
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    onCreateSubmit,
    onEditSubmit,
    handleExportData,
    handleAnonymize,
  };
}

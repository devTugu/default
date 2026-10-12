import { createUserCrudHandlers } from './user-manage-crud-handlers';
import { createUserRoleHandlers } from './user-manage-role-handlers';
import type { UnassignTarget } from './user-manage-sheet.types';
import type {
  CreateUserFormValues,
  UpdateUserFormValues,
  UserOutput,
} from '@/entities/user';

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
  return {
    ...createUserCrudHandlers(deps),
    ...createUserRoleHandlers(deps),
  };
}

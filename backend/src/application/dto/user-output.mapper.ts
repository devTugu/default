import { User } from '@domain/user/entities/user.entity';
import { UserOutput } from './user.dto';

export function toUserOutput(user: User): UserOutput {
  return {
    id: user.id,
    email: user.email,
    isActive: user.isActive,
    mfaEnabled: user.mfaEnabled,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    roles: user.roleNames,
    permissionCodes: user.permissionCodes,
  };
}

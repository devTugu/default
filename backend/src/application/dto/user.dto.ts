import type {
  CreateUserInput,
  UpdateUserInput,
  UserOutput as UserWire,
} from '@default/types/user';

export type { CreateUserInput, UpdateUserInput };

/**
 * Application-layer user. Dates are `Date` in-process;
 * JSON responses serialize to the wire shape in `@default/types/user` (`UserOutput`).
 */
export type UserOutput = Omit<UserWire, 'createdAt' | 'updatedAt'> & {
  createdAt: Date;
  updatedAt: Date;
};

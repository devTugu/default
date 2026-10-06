import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';

describe('PermissionsGuard', () => {
  const reflector = {
    getAllAndOverride: jest.fn(),
  } as unknown as Reflector;

  const guard = new PermissionsGuard(reflector);

  const createContext = (user?: {
    permissionCodes: string[];
    roleNames: string[];
  }) =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
      getHandler: () => ({}),
      getClass: () => ({}),
    }) as ExecutionContext;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows when no permissions metadata', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(undefined);
    expect(guard.canActivate(createContext())).toBe(true);
  });

  it('allows SUPER_ADMIN for any permission', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(['AUDIT_READ']);
    expect(
      guard.canActivate(
        createContext({
          permissionCodes: [],
          roleNames: ['SUPER_ADMIN'],
        }),
      ),
    ).toBe(true);
  });

  it('throws when user lacks permission', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(['AUDIT_READ']);
    expect(() =>
      guard.canActivate(
        createContext({
          permissionCodes: ['USER_READ'],
          roleNames: ['SITE_EDITOR'],
        }),
      ),
    ).toThrow(ForbiddenException);
  });

  it('allows when user has required permission', () => {
    reflector.getAllAndOverride = jest.fn().mockReturnValue(['AUDIT_READ']);
    expect(
      guard.canActivate(
        createContext({
          permissionCodes: ['AUDIT_READ'],
          roleNames: ['SITE_EDITOR'],
        }),
      ),
    ).toBe(true);
  });
});

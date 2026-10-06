import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationDomainService } from '@domain/services/authorization.domain-service';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { JwtPayload } from '@shared/types/pagination';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly authz = new AuthorizationDomainService();

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required?.length) return true;

    const { user } = context.switchToHttp().getRequest<{ user: JwtPayload }>();
    if (!user) throw new ForbiddenException('Access denied.');

    const allowed = this.authz.hasAllPermissions(
      user.permissionCodes,
      required,
      user.roleNames,
    );
    if (!allowed) {
      throw new ForbiddenException(
        `Required permissions: ${required.join(', ')}`,
      );
    }
    return true;
  }
}

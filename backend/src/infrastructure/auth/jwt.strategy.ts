import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IUserRepository } from '@domain/user/repositories/user.repository.interface';
import { ITokenBlacklist } from '@application/ports/token-blacklist.port';
import { LoadUserAuthContextUseCase } from '@application/user/use-cases/load-user-auth-context.use-case';
import { JwtPayload } from '@shared/types/pagination';
import { USER_REPOSITORY, TOKEN_BLACKLIST } from '@shared/constants/tokens';

interface RawJwtPayload {
  sub: number;
  email: string;
  type: string;
  jti?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    @Inject(TOKEN_BLACKLIST) private readonly blacklist: ITokenBlacklist,
    private readonly loadAuthContext: LoadUserAuthContextUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: RawJwtPayload): Promise<JwtPayload> {
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Invalid access token.');
    }
    if (payload.jti && (await this.blacklist.isRevoked(payload.jti))) {
      throw new UnauthorizedException('Token has been revoked.');
    }

    const active = await this.users.findActiveById(payload.sub);
    if (!active) {
      throw new UnauthorizedException('User not found or inactive.');
    }

    const context = await this.loadAuthContext.execute(payload.sub);
    if (!context) {
      throw new UnauthorizedException('Unable to load user permissions.');
    }

    return {
      sub: payload.sub,
      email: payload.email,
      roleNames: context.roleNames,
      permissionCodes: context.permissionCodes,
      type: 'access',
      jti: payload.jti,
    };
  }
}

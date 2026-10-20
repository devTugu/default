import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import {
  ListAuthSessionsUseCase,
  RevokeAuthSessionUseCase,
  RevokeOtherAuthSessionsUseCase,
} from '@application/auth/use-cases/sessions.use-cases';
import { AppErrors } from '@application/exceptions/application.exception';
import { JwtPayload } from '@shared/types/pagination';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { readRefreshTokenHeader } from '../../lib/client-request-meta';

@ApiTags('Auth v1')
@Controller({ path: 'auth', version: '1' })
export class AuthSessionsV1Controller {
  constructor(
    private readonly listSessions: ListAuthSessionsUseCase,
    private readonly revokeSession: RevokeAuthSessionUseCase,
    private readonly revokeOtherSessions: RevokeOtherAuthSessionsUseCase,
  ) {}

  @Get('sessions')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'List active sessions for current user' })
  listAuthSessions(@CurrentUser() user: JwtPayload, @Req() req: Request) {
    return this.listSessions.execute(user.sub, readRefreshTokenHeader(req));
  }

  @Delete('sessions/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Revoke a session by id' })
  async revokeAuthSession(
    @CurrentUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.revokeSession.execute(user.sub, id);
  }

  @Post('sessions/revoke-others')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Revoke all sessions except the current device' })
  async revokeOtherAuthSessions(
    @CurrentUser() user: JwtPayload,
    @Req() req: Request,
  ): Promise<void> {
    const refreshToken = readRefreshTokenHeader(req);
    if (!refreshToken) {
      throw AppErrors.BAD_REQUEST('Current refresh token is required.');
    }
    await this.revokeOtherSessions.execute(user.sub, refreshToken);
  }
}

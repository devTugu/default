import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserUseCase } from '@application/user/use-cases/create-user.use-case';
import { ListUsersUseCase } from '@application/user/use-cases/list-users.use-case';
import { GetUserUseCase } from '@application/user/use-cases/get-user.use-case';
import { UpdateUserUseCase } from '@application/user/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '@application/user/use-cases/delete-user.use-case';
import {
  AnonymizeUserUseCase,
  ExportUserDataUseCase,
} from '@application/user/use-cases/gdpr.use-cases';
import { Permissions } from '../../decorators/permissions.decorator';
import {
  CreateUserDto,
  ListUsersQueryDto,
  UpdateUserDto,
} from '../../dto/v1/user.dto';

@ApiTags('Users v1')
@ApiBearerAuth('access-token')
@Controller({ path: 'users', version: '1' })
export class UserV1Controller {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly exportUserData: ExportUserDataUseCase,
    private readonly anonymizeUser: AnonymizeUserUseCase,
  ) {}

  @Post()
  @Permissions('USER_CREATE')
  @ApiOperation({ summary: 'Create user' })
  create(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto);
  }

  @Get()
  @Permissions('USER_READ')
  @ApiOperation({ summary: 'List users' })
  findAll(@Query() query: ListUsersQueryDto) {
    return this.listUsers.execute(query);
  }

  @Get(':id')
  @Permissions('USER_READ')
  @ApiOperation({ summary: 'Get user by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getUser.execute(id);
  }

  @Patch(':id')
  @Permissions('USER_UPDATE')
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.updateUser.execute(id, dto);
  }

  @Get(':id/export')
  @Permissions('USER_READ')
  @ApiOperation({ summary: 'Export user data (GDPR)' })
  exportData(@Param('id', ParseIntPipe) id: number) {
    return this.exportUserData.execute(id);
  }

  @Post(':id/anonymize')
  @Permissions('USER_DELETE')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Anonymize user PII (GDPR erasure)' })
  async anonymize(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.anonymizeUser.execute(id);
  }

  @Delete(':id')
  @Permissions('USER_DELETE')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteUser.execute(id);
  }
}

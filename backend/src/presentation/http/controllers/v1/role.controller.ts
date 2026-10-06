import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleUseCase } from '@application/authorization/use-cases/create-role.use-case';
import {
  AssignRoleToUserUseCase,
  DeleteRoleUseCase,
  GetRoleUseCase,
  ListRolesUseCase,
  RemoveRoleFromUserUseCase,
  UpdateRoleUseCase,
} from '@application/authorization/use-cases/role-crud.use-cases';
import { Permissions } from '../../decorators/permissions.decorator';
import {
  AssignRoleDto,
  CreateRoleDto,
  ListQueryDto,
  UpdateRoleDto,
} from '../../dto/v1/role.dto';

@ApiTags('Roles v1')
@ApiBearerAuth('access-token')
@Controller({ path: 'roles', version: '1' })
export class RoleV1Controller {
  constructor(
    private readonly createRole: CreateRoleUseCase,
    private readonly listRoles: ListRolesUseCase,
    private readonly getRole: GetRoleUseCase,
    private readonly updateRole: UpdateRoleUseCase,
    private readonly deleteRole: DeleteRoleUseCase,
    private readonly assignRole: AssignRoleToUserUseCase,
    private readonly removeRole: RemoveRoleFromUserUseCase,
  ) {}

  @Post()
  @Permissions('ROLE_CREATE')
  @ApiOperation({ summary: 'Create role' })
  create(@Body() dto: CreateRoleDto) {
    return this.createRole.execute(dto);
  }

  @Get()
  @Permissions('ROLE_READ')
  @ApiOperation({ summary: 'List roles' })
  findAll(@Query() query: ListQueryDto) {
    return this.listRoles.execute(query.page, query.limit);
  }

  @Get(':id')
  @Permissions('ROLE_READ')
  @ApiOperation({ summary: 'Get role by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getRole.execute(id);
  }

  @Put(':id')
  @Permissions('ROLE_UPDATE')
  @ApiOperation({ summary: 'Update role' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRoleDto) {
    return this.updateRole.execute(id, dto);
  }

  @Delete(':id')
  @Permissions('ROLE_DELETE')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete role' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deleteRole.execute(id);
  }

  @Post('assign')
  @Permissions('ROLE_CREATE')
  @ApiOperation({ summary: 'Assign role to user' })
  assignToUser(@Body() dto: AssignRoleDto) {
    return this.assignRole.execute(dto.userId, dto.roleId);
  }

  @Delete('assign/:userId/:roleId')
  @Permissions('ROLE_DELETE')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove role from user' })
  async removeFromUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<void> {
    await this.removeRole.execute(userId, roleId);
  }
}

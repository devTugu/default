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
import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  GetPermissionUseCase,
  ListPermissionsUseCase,
  UpdatePermissionUseCase,
} from '@application/authorization/use-cases/permission-crud.use-cases';
import { Permissions } from '../../decorators/permissions.decorator';
import {
  CreatePermissionDto,
  ListQueryDto,
  UpdatePermissionDto,
} from '../../dto/v1/role.dto';

@ApiTags('Permissions v1')
@ApiBearerAuth('access-token')
@Controller({ path: 'permissions', version: '1' })
export class PermissionV1Controller {
  constructor(
    private readonly createPermission: CreatePermissionUseCase,
    private readonly listPermissions: ListPermissionsUseCase,
    private readonly getPermission: GetPermissionUseCase,
    private readonly updatePermission: UpdatePermissionUseCase,
    private readonly deletePermission: DeletePermissionUseCase,
  ) {}

  @Post()
  @Permissions('PERMISSION_CREATE')
  @ApiOperation({ summary: 'Create permission' })
  create(@Body() dto: CreatePermissionDto) {
    return this.createPermission.execute(dto.code, dto.description);
  }

  @Get()
  @Permissions('PERMISSION_READ')
  @ApiOperation({ summary: 'List permissions' })
  findAll(@Query() query: ListQueryDto) {
    return this.listPermissions.execute(query.page, query.limit);
  }

  @Get(':id')
  @Permissions('PERMISSION_READ')
  @ApiOperation({ summary: 'Get permission by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getPermission.execute(id);
  }

  @Put(':id')
  @Permissions('PERMISSION_UPDATE')
  @ApiOperation({ summary: 'Update permission' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePermissionDto,
  ) {
    return this.updatePermission.execute(id, dto.description);
  }

  @Delete(':id')
  @Permissions('PERMISSION_DELETE')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete permission' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deletePermission.execute(id);
  }
}

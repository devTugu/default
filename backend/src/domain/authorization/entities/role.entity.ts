import { Permission } from './permission.entity';

export class Role {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly description: string | null,
    public readonly permissions: Permission[] = [],
  ) {}
}

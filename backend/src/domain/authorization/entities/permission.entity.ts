export class Permission {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly description: string | null,
  ) {}
}

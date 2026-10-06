export interface UserOutput {
  id: number;
  email: string;
  isActive: boolean;
  mfaEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
  permissionCodes: string[];
}

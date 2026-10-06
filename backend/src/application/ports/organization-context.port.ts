/**
 * Resolves the current organization for write stamping / optional filtering.
 * Multi-org UI is out of scope — single default org keeps single-tenant behavior.
 */
export interface IOrganizationContext {
  getCurrentOrganizationId(): Promise<number | null>;
}

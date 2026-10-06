/**
 * Align e2e with CI so seeded SUPER_ADMIN can log in without forced MFA
 * enrollment during tests. SITE_EDITOR is the content role in this template.
 */
process.env.MFA_REQUIRED_ROLES = 'SITE_EDITOR';
process.env.NODE_ENV = 'test';

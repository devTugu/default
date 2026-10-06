# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes       |

## Reporting a vulnerability

Please **do not** open public GitHub issues for security vulnerabilities.

1. Open a private security advisory on this repository, or email the maintainer listed in the repository profile.
2. Include steps to reproduce, impact, and affected routes or components.
3. Allow reasonable time for a fix before public disclosure.

## Secrets

- Never commit `.env`, `.env.local`, API keys, or JWT secrets.
- Use `API_INTERNAL_URL` server-side only (BFF); do not expose the NestJS API directly to browsers in production.
- Rotate `JWT_*` secrets and seed passwords before any public deployment.

## More detail

See [docs/SECURITY.md](docs/SECURITY.md) for BFF cookies, CSRF, MFA, and production hardening.

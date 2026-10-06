# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes       |

## Reporting a vulnerability

Please **do not** open public GitHub issues for security vulnerabilities.

1. Open a private security advisory on this repository, or email the maintainer listed in the repository profile.
2. Include steps to reproduce, impact, and affected endpoints.
3. Allow reasonable time for a fix before public disclosure.

## Secrets

- Never commit `.env` or production credentials.
- Rotate JWT and MFA encryption keys if leaked.

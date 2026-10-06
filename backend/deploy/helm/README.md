# Website Stack Helm Chart

Deploys the NestJS API and Next.js frontend as one release.

## Prerequisites

- Kubernetes 1.26+
- Helm 3.12+
- MySQL and Redis (in-cluster or external)
- Container images available to the cluster

## Install

```bash
helm lint deploy/helm/website-stack

helm upgrade --install website-staging deploy/helm/website-stack \
  --namespace website-staging --create-namespace \
  --set api.image.tag=v1.0.0 \
  --set frontend.image.tag=v1.0.0
```

## Secrets

| Secret | Keys |
|--------|------|
| `*-api-secrets` | `JWT_*`, `MFA_ENCRYPTION_KEY`, DB credentials |
| `*-frontend-secrets` | `API_INTERNAL_URL`, optional Sentry/OTEL |

Default chart secrets are placeholders — rotate before production.

## Health probes

| Service | Path |
|---------|------|
| API | `/api/v1/health/ready`, `/api/v1/health/live` |
| Frontend | `/api/health` |

## Validation

```bash
helm lint deploy/helm/website-stack
helm template website-test deploy/helm/website-stack \
  --set api.enabled=true \
  --set frontend.enabled=true > /dev/null
```

## Related

- [Deployment](../../docs/DEPLOYMENT.md)

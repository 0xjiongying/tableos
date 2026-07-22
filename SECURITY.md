# Security Policy

## Supported versions

This repository is pre-production. Security fixes apply to `main` only.

## Demo auth warning

`DEMO_AUTH_ENABLED=true` uses a signed cookie and a shared demo password. **Do not use for production customer data.** Rotate `SESSION_SECRET` and replace with Supabase Auth (or equivalent) before any public deployment.

## Reporting

Email security issues privately to the maintainers (founders). Do not file public GitHub issues for vulnerabilities that expose guest PII or payment flows.

## Threat model (v1)

| Asset | Risk | Mitigation in v1 |
|---|---|---|
| Session cookie | Theft / fixation | HTTP-only, SameSite=Lax, HMAC signature |
| Booking API | Spam / overbook | Zod validation + capacity checks; rate limit TODO |
| Payments | Fake settlement | Mock is explicit; Arc refuses if unconfigured |
| AI | Prompt injection | Staff-auth only endpoints; no tool execution |
| PII | Guest email/name | Minimize logs; no third-party analytics in v1 |

## Secrets

Never commit `.env`. CI uses service containers + example values only.

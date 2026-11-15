# Security Engineering and Testing

> **Public engineering case study.** Novera's production source code, operational runbooks, credentials, and client records remain private. This document summarizes architectural decisions and historical review evidence; it is not a current penetration-test report or a certification of production security.

## Context and threat model

Novera is an invitation-only business operations application with an internal staff workspace and a separate client portal. Its primary security concern is preventing unauthorized access to confidential records across clients, staff responsibilities, and business modules.

The design treats a hidden button or route redirect as insufficient protection. Access rules must also be enforced by server-side operations and, for sensitive records, by the database.

## Authentication and sessions

Novera's documented authentication architecture uses **Better Auth** with PostgreSQL-backed sessions. Staff authenticate through Microsoft Entra ID; invited client users use email-based one-time codes or magic links. Public self-registration is not part of the product.

The security model distinguishes *authentication* (establishing identity) from *authorization* (deciding what that identity may do). Session expiration, revocation, invitation validity, and sensitive-action verification are addressed separately in the private design records.

## Authorization and data isolation

The private architecture defines four user roles:

- **Owner:** broad internal administrative authority.
- **Staff:** internal access limited by explicit grants and organization assignments.
- **Client admin:** permitted actions within an assigned client organization.
- **Client member:** narrower organization-scoped access.

Authorization combines:

1. **Application-level policy checks** before protected operations.
2. **PostgreSQL row-level security (RLS)** to restrict which records an authenticated actor can access.
3. **Database constraints and triggers** for selected integrity and access invariants.

Database permissions are separated by purpose; routine application access is not intended to have schema-administration or RLS-bypass privileges. The private design also documents transaction-scoped identity binding so database decisions use the verified signed-in actor.

**Tradeoff:** Database-enforced access rules add migration complexity and require integration tests against real PostgreSQL. In exchange, protection does not depend solely on every application query remembering the correct filter.

### Public runnable example

This repository includes a **standalone illustrative TypeScript authorization example** in [`../src/permissions.ts`](../src/permissions.ts), with tests in [`../tests/permissions.test.ts`](../tests/permissions.test.ts).

It is **not an export of Novera's production authorization implementation**, and it does not demonstrate the private PostgreSQL RLS policies. The public example intentionally uses a smaller role model than the four-role application architecture.

## Auditability and defense in depth

The private design records describe security event logging for sign-in, invitations, permission changes, account deactivation, and session revocation, while excluding secrets and unnecessary sensitive content. Later decision records describe tamper-evidence and independent audit-event preservation.

Other documented controls include:

- Browser security headers, including a Content Security Policy and framing restrictions.
- Invitation lifecycle checks and restrictions on account activation.
- Rate limiting for authentication-related operations.
- Restricted database privileges for security helper functions.
- Validation of server-side actions and user-supplied text.

These are **documented design and implementation claims from the private project**; the public repository does not expose their full implementation for independent inspection.

## Historical security review

A security review recorded in **October 2026** examined sign-in, sessions, permissions, database grants and RLS, browser headers, dependencies, and secrets. The review was **AI-assisted and checked by the developer**.

The private review documented **12 corrected findings**, **8 accepted risks**, and **8 follow-up items**. Representative corrections included:

| Problem identified | Engineering response | Evidence recorded in private review |
| --- | --- | --- |
| Missing browser security headers | Added response security policies | End-to-end header test |
| Authentication throttling trusted a spoofable client-address header | Restricted the trusted address source | Environment validation test |
| Invitation and account activation rules could be bypassed through lower-level operations | Strengthened database-enforced lifecycle rules | PostgreSQL security tests |
| Audit events could be removed through an operation that bypassed row triggers | Restricted the operation | Database security test |
| Access helper functions had overly broad execution privileges | Narrowed permissions | Database security tests |

The review also documented accepted tradeoffs and follow-up work. Its original production-readiness checklist contains unchecked items, so **the historical review must not be interpreted as proof that every production control is currently verified**.

## Testing strategy

The private project's documented quality strategy uses several complementary layers:

| Layer | Purpose |
| --- | --- |
| TypeScript and static checks | Catch type and code-quality problems before execution |
| Vitest with PostgreSQL | Exercise access rules and business invariants against real database behavior |
| Playwright end-to-end tests | Check workflows across staff and client roles |
| Accessibility checks | Catch selected keyboard, semantic, and assistive-technology issues |
| CI checks | Run relevant validation during code integration |

The private portfolio documentation describes these test suites and CI workflows, but **this public case study has not independently rerun or verified the private application's current test status**.

### Verified public repository checks

The following results were observed in the **public case-study repository** on **November 15, 2026**:

- `npm test` — **5 of 5 Vitest tests passed** in `tests/permissions.test.ts`.
- `npm run typecheck` — **passed** (`tsc --noEmit`).
- The tests cover an active owner, inactive owner, staff with and without explicit permission, and denied client access to protected operations.

These results validate the **illustrative example only**, not Novera's complete production authorization or database security.

## Engineering lessons

**Test security at the layer where it must hold.** A browser test can confirm that a page is hidden; it cannot prove that a direct database operation is denied. Database access rules therefore need database-level tests.

**Distinguish roles from permissions and ownership.** A role name alone is insufficient when staff assignments and client-organization boundaries determine access.

**Treat a security review as a dated checkpoint.** Corrected findings, accepted risks, follow-ups, and current deployment verification are different categories of evidence.

**Keep public demonstrations honest.** A small runnable example is useful for reviewers, provided it is clearly labeled as illustrative and not represented as the private application's production source.

## Authorship and disclosure

Novera was developed with substantial assistance from AI coding tools, including Claude and ChatGPT. The developer supplied business requirements, reviewed decisions and changes, and approved project checkpoints. This case-study document was AI-assisted and adapted from the project's private engineering records. Review and approval do not imply that all implementation code was independently authored.

## Evidence boundaries

**Publicly inspectable:** the illustrative authorization module, five passing tests, and architecture/case-study documents.

**Documented privately:** production application source, database policies, historical security findings and tests, CI configuration, and operational evidence.

**Not established by this document:** a current external security audit, comprehensive penetration testing, or a clean run of the private application's entire test suite.

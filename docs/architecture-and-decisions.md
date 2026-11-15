# Novera — Architecture and Technology Decisions

> **Public engineering case study.** This is a high-level account of a private, invitation-only business application. It summarizes design documentation rather than exposing production source code, customer information, credentials, or operational runbooks. Statements about design are not substitutes for independently reproduced production test results.

## Product and constraints

Novera is an internal operating platform for Avenier Group. Staff use a Command Center for business operations; invited client users access only their authorized information and workflows through a separate portal. It is **not** a public-registration SaaS product. Protecting confidential information across client organizations was a primary architectural constraint.

## Architecture at a glance

```text
Staff Command Center       Invited Client Portal
          \                    /
           Next.js App Router + React
                      |
        Server-rendered UI and actions
                      |
        Server-only business services
           /          |          \
    Authorization   Audit       Integrations
           \          |          /
           Drizzle / PostgreSQL
           Policies + access controls
```

The application uses **Next.js 16, React 19, strict TypeScript, PostgreSQL 16, Drizzle ORM, and Better Auth**. UI composition is separated from server-side business logic. Server Components are the default; client-side components are introduced for browser interactions and local state. Shared UI primitives and semantic design tokens support consistency without coupling components to business routes.

This diagram is conceptual, not a network topology or a representation of every runtime dependency.

## Key architectural decisions

### 1. Next.js App Router with server-first components

**Problem:** One product needed an internal staff interface, an authorized client portal, and server-side workflows.

**Choice:** Next.js App Router with React Server Components and strict TypeScript.

**Rationale:** Keep data access and authorization near server-side operations; use client components only when interaction requires them.

**Tradeoff:** Developers must manage server/client boundaries carefully and avoid importing privileged modules into browser code.

### 2. Better Auth rather than Auth.js

**Problem:** Staff and clients require different sign-in experiences, invitation-only onboarding, and revocable sessions.

**Choice:** Better Auth for identity and sessions, with a separate Novera authorization layer.

**Rationale:** The October 2026 evaluation favored built-in support for email codes, magic links, and session operations over implementing more security-sensitive behavior from scratch.

**Tradeoff:** The application still owns role permissions, resource ownership, audience-specific session policy, and database access controls. Authentication does not automatically provide authorization.

### 3. Drizzle ORM rather than Prisma

**Problem:** Database policies and schema changes needed to remain reviewable together.

**Choice:** Drizzle ORM and reviewed SQL migrations.

**Rationale:** The evaluation favored SQL-like queries and explicit support for PostgreSQL row-level security. The original evaluation recorded a compatibility spike against the selected framework and database versions.

**Tradeoff:** A more SQL-oriented development experience and deliberate dependency management, in exchange for visibility into database security behavior.

### 4. Layered authorization and client isolation

**Problem:** An internal staff user or client must not gain access to another organization's confidential records simply because an application query omits a filter.

**Choice:** Combine server-side permission checks, ownership-aware data access, and PostgreSQL row-level security, with database constraints/triggers for selected integrity rules.

**Rationale:** Defense in depth reduces dependence on any single application code path. The documented role model distinguishes **owner, staff, client admin, and client member** and further limits access through assignments and permissions.

**Tradeoff:** Security policies and transaction context require additional implementation and integration testing.

> The public repository's TypeScript authorization sample is an **illustrative, independently runnable example**, not a copy of Novera's production authorization implementation. Its simplified role model should not be mistaken for the complete private system.

### 5. Reviewed migrations and auditable workflows

**Problem:** Changes to business records and permissions must be explainable and traceable.

**Choice:** Maintain reviewed schema migrations, authorization-aware data operations, and audit-oriented records. Certain workflows use immutable versions, ledgers, or tamper-evident history rather than overwriting important past decisions.

**Rationale:** Historical accountability matters for client approvals, financial records, and security events.

**Tradeoff:** More explicit data modeling and tests are needed than for a basic CRUD application.

### 6. Reliable asynchronous communication

**Problem:** A business change may save successfully even when an external email service is temporarily unavailable.

**Choice:** For selected workflows, record outbound messages in a database-backed outbox associated with the business operation, then process delivery separately.

**Rationale:** Avoid coupling successful business transactions to immediate external email delivery.

**Tradeoff:** Requires monitoring, failure handling, and idempotent processing; an outbox alone does not guarantee that an external recipient sees exactly one message.

## Quality and verification

The private documentation describes PostgreSQL integration testing, browser-level Playwright journeys, accessibility checks, and CI checks. Those are documented engineering practices; **current passing results for the private application are not asserted here**.

The separate public case-study repository has independently verified, at the time of this draft:

- **5/5 Vitest authorization example tests passed** (`npm test`).
- **TypeScript checking passed** (`npm run typecheck`, `tsc --noEmit`).
- **Clean Git working tree**, with local and remote `main` previously observed at the same merge commit.

These checks cover the public example only, not the private production system.

## Development process and attribution

Novera was developed with substantial assistance from AI coding tools. The developer established business requirements and acceptance criteria, reviewed architectural options, directed implementation, and performed review and verification steps. AI-generated implementation must not be presented as independently hand-written. Individual claims of manual authorship should be supported by the relevant history and evidence.

## Scope and privacy

The production repository, client records, environment configuration, detailed security controls, and operational runbooks remain private. This public case study intentionally omits credentials, infrastructure identifiers, sensitive endpoints, and procedures that would materially assist attacks.

## Basis of this summary

Adapted from private Novera project documentation: `ARCHITECTURE.md`, `DECISIONS.md`, `STACK_EVALUATION.md`, and `PORTFOLIO.md` (October–November 2026). Those internal files are not published as references. This is a documentation artifact, not an independent security audit.

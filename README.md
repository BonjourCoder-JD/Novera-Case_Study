# Novera — Software Engineering Case Study

**Full-Stack Application Engineering | TypeScript | Next.js | React | PostgreSQL | Security | Automated Testing**

An engineering case study documenting the architecture, development decisions, security considerations, and AI-assisted implementation of Novera, a business management platform developed for Avenier Group LLC.

This repository also contains standalone, runnable TypeScript code samples demonstrating software engineering concepts represented in the application.

## Project Overview

Novera is a business management platform designed to support internal operations and client-facing workflows.

The application includes functionality related to:

- User authentication and role-based authorization
- Organization and client management
- Project management and service workflows
- Contracts, electronic signing, and document management
- Invoicing, payments, and financial operations
- Administrative workflows and operational automation

Novera is maintained as a separate private application. This public repository documents selected engineering concepts without exposing proprietary implementation details, credentials, or customer information.

## Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React, Next.js, TypeScript |
| Backend | Next.js server-side functionality, Node.js |
| Database | PostgreSQL, Drizzle ORM |
| Authentication | Application authentication and role-based authorization |
| Testing | Vitest, Playwright |
| Infrastructure | Docker, Git, GitHub |
| Development | AI-assisted engineering workflow |

The technology stack describes the underlying Novera application. Individual code samples may use only a subset of these technologies.

## Engineering Highlights

### Authentication and Authorization

Novera includes authorization logic for distinguishing user roles, account status, organizational access, and protected application functionality.

The companion authorization sample demonstrates:

- Strongly typed roles and permissions
- Active-account checks
- Permission-based access decisions
- Denial of unauthorized operations
- Automated verification of access-control behavior

### Database Engineering

The application uses PostgreSQL and Drizzle ORM. Its test infrastructure includes separate database connection roles and integration tests involving database operations and access isolation.

### Software Testing

The Novera repository contains automated test files covering authentication, authorization, database operations, auditing, business logic, and end-to-end application behavior.

This companion repository includes independently runnable tests. Test results are reported separately from those of the private Novera application.

## Runnable Code Samples

### 1. TypeScript Role-Based Authorization

**Location:** `src/permissions.ts`

A standalone authorization implementation demonstrating how user roles, account status, and explicitly granted permissions determine access to protected operations.

**Automated tests:** `tests/permissions.test.ts`

The initial verification run passed all five tests, covering active owners, inactive owners, authorized staff, unauthorized staff, and client restrictions.

This example is intentionally simplified and is not Novera's production authorization implementation.

Additional API, database, and frontend examples are planned.

## Running the Examples

Requirements:

- Node.js
- npm

Clone this repository and install dependencies:

```bash
npm ci
```

Run the automated tests:

```bash
npm test
```

Check TypeScript types:

```bash
npm run typecheck
```

The repository's test examples do not require access to the private Novera application.

## AI-Assisted Development

Novera was developed using an AI-assisted engineering workflow.

My role included defining business requirements, directing implementation priorities, evaluating application behavior, managing development changes, and working with AI tools to implement and refine functionality.

AI assistance was used to accelerate coding and support development tasks. I do not represent AI-generated implementation as independently authored code.

This case study is intended to demonstrate my understanding of the application's engineering concepts, development decisions, verification processes, and technical challenges.

The accompanying public code samples are educational demonstrations and are identified separately from production Novera code.

## Development History

The private Novera repository contains a Git commit history documenting application development, feature changes, tests, and refinements.

Selected engineering milestones will be documented in this public case study with explanations of their technical significance, without disclosing confidential source code.

## Verification Status

| Item | Status |
|---|---|
| Public authorization example | Implemented locally |
| Authorization tests | 5 passed |
| TypeScript type-check | Pending confirmation |
| Additional code samples | Planned |
| Original Novera integration suite | Not currently verified |
| Public GitHub publication | Pending |

Verification results reflect the evidence available at the time of writing and will be updated as additional checks are completed.

## Development Approach

This project emphasizes:

- Secure-by-design application development
- Clear separation of responsibilities
- Automated testing and reproducible examples
- Documented engineering decisions
- Transparent AI-assisted development
- Responsible handling of private application code

## Project Context

**Organization:** Avenier Group LLC

**Application:** Novera

**Repository purpose:** Software engineering portfolio and technical case study

**Source-code policy:** The underlying application remains private. Public code examples are separately implemented demonstrations.

---

*This case study is an evolving technical portfolio artifact. Features, testing results, and engineering claims are documented as they are verified.*

# Novera — Software Engineering Case Study

**Full-Stack Application Engineering | TypeScript | Next.js | React | PostgreSQL | Security | Automated Testing**

Novera is a private, deployed business operations platform developed for **Avenier Group LLC**. This public repository is an engineering case study: it explains selected architectural decisions, security and testing practices, development challenges, and the role of AI assistance. It also contains a small, independently runnable **illustrative** TypeScript authorization example.

**The production application source code is private.** The public example is not a copy of Novera's production authorization code, and its tests do not verify the production system.

## Start Here: Engineering Documentation

| Document | What it covers |
| --- | --- |
| [Architecture and Technology Decisions](docs/architecture-and-decisions.md) | System structure, technology choices, and engineering tradeoffs |
| [Security Engineering and Testing](docs/security-and-testing.md) | Access controls, database isolation, security practices, and evidence boundaries |
| [Engineering Challenges and Lessons Learned](docs/engineering-challenges.md) | Real historical debugging incidents involving authorization, migrations, and browser tests |
| [AI-Assisted Development: Roles, Process, and Evidence](docs/ai-assisted-development.md) | How AI-assisted implementation, developer-written code, code review, and guided debugging contributed to Novera |

### Application Demonstration

[View the Novera Application Walkthrough](docs/application-walkthrough.md)

Explore seven screenshots demonstrating the staff Command Center,
project management, milestone and task tracking, and the client portal,
including project and invoice views.

Screenshots use fictional demonstration data. The underlying
production application remains private.

## Project Overview

Novera supports internal operations and client-facing workflows. Its functional areas include:

- Authentication, roles, permissions, and restricted application access
- Organization and client management
- Project management, milestones, and service workflows
- Proposals, contracts, electronic signing, and document management
- Invoicing, expenses, and financial workflows
- Administrative workflows and operational automation
- A separate, invitation-only client portal

Novera is maintained as a separate private application to protect business logic, confidential client information, credentials, and operational configuration.

## Technology Stack

| Area | Technologies |
| --- | --- |
| Frontend | Next.js, React, TypeScript |
| Backend | Next.js server-side functionality, Node.js |
| Database | PostgreSQL, Drizzle ORM |
| Authentication and authorization | Better Auth, Microsoft Entra ID integration, application permissions, PostgreSQL row-level security |
| Testing | Vitest, Playwright, database integration testing |
| Infrastructure | Docker, Git, GitHub |
| Development | AI-assisted implementation, developer review, independent coding exercises, and guided debugging |

These technologies describe the **private Novera application**. The public code example uses only a subset of them.

## Engineering Highlights

### Authorization and data isolation

The private application uses layered authorization and database-level access controls. Its development history includes an expense-visibility bug involving SQL `NULL` semantics, investigated and corrected with regression coverage. See [Engineering Challenges](docs/engineering-challenges.md) for the documented incident.

### Database engineering

PostgreSQL and Drizzle ORM support application data and schema changes. A historical clean-database migration failure revealed a PostgreSQL enum/transaction interaction, reinforcing the need to test migration sequences from an empty database.

### Testing and CI

The private project documentation describes integration, browser, and accessibility testing. This public repository does **not** claim a current passing run of the entire private application test suite. The public example has its own separate verification results below.

## Runnable Public Code Example

### TypeScript Role-Based Authorization

- **Implementation:** [`src/permissions.ts`](src/permissions.ts)
- **Tests:** [`tests/permissions.test.ts`](tests/permissions.test.ts)

The standalone example illustrates typed roles and permissions, active-account checks, and access decisions for authorized and unauthorized users. It is intentionally simplified and **is not extracted production code**.

### Run locally

Requirements: Node.js and npm.

```bash
npm ci
npm test
npm run typecheck
```

The example does not need the private Novera application or its database.

## Verification Status

| Item | Evidence / status |
| --- | --- |
| Public TypeScript authorization example | Implemented and included in this repository |
| Public Vitest tests | **5 passed** in the recorded verification run |
| Public TypeScript typecheck | **Passed** in the recorded verification run |
| Engineering documents | Four documents published in the public repository |
| Original private application integration / end-to-end suite | **Not independently reverified for this case study** |
| Screenshots and feature walkthroughs | Planned; publish only after checking for confidential information |
| Recorded demonstration | Planned; use synthetic or otherwise nonconfidential data |

Results are historical checkpoints, not a claim that tests were rerun during this README update.

## AI-Assisted Development and Personal Contributions

Novera was built with substantial assistance from Claude and ChatGPT. AI tools helped produce implementation code, tests, technical suggestions, and debugging guidance. I defined business requirements and feature priorities, reviewed the code Claude provided for each module, and worked through bugs identified or presented during development with Claude's guidance. I was also assigned portions of modules to implement myself to practice programming and build familiarity with the codebase.

Reviewing or approving AI-generated code is not the same as independently authoring it. The case study distinguishes those activities rather than presenting the whole application as independently coded. See the [full development disclosure](docs/ai-assisted-development.md).

## Screenshots and Demonstrations

Application screenshots, selected workflow walkthroughs, and recorded demonstrations will be added after review for private client information, credentials, and operational details. Until then, this repository's primary evidence consists of its engineering documentation and runnable public example.

## Project Context

- **Organization:** Avenier Group LLC
- **Application:** Novera
- **Repository purpose:** Public software engineering portfolio and technical case study
- **Source-code policy:** Production application remains private; public examples are separately implemented illustrations

---

*This case study is maintained as a transparent account of engineering decisions, practical development experience, and verification evidence. Claims are updated as supporting evidence is available.*

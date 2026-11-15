# AI-Assisted Development: Roles, Process, and Evidence

> **Transparency statement:** Novera was built with substantial AI assistance. This case study distinguishes requirements ownership, engineering judgment, review, and validation from independently authored implementation.

## Project context

Novera is an invitation-only internal business operations platform for Avenier Group, with a separate client portal. Its private application source and operational records are not published in this case-study repository.

## How AI was used

Claude and ChatGPT were used as development collaborators. Assistance included proposing technical approaches, drafting application code and tests, reviewing security and implementation details, identifying or presenting bugs for guided investigation, helping troubleshoot failures, and producing engineering documentation. The amount and type of assistance varied by change.

AI-generated or AI-revised code should not be interpreted as independently written merely because the developer requested it, reviewed it, ran tests, or committed it.

## Developer responsibilities

The developer's documented responsibilities included:

- **Product requirements:** Defining business workflows, user roles, feature behavior, and acceptance criteria through structured discovery and decisions.
- **Technical decisions:** Reviewing proposed approaches and tradeoffs, recording decisions, and approving the direction of implementation.
- **Hands-on coding:** Implementing assigned portions of individual modules independently as programming practice, alongside AI-generated application code.
- **Module-by-module code review:** Reading and reviewing Claude-generated code for each module to develop familiarity with the implementation and evaluate the changes.
- **Guided debugging:** Working through bugs identified or presented by Claude, with Claude providing guidance during investigation and correction; not claiming independent discovery or resolution of those bugs.
- **Review and validation:** Examining changes, evaluating test outcomes, and deciding whether work was ready to merge or deploy.
- **Security and privacy priorities:** Requiring scoped access, database-level safeguards, auditability, and protection of private business data.
- **Release control:** Approving checkpoints and changes before they were committed or published.

The developer also reports being assigned independent coding tasks within each module, in addition to the independently written end-to-end tests described in private project notes. These contributions were part of a deliberate learning process. The public case study does **not** claim a quantified percentage of independently authored code or independently verify authorship for each private commit.

## Development workflow

The project's documented checkpoint process follows this pattern:

1. Establish a business requirement and acceptance criteria.
2. Evaluate design options and record consequential decisions.
3. Use Claude to implement substantial parts of the module while assigning the developer selected portions to code independently for practice.
4. Review Claude-generated code module by module, then run applicable checks.
5. Work through bugs identified or presented by Claude with its debugging guidance, and review corrections and regression coverage.
6. Approve a focused commit with attribution appropriate to the actual contribution.

The private development standards distinguish **developer-owned** commits from **AI-assisted** commits. They permit AI co-author attribution when accurate and prohibit labeling substantially AI-generated implementations as independently written.

## Examples of engineering judgment

Three historical incidents are discussed in [Engineering Challenges and Lessons Learned](engineering-challenges.md):

- A nullable PostgreSQL comparison caused an unintended expense-access result.
- A migration sequence failed on a clean database because of enum-value transaction semantics.
- A Playwright locator became ambiguous after a UI wording change.

These examples illustrate the kinds of debugging issues the developer worked through with Claude’s assistance. They demonstrate engagement with implementation review, test data, database migrations, and CI diagnosis; they are **not** presented as bugs the developer independently discovered or fixed.

## What this public repository demonstrates

The public repository contains:

- A **standalone illustrative** TypeScript permissions example, not extracted production authorization code.
- Five Vitest authorization tests, reported passing in the public repository.
- Architecture, security/testing, and engineering-challenges documents adapted from private records.
- This disclosure of AI assistance and evidence boundaries.

The public TypeScript example and these documents were prepared with AI assistance. Public tests demonstrate the example's behavior, not the private application's entire security posture.

## Evidence and limitations

**Supported by private project records:** the documented development workflow, decision process, historical incidents, and intended testing standards. **Clarified by the developer:** independently assigned coding portions within each module, review of Claude-generated module code, and guided debugging of bugs identified or presented by Claude.

**Verified in the public case-study workflow:** five passing Vitest tests and a successful TypeScript typecheck, as reported during preparation of this repository.

**Not claimed:** independent discovery and resolution of the historical bugs, independent authorship of the full application; a current clean run of every private application test; external security certification; or public access to private production code.

## Why this approach matters

Using AI productively is an engineering workflow, not a substitute for accountability. The relevant skills to evaluate are the ability to define the right problem, assess tradeoffs, identify unsafe or incorrect behavior, interpret evidence, and explain how a system works. This case study presents those responsibilities without obscuring AI's contribution.

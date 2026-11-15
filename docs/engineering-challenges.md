# Engineering Challenges and Lessons Learned

> **Public engineering case study.** These incidents are adapted from Novera's private development notes. They describe historical fixes and tests recorded in the project; this public repository does not include the private implementation or independently reproduce those incidents.

## Overview

Building Novera involved more than implementing features. Security boundaries, database migrations, and automated browser tests exposed failures that required investigation and corrective changes. Three examples illustrate how the project used test evidence to improve reliability.

## 1. Authorization: a nullable field changed the meaning of an access check

**Area:** PostgreSQL, authorization, expense management  
**Risk:** Confidentiality / unauthorized record access

### Problem

During expense testing, a staff user could retrieve an expense entered by an owner, although the staff user should have seen only expenses they entered or personally paid. The private development record also identifies receipt access as part of the regression scenario.

### Root cause

The visibility condition combined checks for the creator and the person who paid. When the payer field was `NULL`, ordinary SQL equality returned `UNKNOWN`, not `FALSE`. The negated Boolean expression therefore did not behave as intended, allowing an expense to pass the visibility check.

This was a database three-valued-logic problem, not merely a missing button or hidden UI element.

### Correction

The project replaced the nullable equality comparison with PostgreSQL's null-safe `IS NOT DISTINCT FROM` semantics so an absent payer would not be treated as a matching authorized user.

### Recorded verification

The private project notes report a regression test confirming that staff cannot open the owner's expense **or download its receipt**. The full private test and production implementation are not included in this public repository.

### Lesson

Authorization conditions must be tested with null, missing, and boundary-case data—not only with ordinary populated records. Access-control tests should attempt direct reads of restricted resources, including related downloads.

---

## 2. Database migrations: an enum value worked incrementally but failed from scratch

**Area:** PostgreSQL, migrations, continuous integration  
**Risk:** Failed clean installation / blocked delivery

### Problem

A CI migration run failed while building a fresh database. Existing environments had applied changes in separate deliveries, so they had not encountered the same failure.

### Root cause

One migration introduced a new notification enum value. A later migration attempted to use that value while the clean-database migration sequence was still running in a single transaction. PostgreSQL rejected use of the newly added enum value before the transaction committed.

### Correction

The private project record describes changing the later insertion to execute as dynamic SQL, conditionally, for the relevant pending workflow. This change was made before the affected migration reached production.

### Recorded verification

The project notes report that a fresh database could subsequently migrate through the full sequence and that clean-database migration checks became part of delivery validation. This is **historical project evidence**, not a current rerun performed for the public case study.

### Lesson

A migration sequence that works on long-lived databases can still fail on a clean install. Test the complete migration history from an empty database, especially when using PostgreSQL features with transaction-specific behavior.

---

## 3. Browser tests: an ambiguous heading locator blocked CI

**Area:** Playwright, user-interface testing, CI  
**Risk:** False test failure / blocked deployment

### Problem

After a vendor-rules page gained an explanatory heading, a browser test expecting one heading matched two. The resulting Playwright failure blocked the CI pipeline even though the additional heading was an intentional interface change.

### Root cause

The test used a heading-name match that allowed partial matches. Both the primary page heading and the new explanatory heading satisfied the locator.

### Correction

The test locator was changed to require an exact accessible heading name.

### Recorded verification

The private development notes record the locator fix after the CI failure. This document does not claim an independent current rerun of that private browser test.

### Lesson

Automated tests should target stable, unambiguous user-facing semantics. A failure can indicate a broken feature **or** a brittle test; engineers need to determine which before changing the application.

---

## Cross-cutting engineering practices

These incidents reinforced several principles:

- **Test at the relevant boundary.** Database authorization deserves database-level tests; browser-only checks are insufficient.
- **Include edge cases.** Null values and fresh-install conditions can expose issues missed by routine workflows.
- **Treat CI failures as evidence to investigate.** Avoid bypassing checks simply to make a pipeline green.
- **Record the causal chain.** A useful engineering narrative explains the observed symptom, underlying mechanism, correction, and verification.

## Evidence and authorship

The incidents above are based on Novera's private `PORTFOLIO.md` engineering notes and associated development standards. Exact implementation details, private tests, and deployment configuration are intentionally excluded.

Novera was developed with substantial AI coding assistance, including Claude and ChatGPT. The developer defined requirements, reviewed engineering decisions and changes, and approved checkpoints. This case-study narrative was also AI-assisted. The descriptions should not be interpreted as claims that all fixes were coded independently.

**Public example:** This repository separately contains a small illustrative TypeScript authorization module and its tests. Those tests do not reproduce the private expense authorization incident.

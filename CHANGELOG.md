# Changelog

All notable changes to `cadence-kit` will be documented here.

Format: [Semantic Versioning](https://semver.org) — `MAJOR.MINOR.PATCH`

---

## [0.1.0] — Jun 2026

### Added

**Primitives (stateless)**
- `P` — body paragraph with consistent typography
- `Section` — scroll anchor + section label
- `SubHead` — sub-heading within a section
- `Rule` — horizontal divider between sections
- `Block` — left-border callout, `subtle` prop for lower emphasis
- `Card` + `CardLabel` — tinted box for summaries and structured highlights
- `Note` — italic author note or caution block
- `PullQuote` — closing pull-quote
- `Table` — data table with typed columns (`default`, `label`, `mono`, `good`, `bad`)

**Compounds (stateful)**
- `Essay` — layout wrapper with TOC sidebar (desktop) + anchor pills (mobile)
- `EssayNav` — TOC navigation component, standalone
- `TreeMap` — recursive collapsible topic/structure tree
- `Timeline` — timestamp-indexed collapsible list with sub-points
- `Accordion` + `AccordionItem` — generic collapsible with rich content slot
- `Glossary` — term / definition / optional jottings table

**Theme system**
- All tokens namespaced under `--cadence-*` to avoid design system conflicts
- `styles.css` with sensible light-mode defaults
- Corpus bridge documented for teams using the Corpus design system

---

## Roadmap

### [0.2.0] — TBA
- `PaperLayoutA` — opinionated layout for research papers (research question → methodology → findings → evaluation → glossary)
- `BookLayoutA` — opinionated layout for books (structure → chapter summaries → synthesis → glossary)
- `CourseWeekLayoutA` — opinionated layout for course lectures (topic map → timeline → observation → notes → glossary)

### [1.0.0] — TBA
- TypeScript support
- More layout options (layoutA, B, C)
- VitePress documentation site
- GitHub Actions CI/CD
- Full npm publish workflow

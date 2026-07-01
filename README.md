# cadence-kit

A writing system for long-form content in React.  
Components for essays, research papers, books, and courses — so you can focus on writing, not layout.

---

## What it is

`cadence-kit` is not a general UI library. It is a **content-specific component library** for long-form writing:

- **Primitives** — `P`, `Section`, `Rule`, `Block`, `Card`, `Note`, `Table`, `PullQuote`
- **Compounds** — `TreeMap`, `Timeline`, `Accordion`, `AccordionItem`, `Glossary`, `EssayNav`
- **Layout** — `Essay` (TOC sidebar layout, desktop + mobile)

---

## Install

```bash
npm install cadence-kit
```

---

## Setup (Next.js)

### 1. `next.config.ts` — transpile the package

Next.js does not transpile `node_modules` by default. Add `cadence-kit` to `transpilePackages`:

```ts
// next.config.ts
const nextConfig = {
  transpilePackages: ['cadence-kit'],
}

export default nextConfig
```

### 2. `globals.css` — import styles + bridge to your design system

```css
/* Import cadence-kit default tokens */
@import 'cadence-kit/styles.css';

/* Bridge: map your design system tokens → cadence tokens.
   Add this if you use Corpus (data-theme dark/light).
   This makes cadence-kit inherit your existing colors automatically. */
[data-theme="dark"], [data-theme="light"] {
  --cadence-fg:         var(--fg);
  --cadence-fg2:        var(--fg2);
  --cadence-fg3:        var(--fg3);
  --cadence-fg4:        var(--fg4);
  --cadence-fg5:        var(--fg5);
  --cadence-bg2:        var(--bg2);
  --cadence-bg3:        var(--bg3);
  --cadence-border:     var(--border);
  --cadence-border2:    var(--border2);
  --cadence-accent:     var(--accent);
  --cadence-accent-bg:  var(--accent-bg);
  --cadence-font-serif: var(--font-serif);
  --cadence-font-mono:  var(--font-mono);
  --cadence-font-sans:  var(--font-sans);
}
```

If you have a different design system, override only the tokens you need:

```css
@import 'cadence-kit/styles.css';

:root {
  --cadence-accent:     #c87aa0;
  --cadence-fg:         #3a2a3a;
}
```

---

## Usage

```jsx
import {
  Essay, EssayNav,
  P, Section, Rule, Block, Card, CardLabel,
  Note, Table, PullQuote,
  TreeMap, Timeline,
  Accordion, AccordionItem,
  Glossary
} from 'cadence-kit'

const SECTIONS = [
  { id: 'intro',    label: 'Overview'  },
  { id: 'findings', label: 'Findings' },
]

export function Content() {
  return (
    <Essay sections={SECTIONS}>

      <Section id="intro" label="Overview">
        <P>Opening paragraph.</P>
        <Block label="Key Insight">
          <P style={{ marginBottom: 0 }}>One sentence insight.</P>
        </Block>
      </Section>

      <Rule />

      <Section id="findings" label="Findings">
        <Table
          headers={["Finding", "Significance"]}
          colTypes={["label", "default"]}
          rows={[
            ["Result A", "What it means"],
          ]}
        />
        <Glossary entries={[
          { term: "Term", definition: "Definition.", jottings: "Optional note" }
        ]} />
      </Section>

      <PullQuote>Closing thought.</PullQuote>

    </Essay>
  )
}
```

---

## Components

### Primitives (stateless)

| Component | Usage |
|-----------|-------|
| `<P>` | Body paragraph |
| `<Section id label>` | Scroll anchor + section label |
| `<SubHead>` | Sub-heading within a section |
| `<Rule />` | Horizontal divider |
| `<Block label subtle?>` | Left-border callout. `subtle` for lower emphasis |
| `<Card>` | Tinted box for summaries |
| `<CardLabel>` | Label inside Card — always first child |
| `<Note>` | Italic author note or caution |
| `<PullQuote>` | Closing pull-quote — always last element |
| `<Table headers colTypes rows>` | Data table with column type styling |

### Compounds (stateful)

| Component | Usage |
|-----------|-------|
| `<Essay sections?>` | Layout wrapper — TOC sidebar desktop, anchor pills mobile |
| `<EssayNav sections>` | TOC nav only, if you want nav without the wrapper |
| `<TreeMap tree label?>` | Recursive collapsible topic/structure tree |
| `<Timeline entries label?>` | Timestamp-indexed collapsible list |
| `<Accordion label?>` | Generic collapsible container |
| `<AccordionItem label defaultOpen?>` | Single collapsible item with rich content slot |
| `<Glossary entries>` | Term / definition / jottings table |

### Table `colTypes`

| Type | Style |
|------|-------|
| `"default"` | Serif, normal color |
| `"label"` | Mono, slightly dimmer |
| `"mono"` | Mono, dim |
| `"good"` | Serif, green |
| `"bad"` | Serif, red |

### TreeMap data shape

```js
const tree = {
  label: "Root",
  children: [
    {
      label: "Branch",
      timestamp: "0:36 - 5:03",   // optional
      children: [
        { label: "Leaf" },
      ]
    },
  ]
}
```

### Timeline data shape

```js
const entries = [
  {
    start: "0:36",
    end: "5:03",             // optional
    label: "Topic label",
    points: [                // optional
      "Sub-point one",
      "Sub-point two",
    ]
  },
]
```

### Glossary data shape

```js
const glossary = [
  { term: "Term", definition: "Definition.", jottings: "Optional note" },
]
```

---

## CSS tokens

All tokens are prefixed with `--cadence-` to avoid collision with your design system.

| Token | Default |
|-------|---------|
| `--cadence-fg` | `#1c1810` |
| `--cadence-fg2` | `#5a5040` |
| `--cadence-fg3` | `#7a7060` |
| `--cadence-fg4` | `#9a9080` |
| `--cadence-fg5` | `#b8b0a0` |
| `--cadence-accent` | `#2264a8` |
| `--cadence-accent-bg` | `rgba(34,100,168,0.08)` |
| `--cadence-bg2` | `#ede8de` |
| `--cadence-bg3` | `#e4dfd4` |
| `--cadence-border` | `#ddd8ce` |
| `--cadence-border2` | `#ccc7bc` |
| `--cadence-font-serif` | `Georgia, serif` |
| `--cadence-font-mono` | `Courier New, monospace` |
| `--cadence-font-sans` | `system-ui, sans-serif` |

---

## Versioning

```bash
# Bug fix
npm version patch   # 0.1.0 → 0.1.1

# New component or feature
npm version minor   # 0.1.0 → 0.2.0

# Breaking change (renamed prop, removed component)
npm version major   # 0.1.0 → 1.0.0
```

Then: `npm publish` → `git push` → `npm update cadence-kit` in each blog.

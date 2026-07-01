"use client"

import { useState, useEffect } from "react"

/* ══════════════════════════════════════════════════════════════
   ESSAY NAV — sticky TOC rail (desktop) + anchor pills (mobile)
   Usage: <EssayNav sections={[{ id, label }, ...]} />
   Scroll container auto-detected from .lib-main panel.
══════════════════════════════════════════════════════════════ */
export function EssayNav({ sections = [] }) {
  const [active, setActive] = useState(sections[0]?.id || "")

  useEffect(() => {
    const container = document.querySelector(".lib-main")

    const onScroll = () => {
      const refTop = container
        ? container.getBoundingClientRect().top + 120
        : 120

      let current = sections[0]?.id || ""
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= refTop) current = s.id
      }
      setActive(current)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    container?.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      container?.removeEventListener("scroll", onScroll)
    }
  }, [sections])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    // browser finds the correct scroll container automatically
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      {/* Desktop sticky rail */}
      <nav className="essay-toc-desk" style={{
        position: "sticky", top: "1rem",
        width: "140px", flexShrink: 0, alignSelf: "flex-start",
        paddingRight: "1.25rem",
      }}>
        <div style={{ fontFamily: "var(--cadence-font-mono)", fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--cadence-fg5)", marginBottom: "0.75rem" }}>
          Contents
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sections.map((s) => (
            <li key={s.id} style={{ marginBottom: "1px" }}>
              <button onClick={() => scrollTo(s.id)} style={{
                all: "unset", display: "block", width: "100%", cursor: "pointer",
                fontFamily: "var(--cadence-font-mono)", fontSize: "10px", letterSpacing: "0.02em", lineHeight: 1.5,
                padding: "0.25rem 0.5rem", borderRadius: "2px", boxSizing: "border-box",
                color: active === s.id ? "var(--cadence-accent)" : "var(--cadence-fg4)",
                background: active === s.id ? "var(--cadence-accent-bg)" : "transparent",
                borderLeft: `2px solid ${active === s.id ? "var(--cadence-accent)" : "transparent"}`,
                transition: "color .15s, background .15s, border-color .15s",
              }}>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile anchor pills */}
      <div className="essay-toc-mob" style={{ marginBottom: "1.25rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => scrollTo(s.id)} style={{
              all: "unset", cursor: "pointer",
              fontFamily: "var(--cadence-font-mono)", fontSize: "9.5px", letterSpacing: "0.03em",
              color: active === s.id ? "var(--cadence-accent)" : "var(--cadence-fg4)",
              padding: "2px 8px",
              border: `0.5px solid ${active === s.id ? "var(--cadence-accent)" : "var(--cadence-border)"}`,
              borderRadius: "2px",
              transition: "color .15s, border-color .15s",
            }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .essay-toc-desk { display: none; }
        .essay-toc-mob  { display: block; }
        @media (min-width: 700px) {
          .essay-toc-desk { display: block !important; }
          .essay-toc-mob  { display: none  !important; }
        }
      `}</style>
    </>
  )
}

/* ══════════════════════════════════════════════════════════════
   LAYOUT WRAPPER — always wrap Content() return in this
   Usage: <Essay sections={SECTIONS}> ... </Essay>
══════════════════════════════════════════════════════════════ */
export function Essay({ sections, children }) {
  return (
    <div style={{ display: "flex", gap: 0, alignItems: "flex-start" }}>
      {sections?.length > 0 && <EssayNav sections={sections} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        {children}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   PRIMITIVES
══════════════════════════════════════════════════════════════ */

/** Body paragraph */
export function P({ children, style }) {
  return (
    <p style={{ fontFamily: "var(--cadence-font-serif)", fontSize: "13.5px", color: "var(--cadence-fg2)", lineHeight: 1.85, marginBottom: "1rem", ...style }}>
      {children}
    </p>
  )
}

/** Section anchor + label — id used for TOC scrolling */
export function Section({ id, label, children }) {
  return (
    <div id={id} style={{ scrollMarginTop: "5rem", marginBottom: "1.75rem" }}>
      {label && (
        <div style={{ fontFamily: "var(--cadence-font-mono)", fontSize: "9.5px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cadence-accent)", marginBottom: "0.65rem" }}>
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

/** Sub-heading within a section — no anchor */
export function SubHead({ children }) {
  return (
    <div style={{ fontFamily: "var(--cadence-font-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--cadence-fg4)", marginBottom: "0.5rem", marginTop: "1.5rem" }}>
      {children}
    </div>
  )
}

/** Horizontal divider between sections */
export function Rule() {
  return <hr style={{ border: "none", borderTop: "0.5px solid var(--cadence-border2)", margin: "2rem 0" }} />
}

/**
 * Left-border callout block
 * subtle=false (default) → accent color
 * subtle=true            → muted border, dim label
 */
export function Block({ label, subtle = false, children }) {
  const color = subtle ? "var(--cadence-border)" : "var(--cadence-accent)"
  const labelColor = subtle ? "var(--cadence-fg4)" : "var(--cadence-accent)"
  return (
    <div style={{ borderLeft: `1.5px solid ${color}`, paddingLeft: "0.85rem", margin: "1.5rem 0" }}>
      {label && (
        <div style={{ fontFamily: "var(--cadence-font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: labelColor, marginBottom: "0.5rem" }}>
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

/** Tinted card box — for summaries, principles, structured highlights */
export function Card({ children }) {
  return (
    <div style={{ background: "var(--cadence-bg2)", border: "0.5px solid var(--cadence-border)", borderRadius: "3px", padding: "1.1rem 1.25rem", margin: "1.5rem 0" }}>
      {children}
    </div>
  )
}

/** Label inside a Card — always first child */
export function CardLabel({ children }) {
  return (
    <div style={{ fontFamily: "var(--cadence-font-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--cadence-accent)", marginBottom: "0.75rem" }}>
      {children}
    </div>
  )
}

/** Italic author note / caution block */
export function Note({ children }) {
  return (
    <div style={{ fontFamily: "var(--cadence-font-serif)", fontStyle: "italic", fontSize: "12.5px", color: "var(--cadence-fg3)", lineHeight: 1.75, borderLeft: "1.5px solid var(--cadence-border)", paddingLeft: "0.85rem", margin: "1.25rem 0" }}>
      {children}
    </div>
  )
}

/** Closing pull-quote — always the last element */
export function PullQuote({ children }) {
  return (
    <div style={{ borderLeft: "1.5px solid var(--cadence-accent)", paddingLeft: "0.85rem", margin: "2rem 0 0.5rem" }}>
      <p style={{ fontFamily: "var(--cadence-font-serif)", fontStyle: "italic", fontSize: "13px", color: "var(--cadence-fg3)", lineHeight: 1.85, margin: 0 }}>
        {children}
      </p>
    </div>
  )
}

/**
 * Data table
 *
 * headers   string[]
 * rows      string[][] — or per-cell: { value, type }
 * colTypes  ('default'|'label'|'mono'|'good'|'bad')[]
 *            applied per column; per-cell type overrides column type
 *
 * Example:
 *   <Table
 *     headers={["System", "Healthy", "Unhealthy"]}
 *     colTypes={["label", "default", "bad"]}
 *     rows={[["Glucose", "HOMA-IR < 1.5", "Insulin resistance"]]}
 *   />
 */
const TH = {
  fontFamily: "var(--cadence-font-mono)", fontSize: "9.5px", letterSpacing: "0.1em",
  textTransform: "uppercase", color: "var(--cadence-fg4)", textAlign: "left",
  padding: "0.4rem 0.75rem", borderBottom: "0.5px solid var(--cadence-border)",
}

const BASE_TD = {
  padding: "0.5rem 0.75rem", borderBottom: "0.5px solid var(--cadence-border2)",
  verticalAlign: "top", lineHeight: 1.65, fontSize: "13px",
}

const COL_STYLES = {
  default: { fontFamily: "var(--cadence-font-serif)", color: "var(--cadence-fg2)" },
  label:   { fontFamily: "var(--cadence-font-mono)", fontSize: "10px", color: "var(--cadence-fg3)" },
  mono:    { fontFamily: "var(--cadence-font-mono)", fontSize: "10px", color: "var(--cadence-fg3)" },
  good:    { fontFamily: "var(--cadence-font-serif)", color: "#5a8a5a" },
  bad:     { fontFamily: "var(--cadence-font-serif)", color: "#8a5050" },
}

export function Table({ headers, rows = [], colTypes = [] }) {
  return (
    <div style={{ overflowX: "auto", margin: "0.75rem 0 1.5rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        {headers?.length > 0 && (
          <thead>
            <tr>{headers.map((h) => <th key={h} style={TH}>{h}</th>)}</tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => {
                const isObj  = typeof cell === "object" && cell !== null
                const value  = isObj ? cell.value : cell
                const type   = isObj ? cell.type : (colTypes[ci] || "default")
                return (
                  <td key={ci} style={{ ...BASE_TD, ...(COL_STYLES[type] || COL_STYLES.default) }}>
                    {value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   TREEMAP — recursive topic/structure tree
   Usage:
     const tree = {
       label: "Week 02 — Historical Shift",
       children: [
         {
           label: "1. Nature of Worldviews",
           timestamp: "0:36 - 5:03",          // optional
           children: [
             { label: "Worldview as prism" },
             { label: "Quran 3:191 — tafakkur" },
           ]
         },
       ]
     }
     <TreeMap tree={tree} />
══════════════════════════════════════════════════════════════ */
function TreeNode({ node, depth = 0, isLast = false, prefix = "" }) {
  const [open, setOpen] = useState(true)
  const hasChildren = node.children?.length > 0
  const connector   = isLast ? "└──" : "├──"
  const childPrefix = prefix + (isLast ? "    " : "│   ")

  return (
    <div style={{ fontFamily: "var(--cadence-font-mono)", fontSize: "11px", lineHeight: 1.7 }}>
      <div
        onClick={() => hasChildren && setOpen(o => !o)}
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "6px",
          cursor: hasChildren ? "pointer" : "default",
          color: depth === 0 ? "var(--cadence-fg)" : depth === 1 ? "var(--cadence-fg2)" : "var(--cadence-fg3)",
          padding: "1px 0",
        }}
      >
        <span style={{ color: "var(--cadence-fg5)", whiteSpace: "pre", flexShrink: 0 }}>
          {depth === 0 ? "" : prefix + connector + " "}
        </span>
        <span style={{ fontWeight: depth === 0 ? 500 : 400 }}>{node.label}</span>
        {node.timestamp && (
          <span style={{ color: "var(--cadence-fg4)", fontSize: "10px", marginLeft: "4px" }}>
            {node.timestamp}
          </span>
        )}
        {hasChildren && (
          <span style={{ color: "var(--cadence-fg5)", fontSize: "9px", marginLeft: "2px" }}>
            {open ? "▾" : "▸"}
          </span>
        )}
      </div>
      {hasChildren && open && (
        <div>
          {node.children.map((child, i) => (
            <TreeNode
              key={i}
              node={child}
              depth={depth + 1}
              isLast={i === node.children.length - 1}
              prefix={childPrefix}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function TreeMap({ tree, label }) {
  if (!tree) return null
  return (
    <div style={{
      background: "var(--cadence-bg2)",
      border: "0.5px solid var(--cadence-border)",
      borderRadius: "3px",
      padding: "1rem 1.25rem",
      margin: "0.75rem 0 1.5rem",
      overflowX: "auto",
    }}>
      {label && (
        <div style={{
          fontFamily: "var(--cadence-font-mono)",
          fontSize: "9px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--cadence-accent)",
          marginBottom: "0.75rem",
        }}>
          {label}
        </div>
      )}
      <TreeNode node={tree} depth={0} isLast={true} prefix="" />
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   TIMELINE — timestamp-indexed collapsible list
   Usage:
     const timeline = [
       {
         start: "0:36",
         end: "5:03",                    // optional
         label: "Nature of Worldviews",
         points: [                       // optional
           "Worldview as prism",
           "Quran 3:191 — tafakkur",
         ]
       },
     ]
     <Timeline entries={timeline} />
══════════════════════════════════════════════════════════════ */
export function Timeline({ entries = [], label }) {
  const [open, setOpen] = useState({})
  const toggle = (i) => setOpen(p => ({ ...p, [i]: !p[i] }))

  return (
    <div style={{ margin: "0.75rem 0 1.5rem" }}>
      {label && (
        <div style={{
          fontFamily: "var(--cadence-font-mono)",
          fontSize: "9px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--cadence-accent)",
          marginBottom: "0.65rem",
        }}>
          {label}
        </div>
      )}
      {entries.map((entry, i) => {
        const isOpen = !!open[i]
        const hasPoints = entry.points?.length > 0
        return (
          <div key={i} style={{ borderBottom: "0.5px solid var(--cadence-border2)" }}>
            <div
              onClick={() => hasPoints && toggle(i)}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                padding: "0.45rem 0",
                cursor: hasPoints ? "pointer" : "default",
              }}
            >
              <span style={{
                fontFamily: "var(--cadence-font-mono)",
                fontSize: "10px",
                color: "var(--cadence-accent)",
                flexShrink: 0,
                minWidth: "80px",
              }}>
                {entry.start}{entry.end ? ` – ${entry.end}` : ""}
              </span>
              <span style={{
                fontFamily: "var(--cadence-font-serif)",
                fontSize: "13px",
                color: "var(--cadence-fg2)",
                flex: 1,
              }}>
                {entry.label}
              </span>
              {hasPoints && (
                <span style={{ color: "var(--cadence-fg5)", fontSize: "10px", flexShrink: 0 }}>
                  {isOpen ? "▾" : "▸"}
                </span>
              )}
            </div>
            {hasPoints && isOpen && (
              <div style={{ paddingLeft: "90px", paddingBottom: "0.5rem" }}>
                {entry.points.map((pt, j) => (
                  <div key={j} style={{
                    fontFamily: "var(--cadence-font-mono)",
                    fontSize: "10.5px",
                    color: "var(--cadence-fg3)",
                    lineHeight: 1.7,
                    display: "flex",
                    gap: "6px",
                  }}>
                    <span style={{ color: "var(--cadence-fg5)", flexShrink: 0 }}>·</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   ACCORDION — generic collapsible with rich content slot
   Usage:
     <Accordion>
       <AccordionItem label="Chapter 1 — The Opening">
         <P>Summary paragraph...</P>
         <Block label="Key Insight">...</Block>
       </AccordionItem>
       <AccordionItem label="Chapter 2 — The Turn">
         <P>...</P>
       </AccordionItem>
     </Accordion>
══════════════════════════════════════════════════════════════ */
export function AccordionItem({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: "0.5px solid var(--cadence-border2)" }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.6rem 0",
          cursor: "pointer",
        }}
      >
        <span style={{
          fontFamily: "var(--cadence-font-serif)",
          fontSize: "13.5px",
          color: open ? "var(--cadence-fg)" : "var(--cadence-fg2)",
          fontWeight: open ? 500 : 400,
          transition: "color 0.15s",
        }}>
          {label}
        </span>
        <span style={{ color: "var(--cadence-fg5)", fontSize: "10px", flexShrink: 0, marginLeft: "12px" }}>
          {open ? "▾" : "▸"}
        </span>
      </div>
      {open && (
        <div style={{ paddingBottom: "0.75rem" }}>
          {children}
        </div>
      )}
    </div>
  )
}

export function Accordion({ children, label }) {
  return (
    <div style={{ margin: "0.75rem 0 1.5rem" }}>
      {label && (
        <div style={{
          fontFamily: "var(--cadence-font-mono)",
          fontSize: "9px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--cadence-accent)",
          marginBottom: "0.65rem",
        }}>
          {label}
        </div>
      )}
      {children}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════
   GLOSSARY — term / definition / jottings table
   Usage:
     const glossary = [
       { term: "Tafakkur", definition: "Deep contemplation...", jottings: "Optional note" },
       { term: "mTOR",     definition: "Protein kinase that..." },
     ]
     <Glossary entries={glossary} />
══════════════════════════════════════════════════════════════ */
export function Glossary({ entries = [] }) {
  if (!entries.length) return null
  const hasJottings = entries.some(e => e.jottings)
  return (
    <div style={{ margin: "0.75rem 0 1.5rem" }}>
      <div style={{
        fontFamily: "var(--cadence-font-mono)",
        fontSize: "9px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--cadence-accent)",
        marginBottom: "0.65rem",
      }}>
        Glossary
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...TH, width: "20%" }}>Term</th>
              <th style={TH}>Definition</th>
              {hasJottings && <th style={{ ...TH, width: "25%" }}>Jottings</th>}
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i}>
                <td style={{ ...BASE_TD, ...COL_STYLES.label, fontWeight: 500 }}>{e.term}</td>
                <td style={{ ...BASE_TD, ...COL_STYLES.default }}>{e.definition}</td>
                {hasJottings && (
                  <td style={{ ...BASE_TD, ...COL_STYLES.mono, fontStyle: "italic" }}>
                    {e.jottings || "—"}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

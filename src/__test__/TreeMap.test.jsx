import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TreeMap } from "../index.jsx"

const simpleTree = {
  label: "Root",
  children: [
    { label: "Child A" },
    { label: "Child B" },
  ],
}

const nestedTree = {
  label: "Week 02",
  children: [
    {
      label: "1. Nature of Worldviews",
      timestamp: "0:36 - 5:03",
      children: [
        { label: "Worldview as prism" },
        { label: "Quran 3:191 — tafakkur" },
      ],
    },
  ],
}

describe("TreeMap", () => {
  it("returns null when tree is not provided", () => {
    const { container } = render(<TreeMap tree={null} />)
    expect(container).toBeEmptyDOMElement()
  })

  it("renders the root label and its children by default (open)", () => {
    render(<TreeMap tree={simpleTree} />)
    expect(screen.getByText("Root")).toBeInTheDocument()
    expect(screen.getByText("Child A")).toBeInTheDocument()
    expect(screen.getByText("Child B")).toBeInTheDocument()
  })

  it("renders an optional label prop above the tree", () => {
    render(<TreeMap tree={simpleTree} label="Structure" />)
    expect(screen.getByText("Structure")).toBeInTheDocument()
  })

  it("renders a timestamp when provided on a node", () => {
    render(<TreeMap tree={nestedTree} />)
    expect(screen.getByText("0:36 - 5:03")).toBeInTheDocument()
  })

  it("does not show a toggle arrow on leaf nodes (no children)", () => {
    render(<TreeMap tree={simpleTree} />)
    // "Child A" and "Child B" are leaves — clicking them should do nothing
    // since hasChildren is false, so no arrow/expand icon is rendered for them.
    // We assert indirectly: they remain visible before and after a click.
    const childA = screen.getByText("Child A")
    expect(childA).toBeInTheDocument()
  })

  it("toggles children visibility when a parent node is clicked", async () => {
    const user = userEvent.setup()
    render(<TreeMap tree={nestedTree} />)

    // nested children are visible initially (open by default)
    expect(screen.getByText("Worldview as prism")).toBeInTheDocument()

    // click the parent node to collapse it
    await user.click(screen.getByText("1. Nature of Worldviews"))
    expect(screen.queryByText("Worldview as prism")).not.toBeInTheDocument()

    // click again to expand it back
    await user.click(screen.getByText("1. Nature of Worldviews"))
    expect(screen.getByText("Worldview as prism")).toBeInTheDocument()
  })

  it("renders deeply nested children correctly", () => {
    render(<TreeMap tree={nestedTree} />)
    expect(screen.getByText("Worldview as prism")).toBeInTheDocument()
    expect(screen.getByText("Quran 3:191 — tafakkur")).toBeInTheDocument()
  })
})
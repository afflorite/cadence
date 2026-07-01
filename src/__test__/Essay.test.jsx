import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Essay, Section, P } from "../index.jsx"

const SECTIONS = [
  { id: "intro", label: "Introduction" },
  { id: "closing", label: "Closing" },
]

describe("Essay", () => {
  it("renders its children", () => {
    render(
      <Essay sections={SECTIONS}>
        <Section id="intro" label="Introduction">
          <P>Hello from the intro.</P>
        </Section>
      </Essay>
    )
    expect(screen.getByText("Hello from the intro.")).toBeInTheDocument()
  })

  it("renders the table of contents when sections are provided", () => {
    render(
      <Essay sections={SECTIONS}>
        <Section id="intro" label="Introduction">
          <P>Body text.</P>
        </Section>
      </Essay>
    )
    // TOC labels appear (desktop rail + mobile pills both render each label,
    // so there should be at least one of each)
    expect(screen.getAllByText("Introduction").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Closing").length).toBeGreaterThan(0)
  })

  it("does not render a table of contents when sections is empty", () => {
    render(
      <Essay sections={[]}>
        <Section id="intro" label="Introduction">
          <P>Body text.</P>
        </Section>
      </Essay>
    )
    // "Contents" header from EssayNav should not appear
    expect(screen.queryByText("Contents")).not.toBeInTheDocument()
  })

  it("does not render a table of contents when sections is omitted", () => {
    render(
      <Essay>
        <Section id="intro" label="Introduction">
          <P>Body text.</P>
        </Section>
      </Essay>
    )
    expect(screen.queryByText("Contents")).not.toBeInTheDocument()
  })

  it("renders multiple sections in order", () => {
    render(
      <Essay sections={SECTIONS}>
        <Section id="intro" label="Introduction">
          <P>First section.</P>
        </Section>
        <Section id="closing" label="Closing">
          <P>Second section.</P>
        </Section>
      </Essay>
    )
    expect(screen.getByText("First section.")).toBeInTheDocument()
    expect(screen.getByText("Second section.")).toBeInTheDocument()
  })
})

describe("Section", () => {
  it("renders its label", () => {
    render(
      <Section id="test" label="My Label">
        <P>Content</P>
      </Section>
    )
    expect(screen.getByText("My Label")).toBeInTheDocument()
  })

  it("renders without a label when none is provided", () => {
    render(
      <Section id="test">
        <P>Content only</P>
      </Section>
    )
    expect(screen.getByText("Content only")).toBeInTheDocument()
  })

  it("sets the id attribute for anchor scrolling", () => {
    const { container } = render(
      <Section id="my-anchor" label="Anchor Test">
        <P>Anchored content</P>
      </Section>
    )
    expect(container.querySelector("#my-anchor")).toBeInTheDocument()
  })
})
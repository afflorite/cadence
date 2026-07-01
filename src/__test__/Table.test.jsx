import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Table } from "../index.jsx"

describe("Table", () => {
  it("renders plain string cells", () => {
    render(
      <Table
        headers={["Name", "Status"]}
        rows={[["Glucose", "Normal"]]}
      />
    )
    expect(screen.getByText("Glucose")).toBeInTheDocument()
    expect(screen.getByText("Normal")).toBeInTheDocument()
  })

  it("renders headers correctly", () => {
    render(
      <Table
        headers={["System", "Healthy", "Unhealthy"]}
        rows={[["Glucose", "HOMA-IR < 1.5", "Insulin resistance"]]}
      />
    )
    expect(screen.getByText("System")).toBeInTheDocument()
    expect(screen.getByText("Healthy")).toBeInTheDocument()
    expect(screen.getByText("Unhealthy")).toBeInTheDocument()
  })

  it("renders object cells with per-cell type, overriding colTypes", () => {
    render(
      <Table
        headers={["Metric"]}
        colTypes={["default"]}
        rows={[[{ value: "Elevated", type: "bad" }]]}
      />
    )
    const cell = screen.getByText("Elevated")
    expect(cell).toBeInTheDocument()
    // bad type maps to color: "#8a5050" per COL_STYLES
    expect(cell).toHaveStyle({ color: "#8a5050" })
  })

  it("falls back to 'default' column style when colTypes is not provided", () => {
    render(
      <Table
        headers={["Note"]}
        rows={[["Just a plain note"]]}
      />
    )
    const cell = screen.getByText("Just a plain note")
    // default type uses serif font per COL_STYLES.default
    expect(cell).toHaveStyle({ fontFamily: "var(--cadence-font-serif)" })
  })

  it("renders without headers when headers prop is omitted", () => {
    render(<Table rows={[["No header row"]]} />)
    expect(screen.getByText("No header row")).toBeInTheDocument()
    expect(screen.queryByRole("columnheader")).not.toBeInTheDocument()
  })

  it("renders multiple rows correctly", () => {
    render(
      <Table
        headers={["Item"]}
        rows={[["First"], ["Second"], ["Third"]]}
      />
    )
    expect(screen.getByText("First")).toBeInTheDocument()
    expect(screen.getByText("Second")).toBeInTheDocument()
    expect(screen.getByText("Third")).toBeInTheDocument()
  })
})
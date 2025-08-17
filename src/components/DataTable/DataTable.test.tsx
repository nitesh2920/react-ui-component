import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataTable } from "./DataTable";
import type {Column } from "./DataTable"

type User = {
  id: number;
  name: string;
};

const columns: Column<User>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
];

describe("DataTable", () => {
  it("renders table with data", () => {
    render(
      <DataTable<User>
        columns={columns}
        data={[{ id: 1, name: "Alice" }]}
      />
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    render(
      <DataTable<User>
        columns={columns}
        data={[]}
        loading={true}
      />
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows empty state when no data", () => {
    render(<DataTable<User> columns={columns} data={[]} />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });
});

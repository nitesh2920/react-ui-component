import { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import DataTable from "./DataTable";
import type { DataTableProps, Column } from "./DataTable"

type User = {
  id: number;
  name: string;
  age: number;
  email: string;
};

const columns: Column<User>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", sortable: true },
  { key: "email", header: "Email", sortable: false },
];

const demoData: User[] = [
  { id: 1, name: "Alice", age: 28, email: "alice@email.com" },
  { id: 2, name: "Bob", age: 32, email: "bob@email.com" },
  { id: 3, name: "Charlie", age: 36, email: "charlie@email.com" },
];

export default {
  title: "Components/DataTable",
  component: DataTable,
} as Meta;

const Template: StoryFn<DataTableProps<User>> = (args) => {
  const [selected, setSelected] = useState<User[]>([]);
  return (
    <div style={{ padding: "20px" }}>
      <DataTable {...args} onRowSelect={setSelected} />
      {args.selectable && (
        <div className="mt-4">
          <strong>Selected Rows:</strong>
          {selected.length === 0 && <div>None selected</div>}
          {selected.map((row) => (
            <div key={row.id}>{row.name} ({row.email})</div>
          ))}
        </div>
      )}
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  data: demoData,
  columns,
  loading: false,
  selectable: false,
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  columns,
  loading: true,
  selectable: false,
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
  columns,
  loading: false,
  selectable: false,
};

export const Selectable = Template.bind({});
Selectable.args = {
  data: demoData,
  columns,
  selectable: true,
  selectionMode: "multiple",
  loading: false,
};

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  data: demoData,
  columns,
  selectable: true,
  selectionMode: "single",
  loading: false,
};

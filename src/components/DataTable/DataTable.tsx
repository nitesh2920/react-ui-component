import React, { useState, useMemo } from "react";

export type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
};

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  sortable?: boolean;
  loading?: boolean;
  selectable?: boolean;
  selectionMode?: "single" | "multiple";
  onRowSelect?: (rows: T[]) => void;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchable = false,
  sortable = false,
  loading = false,
  selectable = false,
  selectionMode = "multiple",
  onRowSelect,
  className = "",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<T[]>([]);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortOrder]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleRowClick = (row: T) => {
    let updated: T[] = [];
    if (selectionMode === "single") {
      updated = [row];
    } else {
      updated = selected.includes(row)
        ? selected.filter((r) => r !== row)
        : [...selected, row];
    }
    setSelected(updated);
    onRowSelect?.(updated);
  };

  return (
    <div className={`w-full ${className}`}>
      {searchable && (
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 mb-2 w-full rounded"
          aria-label="Search input"
        />
      )}
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : (
        <table className="table-auto border-collapse w-full border rounded">
          <thead>
            <tr>
              {selectable && <th className="px-4 py-2 border">Select</th>}
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => sortable && col.sortable && handleSort(col.key)}
                  className={`px-4 py-2 border cursor-pointer ${
                    sortable && col.sortable ? "hover:bg-gray-100" : ""
                  }`}
                >
                  {col.header}
                  {sortKey === col.key && (sortOrder === "asc" ? " 🔼" : " 🔽")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, i) => (
                <tr
                  key={i}
                  className={`hover:bg-gray-50 ${
                    selectable && selected.includes(row)
                      ? "bg-blue-100"
                      : ""
                  }`}
                  onClick={() => selectable && handleRowClick(row)}
                >
                  {selectable && (
                    <td className="px-4 py-2 border">
                      {selectionMode === "single" ? (
                        <input
                          type="radio"
                          checked={selected.includes(row)}
                          readOnly
                        />
                      ) : (
                        <input
                          type="checkbox"
                          checked={selected.includes(row)}
                          readOnly
                        />
                      )}
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-2 border">
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center py-4"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DataTable;

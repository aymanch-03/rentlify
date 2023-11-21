/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";
// import { Table } from "@tanstack/react-table";
import { customerStatuses, orderStatuses, userLabels } from "../../data/data";
import { Button } from "./button";
import DataTableFacetedFilter from "./data-table-faceted-filter";
import DataTableViewOptions from "./data-table-view-options";
import { Input } from "./input";

function DataTableToolbar({ table, option }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex  items-center gap-2 justify-end">
      <div className="flex sm:flex-row flex-col-reverse flex-1 items-end gap-3 sm:items-center justify-end  space-x-2">
        {option === "customers" && (
          <Input
            placeholder="Filter by emails..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="h-8 sm:w-[150px] w-full lg:w-[250px]"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <div className="flex gap-1">
          {table.getColumn(
            `${option === "customers" ? "active" : "status"}`
          ) && (
            <DataTableFacetedFilter
              column={table.getColumn(
                `${option === "customers" ? "active" : "status"}`
              )}
              title="Status"
              options={
                option === ("customers" || "users")
                  ? customerStatuses
                  : orderStatuses
              }
            />
          )}
          {table.getColumn("role") && (
            <DataTableFacetedFilter
              column={table.getColumn("role")}
              title="User Role"
              options={userLabels}
            />
          )}
        </div>
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}

export default DataTableToolbar;

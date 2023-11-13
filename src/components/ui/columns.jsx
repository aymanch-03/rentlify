/* eslint-disable no-unused-vars */
import {
  customerStatuses,
  labels,
  orderStatuses,
  userLabels,
} from "../../data/data";
import DeleteUser from "../Users/deleteBtn";
import { Badge } from "./badge";
import { Checkbox } from "./checkbox";
import DataTableColumnHeader from "./data-table-column-header";
import DataTableRowActions from "./data-table-row-actions";

function getColumns({
  keyOne,
  keyTwo,
  keyThree,
  keyFour,
  keyFive,
  option,
  keyOneTitle,
  keyTwoTitle,
  keyThreeTitle,
  keyFiveTitle,
}) {
  return [
    {
      accessorKey: keyOne,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={keyOneTitle}
          className={"!text-sm"}
        />
      ),
      cell: ({ row }) => (
        <Badge className="font-medium" variant={"outline"}>
          {row.getValue(keyOne)}

        </Badge>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    option === "orders"
      ? {
          accessorKey: keyTwo,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyTwoTitle} />
          ),
          cell: ({ row }) => (
            <Badge className={`font-medium`} variant={"outline"}>
              {row.getValue(keyTwo).email}
            </Badge>
          ),
          enableSorting: false,
          enableHiding: false,
        }
      : option === "customers"
      ? {
          accessorKey: keyTwo,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyTwoTitle} />
          ),
          cell: ({ row }) => {
            const label = labels.find(
              (label) => label.value === row.original.valid_account
            );
            return (
              <div className="flex space-x-2">
                {label && (
                  <Badge
                    variant="outline"
                    className={`font-medium ${label.badgeStyles}`}
                  >
                    {label.label}
                  </Badge>
                )}
                <span className="max-w-[500px] truncate font-medium">
                  {row.getValue(keyTwo)}
                </span>
              </div>
            );
          },
        }
      : option === "users"
      ? {
          accessorKey: keyTwo,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyTwoTitle} />
          ),
          cell: ({ row }) => {
            const label = userLabels.find(
              (label) => label.value === row.original.role
            );
            return (
              <div className="flex space-x-2">
                {label && (
                  <Badge
                    variant="outline"
                    className={`font-medium ${label.badgeStyles}`}
                  >
                    {label.label}
                  </Badge>
                )}
                {/* <span className="max-w-[500px] truncate font-medium">
                  {row.getValue(keyTwo)}
                </span> */}
              </div>
            );
          },
        }
      : null,
    option === "orders"
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const status = orderStatuses.find(
              (status) => status.value === row.getValue(keyThree)
            );

            if (!status) {
              return null;
            }

            return (
              <div className="flex w-[100px] items-center">
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant="outline"
                  className={`font-medium ${status.badgeStyles}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }
      : option === "customers"
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const status = customerStatuses.find(
              (status) => status.value === row.getValue(keyThree)
            );

            if (!status) {
              return null;
            }

            return (
              <div className="flex w-[100px] items-center">
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant="outline"
                  className={`font-medium ${status.badgeColor}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }
      : option === "users"
      ? {
          accessorKey: keyThree,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={keyThreeTitle} />
          ),
          cell: ({ row }) => {
            const status = customerStatuses.find(
              (status) => status.value === row.getValue(keyThree)
            );

            if (!status) {
              return null;
            }

            return (
              <div className="flex w-[100px] items-center">
                {status.icon && (
                  <status.icon className={`mr-2 h-4 w-4 ${status.color}`} />
                )}
                <Badge
                  variant="outline"
                  className={`font-medium ${status.badgeColor}`}
                >
                  {status.label}
                </Badge>
              </div>
            );
          },
          filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
          },
        }
      : null,
    {
      accessorKey: keyFour,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created at" />
      ),
      cell: ({ row }) => {
        const dateValue = row.getValue(keyFour);
        const formattedValue = new Date(dateValue).toLocaleDateString();
        return (
          <Badge variant={"outline"} className={"font-medium"}>
            {formattedValue}
          </Badge>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      // id: keyFive,
      accessorKey: keyFive,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={keyFiveTitle} />
      ),
      cell: ({ row }) => {
        const cellValue = row.getValue(keyFive);

        if (option === "users" || option === "customers") {
          return (
            <Badge variant="outline" className="font-medium">
              {cellValue}
            </Badge>
          );
        } else if (option === "orders") {
          return <>{`${cellValue},00 MAD`}</>;
        }

        return null;
      },

      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "actions",
      cell: ({ row }) => <DeleteUser id={row.getValue(keyFive)} row={row} />,
    },
  ];
}

export default getColumns;

import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const ReusableDataTable = ({
  data,
  columns,
  paginator = true,
  rows = 10,
  first,
  onPage,
  className,
  rowKey = "id",
  responsiveLayout = "scroll",
}) => {
  return (
    <DataTable
      value={data}
      paginator={paginator}
      rows={rows}
      first={first}
      onPage={onPage}
      dataKey={rowKey}
      responsiveLayout={responsiveLayout}
      className={className}
    >
      {columns.map((col, idx) => (
        <Column
          key={col.field || col.header || idx}
          field={col.field}
          header={col.header}
          sortable={col.sortable}
          body={col.body}
        />
      ))}
    </DataTable>
  );
};

export default ReusableDataTable;

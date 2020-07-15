import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import { Table } from "reactstrap";

const TableComponent = ({ columns, sortColumn, onSort, data, classes }) => {
  return (
    <React.Fragment>
      <div className="table-responsive">
        <Table className={classes}>
          <TableHeader
            columns={columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody columns={columns} data={data} />
        </Table>
      </div>

      {data.length === 0 && (
        <h4 className="text-center my-5">No Record Found</h4>
      )}
    </React.Fragment>
  );
};

export default TableComponent;

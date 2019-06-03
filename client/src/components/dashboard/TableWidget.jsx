import React from "react";
import { Table } from "reactstrap";
export default function TableWidget(tasks) {
  return (
    <div style={{ width: "100%" }}>
      <Table hovered responsive bordered>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Deadline Date</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody />
      </Table>
    </div>
  );
}

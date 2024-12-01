import React from "react";
import { TableRowProps } from "../types";
import TableCell from "./TableCell";

const TableRow: React.FC<TableRowProps> = ({
  event,
  isHighlighted,
  editableCell,
  editedValue,
  handleCellClick,
  handleInputChange,
  handleInputBlur,
  getEventValue,
}) => (
  <div className="flex">
    <TableCell
      value={event.index}
      isEditable={false}
      isHighlighted={isHighlighted}
      onClick={() => {}}
      onChange={() => {}}
      onBlur={() => {}}
      column="index"
    />
    <TableCell
      value={
        editableCell.index === event.index && editableCell.field === "value1"
          ? editedValue
          : getEventValue(event.index, "value1")
      }
      isEditable={
        editableCell.index === event.index && editableCell.field === "value1"
      }
      isHighlighted={isHighlighted}
      onClick={() => handleCellClick(event.index, "value1", event.value1)}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      column="value1"
    />
    <TableCell
      value={
        editableCell.index === event.index && editableCell.field === "value2"
          ? editedValue
          : getEventValue(event.index, "value2")
      }
      isEditable={
        editableCell.index === event.index && editableCell.field === "value2"
      }
      isHighlighted={isHighlighted}
      onClick={() => handleCellClick(event.index, "value2", event.value2)}
      onChange={handleInputChange}
      onBlur={handleInputBlur}
      column="value2"
    />
  </div>
);

export default TableRow;

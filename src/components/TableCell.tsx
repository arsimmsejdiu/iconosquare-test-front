import React from "react";

import { TableCellProps } from "../types";

const TableCell: React.FC<TableCellProps> = ({
  value,
  isEditable,
  isHighlighted,
  onClick,
  onChange,
  onBlur,
  column,
}) => {
  const getColumnClass = () => {
    switch (column) {
      case "index":
        return "bg-gray-100";
      case "value1":
        return "bg-gray-50";
      case "value2":
        return "bg-gray-100";
      default:
        return "";
    }
  };

  return (
    <div
      className={`w-1/3 text-center p-2 border-t ${
        isHighlighted ? "bg-yellow-100" : getColumnClass()
      }`}
      onClick={onClick}
    >
      {isEditable ? (
        <input
          type="text"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoFocus
        />
      ) : (
        value
      )}
    </div>
  );
};

export default TableCell;

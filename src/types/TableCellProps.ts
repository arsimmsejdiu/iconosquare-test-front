import React from "react";

export interface TableCellProps {
  value: string | number;
  isEditable: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  column: "index" | "value1" | "value2";
}

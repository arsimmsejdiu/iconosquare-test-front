export interface LiveTableProps {
  editableCell: { index: number | null; field: string | null };
  setEditableCell: React.Dispatch<
    React.SetStateAction<{ index: number | null; field: string | null }>
  >;
}

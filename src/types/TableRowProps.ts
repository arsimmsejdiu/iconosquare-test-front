import { Event } from "./EventInterface";

export interface TableRowProps {
  event: Event;
  isHighlighted: boolean;
  editableCell: { index: number | null; field: string | null };
  editedValue: string;
  handleCellClick: (index: number, field: keyof Event, value: number) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: () => void;
  getEventValue: (index: number, field: keyof Event) => string | number;
}

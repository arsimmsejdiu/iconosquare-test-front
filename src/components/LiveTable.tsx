import React, { useState, useEffect, useRef } from "react";
import { useLiveChartContext } from "../utils/hooks/useLiveChartContext";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import PaginationControls from "./PaginationControls";
import { Event, LiveTableProps } from "../types";

const LiveTable: React.FC<LiveTableProps> = ({
  editableCell,
  setEditableCell,
}) => {
  const { data } = useLiveChartContext();
  const [editedValue, setEditedValue] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 20;
  const [modifiedData, setModifiedData] = useState<Map<number, Event>>(
    new Map()
  );

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setModifiedData((prev) => {
          const updatedData = new Map(prev);
          data.events.forEach((event) => {
            updatedData.set(event.index, event);
          });
          return updatedData;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, data.events]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const currentEvents = Array.from(modifiedData.values()).slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

  const isHighlighted = (eventIndex: number) =>
    editableCell.index !== null && editableCell.index === eventIndex;

  const handleCellClick = (
    index: number,
    field: keyof Event,
    value: number
  ) => {
    if (editableCell.index !== index || editableCell.field !== field) {
      setEditableCell({ index, field });
      setEditedValue(value.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setEditedValue(value);
    }
  };

  const handleInputBlur = () => {
    if (editableCell.index !== null && editableCell.field !== null) {
      const index = editableCell.index;
      const field = editableCell.field as keyof Event;

      const updatedEvent: Event = {
        ...data.events[index],
        ...modifiedData.get(index),
        [field]: parseFloat(editedValue) || 0,
      };

      setModifiedData((prev) => new Map(prev).set(index, updatedEvent));
      setEditableCell({ index: null, field: null });
      setEditedValue(""); // Reset editedValue after updating the cell
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(modifiedData.size / eventsPerPage) - 1)
    );
  };

  const handleResetAll = () => {
    setModifiedData(new Map());
  };

  const getEventValue = (index: number, field: keyof Event) => {
    const event = data.events[index];
    if (!event) return ""; // Return an empty string if the event is undefined
    const modifiedEvent = modifiedData.get(index);
    return modifiedEvent ? modifiedEvent[field] : event[field];
  };

  return (
    <div className="mb-10">
      <div className="mb-4 flex gap-4">
        <button
          className="p-2 bg-blue-500 hover:bg-blue-400 text-white border-none rounded"
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
          className="p-2 bg-red-500 hover:bg-red-400 text-white border-none rounded"
          onClick={handleResetAll}
        >
          Reset All
        </button>
        <p className="text-red-500 font-normal text-xs mt-5">
          Please pause the data to be able to edit.
        </p>
      </div>

      <div className="flex flex-col border border-gray-300 rounded overflow-hidden">
        <TableHeader />
        {currentEvents.map((event) => (
          <TableRow
            key={event.index}
            event={event}
            isHighlighted={isHighlighted(event.index)}
            editableCell={editableCell}
            editedValue={editedValue}
            handleCellClick={handleCellClick}
            handleInputChange={handleInputChange}
            handleInputBlur={handleInputBlur}
            getEventValue={getEventValue}
          />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        isPreviousDisabled={currentPage === 0}
        isNextDisabled={(currentPage + 1) * eventsPerPage >= modifiedData.size}
      />
    </div>
  );
};

export default LiveTable;

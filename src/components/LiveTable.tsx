import React, { useState, useEffect, useRef } from 'react';
import { useLiveChartContext } from '../utils/hooks/useLiveChartContext';

interface Event {
    index: number;
    value1: number;
    value2: number;
    comment: string;
}

interface LiveTableProps {
    editableCell: { index: number | null; field: string | null };
    setEditableCell: React.Dispatch<React.SetStateAction<{ index: number | null; field: string | null }>>;
}

const LiveTable: React.FC<LiveTableProps> = ({ editableCell, setEditableCell }) => {
    const { data } = useLiveChartContext();
    const [editedValue, setEditedValue] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const eventsPerPage = 20;
    const [modifiedData, setModifiedData] = useState<Map<number, Event>>(new Map());

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

    const handleCellClick = (index: number, field: keyof Event, value: number) => {
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
            setEditedValue(''); // Reset editedValue after updating the cell
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
        if (!event) return ''; // Return an empty string if the event is undefined
        const modifiedEvent = modifiedData.get(index);
        return modifiedEvent ? modifiedEvent[field] : event[field];
    };

    return (
        <div className="mb-10">
            <div className="mb-4 flex gap-4">
                <button
                    className="p-2 bg-blue-500 text-white border-none rounded"
                    onClick={togglePlayPause}
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                    className="p-2 bg-red-500 text-white border-none rounded"
                    onClick={handleResetAll}
                >
                    Reset All
                </button>
            </div>

            <div className="flex border border-gray-300 rounded overflow-hidden">
                <div className="w-1/3 text-center bg-gray-100">
                    <div className="font-semibold p-2">Index</div>
                    {currentEvents.map((event) => (
                        <div
                            key={event.index}
                            className={`p-2 ${isHighlighted(event.index) ? 'bg-yellow-100' : ''}`}
                        >
                            {event.index}
                        </div>
                    ))}
                </div>
                <div className="w-1/3 text-center bg-gray-50">
                    <div className="font-semibold p-2">Value 1</div>
                    {currentEvents.map((event) => (
                        <div
                            key={event.index}
                            className={`p-2 border-t ${isHighlighted(event.index) ? 'bg-yellow-100' : ''}`}
                            onClick={() => handleCellClick(event.index, 'value1', event.value1)}
                        >
                            {editableCell.index === event.index && editableCell.field === 'value1' ? (
                                <input
                                    type="text"
                                    value={editedValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    autoFocus
                                />
                            ) : (
                                getEventValue(event.index, 'value1')
                            )}
                        </div>
                    ))}
                </div>
                <div className="w-1/3 text-center bg-gray-100">
                    <div className="font-semibold p-2">Value 2</div>
                    {currentEvents.map((event) => (
                        <div
                            key={event.index}
                            className={`p-2 border-t ${isHighlighted(event.index) ? 'bg-yellow-100' : ''}`}
                            onClick={() => handleCellClick(event.index, 'value2', event.value2)}
                        >
                            {editableCell.index === event.index && editableCell.field === 'value2' ? (
                                <input
                                    type="text"
                                    value={editedValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputBlur}
                                    autoFocus
                                />
                            ) : (
                                getEventValue(event.index, 'value2')
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPage}
                    className={`p-2 text-white border-none rounded ${currentPage === 0 ? 'bg-gray-500' : 'bg-blue-500'}`}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    className={`p-2 text-white border-none rounded ${((currentPage + 1) * eventsPerPage >= modifiedData.size) ? 'bg-gray-500' : 'bg-blue-500'}`}
                    disabled={(currentPage + 1) * eventsPerPage >= modifiedData.size}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default LiveTable;
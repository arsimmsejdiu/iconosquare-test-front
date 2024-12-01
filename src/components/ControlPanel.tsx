import React from "react";
import { ControlPanelProps } from "../types";

const ControlPanel: React.FC<ControlPanelProps> = ({
                                                       isPlaying,
                                                       togglePlayPause,
                                                       handleResetAll,
                                                   }) => {
    return (
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
    );
};

export default ControlPanel;
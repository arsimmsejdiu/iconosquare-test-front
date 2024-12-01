import React, { useContext, useReducer, createContext, ReactNode } from 'react';
import { createRandomEvent } from '../utils/utils';
import { Event, State, Action, LiveChartContextProps } from '../types';

// Create the LiveChartContext
const LiveChartContext = createContext<LiveChartContextProps | undefined>(undefined);

// Initialize the events
const initialEvents: Event[] = Array.from({ length: 50 }, (_, ix) => createRandomEvent(ix));

// Initialize the state
const initialData: State = {
    events: initialEvents,
};

// Reducer function to manage state
const liveChartReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'new_event':
            return {
                ...state,
                events: [...state.events, action.payload],
            };
        case 'update_event': {
            const updatedEvents = state.events.map((event) =>
                event.index === action.payload.index ? { ...event, ...action.payload } : event
            );
            return { ...state, events: updatedEvents };
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

// Provider component
const LiveChartProvider = ({ children }: { children: ReactNode }) => {
    const [data, dispatch] = useReducer(liveChartReducer, initialData);

    return (
        <LiveChartContext.Provider value={{ data, dispatch }}>
            {children}
        </LiveChartContext.Provider>
    );
};

// Custom hook for using the context
const useLiveChartContext = (): LiveChartContextProps => {
    const context = useContext(LiveChartContext);
    if (!context) {
        throw new Error('useLiveChartContext must be used within a LiveChartProvider');
    }
    return context;
};

export { LiveChartProvider, useLiveChartContext };

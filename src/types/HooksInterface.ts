import {Dispatch} from "react";

interface Event {
    index: number;
    value1: number;
    value2: number;
    comment: string;
}

// Define the State interface
export interface State {
    events: Event[];
}

// Define the Action interface
export interface Action {
    type: 'new_event' | 'update_event';
    payload: Event;
}

// Define the context props
export interface LiveChartContextProps {
    data: State;
    dispatch: Dispatch<Action>;
}
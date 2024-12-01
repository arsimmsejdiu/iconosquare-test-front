export interface ControlPanelProps {
    isPlaying: boolean;
    togglePlayPause: () => void;
    handleResetAll: () => void;
}

export interface LogoProps {
    size?: number;
    className?: string;
    [key: string]: any;
}

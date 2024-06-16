export interface IEngineProps {
  setEngineStatus: (newStatus: number) => void;
  setLoadingProgression: (progression: number) => void;
  playMode: boolean;
  className: string;
}

declare global {
    interface HTMLAudioElement  {
      setSinkId(sinkId: string): Promise<void>;
    }
  }
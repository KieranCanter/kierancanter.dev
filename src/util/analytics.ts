type TrackEvent = {
  track: (eventName: string, eventData?: object) => void;
}
  
export const trackEvent = (eventName: string, eventData?: object) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, eventData);
  }
};